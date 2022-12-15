const Product = require('../models/products')
require('express-async-errors')

const getAllProductsStatic = async (req, res)=>{
    // throw new Error('Testing async error')
    const products = await Product.find()
    res.status(200).json({ products })
}
const getAllProducts = (req, res)=>{
    res.status(200).json({ msg: 'Products route'})
}

module.exports = { getAllProductsStatic, getAllProducts }