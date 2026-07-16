import Restaurant from "../models/Restaurant.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

// Create Restaurant
export const createRestaurant = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    let profileImage = "";
    let coverImage = "";

    // Upload Profile Image
    
     if (req.files?.profileImage?.length > 0) {
       const result = await uploadToCloudinary(
         req.files.profileImage[0].buffer,
         "restaurants/profile",
       );

       profileImage = result.secure_url;
     }
    

    // Upload Cover Image
    if (req.files?.coverImage?.length > 0) {
      const result = await uploadToCloudinary(
        req.files.coverImage[0].buffer,
        "restaurants/cover",
      );

      coverImage = result.secure_url;
    }

    const restaurant = await Restaurant.create({
      owner: req.user._id,
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      phone: req.body.phone,
      cuisine: req.body.cuisine ? req.body.cuisine.split(",") : [],
      deliveryTime: req.body.deliveryTime,
      profileImage,
      coverImage,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get My Restaurant
export const getMyRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      owner: req.user.id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get All Restaurants
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("owner", "name email");

    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Restaurant
export const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate(
      "owner",
      "name email",
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Update Restaurant
export const updateRestaurant = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    // Only owner can update
    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Update text fields only if provided
    if (req.body?.name) {
      restaurant.name = req.body.name;
    }

    if (req.body?.description) {
      restaurant.description = req.body.description;
    }

    if (req.body?.address) {
      restaurant.address = req.body.address;
    }

    if (req.body?.phone) {
      restaurant.phone = req.body.phone;
    }

    if (req.body?.deliveryTime) {
      restaurant.deliveryTime = req.body.deliveryTime;
    }

    if (req.body?.cuisine) {
      restaurant.cuisine = Array.isArray(req.body.cuisine)
        ? req.body.cuisine
        : req.body.cuisine.split(",");
    }

    // Upload Profile Image
    if (req.files?.profileImage?.length > 0) {
  const result = await uploadToCloudinary(
    req.files.profileImage[0].buffer,
    "restaurants/profile"
  );

  restaurant.profileImage = result.secure_url;
}
      

    // Upload Cover Image
  if (req.files?.coverImage?.length > 0) {
    const result = await uploadToCloudinary(
      req.files.coverImage[0].buffer,
      "restaurants/cover",
    );

    restaurant.coverImage = result.secure_url;
  }
console.log(req.files);
    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Restaurant updated successfully",
      restaurant,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Delete Restaurant
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await restaurant.deleteOne();

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
