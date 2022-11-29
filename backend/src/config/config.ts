import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://gilbert:GVzrE30P1tVy8gMX@cluster0.cec6q.mongodb.net/Solinum?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

export const config = {
    mongo : {
        url : MONGO_URL
    },
    server : {
        port : SERVER_PORT
    },
    geocodeApi : {
        key : GOOGLE_MAPS_API_KEY
    }

}