import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import apiClient from "@/api-client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/main";

import { RecipeFormSchema } from "./schema";

const RecipeForm = () => {
  const navigate = useNavigate();

  const { mutate } = apiClient.recipes.create.useMutation({
    onError: () => {
      toast.error("There was an error while trying to save the recipe!");
    },
    onSuccess: () => {
      toast.success("Ingredient added successfully!");
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigate({ to: "/app/recipes" });
    },
  });

  const form = useForm<z.infer<typeof RecipeFormSchema>>({
    resolver: zodResolver(RecipeFormSchema),
    defaultValues: { name: "", isGlobal: false, description: "" },
  });

  const onSubmit = (values: z.infer<typeof RecipeFormSchema>) => {
    mutate({ body: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RecipeForm;
