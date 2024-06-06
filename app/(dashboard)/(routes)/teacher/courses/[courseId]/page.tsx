import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";




const CourseIdPage = async({params}: {params: {courseId: string}}) => {

    const {userId}  = auth();
    console.log("THis is a userID from auth", userId);
    if(!userId) {
        return redirect("/");
    }

    const courses = await db.course.findUnique({
        where: {
            id: params.courseId

        }
    });
    console.log("I am the courses here !", courses);

    if(!courses) {
        return redirect("/");
    }

    const requireFields = [
        courses.title,
        courses.description,
        courses.price,
        courses.imageUrl,
        courses.categoryId
    ];

    const totalFields = requireFields.length;
    const completeFields = requireFields.filter(Boolean).length;

    const completionText = `(${completeFields}/${totalFields})`



    return (
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Course Setup</h1>
            <span className="text-sm text-slate-500 font-semibold">
              Complete all the fields {completionText}
            </span>
          </div>
        </div>
      </div>
    );
}
 
export default CourseIdPage;