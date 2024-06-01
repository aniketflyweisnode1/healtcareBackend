import Category from "../model/categories";



export const addCategories = async (req, res) => {
    try {
      const { categories } = req.body;
  
      // Validate categories input
      if (!categories || !Array.isArray(categories)) {
        return res.status(400).json({
          message: "Categories must be an array of strings",
          statusCode: 400
        });
      }
  
      const newCategory = new Category({ categories });
      const data = await newCategory.save();
  
      res.status(201).json({
        message: "Categories added",
        statusCode: 201,
        data: data
      });
    } catch (error) {
      console.error("Error adding categories:", error);
  
      res.status(500).json({
        message: "Error in adding categories",
        error: error.message,
        statusCode: 500
      });
    }
  };

  export const getCategories = async (req, res) => {
    const{id}=req.params;
    try {
      const categories = await Category.find();
      res.status(200).json({
        message: "Categories fetched successfully",
        statusCode: 200,
        data: categories
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
  
      res.status(500).json({
        message: "Error in fetching categories",
        error: error.message,
        statusCode: 500
      });
    }
  };


  export const getbyId = async (req, res) => {
    const { id } = req.params;
  
    try {
      const category = await Category.findById(id);
  
      if (!category) {
        return res.status(404).json({ message: 'category not found' });
      }
  
      return res.status(200).json({ message: 'Category details  successfully', category });
    } catch (error) {
      console.error('Error updating patient details:', error);
      return res.status(500).json({ message: 'Error updating category details', error });
    }
  };





  export const updateCategoryDetails = async (req, res) => {
    const { id } = req.body; 
    const updateFields = req.body;
  
    try {
      const category = await Category.findByIdAndUpdate(id, updateFields, { new: true });
  
      if (!category) {
        return res.status(404).json({ message: 'category not found' });
      }
  
      return res.status(200).json({ message: 'Category details updated successfully', category });
    } catch (error) {
      console.error('Error updating patient details:', error);
      return res.status(500).json({ message: 'Error updating category details', error });
    }
  };


  export const deleteById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        return res.status(500).json({ message: 'Error deleting category', error });
    }
};