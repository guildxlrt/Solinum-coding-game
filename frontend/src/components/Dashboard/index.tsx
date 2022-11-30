import React from 'react'
import { useListContext } from '../../appContext'
import { isEmpty } from '../../utils/utils'
import Place from './Place'

const Dashboard : React.FC = () => {
    const { list } = useListContext()

    return (
        <>
            <ul>
                {!(isEmpty(list![0])) &&
                    list!.map((point) => {
                        return <Place datas={point}/>
                    })
                }
            </ul>
        </>
      )
}

export default Dashboard