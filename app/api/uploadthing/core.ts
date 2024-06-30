import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
    const { userId } = auth();
    console.log("UserId from api/uploadthing/core.ts line 9", userId);
    if(!userId) throw new Error("Unauthorized !");
    return { userId };
}


export const ourFileRouter = {
    courseImage: f({ image: {maxFileSize: "4MB", maxFileCount: 1}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
    courseAttachment: f(["text", "audio", "video", "pdf", "image"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
    chapterVideo: f({video: {maxFileSize: "16GB"}})
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
