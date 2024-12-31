'use client'

import { useSelector } from "react-redux";
import { redirect } from 'next/navigation';
import { useEffect } from "react";

export default function AuthLayout({ children }) {
  const token = useSelector(state => state.token.token);
  useEffect(() => {
    if(token !== '') return redirect(`/home`);
  })

  return(
    <>
      { children }
    </>
  )
}