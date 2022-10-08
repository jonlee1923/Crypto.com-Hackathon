const axios = require("axios"); //need this to send a request to another server 
const HttpError = require("../models/http-error");

const API_KEY = 'AIzaSyCSc8LmjjaPxqKUSNpNu_P-69T45ocKQ1w';

async function getCoordsForAddress(address) {
    //encodeURIComponent gets rid of special characters or whitespace
    const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
        )}&key=${API_KEY}`
    );

    const data = response.data;

    if(!data || data.status === 'ZERO_RESULTS'){
        const error = new HttpError('Could not find location for the specified address', 422);
        throw error;
    }

    const coordinates = data.results[0].geometry.location;
    return coordinates;
}   

module.exports = getCoordsForAddress;

