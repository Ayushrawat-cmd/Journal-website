"use client"
import React, { useEffect, useState } from "react";

// import { AdvancedImage } from "@cloudinary/react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard/Dashboard";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AuthorDashboard(){
    const router = useRouter();
    const [papers,setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      const getPapers = async ()=>{
        try{
          // setLoading(true);
          const res =await axios.get("/api/dashboard/admin");
          setLoading(false);
          setPapers(res.data.papers);
          // await localStorage.setItem("admin", "true");
          // console.log(res.data.papers);
        }
        catch(error){
          console.log(error);
            router.replace("/dashboard");

        }
      }
      getPapers();
    },[]);
    return(
        <>
        <Navbar ></Navbar>
        
        <Dashboard loading = {loading} papers={papers} admin ={true}></Dashboard>
        </>
    )
}