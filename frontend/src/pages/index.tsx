import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from '../components/Map';
import Dashboard from "../components/Dashboard";
import Submit from "../components/Submit";

export const apiKey: string = process.env.REACT_APP_GOOGLE_MAPS_API_KEY!;

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey : apiKey,
    libraries : ["places"]
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Submit/>
      <Dashboard />
      <Map />
    </>
  );
}