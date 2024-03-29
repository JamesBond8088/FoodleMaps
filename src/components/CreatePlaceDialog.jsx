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
import { createPlace } from '@/graphql/mutations';
import { DrawingPinFilledIcon } from '@radix-ui/react-icons'
import { generateClient } from 'aws-amplify/api';
import { useState } from "react"
import { getDeal } from "@/graphql/queries";

const CreatePlaceDialog = () => {
    // setting up client for graphql query
    const client = generateClient();

    const [dialogue, setDialogue] = useState();

    const handleOnSubmit = async (e) => {
        e.preventDefault()

        const placeName = e.target.name.value
        const placeLongitude = e.target.longitude.value
        const placeLatitude = e.target.latitude.value
        const placeDealID = e.target.dealID.value
        const placeRating = e.target.rating.value
        const placeNumRating = e.target.num_rating.value

        // checking deal id exists
        try {
            const { data } = await client.graphql({
                query: getDeal,
                variables: {
                    id: placeDealID
                }
            })
            console.log(data.getDeal)
            if (data.getDeal === null) {
                alert(`invalid deal id`)
                return
            }
        } catch (error) {
            console.log('Error on retrieving deal:', error)
            alert(`get deal id error`)
            return
        }

        // adding place
        try {
            const { data } = await client.graphql({
                query: createPlace,
                variables: {
                    input: {
                        name: placeName,
                        longitude: placeLongitude,
                        latitude: placeLatitude,
                        deal: placeDealID,
                        avg_rating: placeRating,
                        num_rating: placeNumRating,
                    }
                }
            })
            console.log('place successfully added:', data)
            setDialogue("Place Successfully Created")
        } catch (error) {
            console.log('Error on adding place:', error)
            alert('Error on adding place.')
            return
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <div className="gap-1 flex items-center">
                        <DrawingPinFilledIcon />
                        Add Location
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{dialogue}</DialogTitle>
                    <DialogTitle>Add a Place</DialogTitle>
                    <DialogDescription>
                        Locate your restaurant
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleOnSubmit}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Place Name</Label>
                            <Input id="name" placeholder="name" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="longitude">longitude</Label>
                            <Input id="longitude" value="151.20919390289475" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="latitude">latitude</Label>
                            <Input id="latitude" value="-33.86981386564274" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="dealID">deal ID</Label>
                            <Input id="dealID" placeholder="dealID" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="rating">rating</Label>
                            <Input id="rating" type="number" min="1" max="5" step="1" placeholder="rating" />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="num_rating">Number of Rating</Label>
                            <Input id="num_rating" type="number" min="1" step="1" placeholder="num_rating" />
                        </div>
                    </div>
                    <br></br>
                    <Button type="submit">Submit</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePlaceDialog;