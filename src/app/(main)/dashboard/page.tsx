"use client"
import React, { useEffect, useState } from "react";

// import { AdvancedImage } from "@cloudinary/react";
import Navbar from "@/components/Navbar";
import Dashboard from "@/components/Dashboard/Dashboard";
import axios from "axios";

export default function AuthorDashboard(){
    const [papers,setPapers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      const getPapers = async ()=>{
        try{
          // setLoading(true);
          const res =await axios.get("/api/dashboard");
          setLoading(false);
          setPapers(res.data.papers);
          // console.log(res.data.papers);
        }
        catch(error){
          console.log(error);

        }
      }
      getPapers();
    },[]);
    return(
        <>
        <Navbar admin={false}></Navbar>
        
        <Dashboard loading = {loading} papers={papers} admin={false}></Dashboard>
        </>
    )
}