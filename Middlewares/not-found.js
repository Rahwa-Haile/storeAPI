const notFound = (req, res)=>{
    res.status(404).send('route doesnt exist')
}

module.exports = notFound