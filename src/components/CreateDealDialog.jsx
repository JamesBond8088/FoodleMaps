import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { PlusIcon } from '@radix-ui/react-icons'
import { createDeal } from '@/graphql/mutations';
import { uploadData } from 'aws-amplify/storage';

import { generateClient } from 'aws-amplify/api';
import { useState } from "react"

const CreateDealDialog = () => {

  const [dealID, setDealID] = useState("");

  // setting up client for graphql query
  const client = generateClient();

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    // getting value fields
    const dealTitle = e.target.title.value
    const dealPicFile = e.target.picture.files[0]
    const dealPicName = dealPicFile.name
    const dealPrice = e.target.price.value
    const dealDescription = e.target.description.value
    const dealRating = e.target.rating.value
    const dealNumRating = e.target.num_rating.value

    alert(`the uploading may take a minute, pleace wait for the deal id.`)
    // uploading image
    try {
      const result = await uploadData({
        key: dealPicName,
        data: dealPicFile,
        options: {
          accessLevel: 'guest', // defaults to `guest` but can be 'private' | 'protected' | 'guest'
        }
      }).result;
      console.log('Succeeded in uploading image: ', result);
    } catch (error) {
      console.log('Error on uploading image : ', error);
      return
    }

    // uploading deal
    try {
      const { data } = await client.graphql({
        query: createDeal,
        variables: {
          input: {
            name: dealTitle,
            photos: dealPicName,
            price: dealPrice,
            description: dealDescription,
            rating: dealRating,
            num_rating: dealNumRating,
          }
        }
      })
      console.log('data successfully transferred:', data.createDeal)
      const dealID = data.createDeal.id
      console.log(`Your deal id is: ${dealID}`)
      setDealID(`Your deal id is: ${dealID}`)
    } catch (error) {
      console.log('Error on uploading deal:', error)
      alert("Error on uploading deal")
      return
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <div className="gap-1 flex items-center">
            <PlusIcon />
            Create Deal
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dealID}</DialogTitle>
          <DialogTitle>Create a Deal</DialogTitle>
          <DialogDescription>
            Share this deal to other foodies!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleOnSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Title of deal" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="picture">Picture</Label>
              <Input id="picture" type="file" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input id="price" type="number" step="0.05" placeholder="Price of deal" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Description" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" type="number" min="1" max="5" step="1" placeholder="rating" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="num_rating">Number of Ratings</Label>
              <Input id="num_rating" type="number" min="1" step="1" placeholder="num_rating" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Type of Deal</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="cheap">Cheap Eats</SelectItem>
                  <SelectItem value="discount">Discount</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <br></br>
          <Button type="submit">Submit</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDealDialog;