import { NextRequest } from "next/server"
import {z} from 'zod';
const createProjectSchema = z.object({
    projectName: z.string().min(1, "The project name must have at least 1 character"),
    description: z.string().min(1, "The project description must have at least 1 character"),
  });
  
  const createTeamMemberSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
  });
  
  const createStakeholderSchema = z.object({
    email: z.string().email("Invalid email address").nonempty("Email is required"),
  });
export async function POST(request:NextRequest){
    const body = await request.json
    
}