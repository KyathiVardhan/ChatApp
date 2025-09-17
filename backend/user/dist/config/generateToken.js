import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRECT = process.env.JWT_SECRECT;
export const generateToken = (user) => {
    return jwt.sign({ user }, JWT_SECRECT, { expiresIn: "15d" });
};
//# sourceMappingURL=generateToken.js.map