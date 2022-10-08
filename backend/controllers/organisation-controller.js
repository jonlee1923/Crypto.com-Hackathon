const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../utils/location");
const Organisation = require("../models/organisation");


const getAllOrganisations = async (req, res, next) => {
    

    let organisations;
    try {
        //find returns an array
        organisations = await Organisation.find();
    } catch (err) {
        const error = new HttpError(
            "Fetching places failed please try again later",
            500
        );

        return next(error);
    }

    //need to map the array result from find first
    res.json({
        organisations: organisations.map((organisation) => organisation.toObject({ getters: true })),
    });
};

const getOrganisation = async (req, res, next) => {
    //params property holds an obj where the property holds the dynamic value
    const id = req.params.id;

    let org;
    try {
        org = await Organisation.findById(id);
    } catch (err) {
        //error for mistakes in the get request
        const error = new HttpError(
            "Something went wrong, could not find a place .",
            500
        );

        return next(error);
    }

    //error for non existing placeID
    if (!org) {
        const error = new HttpError(
            "could not find a organisation for the provided id.",
            404
        );

        return next(error);
    }

    res.json({ organisation: org.toObject({ getters: true }) });
};

const createOrganisation = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError("Invalid inputs passed, please check your data.", 422)
        );
    }

    const { email, name, description, address } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdOrg = new Organisation({
        email,
        name,
        description,
        address,
        location: coordinates,
        logoImage: "uploads/images/0ac52fb8-4a3f-46c9-bd99-fd6d620f8908.png",
        bannerImage: "uploads/images/e9d1e5e7-3234-4109-9b53-57f0180172ee.jpeg",
    });

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdOrg.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError(
            "Creating place failed, please try again.",
            500
        );
        return next(error);
    }

    res.status(201).json({ organisation: createdOrg });
};

exports.getAllOrganisations = getAllOrganisations;
exports.createOrganisation = createOrganisation;
exports.getOrganisation = getOrganisation;