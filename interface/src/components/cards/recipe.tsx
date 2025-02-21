import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Recipe } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

export default function RecipeCard(props: { recipe: Recipe }) {
  return (
    <Card>
      <CardContent>
        <Image src={props.recipe.image_url} alt={props.recipe.name} />
      </CardContent>
      <CardHeader>
        <CardTitle>{props.recipe.name}</CardTitle>
        <Checkbox checked={false} onCheckedChange={() => {}} />
      </CardHeader>
      <CardContent>
        <CardDescription>{props.recipe.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
