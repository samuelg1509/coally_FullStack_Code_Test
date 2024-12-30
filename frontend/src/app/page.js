'use client'
import { redirect } from 'next/navigation'

const Page = ()=> {
  const token = sessionStorage.getItem("token");
  if(!token){
    return redirect(`/login`);
  }else{
    return redirect(`/home`);
  }


}

export default Page;