import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Dashboard from "../components/Dashboard";

export const apiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;

export const Home = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : apiKey,
    libraries : ["places"]
  });

  // chargement page
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <Dashboard />
    </>
  );
}

export default Home