import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@jcmono/ui";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import useCreateIngredient from "@/queries/useCreateIngredient";

import { IngredientFormSchema } from "./schema";

function IngredientForm() {
  const { mutate } = useCreateIngredient();

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
}

export default IngredientForm;
