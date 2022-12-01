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
                {!(isEmpty(list![0])) &&
                    list!.map((point) => {
                        return <div className='places-list'>
                            <Place datas={point}/>
                        </div>
                    })
                }
            </div>
        </>
      )
}

export default Dashboard