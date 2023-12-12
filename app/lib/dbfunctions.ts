
import { getServerAuthSession } from "./auth";
import { db } from "./prisma";


interface CreateProjectInput {
    title: string;
    description: string;
    creatorId: string ;
    coverImage: string;
    dueDate: Date;
  }
  

// export async function getAllOrgs() {
//     let result ;
//     let response:object = {message :"failed to fetch categories from the database"}
//     let status = 400;

//     try{
//         result = await db.organization.findMany({})
//     }
//     catch(error){
//         console.log("🛑✋  an error occured while fetching 🛑✋",error)
//     }
//     if(result){
//         response=result;
//         status =200
//     }


//     return {data:response,status:status}
    
// }


export async function AddProject(projectData:CreateProjectInput){
    const session = await getServerAuthSession()  ;
    const userID  = session?.user?.email
    const user  = await (getuser(userID as string))

    console.log("🔊🔊🔉📢📢 this is the session of the current user data✨🐱‍🐉",user)

    let response ;

    if(session){
        try{
            response = await db.project.create({
                data:{
                    
                    creatorId:user?.id as string,
                    title:projectData.title as string,
                    coverImage:projectData.coverImage as string,
                    dueDate:projectData.dueDate as Date,
                    description:projectData.description as string

                },
              });
        } 
        catch(error){
            console.log(error)
            response = {message :"failed to upload posts to the database"}
        }

       
}
        
        
        

        return response
    
}


export async function getuser(email:string){
    const userdata  = await db.user.findFirst({where:{
        email:email,


    }})
 

    return userdata;

}
