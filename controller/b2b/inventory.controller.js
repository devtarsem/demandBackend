const Product = require("./../../model/products.model");
const Products = require("./../../model/products.model")


exports.fetchProducts = async(req, res, next)=>{
    const products = await Products.find();

    res.status(200).json({
        status : "success",
        data : {
            products : products
        }
    })
}


exports.updateProducts = async(req, res, next)=>{
    const {product} = req.body;
    console.log(product)
    const find_product = await Products.findById(product._id);
    find_product.name = product.name
    find_product.description = product.description
    find_product.brand = product.brand
    find_product.price = product.price
    find_product.discount = product.discount
    find_product.sizes = product.sizes
    find_product.colors = product.colors
    find_product.stock = product.stock
    find_product.tags = product.tags
    find_product.sku = product.sku
    find_product.created_at = product.created_at
    find_product.updated_at = product.updated_at

    find_product.save();

    next();
}


exports.sendingUpdatedProductsAfterUpdation = async(req, res, next)=>{
    const products = await Products.find();
    res.status(200).json({
        status : "success",
        data : {
            products : products
        }
    })
}

exports.deleteProducts = async(req, res, next)=>{
    const { list } = req.body;

    await Promise.all(
      list.map(id => Product.findByIdAndDelete(id))
    );

    const products = await Product.find();

    res.status(200).json({
      status: "success",
      data : {
        products 
      }
    });
}

exports.addProducts = async(req, res, next)=>{
    const {data} = req.body;

    const add = await Product.create({
        name : data.name,
        description : data.des,
        brand : data.brand,
        price : data.price,
        discount : data.discount,
        sizes : data.sizes,
        colors : data.colors,
        rating  : 5,
        review_count : 1,
        stock : data.stock,
        Images : data.images,
        tags : data.tags,
        sku : data.sku,
        created_at : new Date().toLocaleDateString(),
        updated_at : new Date().toLocaleDateString(),
    })



    next();
}