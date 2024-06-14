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
import { Input } from "@/components/ui/input";
import { Course } from "@prisma/client";
import { formatPrice } from "@/lib/format";

interface PriceformProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
 price: z.coerce.number(),
});

const PriceForm = ({ initialData, courseId }: PriceformProps) => {
  //Router Initialization
  const router = useRouter();

  //hooks are defined here !
  const [isEditing, setisEditing] = useState(false);

  // functions are declared here
  const ToggleEdit = () => setisEditing((current) => !current);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData?.price || undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.patch(`/api/course/${courseId}`, values);
      toast.success("Course price Updated successfully !");
      ToggleEdit();
      router.refresh();
      console.log(" $[Data from Edited course", result);
    } catch {
      toast.error("Something went wrong !");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Course Price
        <Button onClick={ToggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2",
            !initialData.price && "text-slate-500 italic"
          )}
        >
         {initialData?.price ? formatPrice(initialData.price) : " No Price"}
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      disabled={isSubmitting}
                      placeholder="Price of a course... "
                      {...field}
                    />
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

export default PriceForm;
