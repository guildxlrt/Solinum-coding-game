import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { INewPoint, IPoint } from '../../@types/point';
import { useListContext } from '../../appContext';
import { geocoding } from '../../utils/googleapi';

export default function SubmitForm() {
  // API URL
  const apiPath: string = process.env.REACT_APP_API_URL!;
  // UPDATE THE LIST
  const { list, updateList } = useListContext()

  // HANDLE RENDER
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [dist, setDist] = useState<boolean>(false)
  const [douche, setDouche] = useState<boolean>(false)
  const [wifi, setWifi] = useState<boolean>(false)

  const [address, setAddress] = useState('')
  const addressRef = useRef<HTMLInputElement>(null)

  const handleValidation = async (e : any) => {
    e.preventDefault();

    const returnedAddress = addressRef.current!.value!
    setAddress(returnedAddress)

    // GET MAP POSITION
    const data = await geocoding(addressRef.current!.value)
    
    // VERIFICATION OF DATA CONFORMITY
    if(data) {
      if((typeof data.lat === 'number') && (typeof data.lng === 'number')) {
        const formDatas : INewPoint = {
          "name" : name,
          "email" : email,
          "position" : [data.lat, data.lng],
          "address" : returnedAddress,
          "interests" : {
            "distribution" : dist,
            "douche" : douche,
            "wifi" : wifi
          }
        }

        await axios({
          method : "post",
          url : `${apiPath}/points/new`,
          withCredentials : false,
          data : formDatas
        })
        .then((res) => {
          alert("Le lieu a bien ete cree !")
          
          // UPDATE THE RENDER
          const emptyArray = new Array<IPoint>()
          const newList = emptyArray.concat(list!)
          newList.push(res.data.point)
          updateList(newList)
        })
        .catch((error) => {
          console.error(error)
          return { "error" : error }
        })
      }
    }
    
    
  }
  
  return (
    <div>
      <form>
        <h4 className='name'>Nom :</h4>
        <input
          className='name input'
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="nom de l'etablissement"
        />
        <br/>

        <h4 className='email'>Em@il :</h4>
        <input
          className='email input'
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="contact email"
        />
        <br/>

        <h4 className='address'>Adresse :</h4>
        <Autocomplete>
          <input
              className='address input'
              type="text"
              id="address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder="contact postal"
              ref={addressRef}
            />
        </Autocomplete>
        <br/>

        <h4 className='interests'>Interets :</h4>
        <input
          className='distribution checkbox'
          type="checkbox"
          id="distribution"
          onChange={(e) => setDist(!dist)}
        />
        <label htmlFor="distribution">Distribution</label>
        <br/>
        <input
          className='douche checkbox'
          type="checkbox"
          id="douche"
          onChange={(e) => setDouche(!douche)}
        />
        <label htmlFor="douche">Douche</label>
        <br/>
        <input
          className='wifi checkbox'
          type="checkbox"
          id="wifi"
          onChange={(e) => setWifi(!wifi)}
        />
        <label htmlFor="wifi">Wifi</label>
        <br/>
        
        <button onClick={handleValidation}>Submit</button>
      </form>
    </div>
  )
}
