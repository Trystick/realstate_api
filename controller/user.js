import User from "../models/User.js";
import bcrypt from "bcryptjs"
import Role from "../models/Role.js"

export let adminRoles = [];

export const updateAdminRoles = async () => {
  const roles = await Role.find({ name: { $ne: 'user' } });
  adminRoles = roles.map(role => role.name);
}

const saltRounds = 10;

export const updateUser = async (req, res, next) => {
    try {
        let updateData = req.body;
        if (updateData.password) {
            const hashedPassword = await bcrypt.hash(updateData.password, saltRounds);
            updateData.password = hashedPassword;
        }
        if (updateData.role) {
            const role = await Role.findOne({ name: updateData.role });
            if (!role) {
                return res.status(400).send("Role does not exist!");
            }
            updateData.role = role._id;
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        ).populate('role');
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};


export const updateUserNoPass = async (req, res, next) => {
    try {
        const updateData = { ...req.body };
        delete updateData.password; // Loại bỏ password khỏi dữ liệu cập nhật

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        );
        
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};


export const deleteUser = async(req, res, next) => {
    try {       
        await User.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("User has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getUser = async(req, res, next) => {
    try {
        const user =  await User.findById(
            req.params.id
        );
        res.status(200).json(user)
    } catch (err) {
        next(err);
    }
}

export const getUsers = async(req, res, next) => {
    try {
        const users =  await User.find();
        res.status(200).json(users)
    } catch (err) {
        next(err);
    }
}

export const getAdmins = async(req, res, next) => {
    try {      
        await updateAdminRoles(); 
        const roles = await Role.find({ 
            name: { $in: adminRoles } 
        });
        const roleIds = roles.map(role => role._id);
        const admins = await User.find({
            role: { $in: roleIds }
        }).populate('role');
        res.status(200).json(admins);
    } catch (err) {
        next(err);
    }
}


export const getUsersOnly = async(req, res, next) => {
    try {       
        const userRole = await Role.findOne({ name: 'user' });
        const users = await User.find({
            role: userRole._id
        }).populate('role');
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
}
