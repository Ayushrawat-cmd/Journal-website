// import multer from "multer";
// import { GridFsStorage } from "multer-gridfs-storage";
import { NextFetchEvent, NextMiddleware, NextRequest } from "next/server";

export function UploadFile(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const path = request.nextUrl.pathname;
    const uploadPath = path === "/add-paper" ;
    if(uploadPath){
        // const MONGODB_URI =
        // process.env.MONGO_URI!;
        // const body = await request.json();
        // const course = body.course.toLowerCase();
        // const semester = body.semester.toLowerCase();
        // const subject = body.subject.toLowerCase();
        // const storage = new GridFsStorage({
        //   url: MONGODB_URI,
        //   file: (req: NextRequest, file) => {
        //     return new Promise((resolve, reject) => {
        //       // console.log(req.body.subject);
        //       const originalName = file.originalname;
        //       const filename =
        //         course + "-" + semester + "-" + subject + "-" + originalName;
        //       const fileInfo = {
        //         filename: filename,
        //         bucketName: "uploads",
        //       };
        //       resolve(fileInfo);
        //     });
        //   },
        // });
    
        // const upload = multer({ storage: storage });
        // upload.single('file');

        return middleware(request, event);
    }
  };
}
