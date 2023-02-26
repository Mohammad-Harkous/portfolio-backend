import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
  {
    adress: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    whatsapp: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Contact", contactSchema);
