import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import categoriesRoute from "./routes/category.js"
import projectsRoute from "./routes/project.js"
import adviseRoute from "./routes/advise.js"
import postCategoryRoute from "./routes/postcategory.js"
import postRoute from "./routes/post.js"
import jobCategoryRoute from './routes/jobcategory.js'
import jobRoute from './routes/job.js'
import jobApplyRoute from "./routes/jobapply.js"
import landSaleCategoryRoute from "./routes/categorylandsale.js"
import landLeaseCategoryRoute from "./routes/categorylandlease.js"
import orderRoute from "./routes/order.js"
import landSaleRoute from "./routes/landsale.js"
import landLeaseRoute from "./routes/landlease.js"
import packetTypeRoute from "./routes/packettype.js"
import packetRoute from "./routes/packet.js"
import paymentRoute from "./routes/payment.js"
import slideRoute from "./routes/slider.js"
import favoriteRoute from "./routes/favorite.js"
import roleRoute from "./routes/role.js"
import likeRoute from "./routes/like.js"
import commentRoute from "./routes/comment.js"
import cookieParser from "cookie-parser"
import nodemailer from "nodemailer"
import multer from "multer"
import cors from "cors"
import crypto from 'crypto'
import bcrypt from "bcryptjs"
import querystring from 'querystring'
import cron from 'node-cron'


const app = express()

dotenv.config();

const connect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
      } catch (error) {
        throw error;
      }
};

mongoose.connection.on("disconected", ()=> {
    console.log("MongoDb disconeted!");
})

//middlewares

app.use(cors({
  credentials: true,
  origin: ["https://realstate-client.onrender.com", "https://realstate-admin.onrender.com"],
  methods:["GET","POST","PUT", "DELETE"],
}));

app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/category", categoriesRoute);
app.use("/api/project", projectsRoute);
app.use("/api/advise", adviseRoute);
app.use("/api/postCategory", postCategoryRoute);
app.use("/api/post", postRoute);
app.use("/api/job", jobRoute);
app.use("/api/jobCategory", jobCategoryRoute);
app.use("/api/jobApply", jobApplyRoute);
app.use("/api/landSaleCategory", landSaleCategoryRoute);
app.use("/api/landLeaseCategory", landLeaseCategoryRoute);
app.use("/api/landSale", landSaleRoute);
app.use("/api/landLease", landLeaseRoute);
app.use("/api/order", orderRoute);
app.use("/api/packetType", packetTypeRoute);
app.use("/api/packet", packetRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/slide", slideRoute);
app.use("/api/favorite", favoriteRoute);
app.use("/api/role", roleRoute);
app.use("/api/like", likeRoute);
app.use("/api/comment", commentRoute);


//gửi mail về thông tin khách hàng tư vấn
// app.post("/api/sendMail", async (req, res) => {
//   const { fullname, email, phone, desc } = req.body;
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_APP,
//       pass: process.env.EMAIL_APP_PASSWORD
//     }
//   });
//     await transporter.sendMail({
//       from: '"Thông tin khách hàng"<luongthanhcong533@gmail.com>',
//       to: `luongthanhcong.dh51905352@gmail.com`, // list of receivers
//       text: `Họ tên: ${fullname}\nEmail: ${email}\nSố điện thoại: ${phone}\nNội dung quan tâm: ${desc}`
//     }, (err) => {
//       if (err) {
//         return res.json({
//           message:"Error",
//           err
//         })
//       }
//       return res.json({
//         message:"Đã gửi mail thành công"
//       })
//     });
// })

app.post("/api/sendMail", async (req, res) => {
  const { fullname, email, phone, desc } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  await transporter.sendMail({
    from: '"Thông tin khách hàng"<luongthanhcong533@gmail.com>',
    to: `luongthanhcong.dh51905352@gmail.com`, // list of receivers
    text: `Họ tên: ${fullname}\nEmail: ${email}\nSố điện thoại: ${phone}\nNội dung quan tâm: ${desc}`
  }, async (err) => {
    if (err) {
      return res.json({
        message:"Error",
        err
      });
    } else {
      // Send confirmation email to the customer
      await transporter.sendMail({
        from: '"Xác nhận từ Công ty"<luongthanhcong533@gmail.com>',
        to: email, // customer's email
        subject: 'Xác nhận nhận thông tin',
        text: `Chào ${fullname},\n\nChúng tôi đã nhận được thông tin của bạn và sẽ liên lạc với bạn sớm nhất có thể.\n\nThông tin bạn đã gửi:\nHọ tên: ${fullname}\nEmail: ${email}\nSố điện thoại: ${phone}\nNội dung quan tâm: ${desc}\n\nTrân trọng,\nĐội ngũ hỗ trợ khách hàng`
      }, (err) => {
        if (err) {
          console.log('Error sending confirmation email', err);
        }
      });

      return res.json({
        message:"Đã gửi mail thành công"
      });
    }
  });
});


//gửi mail về thông tin tuyển dụng có bao gồm file word, pdf
const upload = multer();

app.post("/api/sendMailJob", upload.single('file'), async (req, res) => {
  const { namejob, fullname, email, phone } = req.body;
  const file = req.file;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
  await transporter.sendMail({
    from: '"Thông tin tuyển dụng"<luongthanhcong533@gmail.com>',
    to: `luongthanhcong.dh51905352@gmail.com`, // list of receivers
    text: `Vị trí ứng tuyển: ${namejob}\nHọ và tên: ${fullname}\nEmail: ${email}\nSố điện thoại: ${phone}`,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer
      }
    ]
  }, async (err) => {
    if (err) {
      return res.json({
        message:"Error",
        err
      })
    }
    // Send confirmation email to the applicant
    await transporter.sendMail({
      from: '"Thông tin tuyển dụng"<luongthanhcong533@gmail.com>',
      to: email, // send to the applicant's email
      text: `Xin chào ${fullname},\n\nCảm ơn bạn đã ứng tuyển cho vị trí ${namejob}. Chúng tôi đã nhận được hồ sơ của bạn và sẽ liên hệ với bạn sớm nhất có thể.\n\nTrân trọng,\nCông ty Bất Động Sản GoldenLand`
    }, (err) => {
      if (err) {
        return res.json({
          message:"Error",
          err
        })
      }
      return res.json({
        message:"Đã gửi mail thành công"
      })
    });
  });
});


// gửi mail resetpassword
import User from './models/User.js'
import Order from "./models/Order.js"
import Payment from "./models/Payment.js"
import Packet from "./models/Packet.js"
import CategoryLandSale from "./models/CategoryLandSale.js"
import CategoryLandLease from "./models/CategoryLandLease.js"
import LandSale from "./models/LandSale.js"
import LandLease from "./models/LandLease.js"

app.post('/api/auth/reset-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Create a password reset token and set its expiry time
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;

        await user.save();

        // Send the password reset email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_APP,
                pass: process.env.EMAIL_APP_PASSWORD
            }
        });

        const mailOptions = {
            to: user.email,
            from: '"Đặt lại mật khẩu Golden Land"<luongthanhcong533@gmail.com>',
            subject: 'Đặt lại mật khẩu Golden Land',
            text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\nhttps://realstate-client.onrender.com/reset/${resetToken}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`
        };

        transporter.sendMail(mailOptions, function(err) {
            if (err) {
                return res.status(500).json({ message: 'Error sending email' });
            }

            res.status(200).json({ message: 'Password reset email sent' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

//api đặt lại password mới theo token
app.post('/api/auth/reset-password/:token', async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
      const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });

      if (!user) {
          return res.status(400).json({ message: 'Token đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.' });
      }

      // Hash the new password and save it to the user
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json({ message: 'Mật khẩu của bạn đã được đặt lại thành công.' });
  } catch (err) {
      res.status(500).json({ message: 'Lỗi máy chủ.' });
  }
});

//bẫy lỗi trùng đăng ký trong cơ sở dữ liệu và frontend
app.get('/api/checkexist', async (req, res) => {
  const { username, phoneNumber, email } = req.query;

  try {
      if (username) {
          const user = await User.findOne({ username });
          return res.json({ exists: !!user });
      }

      if (phoneNumber) {
          const user = await User.findOne({ phoneNumber });
          return res.json({ exists: !!user });
      }

      if (email) {
          const user = await User.findOne({ email });
          return res.json({ exists: !!user });
      }

      res.status(400).send("Invalid query parameters.");
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error.");
  }
});

const createOrder = async (orderInfo, amount) => {
  // Tạo một đối tượng Order mới
  const order = new Order({
      userId: orderInfo.userId,
      packetId: orderInfo.packetId,
      packetName: orderInfo.packetName,
      customerName: orderInfo.customerName,
      address: orderInfo.address,
      phoneNumber: orderInfo.phoneNumber,
      amount: amount,
      status: 'Đang tiến hành'
  });

  // Lưu đối tượng Order vào cơ sở dữ liệu và trả về ID đơn hàng
  const orderId = await order.save();

  // Trả về ID đơn hàng
  return orderId;
};


//thanh toán VNPAY
const createPaymentUrl = async (orderInfo, amount, orderId, req) => {
  const date = new Date();

  const vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  const returnUrl = "https://realstate-client.onrender.com/success";
  const vnpTmnCode = '5Z1Z1OM0';
  const vnpHashSecret = 'XGYTWMNPIDGGGHEBIUKYUTSOZWKHCBCR';
 
  let vnpParams = {
    'vnp_Version': '2.1.0',
    'vnp_Command': 'pay',
    'vnp_TmnCode': vnpTmnCode,
    'vnp_Locale': 'vn',
    'vnp_CurrCode': 'VND',
    'vnp_TxnRef': orderId._id.toString(),
    'vnp_OrderInfo': 'thanh toan goi dang tin' , // Ví dụ: Thanh toán gói đăng tin ABC
    'vnp_OrderType': '150000', // Mã danh mục hàng hóa, ví dụ: topup
    'vnp_Amount': amount * 100, // Số tiền cần thanh toán, ví dụ: 10000
    'vnp_ReturnUrl': returnUrl,
    'vnp_IpAddr': req.ip, // Địa chỉ IP của khách hàng
    'vnp_CreateDate': date.getFullYear().toString() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2) + ('0' + date.getHours()).slice(-2) + ('0' + date.getMinutes()).slice(-2) + ('0' + date.getSeconds()).slice(-2),
};

vnpParams = sortObject(vnpParams);

for (let key in vnpParams) {
  if (vnpParams.hasOwnProperty(key)) {
    if (key !== 'vnp_ReturnUrl') {
      vnpParams[key] = encodeURIComponent(vnpParams[key]);
    } else {
      vnpParams[key] = decodeURIComponent(vnpParams[key]);
    }
  }
}


// Tạo chuỗi dữ liệu
const signData = querystring.stringify(vnpParams);
const hmac = crypto.createHmac("sha512", vnpHashSecret);
const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");

// Thêm chữ ký vào tham số
vnpParams['vnp_SecureHashType'] = 'SHA512';
vnpParams['vnp_SecureHash'] = signed;

const queryUrl = vnpUrl + '?' + querystring.stringify(vnpParams);

return queryUrl;
};

function sortObject(obj) {
	let sorted = {};
	let str = [];
	let key;
	for (key in obj){
		if (obj.hasOwnProperty(key)) {
		str.push(encodeURIComponent(key));
		}
	}
	str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

app.post('/api/create_order', async (req, res) => {
  const orderInfo = req.body.orderInfo;
  const amount = req.body.amount;


  // Tạo đơn hàng và lấy ID đơn hàng
  const orderId = await createOrder(orderInfo, amount);

  // Tạo URL thanh toán VNPAY
  const paymentUrl = await createPaymentUrl(orderInfo, amount, orderId, req);

  // Trả về URL thanh toán cho khách hàng
  res.status(200).json({ data: paymentUrl });
});


// app.post('/api/update_order_status', async (req, res) => {
//   const orderId = req.body.orderId;
//   const status = req.body.status;

//   // Tạo một phiên giao dịch mới
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     // Tìm đơn hàng bằng ID
//     const order = await Order.findById(orderId).session(session);

//     // Cập nhật trạng thái đơn hàng
//     order.status = status;

//     // Lưu đơn hàng
//     await order.save();

//     if (status === 'Thành công') {
//       // Lấy thông tin gói thanh toán từ cơ sở dữ liệu
//       const packet = await Packet.findById(order.packetId).session(session);

//       // Kiểm tra xem đã có thanh toán cho đơn hàng này chưa
//       const existingPayment = await Payment.findOne({ orderId: orderId }).session(session);

//       if (!existingPayment) {
//         // Lưu thông tin thanh toán vào cơ sở dữ liệu
//         const payment = new Payment({
//           userId: order.userId, // Giả sử rằng đơn hàng có trường userId
//           orderId: orderId,
//           amount: order.amount,
//           packetName: order.packetName, // Sử dụng số tiền từ order
//           status: 'Thành công',
//         });
//         await payment.save({ session });
//       }

//       // Cập nhật trường 'type' của User
//       const user = await User.findById(order.userId).session(session);
//       user.type = packet.name; // Sử dụng tên gói thanh toán từ cơ sở dữ liệu
//       await user.save();
//     }

//     // Hoàn tất giao dịch
//     await session.commitTransaction();

//     // Trả về trạng thái thành công
//     res.status(200).json({ message: 'Order and payment status updated successfully.' });
//   } catch (error) {
//     // Nếu có lỗi, hủy bỏ giao dịch
//     await session.abortTransaction();
//     res.status(500).json({ message: 'An error occurred while updating the order and payment status.' });
//     console.log(error);
//   } finally {
//     // Kết thúc phiên giao dịch
//     session.endSession();
//   }
// });

app.post('/api/update_order_status', async (req, res) => {
  const orderId = req.body.orderId;
  const status = req.body.status;

  try {
    // Tìm đơn hàng bằng ID
    const order = await Order.findById(orderId);

    // Cập nhật trạng thái đơn hàng
    order.status = status;

    // Lưu đơn hàng
    await order.save();

    if (status === 'Thành công') {
      // Lấy thông tin gói thanh toán từ cơ sở dữ liệu
      const packet = await Packet.findById(order.packetId);

      // Kiểm tra xem đã có thanh toán cho đơn hàng này chưa
      let existingPayment = await Payment.findOne({ orderId: orderId });

      if (!existingPayment || existingPayment.status !== 'Thành công') {
        // Nếu không có thanh toán hiện tại hoặc trạng thái hiện tại không phải là 'Thành công'
        // Lưu thông tin thanh toán vào cơ sở dữ liệu
        const payment = existingPayment || new Payment({
          userId: order.userId, // Giả sử rằng đơn hàng có trường userId
          orderId: orderId,
          amount: order.amount,
          packetName: order.packetName, // Sử dụng số tiền từ order
        });
        payment.status = 'Thành công';
        await payment.save();
      }

      // Cập nhật trường 'type' của User
      const user = await User.findById(order.userId);
      user.type = packet.name; // Sử dụng tên gói thanh toán từ cơ sở dữ liệu
      await user.save();
    }

    // Trả về trạng thái thành công
    res.status(200).json({ message: 'Order and payment status updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the order and payment status.' });
    console.log(error);
  }
});


//xóa gói khi hết hạn
cron.schedule('0 5 * * *', async function() {
  try {
    const payments = await Payment.find({}).populate('userId');
    console.log(payments);
    const promises = payments.map(async payment => {
        // Kiểm tra xem gói của người dùng có hết hạn không
        const packageExpirationDate = getPackageExpirationDate(payment.packetName, payment.createdAt);

        if (packageExpirationDate < new Date()) {
            payment.userId.type = undefined;
            payment.userId.markModified('type');
            await payment.userId.save();
        }
    });

    await Promise.all(promises);
  } catch (error) {
    console.error('Error in cron job:', error);
  }
});


app.post('/api/cancel-package', async (req, res) => {
  const orderId = req.body.orderId;
  const cancelReason = req.body.cancelReason;
  console.log(cancelReason);
  console.log(orderId);
  try {
    const order = await Order.findById(orderId).populate('packetId');

    if (!order) {
      res.status(404).json({ message: 'Đơn hàng không tồn tại.' });
      return;
    }

    const paymentTime = new Date(order.createdAt);
    const now = new Date();

    if ((now - paymentTime) / (1000 * 60 * 60 * 24) <= 3) {
      order.status = 'Hủy';
      order.cancelReason = cancelReason;
      await order.save();

      // Tìm và xóa payment tương ứng
      const payment = await Payment.findOne({ orderId: orderId });
      console.log(payment);
      if (payment) {
        await Payment.deleteOne({ _id: payment._id });
      }

      // Tìm và xóa trường type trong User
      const user = await User.findById(order.userId);
      console.log(user);
      if (user) {
        user.type = undefined;
        await user.save();
      }

      res.json({ message: 'Gói dịch vụ và thanh toán tương ứng đã được hủy thành công' });
    } else {
      res.json({ message: 'Rất tiếc, bạn chỉ có thể hủy gói dịch vụ trong vòng 3 ngày sau khi thanh toán.' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Có lỗi xảy ra khi hủy gói dịch vụ.' });
  }
});



function getPackageExpirationDate(packetName, createdAt) {
  const createdAtDate = new Date(createdAt);
  switch (packetName) {
      case 'Gói 1 phút':
        createdAtDate.setMinutes(createdAtDate.getMinutes() + 1);
        return createdAtDate;
      case 'Gói 1 tháng':
        createdAtDate.setDate(createdAtDate.getDate() + 30);
        return createdAtDate;
      case 'Gói 6 tháng':
        createdAtDate.setDate(createdAtDate.getDate() + 180);
        return createdAtDate;
      case 'Gói 12 tháng':
        createdAtDate.setDate(createdAtDate.getDate() + 360);
        return createdAtDate;
      default:
        return createdAtDate;
  }
}

//tìm kiếm 
app.get('/api/property-types', async (req, res) => {
  try {
      const landSaleCategories = await CategoryLandSale.find();
      const landLeaseCategories = await CategoryLandLease.find();

      const propertyTypes = [...landSaleCategories, ...landLeaseCategories];

      res.json(propertyTypes);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/search', async (req, res) => {
  try {
      const { searchTerm, propertyTypeId, priceRange, areaRange } = req.query;

      // Tạo một đối tượng query dựa trên các tham số tìm kiếm
      const query = {};
      if (searchTerm) {
          query.name = { $regex: new RegExp(searchTerm, 'i') };
      }
      if (propertyTypeId && propertyTypeId !== 'all') {
          query.$or = [
              { categoryLandSaleId: propertyTypeId },
              { categoryLandLeaseId: propertyTypeId },
          ];
      }
      if (priceRange && priceRange !== 'all') {
        const [min, max] = priceRange.split('-');
        query.price = { $gte: min, $lte: max };
      }
      if (areaRange && areaRange !== 'all') {
        const [min, max] = areaRange.split('-');
        query.area = { $gte: min, $lte: max };
    }    
      // Thực hiện tìm kiếm trên mỗi mô hình
      const landSales = await LandSale.find(query);
      const landLeases = await LandLease.find(query);

      const results = [...landSales, ...landLeases];

      res.json(results);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  }
});



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Some thing went wrong!" 
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});


app.listen(process.env.PORT || 8800, () => {
    connect()
    console.log("Connected to backend.");
})