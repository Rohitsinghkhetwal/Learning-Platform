"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Course } from "@prisma/client";
import { Combobox } from "./combobox";

interface CategoryformProps {
  initialData: Course;
  courseId: string;
  options: { label: string; value: string }[];
  
}

const formSchema = z.object({
  categoryId: z.string().min(1),
});

const CategoryForm = ({
  initialData,
  courseId,
  options,
}: CategoryformProps) => {
  //Router Initialization
  const router = useRouter();

  //hooks are defined here !
  const [isEditing, setisEditing] = useState(false);

  // functions are declared here
  const ToggleEdit = () => setisEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: initialData?.categoryId || "",
    },
  });
 
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.patch(`/api/course/${courseId}`, values);
      toast.success("Course Category updated successfully !");
      ToggleEdit();
      router.refresh();
      console.log(" $[Data from Edited course", result);
    } catch {
      toast.error("Something went wrong !");
    }
  };

  // why we create the selectedOption variable because when we fetch the data of course title, course description , images , it comes whole object of data so it includes the categoryId also.
  //option values are all course label=name, value=id we have joined the courses collection to category collection thats why we have to create the selectedOption variable.
  // initialData.categoryId = "bdf27dc8-86f9-4119-821e-c83d96dd0125";
  
  const selectedOption = options.find((option) => option.value === initialData.categoryId);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Course category
        <Button onClick={ToggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.categoryId && "text-slate-500 italic"
          )}
        >
          {selectedOption?.label || "No Category"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={...options} {...field}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default CategoryForm;
