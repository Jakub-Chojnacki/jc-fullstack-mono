import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@jcmono/ui";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import ImageUpload from "@/components/ImageUpload";
import useCreateIngredient from "@/queries/useCreateIngredient";
import useUpdateIngredient from "@/queries/useUpdateIngredient";
import useUploadFile from "@/queries/useUploadFile";

import { IngredientFormSchema } from "./schema";

import type { TIngredientFormProps } from "./types";

function IngredientForm({ initialData }: TIngredientFormProps) {
  const createIngredient = useCreateIngredient();
  const updateIngredient = useUpdateIngredient();
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const [isExistingImageRemoved, setIsExistingImageRemoved] = useState(false);

  const form = useForm<z.infer<typeof IngredientFormSchema>>({
    resolver: zodResolver(IngredientFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      isGlobal: initialData?.isGlobal || false,
    },
  });

  const getButtonText = (): string => {
    if (isUploading)
      return "Uploading image...";
    if (form.formState.isSubmitting)
      return "Saving...";
    return initialData ? "Update ingredient" : "Add ingredient";
  };

  const onSubmit = async (values: z.infer<typeof IngredientFormSchema>) => {
    try {
      let imageUrl: string | undefined = initialData?.imageUrl || undefined;

      // If existing image was removed, clear the imageUrl
      if (isExistingImageRemoved) {
        imageUrl = undefined;
      }

      if (values.file instanceof File) {
        const formData = new FormData();
        formData.append("file", values.file);

        const result = await uploadFile({
          body: formData,
        });

        imageUrl = result.body;
      }

      const payload = {
        ...values,
        imageUrl,
      };

      if (initialData) {
        updateIngredient.mutate({
          body: payload,
          params: { id: initialData.id },
        });
      }
      else {
        createIngredient.mutate({ body: payload });
      }
    }
    catch (error) {
      // errors are handled in the mutation
      return error;
    }
  };

  const isDisabled = form.formState.isSubmitting || isUploading;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ingredient Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isDisabled}
                    className="max-w-sm mx-auto"
                    existingImageUrl={initialData?.imageUrl}
                    onRemoveExisting={() => setIsExistingImageRemoved(true)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name="isGlobal"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormLabel>Should the ingredient be public?</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isDisabled}
          >
            {getButtonText()}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default IngredientForm;
