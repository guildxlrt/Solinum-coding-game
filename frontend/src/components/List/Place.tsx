import axios from 'axios';
import React, { useState } from 'react'
import { IPoint } from '../../@types/point';
import { useListContext } from '../../appContext';

export default function Place({datas} : any) {
  // API URL
  const apiPath: string = process.env.REACT_APP_API_URL!;
  // UPDATE THE LIST
  const { list, updateList } = useListContext()

  const [ clickStatus, setModifyStatus ] = useState(false)
  const [ newStatus, setNewStatus] = useState('')

  const updateStatus = async (e : any) => {
    e.preventDefault();

    console.log(newStatus)
    console.log(datas._id)
    
    // NO MODIF
    if(newStatus === "annuller") {
      setModifyStatus(false)
      setNewStatus('')
    }

    // SEND MODIF
    if((newStatus === "offline") || (newStatus === "online")) {
      // Define value of state boolean
      let stateBool : null | boolean = null
      if(newStatus === "offline") stateBool = false
      if(newStatus === "online") stateBool = true

      await axios({
        method : "patch",
        url : `${apiPath}/points/state`,
        withCredentials : false,
        data : {
          "pointId" : datas._id,
          "state" : stateBool
        }
      })
      .then(() => {
        alert("Le status a ete mit a jour !")

        // UPDATE THE RENDER
        const newList : IPoint[] = list!.map((point) => {
          if (point._id === datas._id) {
            return {
              ...point,
              status : stateBool,
              state : stateBool
            }
          }
          else return point
        }) 
        updateList(newList)

        // refresh
        setModifyStatus(false)
        setNewStatus('')
      })
      .catch((error) => {
        console.error(error)
        return { "error" : error }
      })
    }
  }

  return (
    <div className='place'>
      <span className='name'>{datas.name}</span>
      <span className='email'>{datas.email}</span>
      <span className='address'>{datas.address}</span>  
      
      <span className='distribution'>
        { (datas.interests.distribution === true) && '🥫' }
      </span> 
      <span className='douche'>
        { (datas.interests.douche === true) && '🚿' }
      </span>
      <span className='wifi'>
        { (datas.interests.wifi === true) && '🌐' }
      </span>

      {(clickStatus === false) && (
        <button
          className='icon'
          onClick={() => setModifyStatus(true)}
        >
          { (datas.status === true) && '🟢' }
          { (datas.state === false) && '🟡' }
          { (datas.state === null) && '🔵' }
        </button>
      )}
      {(clickStatus === true) && (
        <div className='updating-state'>
          <select
            id="state-selector"
            onChange={ (e) => setNewStatus(e.target.value) }
          >
            <option className='state-select' value="annuller">annuller</option>
            <option className='state-select-on' value="online">🟢</option>
            <option className='state-select-off' value="offline">🟡</option>
          </select>
          <button
            onClick={updateStatus}
          >☑️</button>
        </div>
      )}
    </div>
  )
}
