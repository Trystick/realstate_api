import Role from "../models/Role.js";

export let adminRoles = [];

export const updateAdminRoles = async () => {
  const roles = await Role.find({ name: { $ne: 'user' } });
  adminRoles = roles.map(role => role.name);
};

export const createRole = async (req, res) => {
    try {
        const role = new Role(req.body);
        await role.save();
        await updateAdminRoles(); // Cập nhật danh sách vai trò sau khi tạo vai trò mới
        res.status(201).send(role);
    } catch (error) {
        res.status(500).send({ message: 'Error creating role', error });
    }
};

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({ name: { $ne: 'user' } });
        res.status(200).send(roles);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching roles', error });
    }
};

export const getRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findById(id);
        if (!role) {
            return res.status(404).send({ message: 'Role not found' });
        }
        res.status(200).send(role);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching role', error });
    }
};

export const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const role = await Role.findByIdAndUpdate(id, req.body, { new: true });
        await updateAdminRoles(); // Cập nhật danh sách vai trò sau khi cập nhật vai trò
        res.status(200).send(role);
    } catch (error) {
        res.status(500).send({ message: 'Error updating role', error });
    }
};

export const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;
        await Role.findByIdAndDelete(id);
        await updateAdminRoles(); // Cập nhật danh sách vai trò sau khi xóa vai trò
        res.status(200).send({ message: 'Role deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting role', error });
    }
};


export const assignRole = async (req, res, next) => {
    const { role, modules } = req.body;
    try {
        const updatedRole = await Role.findOneAndUpdate({ name: role }, { modules }, { new: true });
        res.send({ role: updatedRole });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
    }
};