import { NextRequest } from "next/server"
import {z} from 'zod';
const createProjectSchema=z.object({
    projectName:z.string().min(1,"the minimum character is need only one character").max(255,'it is the longer name you must decrease the size'),
    description : z.string().min(1),

})
const createTeamSchema=z.object({
    
})
export async function POST(request:NextRequest){
    const body = await request.json
}