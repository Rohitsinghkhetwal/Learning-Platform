"use client"
import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form"
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {Input} from "@/components/ui/input"; 
import toast from "react-hot-toast";

const FormSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
})


const CreateCourse = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: ""
        }
    })

    const {isSubmitting, isValid} = form.formState;

    const onSubmit = async(values: z.infer<typeof FormSchema>) => {
       try{
        const response = await axios.post("/api/course", values);
        router.push(`/teacher/courses/${response.data.id}`);
        toast.success("Course Created !")

        
       }catch(err) {
        toast.error("Something went wrong!")
       }
    }
    return (
      <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
        <div>
          <h1 className="text-2xl">Name of the course</h1>
          <p className="text-sm text-slate-400">
            What is the name of the course
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 mt-8 "
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course Title</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        placeholder="eg. Machine Learning and Neural networks"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What will you teach in this course ?
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="flex items-center gap-x-2">
                <Link href="/">
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                    Continue
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
}
 
export default CreateCourse;