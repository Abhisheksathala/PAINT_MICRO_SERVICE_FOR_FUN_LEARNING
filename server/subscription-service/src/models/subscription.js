import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    isPremium : {
      type: Boolean,
      default: false,
    },
    paymentId: {
      type: String,
    },
    premimumSince: {
      type: Date,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const SubscriptionModel = mongoose.model("Subscription", subscriptionSchema);

 

export default SubscriptionModel;