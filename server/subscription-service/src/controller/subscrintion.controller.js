import SubscriptionModel
  from "../models/subscription.js";


export const getsubscribtion = async (req, res) => {
  const userId = req?.userId
  console.log("userId", userId);
  try {
    const subscription = await SubscriptionModel.findOne({ userId: userId });
    if (!subscription) {
      subscription = new SubscriptionModel({ userId: userId })
    }
    return res.status(200).json({
      success: true,
      data: {
        isPremium: subscription.isPremium,
        premimumSince: subscription.premimumSince,
      },
      message: "Subscription featch successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

