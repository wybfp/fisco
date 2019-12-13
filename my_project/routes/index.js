var express = require('express');
var router = express.Router();
var api=require('../nodejs-sdk/packages/api/index.js');
var web3j=new api.Web3jService();
var ad="0xf18b20ef02bbac594755ee8e778415bfb967b5c8";

/* GET home page. */
router.get('/', function(req, res, next) {
  const jade=require('jade');
  var str=jade.renderFile('./views/index.jade',{
    pretty:true, //格式化
    title:"Welcome to Fisco Bcos App",
    isDeploy:true,
    choices:100
  })
  res.status(200).send(str);
});
router.get('/deploy', function(req, res, next) {
  if(!req.cookies.contractAddress){
    var promise=web3j.deploy("public/contracts/main.sol","public/deploy/");
  promise.then((value)=>{
    console.log(value);
    res.cookie("contractAddress",ad,{maxAge:"10000000",httpOnly:false});
    const jade=require('jade');
    var str=jade.renderFile('./views/index.jade',{
      pretty:true, //格式化
      title:"合约已部署",
      isDeploy:false,
      choices:100
    })
    res.status(200).send(str);
  })
  }
  else{
    const jade=require('jade');
    var str=jade.renderFile('./views/index.jade',{
      pretty:true, //格式化
      title:"Welcome to Fisco Bcos App",
      isDeploy:false,
      choices:100
    })
    res.status(200).send(str);
  }
});
router.get('/listCompany', function(req, res, next) {
  var promise=web3j.call(req.cookies.contractAddress,"listCompany()",[]);
  promise.then((value)=>{
    console.log(value);
    if(value.result.status==0x0){
      const jade=require('jade');
      var str=jade.renderFile('./views/index.jade',{
        pretty:true, //格式化
        title:"打印厂家",
        isDeploy:false,
        choices:100
      })
      res.status(200).send(str);
    }
  })
});
router.get('/listBank', function(req, res, next) {
  var promise=web3j.call(req.cookies.contractAddress,"listBank()",[]);
  promise.then((value)=>{
    console.log(value.result);
    if(value.result.status==0x0){
      const jade=require('jade');
      var str=jade.renderFile('./views/index.jade',{
        pretty:true, //格式化
        title:"打印银行",
        isDeploy:false,
        choices:100
      })
      res.status(200).send(str);
    }
  })
});
router.get('/listReceipt', function(req, res, next) {
  var promise=web3j.call(req.cookies.contractAddress,"listReceipt()",[]);
  promise.then((value)=>{
    console.log(value.result);
    if(value.result.status==0x0){
      const jade=require('jade');
      var str=jade.renderFile('./views/index.jade',{
        pretty:true, //格式化
        title:"打印账单",
        isDeploy:false,
        choices:100
      })
      res.status(200).send(str);
    }
  })
});
router.get('/deploy/addCompany', function(req, res, next) {
    const jade=require('jade');
    var str=jade.renderFile('./views/index.jade',{
      pretty:true, //格式化
      title:"注册商家",
      isDeploy:false,
      choices:1
    });
    res.status(200).send(str);
});
router.get('/addCompany', function(req, res, next) {
  args=[req.query.cname];
  console.log(args);
  var promise=web3j.call(req.cookies.contractAddress,"addCompany(string)",args);
  promise.then((value)=>{
    console.log(value);
    if(value.result.output==0x1){
    const jade=require('jade');
    var str=jade.renderFile('./views/index.jade',{
      pretty:true, //格式化
      title:"注册成功",
      isDeploy:false,
      choices:100
    });
    res.status(200).send(str);
    }
    else{
      const jade=require('jade');
    var str=jade.renderFile('./views/index.jade',{
      pretty:true, //格式化
      title:"注册失败",
      isDeploy:false,
      choices:100
    });
    res.status(200).send(str);
    }
  })
});
router.get('/deploy/addBank', function(req, res, next) {
  const jade=require('jade');
  var str=jade.renderFile('./views/index.jade',{
    pretty:true, //格式化
    title:"Fisco Bcos",
    isDeploy:false,
    choices:100
  });
  res.status(200).send(str);
});
router.get('/addBank', function(req, res, next) {
  args=[req.query.cname];
  console.log(args);
  var promise=web3j.call(req.cookies.contractAddress,"addBank(string)",args);
  promise.then((value)=>{
    console.log(value);
    if(value.result.status==0x0){
      const jade=require('jade');
    var str=jade.renderFile('./views/index.jade',{
      pretty:true, //格式化
      title:"注册成功",
      isDeploy:false,
      choices:100
    });
    res.status(200).send(str);
    }
    else{
      const jade=require('jade');
    var str=jade.renderFile('./views/index.jade',{
      pretty:true, //格式化
      title:"注册失败",
      isDeploy:false,
      choices:100
    });
    res.status(200).send(str);
    }
  })
});
router.get('/deploy/fun1', function(req, res, next) {
  const jade=require('jade');
  var str=jade.renderFile('./views/index.jade',{
    pretty:true, //格式化
    title:"功能1,调用中",
    isDeploy:false,
    choices:3
  });
  res.status(200).send(str);
});
router.get('/fun1', function(req, res, next) {  
  args=[req.query.a,req.query.b,parseInt(req.query.c)];
  console.log(args);
  var promise=web3j.call(req.cookies.contractAddress,"fun1(string,string,uint256)",args);
  promise.then((value)=>{
    console.log(value);
    const jade=require('jade');
  var str=jade.renderFile('./views/index.jade',{
    pretty:true, //格式化
    title:"功能1,调用成功",
    isDeploy:false,
    choices:100
    })
res.status(200).send(str);
});
});
router.get('/deploy/fun2', function(req, res, next) {
  const jade=require('jade');
  var str=jade.renderFile('./views/index.jade',{
    pretty:true, //格式化
    title:"功能2,调用中",
    isDeploy:false,
    choices:4
  });
  res.status(200).send(str);
});
router.get('/fun2', function(req, res, next) {
  args=[req.query.a,req.query.b,req.query.c,parseInt(req.query.d)];
  console.log(args);
  var promise=web3j.call(req.cookies.contractAddress,"fun2(string,string,string,uint256)",args);
  promise.then((value)=>{
    console.log(value);
    const jade=require('jade');
var str=jade.renderFile('./views/index.jade',{
  pretty:true, //格式化
  title:"功能2,调用成功",
  isDeploy:false,
  choices:100
});
res.status(200).send(str);
  })
});
router.get('/deploy/fun3', function(req, res, next) {
  const jade=require('jade');
  var str=jade.renderFile('./views/index.jade',{
    pretty:true, //格式化
    title:"功能3,调用中",
    isDeploy:false,
    choices:5
  });
  res.status(200).send(str);
});
router.get('/fun3', function(req, res, next) {
  args=[req.query.a,req.query.b,parseInt(req.query.c)];
  console.log(args);
  var promise=web3j.call(req.cookies.contractAddress,"fun3(string,string,uint256)",args);
  promise.then((value)=>{
    console.log(value);
    const jade=require('jade');
var str=jade.renderFile('./views/index.jade',{
  pretty:true, //格式化
  title:"功能3,调用成功",
  isDeploy:false,
  choices:100
});
res.status(200).send(str);
  })

});
router.get('/deploy/fun4', function(req, res, next) {
  const jade=require('jade');
  var str=jade.renderFile('./views/index.jade',{
    pretty:true, //格式化
    title:"功能4,调用中",
    isDeploy:false,
    choices:6
  });
  res.status(200).send(str);
});
router.get('/fun4', function(req, res, next) {
  args=[req.query.a];
  console.log(args);
  var promise=web3j.call(req.cookies.contractAddress,"fun4(string)",args);
  promise.then((value)=>{
    console.log(value);
    const jade=require('jade');
var str=jade.renderFile('./views/index.jade',{
  pretty:true, //格式化
  title:"功能4,调用成功",
  isDeploy:false,
  choices:100
});
res.status(200).send(str);
  })
});
router.get('/deploy/fun5', function(req, res, next) {
  const jade=require('jade');
  var str=jade.renderFile('./views/index.jade',{
    pretty:true, //格式化
    title:"功能5,调用中",
    isDeploy:false,
    choices:7
  });
  res.status(200).send(str);
});
router.get('/fun5', function(req, res, next) {
  args=[req.query.a];
  console.log(args);
  var promise=web3j.call(req.cookies.contractAddress,"fun5(string)",args);
  promise.then((value)=>{
    console.log(value);
    const jade=require('jade');
var str=jade.renderFile('./views/index.jade',{
  pretty:true, //格式化
  title:"功能5,调用成功",
  isDeploy:false,
  choices:100
});
res.status(200).send(str);
  })
});

module.exports = router;
