import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Dashboard from "../components/Dashboard";
import Map from "../components/Map";

export const apiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;

export const Main = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : apiKey,
    libraries : ["places"]
  });

  // chargement page
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="main">
      <Dashboard />
      <Map/>
    </div>
  );
}

export default Main