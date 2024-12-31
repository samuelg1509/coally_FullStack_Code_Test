'use client'
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "@/store/slice";


export default function Home() {
  const dispatch = useDispatch();
  const logout = ()=>{

    dispatch(updateToken(''));

  }
  
  return(
    <>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
    </>
  )
}