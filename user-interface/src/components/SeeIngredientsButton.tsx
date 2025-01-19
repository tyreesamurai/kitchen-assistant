import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SeeIngredientsButton(props: { param: string }) {
  return (
    <Link href={`/recipes/${props.param.replace(" ", "-")}/ingredients`}>
      <Button className="mt-4" type="button">
        See Ingredients
      </Button>
    </Link>
  );
}
