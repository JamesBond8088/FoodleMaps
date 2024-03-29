import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"
import { useState } from "react";
 
const DistanceSlider = ({ className, distanceInput, setDistanceInput }) => {
  const distances = ["0 km"];
  for (let i = 5; i <= 20; i += 5) {
    distances.push(`${i} km`);
  }
  return (
    <div className="flex flex-col w-[40%] gap-y-2">
      Select Distance
      <div className="ml-2 mr-2">
        <Slider
          defaultValue={distanceInput}
          onValueChange={(e) => setDistanceInput(e)}
          max={20}
          step={5}
          className={cn(className)}
        />
      </div>
      <div className="flex flex-row justify-between">
        {distances.map((distance, index) => (
          <div key={index} className="text-xs w-[35.1px]">{distance}</div>
        ))}
      </div>
    </div>
  )
}

export default DistanceSlider;