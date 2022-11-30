import React from 'react'

export default function Place({datas} : any) {

  return (
    <div>
      <pre>{datas.name}; {datas.email}; {datas.address}; {datas.interest}; {String(datas.state)}; {String(datas.status)}</pre>
    </div>
  )
}
