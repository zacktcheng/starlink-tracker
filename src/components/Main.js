import React, { useState } from "react";
import ObserverInfo from "./ObserverInfo";
import { NODE_JS_FOR_N2YO_URL } from "../constants";
import SatelliteList from "./SatelliteList";
import WorldMap from "./WorldMap";

const Main = () => {
  const [loading, setLoading] = useState(false);
  const [satList, setSatList] = useState([]);
  const [trakcing, setTracking] = useState(false);
  const [observerInfo, setObserverInfo] = useState({});

  const findSatellitesOnClick = (nextObserverInfo) => {
    setObserverInfo(nextObserverInfo);
    const { longitude, latitude, altitude, radius, category } = nextObserverInfo;

    setLoading(true);
    fetch(`${NODE_JS_FOR_N2YO_URL}/n2yo?api=above&lat=${latitude}&lon=${longitude}&alt=${altitude}&rad=${radius}&cat=${category}&apikey=${process.env.REACT_APP_NY20_API_KEY}`)
      .then(response => response.json())
      .then(data => {
        setSatList(data.above.map((satellite) => {
          return {
            ...satellite,
            selected: false,
          }
        }));
        setLoading(false);
        console.log(data);
      })
      .catch(() => {
        setLoading(false);
        console.log('catch failure');
      }
    );
  }

  return (
    <>
      <ObserverInfo 
        findSatellitesOnClick={findSatellitesOnClick}
        loading={loading}
        disabled={trakcing}
      />
      <SatelliteList 
        satList={satList}
        updateSatelliteList={setSatList}
        loading={loading}
        disabled={trakcing}
      />
      <WorldMap 
        selectedSatellites={satList.filter(sat => sat.selected)}
        onTracking={setTracking}
        disabled={trakcing}
        observerInfo={observerInfo}
      />
    </>
  )
}

export default Main;