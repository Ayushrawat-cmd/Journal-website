"use client";
import { useState } from "react";
import axios from "axios";
// import {v2 as cloudinary} from 'cloudinary';
import { Cloudinary } from "@cloudinary/url-gen";
import {thumbnail} from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const cld = new Cloudinary({ cloud: { cloudName: "dgnihsqar" }, url:{secure:true} });
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("");
  const [researchName, setResearchName] = useState("");
  const [disabled, setDisable] = useState(false);
  const handleFileChange = (event: any) => {
    if(event.target.files[0]){
      console.log(event.target.files[0]);
      setFile(event.target.files[0]);
      setFilename(event.target.files[0].name);

    }
  };
  const mypdf = cld.image("nextjs-paper/ajfntv5aa4r5jg0z8v0u.png");

  mypdf.resize(thumbnail(). width(500).height(500).gravity(focusOn(FocusOn.face())))  // Crop the image, focusing on the face.
  .roundCorners(byRadius(20));
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if(!file || !researchName)
      return;
    console.log(file,researchName)
    try {
      setDisable(true);
      const formData = new FormData();

      formData.append('file', file!);
      formData.append('upload_preset','kmvyrklh');
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dgnihsqar/upload`,
        formData
      );

      console.log(response.data);
      const res = await toast.promise(
        axios.post("/api/Upload-paper", {
          name: researchName,
          publicID: response.data.public_id,
        }),
        {
          pending: "Submitting",
          success: "Successfully Submitted!",
          error: "Submission failed!",
        }
      );
      setDisable(true);
      router.push("/dashboard");
        console.log(res.data);
    } catch (error) {
      console.error(error);
    }

  };
{/* <>
    <form >
      <div>
        <input onChange={(event)=>{setResearchName(event.target.value)}}></input>
        <input type="file" onChange={handleFileChange} />
        <label>{filename}</label>
      </div>
      <button onClick={handleSubmit} type="submit">Upload</button>
      <AdvancedImage cldImg={mypdf}></AdvancedImage>
    </form> */}
    {/* <!-- component --> */}
  return (
// {/* <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"> */}
<div className="relative min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover  "
	style={{"backgroundImage": "url(/img/about.jpg"}}>
	<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
	<div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10">
		<div className="text-center">
			<h2 className="mt-5 text-3xl font-bold text-gray-900">
				Upload Paper!
			</h2>
			<p className="mt-2 text-sm text-gray-400">Lorem ipsum is placeholder text.</p>
		</div>
        <form className="mt-8 space-y-3" action="#" method="POST">
                    <div className="grid grid-cols-1 space-y-2">
                        <label className="text-sm font-bold text-gray-500 tracking-wide">Title</label>
                            <input onChange={(event)=>{setResearchName(event.target.value)}} className="text-base p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500" type="" placeholder="Research Paper Name"/>
                    </div>
                    <div className="grid grid-cols-1 space-y-2">
                                    <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Document</label>
                        <div className="flex items-center justify-center w-full">
                            <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center">
                                <div className="h-full w-full text-center flex flex-col items-center justify-center   ">
                                    {/* <!---<svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-blue-400 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>--> */}
                                    <div className="flex flex-auto max-h-48 w-2/5 mx-auto -mt-10">
                                    <img style={{"position":"absolute","clip": "rect(10px, 150px, 130px, 10px)"}} className="has-mask h-36 object-center" src="https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg" alt="freepik image"></img>
                                    </div>
                                    {!filename ?<p className="  text-gray-500 "><span className="text-sm">Drag and drop</span> files here <br /> or <a onChange={handleFileChange} type="file" className="text-blue-600 cursor-pointer hover:underline">select a file</a> from your computer</p>:<p>{filename}</p>}
                                </div>
                                {!filename && <input type="file" onChange={handleFileChange} className="hidden"/>}
                            </label>
                        </div>
                    </div>
                            <p className="text-sm text-gray-300">
                                <span>File type: doc,pdf,types of images</span>
                            </p>
                    <div>
                        <button disabled={disabled} onClick={handleSubmit} type="submit" className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold disabled:opacity-25 disabled:hover:cursor-default disabled:hover:bg-blue-500  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
                        Upload
                    </button>
                    </div>
        </form>
	</div>
</div>
  );
}
