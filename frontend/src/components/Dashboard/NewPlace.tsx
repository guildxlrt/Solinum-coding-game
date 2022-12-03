import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { INewPoint, IPoint } from '../../@types/point';
import { useListContext } from '../../appContext';
import { geocoding } from '../../utils/googleapi';

export const NewPlace = () => { 
  const [submitButton, setSubmitButton] = useState(false)

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
  
  function resetValues () {
    setName('')
    setEmail('')
    setDist(false)
    setDouche(false)
    setWifi(false)
    setAddress('')
    setSubmitButton(false)
  }
  
  const openForm = (e : any) => {
    e.preventDefault();
    setSubmitButton(!submitButton)
  }

  const handleValidation = async (e : any) => {
    e.preventDefault();

    // get address
    const returnedAddress = addressRef.current!.value!
    setAddress(returnedAddress)
    // errors
    const submitError = document.querySelector('.error.submit')

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
          resetValues()
          alert("Le lieu a bien ete cree !")
          
          // UPDATE THE RENDER
          const emptyArray = new Array<IPoint>()
          const newList = emptyArray.concat(list!)
          newList.push(res.data.point)
          updateList(newList)
        })
        .catch((error) => {
          return submitError!.innerHTML = error.response.data.error
        })
      }
    }
    else {
      submitError!.innerHTML = "L'adresse doit etre valide"
    }
  }
  
  return (
    <div className='add-place'>
      {(submitButton) ? (
        <>
          <h2>Ajouter un emplacement</h2>
          <form className='add-form'>
            <div className='name'>
              <h4 className='title'>Nom :</h4>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="intitule du lieu"
              />
            </div>

            <div className='email'>
              <h4 className='title'>Em@il :</h4>
              <input
                type="text"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="contact"
              />
              <br/>
            </div>

            <div className='address'>
              <h4 className='title'>Adresse :</h4>
              <Autocomplete>
              <input
                type="text"
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                placeholder="contact postal"
                ref={addressRef}
              />
              </Autocomplete>
            </div>
            

            <div className='interests'>
              <h4 className='title'>Interets :</h4>
              
              <div className='checks-container'>
                <div className='distribution'>
                  <input
                    type="checkbox"
                    id="distribution-check"
                    onChange={(e) => setDist(!dist)}
                  />
                  <label htmlFor="distribution">Distribution</label>
                </div>
              
                <div className='douche'>
                  <input
                    type="checkbox"
                    id="douche-check"
                    onChange={(e) => setDouche(!douche)}
                  />
                  <label htmlFor="douche">Douche</label>
                </div>
              
                <div className='wifi'>
                  <input
                    type="checkbox"
                    id="wifi-check"
                    onChange={(e) => setWifi(!wifi)}
                  />
                  <label htmlFor="wifi">Wifi</label>
                </div>
              </div>
            </div>

            <span className='error submit'></span>

            <div className='edit-buttons'>
              <button onClick={handleValidation}>Envoyer</button>
              <button onClick={resetValues}>Annuller</button>
            </div>
          </form>
        </>
      ) : (
        <button
          className='edit-button'
          onClick={openForm}
        >
          Ajouter un emplacement
        </button>
      )}
    </div>
  )
}
export default NewPlace