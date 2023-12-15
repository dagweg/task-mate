import { NextResponse, NextRequest } from "next/server";
import { db } from '@/app/lib/prisma'

export async function POST(request: NextRequest) {
    // try {
    //     const newUser = await db.user.create({
    //         data: {
    //             firstName: 'John',
    //             lastName: 'Doe',
    //             email: 'john.doe@example.com',
    //             role: "TEAM_MEMBER",
    //         },
    //     });

    //     console.log('User added:', newUser);

    // } catch (error) {
    //     console.error('Error adding user:', error);
    // } finally {
    //     // Close the Prisma client connection
    //     await db.$disconnect();
    // }

}