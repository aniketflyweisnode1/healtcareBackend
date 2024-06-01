import Services from "../model/services";

export const addServices = async (req, res) => {
  try {
    const { services } = req.body;

    const newServices = new Services({ services });
    const data = await newServices.save();

    res.status(201).json({
      message: "Services added",
      statusCode: 201,
      data: data,
    });
  } catch (error) {
    console.error("Error adding services:", error);

    res.status(500).json({
      message: "Error in adding services",
      error: error.message,
      statusCode: 500,
    });
  }
};

export const getServicesList = async (req, res) => {
  const { id } = req.params;
  try {
    const services = await Services.find();
    res.status(200).json({
      message: "Services list  fetched successfully",
      statusCode: 200,
      data: services,
    });
  } catch (error) {
    console.error("Error fetching services:", error);

    res.status(500).json({
      message: "Error in fetching services",
      error: error.message,
      statusCode: 500,
    });
  }
};

export const servicesGetbyId = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Services.findById(id);

    if (!service) {
      return res.status(404).json({ message: "service not found" });
    }

    return res
      .status(200)
      .json({ message: "service details  successfully", service });
  } catch (error) {
    console.error("Error updating service details:", error);
    return res
      .status(500)
      .json({ message: "Error service category details", error });
  }
};

export const updateServicesDetails = async (req, res) => {
  const { id } = req.body;
  const updateFields = req.body;

  try {
    const services = await Services.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!services) {
      return res.status(404).json({ message: "services not found" });
    }

    return res
      .status(200)
      .json({ message: "services details updated successfully", services });
  } catch (error) {
    console.error("Error updating services details:", error);
    return res
      .status(500)
      .json({ message: "Error updating services details", error });
  }
};

export const servicesdeleteById = async (req, res) => {
  const { id } = req.params;

  try {
    const services = await Services.findByIdAndDelete(id);

    if (!services) {
      return res.status(404).json({ message: "services not found" });
    }

    return res.status(200).json({ message: "services deleted successfully" });
  } catch (error) {
    console.error("Error deleting services:", error);
    return res.status(500).json({ message: "Error deleting category", error });
  }
};
