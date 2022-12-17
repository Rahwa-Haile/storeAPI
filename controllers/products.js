const Product = require('../models/products')
require('express-async-errors')

const getAllProductsStatic = async (req, res)=>{
    // throw new Error('Testing async error')
    const search = 'ab'
    const products = await Product.find({name: {$regex: search, $options: 'i'}})
    
    res.status(200).json({ products, noOfhits: products.length })
}
const getAllProducts = async (req, res)=>{
    const {featured, company, name} = req.query
    const queryObject = {}

    if(featured){
        // queryObject.featured = featured
        queryObject.featured = featured==='true' ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        queryObject.name = { $regex: name, $options: 'i'}
    }
    console.log(queryObject)

    const products = await Product.find(queryObject)
    res.status(200).json({ products, noOfhits: products.length })
}

module.exports = { getAllProductsStatic, getAllProducts }