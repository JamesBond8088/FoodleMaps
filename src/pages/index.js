import React, { useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { Inter } from "next/font/google";
import MapView from "@/components/MapView";
import SearchFilter from '@/components/SearchFilter';
import DistanceSlider from '@/components/DistanceSlider';
import { Button } from '@/components/ui/button';
import { SearchIcon } from 'lucide-react';
import FilterPopup from '@/components/FilterPopop';

import { useEffect } from "react";
import { generateClient } from 'aws-amplify/api';
import { listDeals } from '@/graphql/queries';

import CreateDealDialog from '@/components/CreateDealDialog';
import CreatePlaceDialog from '@/components/CreatePlaceDialog';

const inter = Inter({ subsets: ["latin"] });
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_PUBLIC_TOKEN;

export default function Home() {

  // setting up client for graphql query
  const client = generateClient();

  // useEffect(() => {
  //   fetchDeals()
  // }, [])

  // // fetch all user deals
  // const fetchDeals = async () => {
  //   try {
  //     const result = await client.graphql({ query: listDeals });
  //     console.log("Deals available:", result.data.listDeals.items);
  //   } catch (err) {
  //     console.log("error on fetching deals", err)
  //   }
  // }

  const [cuisineInput, setCuisineInput] = useState("");
  const [maxPriceInput, setMaxPriceInput] = useState("");
  const [ratingInput, setRatingInput] = useState("0");
  const [distanceInput, setDistanceInput] = useState([0]);

  return (
    <main
      className={`min-h-screen overflow-hidden ${inter.className}`}
    >
      <div className='flex flex-col h-full m-10 mb-0'>
        <div id="header" className="flex flex-row w-full h-[18vh] justify-between">
          <div id="logo-section" className='flex flex-row'>
            <div>
              <img src="/foodle_maps_icon.png" alt="Company Logo" style={{ marginTop: -16, marginRight: 10, width: '120px' }} />
            </div>
            <div style={{ fontWeight: 90000, fontSize: 50 }}>
              FoodleMaps
            </div>
          </div>
          <div id="search-and-filter" className='w-[45%] flex flex-col gap-y-5'>
            <div id="search-filter-section" className='flex flex-row gap-x-2 justify-end'>
              <div className='flex flex-row w-[45%]'>
                <SearchFilter />
                <Button><SearchIcon size={15} strokeWidth={1} /></Button>
              </div>
              <FilterPopup
                cuisineInput={cuisineInput}
                setCuisineInput={setCuisineInput}
                maxPriceInput={maxPriceInput}
                setMaxPriceInput={setMaxPriceInput}
                ratingInput={ratingInput}
                setRatingInput={setRatingInput}
              />
            </div>
            <div className='flex justify-end'>
              <DistanceSlider distanceInput={distanceInput} setDistanceInput={setDistanceInput} />
            </div>
          </div>
        </div>
        <div id="map-section" className='w-full h-[74vh] rounded-2xl'>
          <MapView cuisineInput={cuisineInput} maxPriceInput={maxPriceInput} ratingInput={ratingInput} distanceInput={distanceInput} />
        </div>
        <div className='fixed bottom-14 right-14 flex gap-2'>
          <CreateDealDialog />
          <CreatePlaceDialog />
        </div>
      </div>
    </main>
  );
}
