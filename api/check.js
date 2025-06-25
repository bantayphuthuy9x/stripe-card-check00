const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const { paymentMethodId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirm: true,
      capture_method: "manual"
    });

    if (paymentIntent.status === "requires_capture") {
      res.json({ message: "✅ Thẻ còn đủ tiền và hợp lệ." });
    } else {
      res.json({ message: "❌ Giao dịch không thành công." });
    }
  } catch (error) {
    res.json({ message: "❌ Lỗi: " + error.message });
  }
};
