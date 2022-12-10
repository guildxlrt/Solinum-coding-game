import { Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { IPoint, IUpdatePoint } from '../../../@types/point';
import { useListContext } from '../../../appContext';
import { geocoding } from '../../../utils/googleapi';

export const Infos = ({datas} : any) => {
  const [submitButton, setSubmitButton] = useState(false)

  // API URL
  const apiPath: string = process.env.REACT_APP_API_URL!;
  // UPDATE THE LIST
  const { list, updateList } = useListContext()
  // HANDLE RENDER
  const [name, setName] = useState<string>(datas.name)
  const [dist, setDist] = useState<boolean>(datas.interests.distribution)
  const [douche, setDouche] = useState<boolean>(datas.interests.douche)
  const [wifi, setWifi] = useState<boolean>(datas.interests.wifi)
  const [address, setAddress] = useState(datas.address)
  const addressRef = useRef<HTMLInputElement>(null)
  
  function resetValues () {
    setName(datas.name)
    setDist(datas.distribution)
    setDouche(datas.douche)
    setWifi(datas.wifi)
    setAddress(datas.address)
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
    const updateError = document.querySelector('.error.update')
    // GET MAP POSITION
    const data = await geocoding(addressRef.current!.value)
    
    // VERIFICATION OF DATA CONFORMITY
    if(data) {
      if((typeof data.lat === 'number') && (typeof data.lng === 'number')) {
        const formDatas : IUpdatePoint = {
            "pointId" : datas._id,
            "name" : name,
            "position" : [data.lat, data.lng],
            "address" : returnedAddress,
            "interests" : {
                "distribution" : dist,
                "douche" : douche,
                "wifi" : wifi
            }
        }

        await axios({
          method : "put",
          url : `${apiPath}/points/update`,
          withCredentials : false,
          data : formDatas
        })
        .then(() => {
          alert("Le status a ete mit a jour !")

          delete formDatas.pointId
          // UPDATE THE RENDER
          const newList : IPoint[] = list!.map((point) => {
            if (point._id === datas._id) {
              return {
                ...point,
                ...formDatas
              }
            }
            else return point
          }) 
          updateList(newList)
          
          // refresh
          resetValues()
        })
        .catch((error) => {
          return updateError!.innerHTML = error.response.data.error
        })
      }
    }
    else {
      updateError!.innerHTML = "L'adresse doit etre valide"
    }
  }

  return (
    <div className='place-infos'>
      {(submitButton) ? (
        <>
          <form className='set-infos-form'>
            <div className='name'>
              <h4 className='title'>Nom :</h4>
              <input
                className=""
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="nom de l'etablissement"
              />
            </div>

            <div className='address'>
              <h4 className='title'>Adresse :</h4>
              <Autocomplete>
              <input
                className=""
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
                  className="distribution"
                    type="checkbox"
                    id={"distribution-check-"+datas._id}
                    onChange={(e) => setDist(!dist)}
                    defaultChecked={datas.interests.distribution && true}
                  />
                  <label htmlFor="distribution">Distribution</label>
                </div>
              
                <div className='douche'>
                  <input
                    className="douche"
                    type="checkbox"
                    id={"douche-check-"+datas._id}
                    onChange={(e) => setDouche(!douche)}
                    defaultChecked={datas.interests.douche && true}
                  />
                  <label htmlFor="douche">Douche</label>
                </div>
              
                <div className='wifi'>
                  <input
                    className="wifi"
                    type="checkbox"
                    id={"wifi-check-"+datas._id}
                    onChange={(e) => setWifi(!wifi)}
                    defaultChecked={datas.interests.wifi && true}
                  />
                  <label htmlFor="wifi">Wifi</label>
                </div>
              </div>
              
            </div>

            <span className='error update'></span>

            <div className='edit-buttons'>
              <button onClick={handleValidation}>Envoyer</button>
              <button onClick={resetValues}>Annuller</button>
            </div>
          </form>
        </>
        ) : (
        <>            
            <div className='infos'>
              {(datas.name) && (
                  <h3 className='infos-text name'>{datas.name}</h3>
              )}
              {(datas.email) && (
                  <span className='infos-text email'>{datas.email}</span>
              )} 
              {(datas.address) && (
                  <span className='infos-text address'>{datas.address}</span>
              )} 

              <div className='infos-interests'>
                {(datas.interests.distribution) && (
                    <span  className='icon distribution'>🥫</span>
                )}

                {(datas.interests.douche) && (
                    <span className='icon douche'>🚿</span>
                )}
                {(datas.interests.wifi) && (
                    <span className='icon wifi'>🌐</span>
                )}
              </div>              
            </div>
            
            <button
                className='edit-button'
                onClick={openForm}
            >Modifier</button>
        </>
      )}
    </div>
  )
}
export default Infos