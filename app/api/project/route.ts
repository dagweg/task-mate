import { getAllOrgs } from "@/app/lib/dbfunctions";
import { NextRequest, NextResponse } from "next/server";



export async function GET(req:NextRequest){


  
    let result:{data:any,status:any}
  

       result = await getAllOrgs()  

  
  
  
    return NextResponse.json(result.data,{status:result.status})
}