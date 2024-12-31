import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NutritionPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Set Nutrition</Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Nutrition</h4>
            <p className="text-sm text-muted-foreground">
              Set Nutrition for Recipe
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="calories">Calories</Label>
              <Input id="calories" type="number" className="col-span-1 h-8" />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="carbs">Carbs</Label>
              <Input id="carbs" type="number" className="col-span-1 h-8" />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="fats">Fats</Label>
              <Input id="fats" type="number" className="col-span-1 h-8" />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="protein">Protein</Label>
              <Input id="protein" type="number" className="col-span-1 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
