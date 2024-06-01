import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema(
  {
    services: {
      type: [String], 
    }
  },
  { timestamps: true }
);

const Services = mongoose.model("Services", servicesSchema);

export default Services;
