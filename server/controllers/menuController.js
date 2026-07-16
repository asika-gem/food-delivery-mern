import Menu from "../models/MenuItem.js";
import Restaurant from "../models/Restaurant.js";
import cloudinary from "../config/cloudinary.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js"

export const createMenu = async (req, res) => {
  try {
    const { restaurant, name, description, category, price } = req.body;

    const existingRestaurant = await Restaurant.findById(restaurant);

    if (!existingRestaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    if (existingRestaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

 

  let image = "";

  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, "menu");
    image = result.secure_url;
  }
    const menu = await Menu.create({
      restaurant,
      name,
      description,
      category,
      price,
      image,
    });

    res.status(201).json({
      success: true,
      menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get My Menus
export const getMyMenus = async (req, res) => {
  try {
    // Find the logged-in owner's restaurant
    const restaurant = await Restaurant.findOne({
      owner: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
        menus: [],
      });
    }

    // Get all menu items for this restaurant
    const menus = await Menu.find({
      restaurant: restaurant._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: menus.length,
      menus,
    });
  } catch (error) {
    console.error("getMyMenus Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate("restaurant", "name");

    res.status(200).json({
      success: true,
      menus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate(
      "restaurant",
      "name",
    );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getRestaurantMenu = async (req, res) => {
  try {
    const menus = await Menu.find({
      restaurant: req.params.restaurantId,
    });

    res.status(200).json({
      success: true,
      menus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    const restaurant = await Restaurant.findById(menu.restaurant);

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (req.body.name) menu.name = req.body.name;
    if (req.body.description) menu.description = req.body.description;
    if (req.body.category) menu.category = req.body.category;
    if (req.body.price) menu.price = req.body.price;
    if (req.body.isAvailable !== undefined)
      menu.isAvailable = req.body.isAvailable;
if (req.file) {
  const result = await uploadToCloudinary(req.file.buffer, "menu");
  image = result.secure_url;
}
    
    await menu.save();

    res.status(200).json({
      success: true,
      message: "Menu updated successfully",
      menu,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu not found",
      });
    }

    const restaurant = await Restaurant.findById(menu.restaurant);

    if (restaurant.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await menu.deleteOne();

    res.status(200).json({
      success: true,
      message: "Menu deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};