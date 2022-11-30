import axios from "axios";
import { INewPoint } from "../@types/point";


export async function createPoint (datas : INewPoint) {
    const apiPath: string = process.env.REACT_APP_API_URL!;

    await axios({
        method : "post",
        url : `${apiPath}/points/new`,
        withCredentials : false,
        data : datas
      })
      .then(() => {
        alert("Le lieu a bien ete cree !")
      })
      .catch((error) => {
        console.error(error)
        return { "error" : error }
      })

      console.log(datas);
    }