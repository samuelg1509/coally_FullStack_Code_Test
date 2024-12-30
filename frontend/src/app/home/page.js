'use client'
import { useSelector } from "react-redux"
import { redirect } from 'next/navigation'

export default function Home() {
  

  const token = sessionStorage.getItem("token");
  if(!token) return redirect(`/login`);
  
  return(
    <>
      <h1>{token}</h1>
    </>
  )
}