const Vendor = require("./../../model/b2b/vendors.model")


exports.AddVendors = async(req, res, next)=>{
    const {data} = req.body;

    await Vendor.create({name : data.name, catagory : data.catagory, address : data.address, phone : data.phone});

    next()
}

exports.updatingVendor = async(req, res, next)=>{
    const {data} = req.body;
    const findVendor = await Vendor.findById(data._id);
    findVendor.name = data.name
    findVendor.phone = data.phone
    findVendor.catagory = data.catagory
    findVendor.payable = data.payable
    findVendor.receiable = data.receiable
    findVendor.address = data.address
    findVendor.save()
    next()
}

exports.deleteVendors = async(req, res, next)=>{
    const {list} = req.body;
    await Promise.all(
      list.map(id => Vendor.findByIdAndDelete(id))
    );
    next()
}

exports.sendingAllVendors = async(req, res, next)=>{
    const vendors = await Vendor.find();
    res.status(200).json({
        status : "success",
        data: {
            vendors : vendors
        }
    })
}