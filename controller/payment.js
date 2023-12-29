import Payment from "../models/Payment.js";

export const createPayment = async(req, res, next) => {
    const newPayment = new Payment(req.body)
    try {
        const savedPayment = await newPayment.save();
        res.status(200).json(savedPayment)
    } catch (err) {
        next(err);
    }
}

export const updatePayment = async(req, res, next) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedPayment)
    } catch (err) {
        next(err);
    }
}

export const deletePayment = async(req, res, next) => {
    try {
        await Payment.findByIdAndDelete( req.params.id);
        res.status(200).json("Payment has been deleted.")
    } catch (err) {
        next(err);
    }
}

export const getPayment = async(req, res, next) => {
    try {
        const payment =  await Payment.findById(req.params.id);
        res.status(200).json(payment)
    } catch (err) {
        next(err);
    }
}

export const getPayments = async(req, res, next) => {
  try {
    const payments =  await Payment.find();
    res.status(200).json(payments)
  } catch (err) {
      next(err);
  }
};


