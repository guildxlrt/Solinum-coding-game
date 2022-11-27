import dotenv from 'dotenv';

dotenv.config();

const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const config = {
    googleMaps : {
        apiKey : MAPS_API_KEY
    }
}