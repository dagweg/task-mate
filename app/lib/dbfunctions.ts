import { db } from "./prisma";


export async function getAllOrgs() {
    let result ;
    let response:object = {message :"failed to fetch categories from the database"}
    let status = 400;

    try{
        result = await db.organization.findMany({})
    }
    catch(error){
        console.log("🛑✋  an error occured while fetching 🛑✋",error)
    }
    if(result){
        response=result;
        status =200
    }


    return {data:response,status:status}
    
}