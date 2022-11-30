import React from 'react'
import { useListContext } from '../../appContext'
import { isEmpty } from '../../utils/utils'
import Place from './Place'

const List : React.FC = () => {
    const { list } = useListContext()

    return (
        <>
            <div className='places-container'>
                {!(isEmpty(list![0])) &&
                    list!.map((point) => {
                        return <Place datas={point}/>
                    })
                }
            </div>
        </>
      )
}

export default List