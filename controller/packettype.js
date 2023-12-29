import PacketType from "../models/PacketType.js";
import Packet from "../models/Packet.js";

export const createPacketType = async(req, res, next) => {
    const newPacketType = new PacketType(req.body)

    try {
        const savedPacketType = await newPacketType.save()
        res.status(200).json(savedPacketType)
    } catch (err) {
        next(err);
    }
}

export const updatePacketType = async(req, res, next) => {
    try {
        const updatedPacketType = await PacketType.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedPacketType)
    } catch (err) {
        next(err);
    }
}

export const deletePacketType = async (req, res, next) => {
    try {
      // Lấy id của danh mục cần xóa
      const packetTypeId = req.params.id;
  
      // Xóa tất cả các dự án thuộc về danh mục
      await Packet.deleteMany({ packetTypeId: packetTypeId });
  
      // Xóa danh mục
      await PacketType.findByIdAndDelete(packetTypeId);
  
      res.status(200).json("Packet Type and all related packets have been deleted.");
    } catch (err) {
      next(err);
    }
  };

export const getPacketType = async(req, res, next) => {
    try {
        const packetType =  await PacketType.findById(
            req.params.id
        );
        res.status(200).json(packetType)
    } catch (err) {
        next(err);
    }
}

export const getPacketTypes = async(req, res, next) => {
    try {
        const packetTypes =  await PacketType.find();
        res.status(200).json(packetTypes)
    } catch (err) {
        next(err);
    }
}