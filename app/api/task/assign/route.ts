import { db } from "@/app/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()

        


        
        const updated = await db.task.update({
            where: {
                id: body.taskId,
                projectId: body.projectId
            },
            data: {
                assignedTo:{
                    connect:body.userIds.map((userId:string,ind:number)=>{
                        return {
                            id:userId
                        }
                    })
                }
                
            },
           
            include: {
                SubTask: true
            }
        })


        console.log(updated)

        return NextResponse.json({}, { status: 200 })
    }
    catch (e) {
        console.log(e)
        return NextResponse.json({}, { status: 500 })
    }
}
