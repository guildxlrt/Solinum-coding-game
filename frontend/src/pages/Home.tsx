import React from 'react'
import { useLoadScript } from "@react-google-maps/api"
import Map from '../components/Map'

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCrqoQpFXVqNjVy1EvXN7q2txlI3KfWm58",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}