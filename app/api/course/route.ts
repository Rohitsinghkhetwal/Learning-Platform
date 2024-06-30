
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async(req: Request) => {
    try{
        const {userId} = auth();
        
        console.log("this is a auth", userId);

        const { title } = await req.json();
        console.log("this is a title", title);

        if(!userId) {
            return new NextResponse("Unouthorized !", {status: 401});
        }

        const course = await db.course.create({
            data: {
                userId,
                title,
            }
        });
        console.log("this is a response course !!!", course);
        return NextResponse.json(course);

    } catch(err){
        console.log(" [COURSES]", err);
        return new NextResponse("Internal server error !", {status : 505})

    }

}