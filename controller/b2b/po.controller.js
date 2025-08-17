const PO = require("./../../model/b2b/po.model")

exports.addPO = async(req, res, next)=>{
    const {vendor, bill, tax, sku} = req.body;
    console.log(vendor)
    const makePO = await PO.create({vendor_id : vendor, SKU : sku, total_bill : bill, tax : tax})

    res.status(200).json({
        status : 'success',  
        data : {
            msg : "PO added"
        }
    }) 
 
}