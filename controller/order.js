import Order from "../models/Order.js";
import User from "../models/User.js";
import moment from 'moment';

export const createOrder = async (req, res, next) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder);
    } catch (err) {
        next(err);
    }
};

export const updateOrder = async(req, res, next) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id, 
            {$set: req.body}, 
            {new:true})
        res.status(200).json(updatedOrder)
    } catch (err) {
        next(err);
    }
}

export const deleteOrder = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json("Order not found.");
        }

        // Tìm User tương ứng
        const user = await User.findById(order.userId);
        if (user) {
            // Xóa type của User
            user.type = null;
            await user.save();
        }

        await Order.findByIdAndDelete(req.params.id);

        res.status(200).json("Order and corresponding payment have been deleted, and user type has been removed.");
    } catch (err) {
        next(err);
    }
}



export const getOrder = async(req, res, next) => {
    try {
        const order =  await Order.findById( req.params.id);
        if (!order) {
            throw new Error('Order not found or user not authorized');
        }
        res.status(200).json(order)
    } catch (err) {
        next(err);
    }
}

export const getOrders = async (req, res, next) => {
  try {
    const orders =  await Order.find();
    res.status(200).json(orders)
  } catch (err) {
      next(err);
  }
};

export const getOrdersNewest = async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ _id: -1 }).limit(5);
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};


export const getOrdersUser = async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      if (!orders) {
        return res.status(404).send({ error: 'No orders found for this user' });
      }
      res.send(orders);
    } catch (error) {
      res.status(500).send({ error: 'Server error' });
    }
  };

  export const getSuccessfulOrdersLastWeek = async (req, res, next) => {
    try {
      const lastWeekStart = moment().subtract(1, 'weeks').startOf('week').toDate();
      const lastWeekEnd = moment().subtract(1, 'weeks').endOf('week').toDate();
  
      const ordersLastWeek = await Order.find({
        status: 'Thành công',
        createdAt: { $gte: lastWeekStart, $lte: lastWeekEnd }
      });
      const totalLastWeek = ordersLastWeek.reduce((sum, order) => sum + order.amount, 0);
  
      res.status(200).json({ totalLastWeek });
    } catch (err) {
      next(err);
    }
  };
  
  export const getSuccessfulOrdersLastMonth = async (req, res, next) => {
    try {
      const lastMonthStart = moment().subtract(1, 'months').startOf('month').toDate();
      const lastMonthEnd = moment().subtract(1, 'months').endOf('month').toDate();
  
      const ordersLastMonth = await Order.find({
        status: 'Thành công',
        createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd }
      });
      const totalLastMonth = ordersLastMonth.reduce((sum, order) => sum + order.amount, 0);
  
      res.status(200).json({ totalLastMonth });
    } catch (err) {
      next(err);
    }
  };

export const getSuccessfulOrdersToday = async (req, res, next) => {
  try {
    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();

    const ordersToday = await Order.find({
      status: 'Thành công',
      createdAt: { $gte: todayStart, $lte: todayEnd }
    });
    const totalToday = ordersToday.reduce((sum, order) => sum + order.amount, 0);

    res.status(200).json({ totalToday });
  } catch (err) {
    next(err);
  }
};

export const getTotalSuccessfulOrders = async (req, res) => {
  try {
    const result = [];
    for (let month = 0; month < 12; month++) {
      const start = new Date(new Date().getFullYear(), month, 1);
      const end = new Date(new Date().getFullYear(), month + 1, 0);
      const total = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lte: end },
            status: 'Thành công'
          }
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: '$amount' }
          }
        }
      ]);
      result.push({
        name: start.toLocaleString('default', { month: 'long' }),
        Total: total[0] ? total[0].totalAmount : 0
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCancelReason = async(req, res) => {
  try {
    const reasons = ['Vấn đề với sản phẩm', 'Vấn đề kinh tế', 'Vấn đề sử dụng', 'Vấn đề lợi nhuận', 'Vấn đề công việc'];
    const result = [];
    for (let reason of reasons) {
      const count = await Order.countDocuments({ cancelReason: reason });
      result.push({
        name: reason,
        count: count
      });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}