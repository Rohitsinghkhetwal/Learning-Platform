"use client"

import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { File, Loader2, PlusCircle, X } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Attachment, Course } from "@prisma/client";
import { FileUpload } from "@/components/file-uploader";

interface AttachmentformProps {
  initialData: Course & { attachments: Attachment[]};
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentformProps) => {
  //Router Initialization
  const router = useRouter();

  //hooks are defined here !
  const [isEditing, setisEditing] = useState(false);
  const [deletingID, setDeletingID] = useState<string | null>(null);

  // functions are declared here
  const ToggleEdit = () => setisEditing((current) => !current);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
       await axios.post(`/api/course/${courseId}/attachments`, values);
      toast.success("Course Updated successfully !");
      ToggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong !");
    }
  };

  const handleDelete = async(id: string) => {
    try{
      setDeletingID(id);
      await axios.delete(`/api/course/${courseId}/attachments/${id}`);
      toast.success("Attachment deleted successfully !");
      router.refresh();

    }catch{
      toast.error("Attachment not Deleted !")
    }finally {
      setDeletingID(null);
    }

  }
  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Course Attachment
        <Button onClick={ToggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an Attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-slate-500 mt-2 text-sm">
              No attachment found...
            </p>
          )}

          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
                {initialData.attachments.map((attachment) => (
                    <div key={attachment.id}
                    className="flex items-center p-3 w-full bg-blue-200 border border-blue-500 rounded-md"
                    > 
                    <File className="h-4 w-4 mr-2 flex-shrink-0"/>
                    <p className="text-xs line-clamp-1">{attachment.name}</p>
                    {deletingID === attachment.id && (
                      <div className="ml-6"> 
                        <Loader2 className="h-4 w-4 animate-spin"/>
                      </div>
                    )}
                    {deletingID != attachment.id && (
                      <button className="ml-6 hover:opacity-75 transition"
                      onClick={() => handleDelete(attachment.id)}
                      >
                        <X className="h-4 w-4"/>
                      </button>
                    )}
                        
                    </div>
                ))}

            </div>
          )}
        </>
      )}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Please Add the attachments here...
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
