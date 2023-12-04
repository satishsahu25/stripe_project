const couponmodel=require('../db/couponmodel');
const historymodel=require('../db/historymodel');
require('dotenv').config();
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY);


const createcoupon = async (req, res) => {
  const { name, amount } = req.body;

  try {
    const data = await couponmodel.create({ name: name, amount: amount });

    res.json({ data: data });
  } catch (err) {
    res.send(err);
  }
};

const getcoupons = async (req, res) => {
  try {
    const allcopoun = await couponmodel.find();

    res.json({data:allcopoun});
  } catch (err) {
    res.json({err:err});
  }
};

let counter=0;
const makepayment=async(req,res)=>{

  let {amount,discount}=req.body;
    amount=Number(amount);
      counter=counter+1;

      try{
        const createLineItems = [{
          price_data: {
            currency: "usd",
            product_data: {
            name:"Payment "+counter
            },
            unit_amount:amount*100
          },
          quantity: 1,
        }];
  
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: createLineItems,
          mode: "payment",
          success_url: "http://localhost:3000/",
          cancel_url: "http://localhost:3000/",
        });
       
          const payment=await historymodel.create({amount: amount, discount: discount});
          res.send({
            status:"success",
            payurl:session.url
          })
      }catch(err){
        res.send(err);
      };
  
    


}
module.exports = {createcoupon,getcoupons,makepayment};
