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
                <div className='top-block'>
                    <NewPlace/>
                    <div className='guide'>
                        <div className='status'>
                            <span>En ligne : 🟢</span>
                            <span>Manque d'infos : 🟡</span>
                            <span>Non traite : 🔵</span>
                        </div>
                        {/* <div className='interests'>
                            <span>Distribution : 🥫</span>
                            <span>Douches : 🚿</span>
                            <span>Wifi : 🌐</span>
                        </div> */}
                    </div>
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