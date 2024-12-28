import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().nonempty(),
  cookTime: z.coerce.number().int().nullable(),
  category: z.string().nullable(),
  cuisine: z.string().nullable(),
  instructions: z.string().nullable(),
  description: z.string().nullable(),
  nutrition: z
    .object({
      calories: z.coerce.number(),
      fats: z.coerce.number(),
      carbs: z.coerce.number(),
      protein: z.coerce.number(),
    })
    .nullable(),
  isPublic: z.coerce.boolean().optional(),
  imageUrl: z.string().nullable(),
});

export default async function RecipeForm() {
  <Form></Form>;
}
