const Product = require('../models/products')
require('express-async-errors')

const getAllProductsStatic = async (req, res)=>{
    // throw new Error('Testing async error')
    const search = 'ab'
    // const products = await Product.find({name: {$regex: search, $options: 'i'}})
    const products = await Product.find().sort('-name -price')
    res.status(200).json({ products, noOfhits: products.length })
}
const getAllProducts = async (req, res)=>{
    const {featured, company, name, sort} = req.query
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
    // console.log(queryObject)
   
     let result = Product.find(queryObject)
     if(sort){
        const sortedList = sort.split(',').join(' ')
        console.log(sortedList)
        result = result.sort(sortedList)
    }
    else{
        result = result.sort('createdAt')
    }
    const products = await result
    res.status(200).json({ products, noOfhits: products.length })
}

module.exports = { getAllProductsStatic, getAllProducts }