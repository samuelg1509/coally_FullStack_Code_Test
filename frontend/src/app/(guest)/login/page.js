'use client'

import { useDispatch, useSelector } from "react-redux";
import { redirect } from 'next/navigation';
import { useForm } from "react-hook-form";
import { updateToken } from "@/store/slice";
import { useEffect } from "react";
import { Logo } from '@/assets/lgit ogo';

export default function Page() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.token.token);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if(token !== '') return redirect(`/home`);
  })


  const onSubmit = async (formData) => {

    const response = await fetch("http://localhost:8080/api/auth/login", {
      headers: new Headers({
        "Authorization": `Basic ${ btoa(`${formData.username}:${formData.password}`)}`
      }),
    });

    const json = await response.json();
    if(json.cod_error == 401){
      alert("invalid username or password");
    }else{
      dispatch(updateToken(json.data.sesion_token));
      reset();
    }
  };

  return(
    <div className='fixed bg-blue-200 w-full h-full md:h-screen'>
      <span className='absolute bg-green-100 h-full w-10 ml-[70%] md:w-40 md:ml-[70%]'/>
      <span className='absolute bg-blue-300 h-full w-[70%] md:w-[70%]'/>
      <div className="absolute ml-[25%] mt-[15%] md:ml-[30%] md:mt-[3%]">
        <Logo/>
      </div>
      <p className='absolute italic mt-[42%] ml-1 md:text-2xl md:ml-[20%] md:mt-[10%] text-bg'>Welcome to your favorite task organize!</p>
      <h1 className='absolute mt-[70%] ml-[25%] md:ml-[30%] md:mt-[18%] text-4xl text-bg italic'>Login</h1>
      <form className="flex flex-col absolute pt-96 pl-10 md:pt-96 md:pl-96 gap-6 italic" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder='Username'
          className="bg-transparent border-blue-200 border-2 rounded-full w-52 h-12 md:w-72 text-center"
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
          <p className="text-md text-bg">{errors.username.message}</p>
        )}

        <input
            placeholder='Password'
            className="bg-transparent border-green-100 border-2 rounded-full w-52 md:w-72 h-12 text-center italic"
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
            <p className="text-md text-bg ">{errors.password.message}</p>
          )}
      <button className='rounded-full bg-gradient-to-r from-green-100 to-blue-200 h-12 w-44 ml-4 md:ml-16' type="submit">Login</button>
      <h1 className="absolute bg-gradient-to-r from-green-100 to-blue-200 inline-block text-transparent bg-clip-text text-4xl md:text-5xl mt-96 ml-4 md:mt-80 md:ml-10">Sam's Task</h1>

      </form>
    </div>
  )
}