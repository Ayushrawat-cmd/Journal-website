"use client";
import { AdvancedImage } from "@cloudinary/react";
import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import {
  thumbnail,
  crop,
  imaggaScale,
} from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
// import {zoom} from "@cloudinary/url-gen/actions/"
import { Cloudinary } from "@cloudinary/url-gen";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import axios from "axios";

interface Paper {
  _id: string;
  publicID: string;
  name: string;
  createdAt: string;
  status: string;
  authorID: {
    name: string;
  };
}
interface actionStorage{
  action:Map<string, string>
}

const actions = [
  {
    name: "Author Guidelines",
    description: "Get a better understanding of your traffic",
    href: "#",
    // icon: ChartPieIcon,
  },
  {
    name: "Research Areas",
    description: "Speak directly to your customers",
    href: "#",
    // icon: CursorArrowRaysIcon,
  },
  {
    name: "Correction Policy",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    // icon: FingerPrintIcon,
  },
  {
    name: "Plagiarism Policy",
    description: "Connect with third-party tools",
    href: "#",
    // icon: SquaresPlusIcon,
  },
];

export default function Dashboard(props: {
  papers: Paper[];
  loading: Boolean;
  admin: Boolean;
}) {
  const router = useRouter();
  const [action,setAction]= useState(new Map());
  const [paperKey, setPaperKey] = useState('');
  const [newStatus, setNewStatus] =useState('');
  const cld = new Cloudinary({
    cloud: { cloudName: "dgnihsqar" },
    url: { secure: true },
  });
  const saveActionHandler = async (event:any)=>{
    try{
      const paper_id = event.target.getAttribute('a-key');
      setPaperKey(paper_id);
      setNewStatus(action.get(paper_id));
      const res = await axios.put('/api/dashboard/admin', {
        paper_id:paper_id,
        status:action.get(paper_id)
      });
      console.log(res);
      router.refresh();
    }
    catch(error){
      console.log(error);

    }

  }
  const actionHandler = (event:any)=>{
    const paper_id = event.target.getAttribute('a-key');
    setAction(action.set(paper_id, event.target.value));
    console.log(action);
    // console.log(action.get("653c0334675da8fae369e3e2"));
  }
  // const disableHandler = (event)=>{
  //   console.log()
  // }
  return (
    <div className="bg-white p-8 rounded-md w-full">
      <div className=" flex items-center justify-between pb-6">
        <div>
          <h2 className="text-gray-600 text-lg font-semibold">
            Submitted Papers
          </h2>
          {/* <span className="text-xs">All products item</span> */}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block "
              type="text"
              name=""
              id=""
              placeholder="search..."
            />
          </div>
          <div className="lg:ml-40 ml-10 space-x-8">
            <button
              onClick={() => {
                router.push("/add-paper");
              }}
              className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
            >
              New Paper
            </button>
            {/* <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Create</button> */}
          </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Paper ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Paper
                  </th>
                  {props.admin && (
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Author Name
                    </th>
                  )}
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Paper Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                  {props.admin && (
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  )}
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.loading && (
                  <tr>
                    <td colSpan={props.admin ? 7 : 5}>
                      <div className="flex items-center justify-center m-5 ">
                        <div className="relative">
                          <div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
                {props.papers.map((paper) => {
                  const mypdf = cld.image(paper.publicID + ".png");
                  const paper_id = paper.publicID.split("/")[1];
                  const date = new Date(paper.createdAt);
                  mypdf
                    .resize(
                      thumbnail()
                        .width(700)
                        .height(700)
                        .gravity(focusOn(FocusOn.face()))
                    ) // Crop the image, focusing on the face.
                    .roundCorners(byRadius(20));
                  return (
                    <tr key={paper._id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {paper_id}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <div className="flex items-center">
                          <Link
                            href={`https://res.cloudinary.com/dgnihsqar/image/upload/v1698436694/${paper.publicID}`}
                          >
                            <div className="flex-shrink-0 w-52 hover:cursor-pointer">
                              {/* <img className="w-full h-full rounded-full"
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                alt="" /> */}

                              <AdvancedImage cldImg={mypdf}></AdvancedImage>
                            </div>
                          </Link>
                          {/* <div className="ml-3">
												<p className="text-gray-900 whitespace-no-wrap">
													Vera Carpenter
												</p>
											</div> */}
                        </div>
                      </td>
                      {props.admin && (
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {paper.authorID.name}
                          </p>
                        </td>
                      )}
                      <td
                        style={{ maxWidth: "14rem" }}
                        className="px-5 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        <p className="text-gray-900 whitespace-no-wrap">
                          {paper.name}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {date.toDateString()}
                        </p>
                      </td>
                      {
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span className="relative">{ paperKey === paper._id ? newStatus : paper.status}</span>
                          </span>
                        </td>
                      }
                      {props.admin && <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {/* <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                          ></span>
                              <span className="relative">{paper.status}</span>
                          
                        </span> */}
                        {/* <label  htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label> */}
                        <select
                        a-key={paper._id}
                        onChange={actionHandler}
                          id="countries"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="NULL" selected>
                            Choose an action
                          </option>
                          <option value="Acknowledged">Acknowledged</option>
                          <option value="Under reviewing">Under reviewing</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                          <option value="Published">Published</option>
                        </select>
                        <button
                        // disabled={action.get(paper._id) === 'NULL'}
                        // {action === "NULL" && disabled}
                        a-key={paper._id}
                        key={paper._id}
                          onClick={saveActionHandler}
                          className="bg-indigo-600 disabled:opacity-25 px-4 py-2 rounded-md mt-4 text-white font-semibold tracking-wide cursor-pointer"
                        >
                          Save
                        </button>
                      </td>}
                    </tr>
                  );
                })}
                {/* <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Blake Bowman
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Jan 01, 2020
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">77</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                      ></span>
                      <span className="relative">Activo</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Dana Moore
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Editor</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Jan 10, 2020
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">64</p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"
                      ></span>
                      <span className="relative">Suspended</span>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-5 py-5 bg-white text-sm">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Alonzo Cox
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">Admin</p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                      Jan 18, 2020
                    </p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">70</p>
                  </td>
                  <td className="px-5 py-5 bg-white text-sm">
                    <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                      <span
                        aria-hidden
                        className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                      ></span>
                      <span className="relative">Inactive</span>
                    </span>
                  </td>
                </tr> */}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing 1 to 4 of 50 Entries
              </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                  Prev
                </button>
                &nbsp; &nbsp;
                <button className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
