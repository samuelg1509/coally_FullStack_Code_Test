'use client'
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "@/store/slice";
import { useEffect, useState } from "react";
import {DeleteXIcon} from '@/assets/logo'
import Table from "@/components/home/table";

export default function Home() {
  const dispatch = useDispatch();
  const [data,setData] = useState([]);
  const token = useSelector(state => state.token.token);

  const DeleteItem = async(id)=>{

    const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      }),
    });

    const json = await response.json();
    if(json.success){
      getData().then((res)=>{
        setData(res.data);
      })
    }
    
  };


  const getData = async()=>{
    const response = await fetch("http://localhost:8080/api/tasks", {
      headers: new Headers({
        "Authorization": `Bearer ${token}`
      }),
    });

    const json = await response.json();
    return json;
  }

  useEffect(() => {
    getData().then((res)=>{
      setData(res.data);
    })
  },[])

  const logout = ()=>{
    dispatch(updateToken(''));
  }
  
  return(
    <div className="flex flex-col w-full text-center items-center">
      <h1>Home</h1>
      <button onClick={logout}>Logout</button>
      <div className="mt-10">
        <Table tasks={data} DeleteItem={DeleteItem}/>

      </div>
    </div>
  )
}