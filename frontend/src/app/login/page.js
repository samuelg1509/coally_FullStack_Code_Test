'use client'

import { useDispatch, useSelector } from "react-redux";
import { redirect } from 'next/navigation';
import { useForm } from "react-hook-form";
import { updateToken } from "@/store/slice";
import { useEffect } from "react";


export default function Page() {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if(token !== '') return redirect(`/home`);
  })


  const onSubmit = async (formData) => {

    // let headers = new Headers();
    // const authString = `${formData.username} ${formData.password}`

    // headers.set('Authorization', 'Basic ' + btoa(authString));

    // console.log(btoa(authString),"he")

    const response = await fetch("http://localhost:8080/api/auth/login", {
      headers: new Headers({
        "Authorization": `Basic ${ btoa(`${formData.username}:${formData.password}`)}`
      }),
    });

    const json = await response.json();

    dispatch(updateToken(json.data.sesion_token))


    reset();
    
    
   
  };



  return(
    <div>
      <h1>Login</h1>
      <form className="flex flex-col w-60" onSubmit={handleSubmit(onSubmit)}>
      <input
              placeholder='username'
              className="border"
              type="text"
              {...register("username", {
                required: 'username is required',
                pattern: {
                  value: /^[a-z0-9\s]+$/,
                  message: 'Set a valid username',
                },
                minLength: {
                  value: 4,
                  message: 'The username must contain 4 to 15 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'The username must contain 4 to 15 characters',
                }
              })}
            />
            {errors && errors.username && (
              <p className="text-xs text-red-700 ">{errors.username.message}</p>
            )}
        
          <input
              placeholder='password'
              className="border"
              type="password"
              {...register("password", {
                required: 'password is required',
                minLength: {
                  value: 4,
                  message: 'The password must contain 4 to 15 characters',
                },
                maxLength: {
                  value: 15,
                  message: 'The password must contain 4 to 15 characters',
                }
              })}
            />
            {errors && errors.password && (
              <p className="text-xs text-red-700 ">{errors.password.message}</p>
            )}
        <button type="submit">Enviar</button>
      </form>
    </div>
  )
}