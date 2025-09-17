import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRECT = process.env.JWT_SECRECT as string;

export const generateToken = (user:any) => {
    return jwt.sign({user}, JWT_SECRECT, {expiresIn: "15d"});
}