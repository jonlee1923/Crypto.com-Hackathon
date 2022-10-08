const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const orgControllers = require('../controllers/organisation-controller');
const fileUpload = require('../middleware/file-upload');

router.get('/', orgControllers.getAllOrganisations);

router.get("/:id",orgControllers.getOrganisation );

//you can register more than one middleware in a http request
//Middleware runs from left to right
router.post(
    "/",
    // fileUpload.single('logoImage'),
    fileUpload.single('bannerImage'),
    [
        check("email").not().isEmpty(),
        check("name").not().isEmpty(),
        check("description").isLength({ min: 5 }),
        check("address").not().isEmpty(),
    ],
    orgControllers.createOrganisation
);

// router.patch(
//     "/:address",
//     [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
//     placesControllers.updatePlace
// );

// router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
