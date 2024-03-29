import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { FilterIcon } from "lucide-react"
import { useState } from "react"

const FilterPopup = ({
    cuisineInput,
    setCuisineInput,
    maxPriceInput,
    setMaxPriceInput,
    ratingInput,
    setRatingInput 
  }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button><FilterIcon size={15} strokeWidth={1}/></Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm text-muted-foreground">
              What are you looking for?
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="cuisine">Dietary Requirements</Label>
              <Input
                id="cuisine"
                placeholder="Allergies, Preferences, etc."
                value={cuisineInput}
                onChange={(e) => setCuisineInput(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxPrice">Max. Price ($)</Label>
              <Input
                id="maxPrice"
                placeholder="Choose a price range"
                className="col-span-2 h-8"
                value={maxPriceInput}
                onChange={(e) => setMaxPriceInput(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Rating</Label>
              <Select
                value={ratingInput}
                onValueChange={(e) => setRatingInput(e)}
              >
                <SelectTrigger className="col-span-2">
                  <SelectValue placeholder="Choose a rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="w-full">
                    <SelectItem value="0">All deals</SelectItem>
                    <SelectItem value="1">1 star and above</SelectItem>
                    <SelectItem value="2">2 stars and above</SelectItem>
                    <SelectItem value="3">3 stars and above</SelectItem>
                    <SelectItem value="4">4 stars and above</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default FilterPopup;