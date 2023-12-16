import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/prisma";
import { z } from "zod";
import { checkPassword } from "@/app/lib/dbfunctions";

// Zod validation
// const createUserSchema = z.object({
//     firstName: z.string().min(1, { message: "First name is required" }),
//     lastName: z.string().min(1, { message: "Last name is required" }),
//     password: z.string().min(1, { message: "Password is required" }),
//     email: z.string().email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
//     phoneNumber: z.string().min(1, { message: "Phone number is required" }),
// });


export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        // const validation = createUserSchema.safeParse(body)

        // if (!validation.success) {
        //     return NextResponse.json(validation.error.errors, { status: 400 })
        // }

        // Hash the password using bcrypt
        // const bcrypt = require('bcrypt');

        // const hashedPassword = await new Promise<string>((resolve, reject) => {
        //     bcrypt.hash(body.password, 10, (err: any, hash: any) => {
        //         if (err) {
        //             reject(err);
        //         } else {
        //             resolve(hash);
        //         }
        //     });
        // });

        // Now you can use hashedPassword



        // Create a user in the database
        const user = await db.user.create({
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                password: body.passWord,
                email: body.email,
                phoneNumber: body.phoneNumber,
            },
        });

        console.log("~~~~Account creation success:\n", user);

        return NextResponse.json({
            message: "Account created successfully",
            user,
        });
    } catch (error) {
        console.error("Account creation error:", error);

        // if (error instanceof z.ZodError) {
        //     // Zod validation error
        //     return NextResponse.json(error.errors,
        //         {
        //             status: 400,
        //             headers: {
        //                 "Content-Type": "text/plain",
        //             },
        //         }
        //     );

        // }

        return NextResponse.json("Account creation failed", { status: 500 });
    }
}
