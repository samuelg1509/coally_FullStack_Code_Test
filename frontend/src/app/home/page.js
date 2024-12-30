'use client'
import { useDispatch, useSelector } from "react-redux";
import { redirect } from 'next/navigation';
import { updateToken } from "@/store/slice";
import { useEffect, useState } from "react";


export default function Home() {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const dispatch = useDispatch();

  useEffect(() => {
    if(token === '') return redirect(`/login`);
  })

  const logout = ()=>{

    dispatch(updateToken(''));
    setToken('');

  }
  
  return(
    <>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}