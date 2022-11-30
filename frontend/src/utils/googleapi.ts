import axios from "axios";
import { apiKey } from "../pages";

const geocodeApiPath = 'https://maps.googleapis.com/maps/api/geocode/json';

export async function reverseGeocode(lat : number, lng : number) {
    const url = `${geocodeApiPath}?key=${apiKey}&latlng=${lat},${lng}`;

    return await axios({
      method : "get",
      url : url,
      withCredentials : false
    })
    .then((res) => {
      return res.data.results[0].formatted_address
    })
    .catch((error) => console.error(error))
}