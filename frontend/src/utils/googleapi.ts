import axios from "axios";
import { apiKey } from "../pages/Main";

const geocodeApiPath = 'https://maps.googleapis.com/maps/api/geocode/json';

export async function reverseGeocoding(lat : number, lng : number) {
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

export async function geocoding(address : string) {
  const url = `${geocodeApiPath}?key=${apiKey}&address=${address}`;

  return await axios({
    method : "get",
    url : url,
    withCredentials : false
  })
  .then((res) => {
    console.log(res.data.results[0])
    return res.data.results[0].geometry.location
  })
  .catch((error) => console.error(error))
}