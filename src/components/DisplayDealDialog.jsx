import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import { useState } from "react"
import { Image } from '@aws-amplify/ui-react';

import { generateClient } from 'aws-amplify/api';
import { getDeal } from "@/graphql/queries"
import { getUrl } from 'aws-amplify/storage';


const DisplayDealDialog = () => {

    const [name, setName] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");

    // setting up client for graphql query
    const client = generateClient();

    // fetch user picture and set image url
    const fetchPictureURL = async (dealPicName) => {
        try {
            const getUrlResult = await getUrl({
                key: dealPicName,
            });
            console.log('URL fetched, URL: ', getUrlResult.url);
            setImgURL(getUrlResult.url)
        } catch (err) {
            console.log("error on creating deal", err)
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const inputID = e.target.id.value;
        // getting the deal
        try {
            const { data } = await client.graphql({
                query: getDeal,
                variables: {
                    id: inputID
                }
            })
            console.log('data successfully retrieved:', data)
            const deal = data.getDeal;
            // setting variables
            setName(deal.name)
            setPrice(deal.price)
            setDescription(deal.description)
            fetchPictureURL(deal.photos)
        } catch (error) {
            console.log('Error on retrieving deal:', error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Display Deal</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Display a Deal</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleOnSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="title">Id of the deal</Label>
                            <Input id="id" placeholder="Id of deal" />
                        </div>
                        <p>{name}</p>
                        <Image height={'200px'} width="200px" src={imgURL} alt="hassan" objectFit="contain" />
                        <p>{price}</p>
                        <p>{description}</p>
                    </div>
                    <Button type="submit">Get the deal</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default DisplayDealDialog;