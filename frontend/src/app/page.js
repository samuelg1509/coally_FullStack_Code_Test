'use client'
import { redirect } from 'next/navigation';
import { useEffect } from "react";
import { useSelector } from "react-redux";


const Page = ()=> {
    const token = useSelector(state => state.token.token);
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