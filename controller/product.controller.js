const Product = require("./../model/products.model");


exports.addProductToDB = async(req, res)=>{
    const {data} = req.body;

    data.forEach(async el=>{
        const prod = await Product.create({
            name : el.name,
            description : el.description,
            brand : el.brand,
            catagory : el.catagory,
            price : el.price,
            discount : el.discount,
            sizes : el.sizes,
            colors : el.colors,
            rating : el.rating,
            review_count : el.review_count,
            stock : el.stock,
            images : el.images,
            tags : el.tags,
            sku : el.sku,
            created_at : el.created_at,
            updated_at : el.updated_at,
        })
    })

    res.status(200).json({
        status : 'success',
        data : {
            msg : "product-added"
        }
    })
}

exports.fetchProducts = async(req, res)=>{
    const {start,end} = req.body;
    console.log(start,end)
    let products = await Product.find()
    products = products.splice(start,end);
    console.log(products)
    res.status(200).json({
        status : 'success',
        data : {
            products : products
        }
    })
}