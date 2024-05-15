import Category from "../models/categoryModel.js";

export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = new Category({name}).save()
        res.status(200).send({
            success: true,
            message: 'category created.',
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error'
        })
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const del = await Category.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'category deleted successfull.'
        })
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: 'err in deleting',
            err
        })
    }
}