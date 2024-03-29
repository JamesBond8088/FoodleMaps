import { useEffect, useRef, useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Loading from "./Loading";
import DealPopup from "./DealPopup";
import { createRoot } from 'react-dom/client';
import { getDeal, listPlaces } from "@/graphql/queries";
import { generateClient } from 'aws-amplify/api';

// mapboxgl.accessToken = process.env.MAP_PUBLIC_TOKEN;
const MAPBOX_API_TOKEN =
  "pk.eyJ1IjoibGFpaWVyIiwiYSI6ImNsc2IyeDE2bTBhY2YyaW83bTFsZ2l1emsifQ.PRo2i5nlAnx_fbeTet9cyQ";
export default function MapView({ cuisineInput, maxPriceInput, ratingInput, distanceInput }) {
  const mapContainer = useRef();
  const map = useRef(null);
  const [coordLoaded, setCoordLoaded] = useState(false);
  const [allMarkers, setAllMarkers] = useState([]);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (map.current) {
      // This means that filters have been changed
      addMarker(map, allMarkers, setAllMarkers, cuisineInput, maxPriceInput, ratingInput, distanceInput, position);
      return;
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition(position);
        const tracker = locateUser();

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [position.coords.longitude, position.coords.latitude],
          zoom: 9,
          accessToken: MAPBOX_API_TOKEN,
        })
          .addControl(tracker)
          .once("data", async () => {
            await tracker.trigger();
            setCoordLoaded(true);
            addMarker(map, allMarkers, setAllMarkers, cuisineInput, maxPriceInput, ratingInput, distanceInput, position);
          });
      });
    }
  }, [cuisineInput, maxPriceInput, ratingInput, distanceInput]);

  return (
    <>
      <div className="h-full">
        <div
          className={`${coordLoaded ? "hidden" : "relative top-[40%] left-[46%]"
            }`}
        >
          <Loading />
        </div>
        <div className="flex flex-col w-full h-full justify-center items-center gap-y-10">
          <div
            id="map"
            ref={mapContainer}
            className={`w-full h-full rounded-2xl`}
          />
        </div>
      </div>
    </>
  );
}

// "If you're calling an Amplify-generated API, make sure to set the "authMode" in generateClient({ authMode: '...' }) to the backend authorization rule's auth provider ('apiKey', 'userPool', 'iam', 'oidc', 'lambda')"

async function getDealFromPlace(inputId) {
  const client = generateClient();

  // getting the deal
  try {
    const { data } = await client.graphql({
      query: getDeal,
      variables: {
        id: inputId
      }
    })
    // console.log('data successfully retrieved:', data)
    const deal = data.getDeal;
    // setting variables
    return deal
  } catch (error) {
    console.log('Error on retrieving deal:', error)
  }
}

async function getAllPlaces() {
  const client = generateClient();
  try {
    const result = await client.graphql({ query: listPlaces });
    const places = result.data.listPlaces.items;
    for (const place of places) {
      const dealGet = await getDealFromPlace(place.deal)
      place.deals = [dealGet]
    }
    return places
  } catch (err) {
    console.log("error on fetching deals", err)
  }
}

async function addMarker(mapObj, allMarkers, setAllMarkers, cuisineInput, maxPriceInput, ratingInput, distanceInput, position) {
  const tempMarkerList = [];
  const loadedPlaces = await getAllPlaces();
  // console.log("all loaded places", loadedPlaces)

  // Remove all markers
  allMarkers.forEach((marker) => {
    marker.remove()
  })
  document.querySelectorAll('.marker').forEach((element) => {
    element.parentNode.removeChild(element);
  })

  for (let place of loadedPlaces) {
    if (maxPriceInput !== "" && place.deals[0].price > parseInt(maxPriceInput)) {
      continue;
    }
    if (place.deals[0].rating < parseInt(ratingInput)) {
      continue;
    }
    if (position) {
      const valid = distanceInput[0] === 0 || calculateDistance(
        {
          "longitude": place.longitude,
          "latitude": place.latitude
        },
        {
          "longitude": position.coords.longitude,
          "latitude": position.coords.latitude
        },
        distanceInput[0]
      );
      if (!valid) {
        continue;
      }
    }
    const el = document.createElement("div");
    el.className = "marker";

    // Create popup
    const placeholder = document.createElement('div');
    const popupDom = createRoot(placeholder)
    popupDom.render(<DealPopup place={place} />);
    const popup = new mapboxgl.Popup({ maxWidth: 'none' })
      .setDOMContent(placeholder)

    const marker = new mapboxgl.Marker(el)
      .setLngLat([place.longitude, place.latitude])
      .setPopup(popup)
      .addTo(mapObj.current);
    tempMarkerList.push(marker);
  }
  setAllMarkers(tempMarkerList);
}

function locateUser() {
  return new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserHeading: true,
  });
}


const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
}

const calculateDistance = (location1, location2, distanceInput) => {
  if (location1.latitude && location1.longitude && location2.latitude && location2.longitude) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(location2.latitude - location1.latitude);
    const dLon = deg2rad(location2.longitude - location1.longitude);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(location1.latitude)) * Math.cos(deg2rad(location2.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c; // Distance in km
    // console.log(distanceInKm);
    return distanceInKm <= distanceInput;
  } else {
    alert('Please provide both locations');
  }
};