import PacketType from "../models/PacketType.js";
import Packet from "../models/Packet.js";


export const createPacket = async (req, res, next) => {
    const packetTypeId = req.params.packettypeid;

    // Kiểm tra xem PacketType có tồn tại không
    const packetTypeExists = await PacketType.findById(packetTypeId);
    if (!packetTypeExists) {
        return res.status(400).send("PacketType không tồn tại!");
    }

    const newPacket = new Packet(req.body);
    try {
        const savedPacket = await newPacket.save()
        try {
            await PacketType.findByIdAndUpdate(packetTypeId, 
                {$push : {packets: savedPacket._id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedPacket);
    } catch (err) {
        next(err);
    }
};

export const updatePacket = async(req, res, next) => {
    try {
        const updatedPacket = await Packet.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedPacket)
    } catch (err) {
        next(err);
    }
}

export const deletePacket = async(req, res, next) => {
    const packettypeId = req.params.packettypeid;
    try {
        await Packet.findByIdAndDelete(req.params.id);
        try {
            await PacketType.findByIdAndUpdate(packettypeId, 
                {$pull : {packets: req.params.id}
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Packet has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getPacket = async(req, res, next) => {
    try {
        const packet =  await Packet.findById(
            req.params.id
        );
        res.status(200).json(packet)
    } catch (err) {
        next(err);
    }
}

export const getPackets = async (req, res, next) => {
  try {
    const packets =  await Packet.find();
    res.status(200).json(packets)
  } catch (err) {
      next(err);
  }
};




