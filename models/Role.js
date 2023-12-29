import mongoose from 'mongoose';
const { Schema } = mongoose;

const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    modules: [{
        type: String,
    }],
},{timestamps:true});

export default mongoose.model("Role", RoleSchema)
