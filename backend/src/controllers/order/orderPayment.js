import stripe from "../../config/stripe.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/UserModel.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const orderPayment = asyncHandler(async (req, res) => {
  try {
    const { cartItems } = req.body;

    // console.log("cartitem: ", cartItems);

    const user = await User.findOne({ _id: req.user?._id });

    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: process.env.SHIPPING_RATE_SECRET_KEY,
        },
      ],
      customer_email: user.email,
      metadata: {
        userId : String(req.user._id)
      },
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: item.productId.productName,
              // images: item.productId.brandName,
              images: item.productId.productImg,
              metadata: {
                productId: item.productId._id,
              },
            },
            unit_amount: item.productId.selling * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1
          },
          quantity: item.quantity
        };
      }),
      success_url: `${process.env.FRONTEND_URL}/success`, 
      cancel_url: `${process.env.FRONTEND_URL}/cancel`, 
    };

    const session = await stripe.checkout.sessions.create(params);

    return res
      .status(303)
      .json(new ApiResponse(200, session, "Payment SuccessFull"));
  } catch (error) {
    return res
      .status(400)
      .json({
        message: error?.message || error,
        error: true,
        success: false
      });
  }
});

export default orderPayment;
