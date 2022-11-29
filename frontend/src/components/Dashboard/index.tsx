import React, { useContext } from 'react'
import { PointsContext } from '../../appContext'
import { isEmpty } from '../../utils/utils'
import Place from './Place'

const Dashboard : React.FC = () => {
    const points = useContext(PointsContext)

    return (
        <>
            <ul>
                {!(isEmpty(points![0])) &&
                    points!.map((point) => {
                        return <Place datas={point}/>
                    })
                }
            </ul>
        </>
      )
}

export default Dashboard