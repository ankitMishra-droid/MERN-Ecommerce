import stripe from "../../config/stripe.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

const webhooks = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  const payloadString = JSON.stringify(req.body)

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret
  })
  let event;

  try {
    event = stripe.webhooks.constructEvent(payloadString, header, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  res.status(200).send()
});


export default webhooks