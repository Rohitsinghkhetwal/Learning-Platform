"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/components/file-uploader";

interface ImageformProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

const ImageForm = ({ initialData, courseId }: ImageformProps) => {
  //Router Initialization
  const router = useRouter();

  //hooks are defined here !
  const [isEditing, setisEditing] = useState(false);

  // functions are declared here
  const ToggleEdit = () => setisEditing((current) => !current);
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const result = await axios.patch(`/api/course/${courseId}`, values);
      toast.success("Course Image Updated successfully !");
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
        Course Image
        <Button onClick={ToggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <> 
              <Pencil className="p-4 w-4 mr-2" />
              Edit Image
              </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
            <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
                <ImageIcon className="h-10 w-10 text-slate-300"/>
            </div>
        ): (
            <div className="relative aspect-video mt-2">
                <Image
                alt="image"
                fill
                src={initialData.imageUrl}
                className="object-cover rounded-md"
                />
                
            </div>
        )
      )}

      {isEditing && (
        <div>
            <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
                if(url){
                    onSubmit({imageUrl: url})
                }
            }}
            />
            <div className="text-xs text-muted-foreground mt-4">
                Recommanded aspect ratio is 16:9

            </div>

        </div>
      )}
      
    </div>
  );
};

export default ImageForm;
