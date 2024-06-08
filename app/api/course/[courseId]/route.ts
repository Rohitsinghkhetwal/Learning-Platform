import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const PATCH = async(req: Request, {params} : {params: {
    courseId: string
}}) => {
    try {
        const {userId} = auth();
        const { courseId} = params;
        console.log("[courseId ==>]", courseId);
        console.log("[userID]", userId);
        const values = await req.json();
        console.log("$ values stored in request json", values);

        if(!userId) {
            return new NextResponse("Authentication failed !");
        }
        const result = await db.course.update({
            where: {
                id: courseId,
                userId,
            },
            data: {
                ...values
            }
        })

        return NextResponse.json(result);

    }catch(err){
        console.log("[CourseID", err);
        return new NextResponse("Internal server error");

    }

}