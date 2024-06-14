import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import { LayoutDashboard } from "lucide-react";
import TitleForm from "./_components/page";
import DescriptionForm from "./_components/description-form";
import ImageForm from "./_components/image-form";
import CategoryForm from "./_components/category-form";




const CourseIdPage = async({params}: {params: {courseId: string}}) => {

    const {userId}  = auth();
    if(!userId) {
        return redirect("/");
    }

    const courses = await db.course.findUnique({
        where: {
            id: params.courseId

        }
    });

    const Category = await db.category.findMany({
      orderBy: {
        name: "asc"
      }
    })
    
    console.log("[@ Category data is here !]", Category);

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
        <div className="grid grid-col-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge size="sm" variant="default" icon={LayoutDashboard} />
              <h2 className="text-md text-slate-600 font-medium md:text-xl">
                Customize your courses
              </h2>
            </div>
            <TitleForm initialData={courses} courseId={courses.id} />
            <DescriptionForm initialData={courses} courseId={courses.id} />
            <ImageForm initialData={courses} courseId={courses.id} />
            <CategoryForm
              initialData={courses}
              courseId={courses.id}
              options={Category.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
        </div>
      </div>
    );
}
 
export default CourseIdPage;