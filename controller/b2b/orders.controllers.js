const Orders = require("./../../model/orders.model")

exports.fetchOrders = async(req, res, next)=>{
    let {start,end} = req.body;
    let start_date = new Date(start)
    let start_date_count = start_date.getTime();
    console.log(start)

    let end_date = new Date(end)
    let end_date_count = end_date.getTime();
    console.log(end_date_count)

    const orders = await Orders.find();
    let filterOrders = []

    for(const el of orders){
        let elDate =`${el.created_at.split(",")[0].split("/")[2]}-${el.created_at.split(",")[0].split("/")[0]}-${el.created_at.split(",")[0].split("/")[1]}`
        console.log(elDate)
        let date = new Date(elDate)
        console.log(date)
 
        let order_Milisecond = date.getTime();
        console.log(order_Milisecond)
        if(Number(order_Milisecond) >= Number(start_date_count) && Number(order_Milisecond) <= Number(end_date_count) ){
            const populatedEl = await el.populate('user_id'); // await karo
            filterOrders.push(populatedEl)
            // const populatedEl = await el.populate('user_id');
        }
        
    }

    console.log(filterOrders)



    res.status(200).json({
        status : "success",
        data : {
            orders : filterOrders
        }
    })
}

exports.changeStatus = async(req, res, next)=>{
    const {data, start,end, id} = req.body
    const order = await Orders.findById(id)
    console.log(data)
    if(data.type == 'delivery'){
        order.delivery_status = data.status
    }else if(data.type == 'transit'){
        order.transit_status = data.status 
    }else if(data.type == 'payment'){
        order.payment_status = data.status
    }else if(data.type == 'cancel'){
        order.cancel_status = data.status
    }else if(data.type == 'vendor'){
        order.send_to_vendor = data.status
    }else if(data.type == 'return'){
        order.return_status = data.status
    }else if(data.type == 'refund'){
        order.refund_status = data.status
    }
    await order.save()

    next();

}

exports.returnOrders = async(req, res, next)=>{
    let {startDate,endDate} = req.body;
    console.log(startDate)
    let start_date = new Date(startDate)
    let start_date_count = start_date.getTime();
    console.log(start_date_count)

    let end_date = new Date(endDate)
    let end_date_count = end_date.getTime();
    console.log(end_date_count)

    const orders = await Orders.find();
    let filterOrders = []

    orders.forEach(async el=>{
        let elDate =`${el.created_at.split(",")[0].split("/")[2]}-${el.created_at.split(",")[0].split("/")[1]}-${el.created_at.split(",")[0].split("/")[0]}`
        let date = new Date(elDate)
        let order_Milisecond = date.getTime();
        console.log(order_Milisecond)

        if(el.cancel_status=='cancelled'){
            filterOrders.push(el)
        }
        if((Number(order_Milisecond) >= Number(start_date_count) && Number(order_Milisecond) <= Number(end_date_count))  ){
            // console.log(el.cancel_status)
            // const populatedEl = await el.populate('user_id');
        }
        
    })



    res.status(200).json({
        status : "success",
        data : {
            returns : filterOrders
        }
    })
}

exports.returns = async(req, res, next)=>{
    const orders = await Orders.find();

    const sku = []

    orders.forEach(el=>{
        if(el.cancel_status == 'partially cancelled'){
            el.order_items.forEach(item=>{
                if(item.return && item.refund == 'Pending'){
                    sku.push({item, razorpay_payment_id : el.razorpay_payment_id, order_id : el._id})
                }
            })
        }else if(el.cancel_status == 'cancelled'){
            el.order_items.forEach(item=>{
                sku.push({item, razorpay_payment_id : el.razorpay_payment_id, order_id : el._id})
            })
        }
    })

    res.status(200).json({
        status : "success",
        data : {
            returns : sku
        }
    })
}

const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.InitiateRefunds = async(req, res, next)=>{
    const {paymentId, amount, order_id, sku_id} = req.body;
    console.log(paymentId, amount, order_id, sku_id)
    const refund = await razorpay.payments.refund(paymentId, {
      amount: amount * 100, // INR to paise
    });
    console.log(refund)
    const order = await Orders.findById(order_id);
    order.order_items.forEach(item=>{
        if(JSON.stringify(item._id) == JSON.stringify(sku_id))
        item.refund = "Refunded",
        item.refund_id = refund.id,
        item.razorpay_refund_status = refund.status,
        item.refund_initiated_at = refund.created_at 
    })

    await order.save(); 

    res.status(200).json({
        status : "success",
        data : {
            msg : "Refund Initiated"
        }
    })

}


