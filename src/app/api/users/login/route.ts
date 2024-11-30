import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import bcryptjs from "bcryptjs";

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

connect()

export async function POST(request:Request){
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;
    
        // Check user exists
        const user = await User.findOne({ email });
        if (!user) {
          return NextResponse.json({ error: "User does not exists", status: 400 });
        }
       
        // chk if the password is correct 
        const validPassword = await bcryptjs.compare(password, user.password);
        
        if(!validPassword){
            return NextResponse.json({ error: "Invalid Password"}, {status: 400 })
        }

        // create token data 

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        // create token 

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn:"1h"})

        const response = NextResponse.json({
            message:"Login Successfull",
            success:true
        })

        response.cookies.set("token" , token, {
            httpOnly:true,
        })

        return response;
    
      } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
      }
    }