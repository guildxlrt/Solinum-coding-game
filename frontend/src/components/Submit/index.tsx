import React, { useState } from 'react'
import { IFormDatas } from '../../@types/point';
import { reverseGeocode } from '../../utils/googleapi';

export default function Submit() {
  // handle render
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const [dist, setDist] = useState<boolean>(false)
  const [douche, setDouche] = useState<boolean>(false)
  const [wifi, setWifi] = useState<boolean>(false)

  const handleValidation = async (e : any) => {
    e.preventDefault();

    // TESTING //
    const formDatas : IFormDatas = {
      "name" : name,
      "email" : email,
      "position" : [ 48.8941328, 2.1354736 ],
      "address" : "2 Av. des Pages, 78110 Le Vésinet, France",
      "interests" : {
        "distribution" : dist,
        "douche" : douche,
        "wifi" : wifi
      }
    }

    const lat = formDatas.position[0];
    const lng = formDatas.position[1];

    (async function test() {
      const data = await reverseGeocode(lat, lng)
      console.log(formDatas)
    })()
  }


  return (
    <div>
      <h3>SEARCH</h3>
      <form>
        <h4 className='name'>Nom :</h4>
        <input
          className='name input'
          type="text"
          id="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <br/>

        <h4 className='name'>em@il :</h4>
        <input
          className='email input'
          type="text"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br/>

        <h4 className='name'>Adresse :</h4>
        <input
          className='address input'
          type="text"
          id="address"
          value={"48.8941328, 2.1354736"}
        />
        <br/>

        <h4 className='name'>Interets :</h4>
        <input
          className='distribution input'
          type="checkbox"
          id="distribution"
          onChange={(e) => setDist(!dist)}
        />
        <label htmlFor="distribution">Distribution</label>
        <br/>
        <input
          className='douche input'
          type="checkbox"
          id="douche"
          onChange={(e) => setDouche(!douche)}
        />
        <label htmlFor="douche">Douche</label>
        <br/>
        <input
          className='wifi input'
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
