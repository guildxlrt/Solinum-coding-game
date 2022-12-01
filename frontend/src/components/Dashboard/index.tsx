import React from 'react'
import { useListContext } from '../../appContext'
import { isEmpty } from '../../utils/utils'
import NewPlace from './NewPlace'
import Place from './Place'

export const Dashboard = () => {
    const { list } = useListContext()

    return (
        <>
            <div className='dashboard'>
                <NewPlace/>
                <div className='guide'>
                    <span>En ligne : 🟢</span>
                    <span>Manque d'infos : 🟡</span>
                    <span>Non traite : 🔵</span>
                </div>
                <div className='places-list'>
                    {!(isEmpty(list![0])) &&
                        list!.map((point) => {
                            return <Place datas={point}/>
                        })
                    }
                </div>
                
            </div>
        </>
      )
}

export default Dashboard