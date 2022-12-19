const Product = require('../models/products')
require('express-async-errors')

const getAllProductsStatic = async (req, res)=>{
    // throw new Error('Testing async error')
    const search = 'ab'
    // const products = await Product.find({name: {$regex: search, $options: 'i'}})
    const products = await Product.find()
        .sort('name -price')
        .select('name price createdAt')
        .limit(10)
        .skip(5)
    res.status(200).json({ products, noOfhits: products.length })
}
const getAllProducts = async (req, res)=>{
    const {featured, company, name, sort, fields} = req.query
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
    if(fields){
        const selectedFields = fields.split(',').join(' ')
        result = result.select(selectedFields)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page-1) * limit

    const products = await result.limit(limit).skip(skip)
    res.status(200).json({ products, noOfhits: products.length })
}

module.exports = { getAllProductsStatic, getAllProducts }