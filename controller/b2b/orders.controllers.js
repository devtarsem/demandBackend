const Orders = require("./../../model/orders.model")

exports.fetchOrders = async(req, res, next)=>{
    let {start,end} = req.body;
    
    let start_date = new Date(start)
    let start_date_count = start_date.getTime();

    let end_date = new Date(end)
    let end_date_count = end_date.getTime();

    const orders = await Orders.find();
    let filterOrders = []

    orders.forEach(async el=>{
        let elDate =`${el.created_at.split(",")[0].split("/")[2]}-${el.created_at.split(",")[0].split("/")[1]}-${el.created_at.split(",")[0].split("/")[0]}`
        let date = new Date(elDate)
        let order_Milisecond = date.getTime();

        if(Number(order_Milisecond) >= Number(start_date_count) && Number(order_Milisecond) <= Number(end_date_count) ){
            filterOrders.push(el)
            // const populatedEl = await el.populate('user_id');
        }
        
    })



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

