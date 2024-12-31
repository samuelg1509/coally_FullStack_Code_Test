'use client'

import {DeleteXIcon} from '@/assets/logo'

export default function Table({tasks, DeleteItem}) {
  
  
  return(
      <table>
        <thead className="text-center text-base font-semibold border">
          <tr>
            <th className="w-[200px] text-center">Title</th>
            <th className="w-[400px]">Description</th>
            <th className="w-[200px]">Status</th>
            <th className="w-[200px]">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
        {tasks.map((task,n) => {
          return(

          <tr key={n}>
            <td className="text-center">{task.title}</td>
            <td className="text-center">{task.description}</td>
            <td className="text-center">{task.completed ? 'Completed' : 'Pending'}</td>
            <td className="flex justify-center">
              <button
                className="flex h-10 w-14 items-center justify-center rounded-[30px]"
                onClick={
                  () => DeleteItem(task.id)
                }
              >
                <DeleteXIcon/>
              </button>
            </td>
          </tr>
          )
        })}
        </tbody>
      </table>
  )
}