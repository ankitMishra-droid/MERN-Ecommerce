import stripe from "../../config/stripe.js";
import { Order } from "../../models/order.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

async function getListItems(listItems) {
  let productItems = [];

  if (listItems?.data?.length) {
    for (const items of listItems.data) {
      const product = await stripe.products.retrieve(items.price.product);
      const productId = product.metadata.productId;

      const productData = {
        productId: productId,
        name: product.name,
        price: items.price.unit_amount / 100,
        quantity: items.quantity,
        image: product.images,
      };

      productItems.push(productData);
    }
  }
  return productItems;
}

const webhooks = asyncHandler(async (req, res) => {
  const sig = req.headers["stripe-signature"];

  const payloadString = JSON.stringify(req.body);

  const header = stripe.webhooks.generateTestHeaderString({
    payload: payloadString,
    secret: endpointSecret,
  });

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      payloadString,
      header,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const lineitems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      const productDetails = await getListItems(lineitems);

      const orderDetails = {
        productDetails: productDetails,
        email: session.customer_details.email,
        userId: session.metadata.userId,
        paymentDetails: {
          paymentId: session.payment_intent,
          payment_method_type: session.payment_method_types,
          payment_status: session.payment_status
        },
        shipping_option: session.shipping_options.map(s => {
          return {
            ...s,
            shipping_amount: s.shipping_amount / 100
          }
        }),
        total_amount: session.amount_total / 100
      };

      const order = new Order(orderDetails);
      const orderSaved = await order.save();
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send();
});

export default webhooks;
