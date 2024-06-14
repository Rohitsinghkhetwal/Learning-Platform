import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async(req: Request, {params}: {params: {courseId: string}}) => {
    try{
        const {userId} = auth();
        const {url} = await req.json();
        console.log("this is from attachment api", userId)
        console.log("this is from attachment url", url);

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401});
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId                         
            }
        });

        if(!courseOwner){
            return new NextResponse("Unothorized course owner...", {status: 401});
        }

        const createAttachment = await db.attachment.create({
            data: {
                url,
                name: url.split('/').pop(),
                courseId: params.courseId,
            }
        })

        console.log("Hey this is the attachment file from attachment routes.ts", createAttachment);

        return NextResponse.json(createAttachment, {status: 200});


    }catch(err){
        console.log("ERROR - CourseId attachments", err);
        return new NextResponse("internal error", {status:  500 })
    }

}