import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 7 * 24 * 60 * 60 }, // 7 days in seconds
});

export default mongoose.models.RefreshToken || mongoose.model("RefreshToken", refreshTokenSchema);
