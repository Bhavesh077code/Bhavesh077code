import { Event } from "../module/eventModel.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    if (!title || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    if(!req.file) {
      return res.status(400).json({
        success:false,
        message:"Image is required",
      });
    }


    const event = await Event.create({
      title,
      description,
      location,
      image: req.file.path,
      user: req.user._id,
    });

    return res.status(200).json({
      success:true,
      message:"Event created successfully",
      event,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Error creating event"
    });
  }
};
