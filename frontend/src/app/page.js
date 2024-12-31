'use client'
import { redirect } from 'next/navigation';
import { useEffect } from "react";

const Page = ()=> {
    // const token = sessionStorage.getItem("token")
    // console.log(token)
    useEffect(() => {
      if(token === '') {
        return redirect(`/login`);
      }else{
        return redirect(`/home`);
      }
    })


}

export default Page;