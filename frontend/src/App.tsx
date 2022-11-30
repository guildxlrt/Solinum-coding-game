import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IPoint } from './@types/point';
import { ListContext } from './appContext';
import Footer from './components/Footer';
import AppRoutes from './components/Routes'

function App() {
  const [list, setList] = useState<IPoint[] | null>([])
  function updateList( newList : IPoint[]) {
    setList(newList)
}

  const apiPath: string = process.env.REACT_APP_API_URL!;

  useEffect(() => {
    (async function getUserDatas() {
      await axios({
        method : "get",
        url : `${apiPath}/points/all`,
        withCredentials : false
      })
      .then((res) => {
        setList(res.data)
      })
      .catch((error) => console.log(error)) 
    })()
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <ListContext.Provider value={{list, updateList}}>
          <AppRoutes/>
        </ListContext.Provider>
      <Footer></Footer>
      </header>
    </div>
  );
}

export default App;