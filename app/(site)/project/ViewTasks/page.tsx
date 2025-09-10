"use client";
import React, { useEffect, useState } from "react";
import { SubTask } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { BiBullseye } from "react-icons/bi";
function ViewTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const projectId = searchParams.get("pid");
  function getProgressStyle(progress: string) {
    switch (progress) {
      case "NOT_STARTED":
        return "text-red-500"; // Use your desired style for not started
      case "IN_PROGRESS":
        return "text-yellow-500"; // Use your desired style for in progress
      case "FINISHED":
        return "text-green-500"; // Use your desired style for finished
      default:
        return "";
    }
  }

  useEffect(() => {
    fetch(`/api/task`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pid: projectId }),
    })
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          console.log(data);
        } else {
          setError(`Error: ${response.status}`);
        }
      })
      .catch((err) => {
        setError(`Error: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [projectId]);

  //   if (loading) {
  //     return <p>Loading...</p>; // Add a loading indicator
  //   }

  //   if (error) {
  //     return <p>Error: {error}</p>; // Display error message
  //   }

  return (
    <div className="w-full bg-white rounded-xl border border-gray-200 p-4">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="p-3">Task</th>
            <th className="p-3">Progress</th>
            <th className="p-3">Assignees</th>
            <th className="p-3">Subtasks</th>
          </tr>
        </thead>
        <tbody>
          {(tasks as any[]).map((t: any) => (
            <tr key={t.id} className="border-b last:border-b-0">
              <td className="p-3 font-medium text-gray-900">{t.title}</td>
              <td className={"p-3 " + getProgressStyle(t.progress)}>{t.progress}</td>
              <td className="p-3">{(t.assignedTo || []).map((u: any) => u.firstName || u.email).join(', ') || '-'}</td>
              <td className="p-3">
                <ul className="list-disc pl-5">
                  {(t.SubTask || []).map((s: any) => (
                    <li key={s.id}>{s.title}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {(!tasks || (tasks as any[]).length === 0) && (
        <div className="text-sm text-gray-500 p-4">No tasks yet.</div>
      )}
      {error && <div className="text-sm text-red-600 p-4">{error}</div>}
    </div>
  );
}

export default ViewTasks;
{
  /*    <table className='w-full'>
  <td className='p-3 text-sm text-gray-700'>{myTask.dueDate}</td>
    <th className='w-20 p-3 text-sm font-semibold -tracking-wide text-left' ><TfiCalendar />start date</th>
    <tbody className="text-blue-gray-900 divide-y divide-gray-100 pl-2">
      <tr>
        <td className='p-3 text-sm text-gray-700'></td>
        <td className='p-3 text-sm text-gray-700'></td>
        <td className='p-3 text-sm text-gray-700'>
          <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-orange rounded-lg bg-opacity-50'>IN_PROGRESS</span>
        </td>
        <td className='p-3 text-sm text-gray-700'></td>
      </tr>
      <tr>
        <td className='p-3 pl-8 text-sm text-gray-700'> {/* Add left padding 
        
      Child Name
        </td>
        <td className='p-3 pl-8 text-sm text-gray-700'> {/* Add left padding 
        Child Due date
        </td>
        <td className='p-3 pl-8 text-sm text-gray-700'> 
          <span className='p-1.5 text-xs font-medium uppercase tracking-wider text-orange rounded-lg bg-opacity-50'>IN_PROGRESS</span>
        </td>
        <td className='p-3 pl-8 text-sm text-gray-700'> 
          Child Assign
        </td>
      </tr>
    </tbody>
  </table>*/
}
