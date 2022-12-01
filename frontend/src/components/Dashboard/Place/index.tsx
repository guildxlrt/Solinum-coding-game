import React from 'react'
import Infos from './Infos';
import State from './State';

export default function Place({datas} : any) {
  return (
    <div className='place'>
      <State datas={datas}/>
      <Infos datas={datas}/>     
    </div>
  )
}
