import StaticStarRating from "./StaticStarRating";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

import { generateClient } from 'aws-amplify/api';
import { getDeal } from "@/graphql/queries"
import { getUrl } from 'aws-amplify/storage';
import { useEffect, useState } from "react";

const DealPopup = (props) => {
  // setting up client for graphql query
  const client = generateClient();

  const [name, setName] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");


  // fetch user picture and set image url
  const fetchPictureURL = async (dealPicName) => {
    try {
      const getUrlResult = await getUrl({
        key: dealPicName,
      });
      // console.log("url get", getUrlResult.url)
      setImgURL(getUrlResult.url)
    } catch (err) {
      console.log("error on creating deal", err)
    }
  }

  const setDealInfo = async () => {
    const inputID = props.place.deal;
    // getting the deal
    try {
      const { data } = await client.graphql({
        query: getDeal,
        variables: {
          id: inputID
        }
      })
      const deal = data.getDeal;
      // setting variables
      setName(deal.name)
      setPrice(deal.price)
      setDescription(deal.description)
      await fetchPictureURL(deal.photos)
      setRating(deal.rating)
    } catch (error) {
      console.log('Error on retrieving deal:', error)
      alert(`error on retrieving deal for id: ${inputID}`)
    }
  }

  useEffect(() => {
    setDealInfo()
  }, [])

  const place = props.place;

  return (
    <div className="flex">
      <div>
        <img alt={`place-${place.id}-deal-${imgURL}`} src={imgURL} className="object-cover rounded-l-[15px] w-[100px] h-[100px]" />
      </div>
      <div className="flex flex-col p-2 justify-between">
        <div>
          <div className="text-xl font-normal leading-none tracking-tight mb-1">
            {place.name}
          </div>
          <div className="text-sm text-muted-foreground">
            {name}
          </div>
        </div>

        <StaticStarRating rating={rating} />
      </div>
    </div>
  )
}

export default DealPopup;