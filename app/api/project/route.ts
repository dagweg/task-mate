import { AddProject } from "@/app/lib/dbfunctions";
import { NextRequest, NextResponse } from "next/server";



// export async function GET(req:NextRequest){


  
//     let result:{data:any,status:any}
  

//        result = await getAllOrgs()  

  
  
  
//     return NextResponse.json(result.data,{status:result.status})
// }

export async function POST(req:NextRequest){
    const postData =await req.json()
    
 
    const result = await AddProject((postData as any))
 
    return NextResponse.json(result)
 
 }
 