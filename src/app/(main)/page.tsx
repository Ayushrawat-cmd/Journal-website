"use client";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Image from "next/image";
import BodySection from "@/components/BodySection";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
// import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar admin={false}></Navbar>
      <div className="container mx-auto flex px-5 py-10 md:flex-row flex-col ">
        <div className="lg:flex-grow  lg:w-10 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <Main></Main>
          <BodySection></BodySection>
        </div>
        <div className="lg:max-w-xs lg:w-full md:w-1/2 w-5/6 mx-auto">
          <Sidebar></Sidebar>
        </div>
      </div>
      <Footer></Footer>
    </>
    // {/* <Main></Main> */}
    // </div>
  );
}
