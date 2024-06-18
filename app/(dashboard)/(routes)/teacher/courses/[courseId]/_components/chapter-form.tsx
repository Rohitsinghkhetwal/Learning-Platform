"use client";

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
import { Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Chapter, Course } from "@prisma/client";
import { Input } from "@/components/ui/input";
import ChapterLists from "./chapterLists";

interface ChapterformProps {
  initialData: Course & {chapters: Chapter[]};
  courseId: string;
}

const formSchema = z.object({
    title: z.string().min(1),
  })


const ChapterForm = ({ initialData, courseId }: ChapterformProps) => {
  //Router Initialization
  const router = useRouter();

  //hooks are defined here !
  const [isUpdating, setisUpdating] = useState(false);
  const [isCreating, setisCreating] = useState(false);

  // functions are declared here
  const ToggleCreating = () => {
    setisCreating((current) => !current)
}

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/course/${courseId}/chapter`, values);
      toast.success("Course Created Successfully !");
      ToggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong !");
    }
  };
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Course Chapters
        <Button onClick={ToggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a Chapter
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4 "
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g Add Chapters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
              <Button disabled={!isValid || isSubmitting} type="submit">
                Create
              </Button>
            
          </form>
        </Form>
      )}    
      {!isCreating && (
        <div className={cn("text-sm mt-2 ",
            !initialData.chapters.length && "text-slate-400 italic")}>
                {!initialData.chapters.length && " No Chapters"}
                <ChapterLists 
                onEdit={() => {}}
                onReorder={() => {}}
                items={initialData.chapters || []}
                />
            </div>
      )}

      {!isCreating && (
        <p className="text-xs text-muted-foreground mt-4">
            Drag and drop to reorder the chapters
        </p>
      )}
    </div>
  );
};

export default ChapterForm;
