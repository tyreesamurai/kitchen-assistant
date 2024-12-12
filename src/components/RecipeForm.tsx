"use client";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1).max(200),
  cuisine: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  instructions: z.string(),
  isPublic: z.boolean().optional(),
  ingredients: z.array(z.string()).nonempty("Please at least one item"),
});

export default function RecipeForm() {
  const [users, setUsers] = useState<
    { userId: number; firstName: string; lastName: string }[]
  >([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);

  useEffect(() => {
    function fetchUsers() {
      fetch("http://localhost:3000/api/users", {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUsers(data);
        });
    }

    fetchUsers();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          if ("insertedId" in data && selectedUser) {
            const recipeId = data.insertedId;
            fetch("http://localhost:3000/api/userrecipes", {
              method: "POST",
              body: JSON.stringify({
                recipeId: recipeId,
                userId: selectedUser.toString(),
              }),
            })
              .then((response) => {
                response.json();
              })
              .then((data) => {
                console.log(data);
              });
          }
          console.log(data);
        });
    } catch (error) {
      console.error("Form submission error", error);
    }
  }
  return (
    <div className="flex-col items-center justify-center">
      <div className="flex items-center justify-center mt-20">
        <Select
          onValueChange={(value) => {
            setSelectedUser(parseInt(value));
            console.log(selectedUser);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Users</SelectLabel>
              {users.map((user) => {
                return (
                  <SelectItem key={user.userId} value={user.userId.toString()}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Recipe Name" type="text" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="cuisine"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuisine Type</FormLabel>
                    <FormControl>
                      <Input placeholder="Cuisine" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Such as &quot;Mexican,&quot; &quot;Italian,&quot;
                      &quot;Japanese&quot;
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Such as &quot;Breakfast,&quot; &quot;Appetizer,&quot;
                      &quot;Snack&quot;
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Placeholder"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can list important information about your recipe.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Placeholder"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
