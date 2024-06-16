import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import {NextResponse } from "next/server"

export const DELETE = async(req: Request, {params}:{params: {courseId: string, attachmentId: string}}) => {
    try{
        const {userId} = auth();
        
        if(!userId){
            return new NextResponse("Unauthorized", {status: 500});
        }
        const CheckUser = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })
        if(!CheckUser){
            return new NextResponse("User not found !", {status: 401});
        }

        const deletingAttachment = await db.attachment.delete({
            where: {
                courseId: params.courseId,
                id: params.attachmentId
            }
        })

        return NextResponse.json(deletingAttachment);

    }catch(err){
        console.log("[ERROR]", err);
        return new NextResponse("Something went wrong", {status: 401});

    }

}