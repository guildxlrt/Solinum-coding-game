import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IPoint } from './@types/point';
import { PointsContext } from './appContext';
import Footer from './components/Footer';
import AppRoutes from './components/Routes'

function App() {
  const [locations, setLocations] = useState<IPoint[]>([])

  const apiPath: string = process.env.REACT_APP_API_URL!;

  useEffect(() => {
    (async function getUserDatas() {
      await axios({
        method : "get",
        url : `${apiPath}/points/all`,
        withCredentials : false
      })
      .then((res) => {
        setLocations(res.data)
      })
      .catch((error) => console.log(error)) 
    })()

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <PointsContext.Provider value={locations}>
          <AppRoutes/>
        </PointsContext.Provider>
      <Footer></Footer>
      </header>
    </div>
  );
}

export default App;
