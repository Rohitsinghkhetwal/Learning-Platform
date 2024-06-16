import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async(req: Request, {params}: {params: {courseId: string}}) => {
    try{
        const {userId} = auth();
        console.log("This is userId frorm clerk auth", userId);
        const {title} = await req.json();

        if(!userId){
            return new NextResponse("Unauthrozed", {status: 401});
        }

        const checkCourseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId,
            }
        });

        if(!checkCourseOwner) {
            return new NextResponse("cannot find the owner!",{status: 401});
        }

        const lastChapter = await db.chapter.findFirst({
            where: {
                courseId: params.courseId
            },
            orderBy: {
                position: "desc"
            }
        });

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const CreateChapter = await db.chapter.create({
            data: {
                courseId: params.courseId,
                title: title,
                position: newPosition

            }
        });

        return NextResponse.json(CreateChapter);

    }catch(err){
        console.log("COURSE CHAPTER CREATING ERROR", err);
        return new NextResponse("Something wrong with creating the chapter", {status: 401});
    }
}