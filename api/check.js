// api/check.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { paymentMethodId, amount } = req.body;

  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.status(200).json({ message: "✅ Thẻ có đủ tiền!" });
  } catch (err) {
    res.status(200).json({ message: "❌ Không đủ tiền hoặc thẻ bị từ chối." });
  }
}
