'use client'
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "@/store/slice";  
import { useEffect, useState } from "react";
import Table from "@/components/home/table";
import {sendRequest} from '@/lib/request'

export default function Home() {
  const dispatch = useDispatch();
  const [data,setData] = useState([]);

  const getData = async()=>{
    const request = new sendRequest('tasks','Bearer');
    const response = await request.send('GET');
    return response;
  };
  
  const DeleteItem = async(id)=>{
    const request = new sendRequest('tasks','Bearer',id);
    const response = await request.send('DELETE');

    if(response.success){
     return getData().then((res)=>{
        setData(res.data);
      })
    }
    
  };

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