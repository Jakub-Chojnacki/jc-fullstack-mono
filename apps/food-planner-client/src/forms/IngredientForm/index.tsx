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

import { IngredientFormSchema } from "./schema";

const IngredientForm = () => {
  const navigate = useNavigate();

  const { mutate } = apiClient.ingredients.create.useMutation({
    onError: () => {
      toast.error("There was an error while trying to save the ingredient!");
    },
    onSuccess: () => {
      toast.success("Ingredient added successfully!");
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      navigate({ to: "/app/ingredients" });
    },
  });

  const form = useForm<z.infer<typeof IngredientFormSchema>>({
    resolver: zodResolver(IngredientFormSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = (values: z.infer<typeof IngredientFormSchema>) => {
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

export default IngredientForm;
