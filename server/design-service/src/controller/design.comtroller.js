import desigenModel from "../models/design.js";

const getUserDesigns = async (req, res) => {
  try {
    // const userId = req.user.userId;
    const userId = req.userId;

    console.log("userID getUserDesigns",userId)
    console.log("collection:", desigenModel.collection.name)

    const designs = await desigenModel.find({ userId: userId  })

    if (!designs) {
      res.status(404).json({
        success: false,
        message: "No designs avalable ",
      });
    }
    console.log("designs",designs)

    res.status(200).json({
      success: true,
      data: designs,
      message: "getUserDesigns featched successfully",
    });
    
  } catch (error) {
    console.log("Error featching design of user", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Failed to fetch design ",
    });
  }
};

const getUserDesignByID = async (req, res) => {
  try {
    // const userId = req.user.userId;
        const userId = req.userId;
    const designId = req.params.id;

    const design = await desigenModel.findById({ _id: designId, userId });

    if (!design) {
      res.status(404).json({
        success: false,
        message: " designs not found or u dont have permission to view it ",
      });
    }
    res.status(200).json({
      success: true,
      data: design,
      message: "getUserDesigns featched successfully",
    });
  } catch (error) {
    console.log("Error featching design by ID", error);
    res.status(500).json({
      success: false,
   message: error?.message || "Failed to fetch design ",
    });
  }
};

const saveDesign = async (req, res) => {
  try {
    // const userId = req.user.userId;
        const userId = req.userId;
    const { designId, name, canvasData, width, height, category } = req.body;

    if (designId) {
      const design = await desigenModel.findById({ _id: designId, userId });

      if (!design) {
        res.status(404).json({
          success: false,
          message: " designs not found or u dont have permission to view it ",
        });
      }
      if (name) design.name = design;
      if (canvasData) design.canvasData = canvasData;
      if (width) design.width = width;
      if (height) design.height = height;
      if (category) design.category = category;

      design.updatedAt = Date.now();

      const updatedDesign = await design.save();

      res.status(200).json({
        success: true,
        data: updatedDesign,
        message: "updated  successfully",
      });
    } else {
      const newlyCreated = new desigenModel({
        userId,
        name: name || "untitled",
        canvasData,
        width,
        height,
        category,
      });

      const saveDesign = await newlyCreated.save();
      res.status(200).json({
        success: true,
        data: saveDesign,
        message: "created canaves",
      });
    }
  } catch (error) {
    console.log("Error while saving design", error);
    res.status(500).json({
      success: false,
      message: error?.message || "Failed to save design ",
    });
  }
};

const DeletDesign = async (req, res) => {
  try {
    // const userId = req.user.userId;
        const userId = req.userId;
    const designId = req.params.id;
    const design = await desigenModel.findById({ _id: designId, userId });
    if (!design) {
      res.status(404).json({
        success: false,
        message: " designs not found or u dont have permission to delet  it ",
      });
    }

    await design.deleteOne({ _id: designId });

    res.status(200).json({
      success: false,
      message: " design deleted successfully",
    });
  } catch (error) {
    console.log("Error while DeletDesign", error);
    res.status(500).json({
      success: false,
    message: error?.message || "Failed to dlete design ",
    });
  }
};

export { getUserDesigns, getUserDesignByID, saveDesign, DeletDesign };
