import React from 'react'
import { useListContext } from '../../appContext'
import { isEmpty } from '../../utils/utils'
import NewPlace from './NewPlace'
import Place from './Place'

export const Dashboard = () => {
    const { list } = useListContext()

    return (
        <>
            <NewPlace/>
            <div className='list-container'>
                {!(isEmpty(list![0])) &&
                    list!.map((point) => {
                        return <Place datas={point}/>
                    })
                }
            </div>
        </>
      )
}

export default Dashboard