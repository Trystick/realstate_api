import jwt from "jsonwebtoken";
import Role from "../models/Role.js";
import User from "../models/User.js";
import {createError} from "../utils/error.js";

let adminRoles = [];

export const updateAdminRoles = async () => {
  const roles = await Role.find({ name: { $ne: 'user' } });
  adminRoles = roles.map(role => role.name);
};

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(token);
    if(!token){
        return next(createError(401, "You are not anthenticated!"))
    }

    jwt.verify(token, process.env.JWT, async (err, user) => {
        if(err) return next(createError(403, "Token is not valid!"));
        const fullUser = await User.findById(user.id).populate('role');
        req.user = fullUser;
        await updateAdminRoles(); // Cập nhật danh sách vai trò sau khi xác minh token
        next();
    });
};


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.role.name === 'user' || adminRoles.includes(req.user.role.name)) {
            console.log(req.user.id);
            next();
        }else{
           return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (adminRoles.includes(req.user.role.name)) {
            next();
        }else{
            return next(createError(403, "You are not authorized!"));
        }
    });
}; 


