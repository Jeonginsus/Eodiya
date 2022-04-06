import React, { useEffect } from "react";
import Map from "../components/Map";
import { useSelector } from "react-redux";

// import useGeolocation from "../actions/useGeolocation";
import useSetMarker from "../actions/useSetMarker";
import useCafeMarker from "../actions/useCafeMarker";



const EodiyaMap = () => {

    // useSelector는 reducer에 정의되어 있는 것을 가져온다.
    // const map = useSelector(state => state.setMap.map);
    const { map, mapLevel, guMarker, dongMarker, guOverlay} = useSelector(state => ({
        map : state.setMap.eodiyaMap.map,
        mapLevel : state.setMap.eodiyaMap.mapLevel,
        guMarker : state.setMap.eodiyaMap.guMarker,
        dongMarker : state.setMap.eodiyaMap.dongMarker,
        guOverlay : state.setMap.eodiyaMap.guOverlay,
    }))

    const {setMarker} = useSetMarker();
    // const { getGeo } = useGeolocation();
       
    useEffect(() => {
        console.log(mapLevel);
        if(mapLevel >= 9) {
            guMarker.map(value => {
                value.setMap(null);
            })
            dongMarker.map(value => {
                value.setMap(null);
            })
            guOverlay.map(value => {
                value.setMap(null);
            })
        }
        else if(mapLevel == 8 || mapLevel == 7) {
            setMarker();
        }
        else if(mapLevel <= 6) {
            console.log(guMarker);
            guMarker.map(value => {
                value.setMap(null);
            })
            guOverlay.map(value => {
                value.setMap(null);
            })
        }
        // getGeo();
      }, [map, mapLevel]);

    return (
        <div>
            <Map></Map>
        </div>
    )
}

export default EodiyaMap;