import React, { useRef, useState } from "react";
import { Geographies, Geography, Graticule, Sphere, ComposableMap, Marker } from "react-simple-maps";
import { Button, InputNumber, Progress } from "antd";
import { NODE_JS_FOR_N2YO_URL } from "../constants";

const progressStatus = {
  Idle: 'Idle',
  Tracking: 'Tracking...',
  Completed: 'Completed'
}

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const WorldMap = ({
  selectedSatellites,
  disabled,
  onTracking,
  observerInfo
}) => {
  const [duration, setDuration] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [progressText, setProgressText] = useState(progressStatus.Idle);
  const timerIdContainer = useRef(undefined);
  const [markersInfo, setMarkersInfo] = useState([]);
  const [currentTimestamp, setCurrentTimestamp] = useState('');

  const abortOnClick = () => {
    if (timerIdContainer.current) {
      clearInterval(timerIdContainer.current);
      setProgressPercentage(0);
      setProgressText(progressStatus.Idle);
      onTracking(false);
      timerIdContainer.current = undefined;
    }
  }

  const fetchPositions = () => {
    const { longitude, latitude, altitude } = observerInfo;

    return selectedSatellites.map((sat) => {
      const id = sat.satid;
      return fetch(`${NODE_JS_FOR_N2YO_URL}/n2yo?api=positions&id=${id}&lat=${latitude}&lon=${longitude}&alt=${altitude}&dur=${60 * duration}&apikey=${process.env.REACT_APP_NY20_API_KEY}`)
        .then(response => response.json());
    })
  }

  const updateMarker = (data, index) => {
    setMarkersInfo(data.map((sat) => {
      return {
        lon: sat.positions[index].satlongitude,
        lat: sat.positions[index].satlatitude,
        name: sat.info.satname,
      };
    }))
  }

  const startTracking = (data) => {
    let index = 59;
    let end = data[0].positions.length - 1;
    
    onTracking(true);
    setCurrentTimestamp(new Date(data[0].positions[index].timestamp * 1000).toString());
    setProgressPercentage((index / end) * 100);
    updateMarker(data, index);
    timerIdContainer.current = setInterval(() => {
      index += 60;
      setProgressPercentage((index / end) * 100);

      if (index >= end) {
        setProgressText(progressStatus.Completed);
        onTracking(false);
        clearInterval(timerIdContainer.current);
        timerIdContainer.current = undefined;
        return;
      }

      updateMarker(data, index);
      setCurrentTimestamp(new Date(data[0].positions[index].timestamp * 1000).toString());

    }, 1000);
  }

  const trackOnClick = () => {
    setProgressText(progressStatus.Tracking);
    setProgressPercentage(0);

    Promise.all(fetchPositions()).then((data) => {
      startTracking(data);
    }).catch(() => { /*TO DO: add some fallback UI handler here*/ });
  }

  return (
    <section>
      <div className="trackInfo">
        <Button 
          type="primary"
          onClick={trackOnClick}
          disabled={selectedSatellites.length === 0 || disabled}
          shape="round"
        >
          Track selected satellites
        </Button>
        <span className="track-text">for</span>
        <InputNumber 
          min={1}
          max={60}
          defaultValue={1}
          onChange={(value) => setDuration(value)}
          disabled={disabled}
          size="small"
        />
        <span className="track-text">minutes</span>
        <Progress 
          style={{ width: "50%", marginRight: 10 }}
          percent={progressPercentage} 
          format={() => progressText}
          strokeColor={{
            '0%': '#4da8da',
            '100%': '#4da8da'
          }} 
        />
        <br/>
        {disabled &&
          <Button 
            type="primary"
            onClick={abortOnClick}
            shape="round"
            style={{ margin: "10px 0"}}
          >
            Abort
          </Button>
        }
      </div>
      <p className="time-stamp">{currentTimestamp}</p>
      <ComposableMap 
        projectionConfig={{
          scale: 130,
          rotation: [-11, 0, 0],
        }}
        width={800}
        height={400}
        style={{ width: "100%", height: "auto" }} 
      >
        <Graticule stroke="#376F91" />
        <Sphere stroke="#376F91" />
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#76BDE3"
                stroke="#4DA8DA"
                strokeWidth={0.25}
              />
            ))
          }
        </Geographies>
        {
          markersInfo.map((mark) => 
            <Marker coordinates={[mark.lon, mark.lat]}>
              <rect x="-10" y="-.75" width="20" height="1.5" fill="#eefbfb"/>
              <rect x="-.75" y="-10" width="1.5" height="20" fill="#eefbfb"/>
              <circle r="3" fill="#eefbfb"/>
              <circle r="6" stroke-width="1.5" fill="transparent" stroke="#eefbfb"/>
              <text x="15" y="3" fill="#eefbfb" style={{ fontSize: "0.5rem", fontWeight: "bold", letterSpacing: "0.1rem"}}>{mark.name}</text>
            </Marker>
          )
        }
      </ComposableMap>
    </section>
  )
}

export default WorldMap;