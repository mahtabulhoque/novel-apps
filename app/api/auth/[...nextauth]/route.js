import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/models/User";
import { connect } from "@/lib/db";
import { signJwtToken } from "@/lib/jwt";


const authOption = {
    providers:[
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials){
                await connect();
                const{email, password} = credentials;

                try{
                    const user = await User.findOne({email});
                    if(!user){
                        throw new Error("Invalid input")

                    }
                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(!passwordMatch){
                        throw new Error("Invalid Password")

                    }else{
                        const {password, ...currentUser} = user._doc;
                        const accessToken = signJwtToken(currentUser, {expireIn: "7d"} );
                        return{
                            ...currentUser,
                            accessToken
                        }
                    }
                }catch(error){

                    console.log(error);

                }
            }
        })
    ],
    pages:{
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        async jwt ({token, user}) {
            if(user){
                token.accessToken=user.accessToken
                token._id=user._id;

            }
            return token;
        }

        

    }
}