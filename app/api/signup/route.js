// http://localhost:3000/api/signup

import User from "@/models/User"
import bcrypt from 'bcrypt';
import { connect } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try{
        await connect();
       const {name, email, password}  = await req.json();

       const isExisting = await User.findOne({email})
       if (isExisting) {
        return NextResponse.json ({ErrorMessage: "User Already Exist"})
       } 

       const hashPassword = await bcrypt.hash(password, 10)


       const newUser = await User.create({name, email, password: hashPassword})

      return NextResponse.json(newUser, {status:201})
    } catch(error){
      return NextResponse.json({message:"POST Error (sign up)"})
    }
    
}