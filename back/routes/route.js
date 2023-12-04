const express=require('express');
const { makepayment, getcoupons, createcoupon } = require('../controller/control');
const router=express.Router();



router.post('/create_payment',makepayment);
router.post('/createcoupon',createcoupon);
router.get('/getallcoupons',getcoupons);


module.exports = router;
