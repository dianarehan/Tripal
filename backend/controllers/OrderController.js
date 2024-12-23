const asyncHandler = require("express-async-handler");
const Tourist = require("../models/users/Tourist");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Admin = require("../models/users/Admin");
const { sendEmail } = require("./Mailer");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const sendEmailProduct = async (name, mail, productname, productid) => {
  const subject = `Product Out of Stock`;
  const html = `
    <p>Dear ${name},</p>
    <p>We wanted to inform you that your product: <strong>${productname}</strong> id: <strong>${productid}</strong> is out of stock. Please try to restock as soon as possible.</p>
    <p>If you have any questions or believe this email was a mistake, please <a href="mailto:support@tripal.com">contact support</a>.</p>
    <p>Thank you for your understanding.</p>
    <p>Best regards,</p>
    <p>Your Support Team</p>
  `;

  try {
    await sendEmail(mail, subject, html);
  } catch (error) {}
};

const updateProductQuantity = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId).populate("seller");
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (product.quantity < quantity) {
      return res
        .status(400)
        .json({ message: `Not enough stock for ${product.name}.` });
    }

    product.quantity -= quantity;

    if (product.quantity == 0) {
      product.seller.notificationList.push({
        message: `Your product "${product.name}" is out of stock!`,
      });
      sendEmailProduct(
        product.seller.userName,
        product.seller.email,
        product.name,
        product._id
      );

      const admins = await Admin.find();
      for (const admin of admins) {
        admin.notificationList.push({
          message: `Product "${product.name}" by Seller "${product.seller.userName}" is out of stock!`,
        });
        await admin.save();
      }
      await product.seller.save();

      console.log("finished quantity0");
    }

    await product.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProductSales = async (productId, quantity) => {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    product.sales += quantity;

    await product.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const createOrder = asyncHandler(async (req, res) => {
  const touristId = req.userId;
  const { deliveryAddress, paymentMethod, discountPercentage } = req.body;

  try {
    const tourist = await Tourist.findById({ _id: touristId }).populate(
      "cart.product"
    );
    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found." });
    }

    if (tourist.cart.length === 0) {
      return res
        .status(400)
        .json({ message: "Cart is empty. Please add products to your cart." });
    }

    let totalPrice = 0;
    for (let cartItem of tourist.cart) {
      totalPrice += cartItem.price;
    }

    if (discountPercentage) {
      totalPrice -= totalPrice * (discountPercentage / 100);
    }

    if (paymentMethod === "Wallet") {
      tourist.wallet.amount = tourist.wallet.amount || 0;

      if (tourist.wallet.amount < totalPrice) {
        return res.status(400).json({ error: "Insufficient wallet balance." });
      }

      for (let cartItem of tourist.cart) {
        try {
          await updateProductQuantity(cartItem.product._id, cartItem.quantity);
          await updateProductSales(cartItem.product._id, cartItem.quantity);
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
      }

      tourist.wallet.amount -= totalPrice;

      let pointsToReceive = 0;
      if (tourist.totalPoints <= 100000) {
        pointsToReceive = totalPrice * 0.5;
      } else if (tourist.totalPoints <= 500000) {
        pointsToReceive = totalPrice * 1;
      } else {
        pointsToReceive = totalPrice * 1.5;
      }

      tourist.totalPoints = tourist.totalPoints || 0;
      tourist.currentPoints = tourist.currentPoints || 0;
      tourist.totalPoints += pointsToReceive;
      tourist.currentPoints += pointsToReceive;

      await tourist.save();

      const newOrder = new Order({
        touristId: touristId,
        products: tourist.cart,
        totalPrice: totalPrice,
        deliveryAddress: {
          street: deliveryAddress.street,
          city: deliveryAddress.city,
          zipCode: deliveryAddress.zipCode,
          country: deliveryAddress.country,
        },
        paymentMethod: paymentMethod,
        status: "Pending",
      });

      await newOrder.save();

      tourist.cart = [];
      await tourist.save();

      return res.status(201).json({
        message: "Order created successfully.",
        order: newOrder,
      });
    } else if (paymentMethod === "Cash on Delivery") {
      for (let cartItem of tourist.cart) {
        try {
          await updateProductQuantity(cartItem.product._id, cartItem.quantity);
          await updateProductSales(cartItem.product._id, cartItem.quantity);
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
      }

      const newOrder = new Order({
        touristId: touristId,
        products: tourist.cart,
        totalPrice: totalPrice,
        deliveryAddress: {
          street: deliveryAddress.street,
          city: deliveryAddress.city,
          zipCode: deliveryAddress.zipCode,
          country: deliveryAddress.country,
        },
        paymentMethod: paymentMethod,
        status: "Pending",
      });

      await newOrder.save();

      tourist.cart = [];
      await tourist.save();

      return res.status(201).json({
        message:
          "Order created successfully. Payment will be collected upon delivery.",
        order: newOrder,
      });
    } else if (paymentMethod === "Credit Card") {
      const chosenCurrency = tourist.choosenCurrency || "EGP";
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: tourist.email,
        line_items: tourist.cart.map((product) => ({
          price_data: {
            currency: "egp",
            product_data: {
              name: product.product.name,
            },
            unit_amount: Math.round((product.price * 100) / product.quantity),
          },
          quantity: product.quantity,
        })),
        mode: "payment",
        success_url: `${
          process.env.FRONTEND_URL
        }/products-payment-success?session_id={CHECKOUT_SESSION_ID}&touristId=${touristId}&totalPrice=${totalPrice}&deliveryAddress=${encodeURIComponent(
          JSON.stringify(deliveryAddress)
        )}`,
        cancel_url: `${process.env.FRONTEND_URL}/cart`,
      });

      return res.status(200).json({
        message: "Redirecting to payment.",
        sessionId: session.id,
      });
    } else {
      return res.status(400).json({ message: "Invalid payment method." });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the order.",
      error: error.message,
    });
  }
});

const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found." });
    }
    if (order.status === "Cancelled") {
      return res.status(400).json({ message: "Order is already cancelled." });
    }
    if (order.status === "Shipped") {
      return res
        .status(400)
        .json({ message: "Can't cancel order. Order is already shipped." });
    }
    if (order.status === "Delivered") {
      return res
        .status(400)
        .json({ message: "Can't cancel order. Order is already delivered." });
    }

    order.status = "Cancelled";
    await order.save();

    const touristId = req.userId;
    const tourist = await Tourist.findById(touristId);

    if (!tourist) {
      return res.status(404).json({ message: "Tourist not found" });
    }

    const newWalletAmount = tourist.wallet.amount + order.totalPrice;
    tourist.wallet.amount = newWalletAmount;
    await tourist.save();

    res.status(200).json({
      message: "Order cancelled successfully.",
      orderPrice: order.totalPrice,
      newWalletAmount,
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while cancelling the order.",
      error: error.message,
    });
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const touristId = req.userId;
  try {
    const orders = await Order.find({ touristId });

    if (!orders || orders.length === 0) {
      res.status(200).json({ orders: [] });
    } else {
      res.status(200).json({ orders });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders. Please try again later." });
  }
});

const completeOrder = asyncHandler(async (req, res) => {
  const {
    sessionId,
    touristId,
    totalPrice,
    deliveryAddress,
    paymentMethod,
    discountPercentage,
  } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not successful." });
    }

    const tourist = await Tourist.findById(touristId).populate("cart.product");
    if (!tourist) {
      return res.status(404).json({ error: "Tourist not found." });
    }

    let pointsToReceive = 0;
    if (tourist.totalPoints <= 100000) {
      pointsToReceive = totalPrice * 0.5;
    } else if (tourist.totalPoints <= 500000) {
      pointsToReceive = totalPrice * 1;
    } else {
      pointsToReceive = totalPrice * 1.5;
    }

    tourist.totalPoints = tourist.totalPoints || 0;
    tourist.currentPoints = tourist.currentPoints || 0;
    tourist.totalPoints += pointsToReceive;
    tourist.currentPoints += pointsToReceive;

    await tourist.save();

    const newOrder = new Order({
      touristId: touristId,
      products: tourist.cart,
      totalPrice: totalPrice,
      deliveryAddress: {
        street: deliveryAddress.street,
        city: deliveryAddress.city,
        zipCode: deliveryAddress.zipCode,
        country: deliveryAddress.country,
      },
      paymentMethod: paymentMethod,
      status: "Pending",
    });

    await newOrder.save();

    tourist.cart = [];
    await tourist.save();

    return res.status(201).json({
      message:
        "Order created successfully. Payment will be collected upon delivery.",
      order: newOrder,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = {
  createOrder,
  cancelOrder,
  getOrders,
  completeOrder,
  getOrderById,
};
