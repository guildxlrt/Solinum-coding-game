import axios from 'axios';
import React, { useState } from 'react'
import { IPoint } from '../../../@types/point';
import { useListContext } from '../../../appContext';

export default function State({datas} : any) {
  // API URL
  const apiPath: string = process.env.REACT_APP_API_URL!;
  // UPDATE THE LIST
  const { list, updateList } = useListContext()

  // Button de mise a jour
  const [ clickStatus, setModifyStatus ] = useState(false)
  const [ newStatus, setNewStatus] = useState('')

  const updateStatus = async (e : any) => {
    e.preventDefault();
    
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
    <>
      {(clickStatus === true) ? (
          <div className='updating-state'>
            <select
              id={"state-selector-"+datas._id}
              onChange={ (e) => setNewStatus(e.target.value) }
            >
              <option className='annul' value="annuller">annuller</option>
              <option className='online' value="online">🟢</option>
              <option className='offline' value="offline">🟡</option>
            </select>
            <button
              onClick={updateStatus}
            >☑️</button>
          </div>
        ): (
        <button
          className='status-icon'
          onClick={() => setModifyStatus(true)}
        >
          { (datas.status === true) && <span>🟢</span> }
          { (datas.state === false) && <span>🟡</span> }
          { (datas.state === null) && <span>🔵</span> }
        </button>
      )}
    </>
  )
}
