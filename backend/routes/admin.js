var express = require('express');
var router = express.Router();
const path = require('path');
var multer = require('multer');
var fs = require('fs');
var mongoose = require('mongoose')

const Admin = require('../models/customer');
const Supervisor = require('../models/customer');
const Curior = require('../models/customer')
const Order = require('../models/orders')
const Supplier = require('../models/supplier')
const Product = require('../models/product')
const Material = require('../models/materials')
const Complaint = require('../models/complaint');
const MaterialOrder = require('../models/materialorder')
const sendEmail = require('../components/emailconfig')
var supRegEmail =require('../emails/supervisor/registration');
var curRegEmail =require('../emails/courier/registration');
var materialEmail = require('../emails/admin/materialOrder')
const Customer = require('../models/customer');
const Color = require('../models/color');
const Province = require('../models/province');
const { response } = require('express');
const compEmail = require('../emails/user/complaintConsider');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../public/files')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
var upload = multer({ storage: storage }).single('file');








/**CREATE PROPERTIES */

// supervisors are added to the system
router.post('/addsupervisor', function (req, res, next) {


    const supervisor = req.body;
    supervisor["usertype"] = 2;

    const newSupervisor = new Supervisor(supervisor);
    Supervisor.findOne({email: supervisor.email}, function ok(err, userData){
        if(err) throw err;
        else{
            if(userData === null){
                newSupervisor.save((err, supervisor) => {

                    if (err) return console.log(err);
                    else {
                        sendEmail(supervisor.email,supRegEmail.replace("#userName#",supervisor.email).replace("#password#",req.body.password),'Supervisor Registration')
                        res.send({success: true})
                    };
            
                })
            }else{
                res.send({success: false})
            }
        }
    })
    

});

// couriers are added to the system
router.post('/addcourier', function (req, res, next) {

    const courior = req.body;
    courior["usertype"] = 3;

    const newCourier = new Supervisor(courior);
    Supervisor.findOne({email:newCourier.email}, function ok(err, userData){
        if(err) throw err;
        else{
            if(userData === null){
                newCourier.save((err, courior) => { 

                    if (err) return console.log(err);
                    else {
                        sendEmail(courior.email,curRegEmail.replace("#userName#",courior.email).replace("#password#",req.body.password),'Courier Registration')
                        res.send({success: true})
                    };
            
                })          
            }else{
                res.send({success: false})
            }
        }
    })

});

// suppliers are added to the system
router.post('/addsupplier', function (req, res, next) {
    
    const supplier = req.body;
    var newSupplier = new Supplier(supplier);
    Supplier.findOne({email: req.body.email}, function ok(err, userData){
        if(err) throw err;
        else{
            if(userData === null){
                newSupplier.save((err,supplier)=>{
                    if(err) throw err
    
                    else{
                        res.send({success: true})
                    } 
                })
            }else{
                res.send({success: false})
            }
        }
    })
    


});

// warehouse items are added to the system using factory design pattern 
router.post('/addwarehouse', function(req, res, next){

    var file = req.files.file
    console.log(req.files);
    function WareHosefactory(){
        
            this.create = (body, type) =>{
                switch(type){
                    case 1: 
                        var newProduct= new Product(body);
                        newProduct["size"] = ['S ', 'M ', 'L ', 'XL ', 'XXL '];
                        newProduct["img"] = req.files.file.name;
                        newProduct["colors"] = JSON.parse(newProduct["colors"])

                        newProduct["sm"] = JSON.parse(newProduct["sm"])
                        newProduct["m"] = JSON.parse(newProduct["m"])
                        newProduct["l"] = JSON.parse(newProduct["l"])
                        newProduct["xl"] = JSON.parse(newProduct["xl"])
                        newProduct["xxl"] = JSON.parse(newProduct["xxl"])

                        file.mv('public/files/products/'+file.name,function(err){
                           
                            if(err) {
                                res.sendStatus(500);
                                return null
                            }
                        
                    
                        });

                        return newProduct
                        break;
                    case 2:
                        var newMaterial = new Material(body);
                        newMaterial["img"] = req.files.file.name;
                        newMaterial["colors"] = JSON.parse(newMaterial["colors"])
                       
                        file.mv('public/files/materials/'+file.name,function(err){
                           
                            if(err) {
                                res.sendStatus(500);
                                return null
                            }
                        
                    
                        });

                        return newMaterial  
                        break;     
                }
            }
        
    }

    const warehousefactory = new WareHosefactory()
    const warehouse = warehousefactory.create(req.body, JSON.parse(req.body.type))

    const addToDatabase = ()=>{
        warehouse.save((err, response)=>{
            if(err) res.send(err)
            else res.send({success: true, already: false})
           
        })
    }

    if(JSON.parse(req.body.type) === 1){
        
        Product.findOne({pno: req.body.pno}).then((productData)=>{

            if(productData === null){
               addToDatabase()
            }else{
                res.send({success: false, already: true})
            }
        }).catch((e)=>{
            return res.send(e)
        })

    }else{
        Material.findOne({name: req.body.name}).then((materialData)=>{

            if(materialData === null){
                addToDatabase()
            }else{
                res.send({success: false, already: true})
            }

        }).catch((e)=>{
            return res.send(e);
        })
       
    }
   
    
})




/**DELETE PROPERTIES */

// supervisors are deleted from the system
router.post('/deletesupervisor', function (req, res, next) {

    var email = req.body.email;

   
    Supervisor.deleteOne({ email: email }, function (err) {
        if (err) throw err
        else res.send({ deleted: true })
    })


});

// couriers are deleted from the system 
router.delete('/deletecourier/:email', function (req, res, next) {

    var email = req.params.email;

   
    Curior.deleteOne({ email: email }, function (err) {
        if (err) throw err
        else res.send({ deleted: true })
    })


});

// suppliers are deleted from the system. instead of that we manage status flag 
router.delete('/deletesupplier/:id', function (req, res, next) {

    var _id = req.params.id;


    Supplier.findByIdAndUpdate({_id}, {status: 2}).then((supplierData)=>{
        if(supplierData == null){

            res.send({ deleted: false }) 
        }else{
            res.send({ deleted: true })
        }
       
    }).catch((err)=>{
        throw err
    })


});

// customers are removed from the system. instead of that we manage status flag
router.post('/deletecustomer', function (req, res, next) {

    var id = req.body.id;

   /**Customer.findByIdAndDelete({ _id: id }, function (err) {
        if (err) throw err
        else res.send({ deleted: true })
    }) */
    
    Customer.findByIdAndUpdate({_id: id}, {status: 2}).then((customerData)=>{
        if(customerData === null){
            res.send({ deleted: false })
        }else{
            res.send({ deleted: true })
        }
    }).catch((err)=>{
        throw err
    })

});

// raw materials are deleted from the system
router.delete('/deletematerial/:id', (req, res, next)=>{
    const id = req.params.id;

    Material.findByIdAndDelete({_id: id}).then((deletedData)=>{
        if(deletedData === null){
            res.send({deleted: false})
        }else{
            res.send({deleted: true})
        }
      
    }).catch((e)=>{
        res.send(e)
    })
})

// products are deleted from the system
router.delete('/deleteproduct/:id', (req, res, next)=>{
    const id = req.params.id;

    Product.findByIdAndDelete({_id: id}).then((deletedData)=>{
        if(deletedData === null){
            res.send({deleted: false})
        }else{
            res.send({deleted: true})
        }
      
    }).catch((e)=>{
        res.send(e) 
    })
})






/**READ PROPERTIES */

// getting admin profile's data 
router.get('/profile', function (req, res, next) {

    Admin.findOne({ _id: req.user.id }, function ok(err, userData) {
        if (err) throw err;
        else res.send(userData);

    })


});


// getting supervisors' data  
router.post('/supervisorlist', function (req, res, next) {


    Supervisor.find({ usertype: 2 }, '_id email fName mobile telephone lName address', function (err, superList) {
        if (err) throw err
        else res.send(superList);
    })


});

// getting suppliers' data
router.get('/supplierlist', function (req, res, next) {


    Supplier.find({status: 1}, function (err, supList) {
        if (err) throw err
        else res.send(supList);
    })


});

// getting supplier's data according to the given id
router.get('/viewsupplier/:id', (req, res)=>{

    const _id = req.params.id;
    Supplier.findById((_id)).then((user)=>{
        if(!user){
            return res.send({notFound:'no user is found'});
        }

        res.status(200).send(user);
    }).catch((error)=>{

        res.status(500).send('Internal error');
    })
})

// getting couriers' data
router.get('/courierlist', function (req, res, next) {


    Curior.find({usertype:3}, function (err, curList) {
        if (err) throw err
        else res.send(curList);
    })


});

// getting all the customers' data
router.post('/customerlist', function (req, res, next) {

 
    Customer.find({usertype:1},'fName lName email gender addressObj', function (err, cusList) {
        if (err) throw err
        else res.send(cusList);
    })


});


// getting all the products' data
router.get('/viewproducts', function (req, res, next) {

    Product.find({}, function (err, productList) {
        if (err) throw err
        else res.send(productList);
    })

});

// getting all the raw material orders' data 
router.get('/vieworders', function (req, res, next) {

    MaterialOrder.find({}, function (err, orderList) {
        if (err) throw err
        else {
            var orderResult = [];
            if(orderList.length > 0){
                var orderArray = orderList.map((obj)=>{return obj})

                    Supplier.find({}, '_id company_name').then((response)=>{
                        var companyData = [];
                        if(response.length > 0){ companyData = response.map((company)=>{return company})}
                        //console.log(companyData);
                        //console.log(orderArray);
                        for(let i=0; i< orderArray.length; i++){

                            var company_name = companyData.filter((obj)=>{return obj._id.toString() === orderArray[i].supplier.toString()})

                            var cobj = {
                                _id: String,
                                material: String,
                                supname: Object,
                                status: Number,
                                date: Date,
                                orderItems: Array,
                                price:Number
                            }

                            cobj._id = orderArray[i]._id
                            cobj.material = orderArray[i].material
                            //cobj.supname = company_name[0]

                            if(company_name.length > 0){
                                cobj.supname = company_name[0]
                            }else{
                                var x={
                                   company_name:String 
                                }
                                x.company_name = 'Company has not been assigned'
                                cobj.supname = x
                            } 
                            
                            cobj.status = orderArray[i].status
                            cobj.date = orderArray[i].date
                            cobj.price = orderArray[i].price
                            cobj.orderItems = orderArray[i].ordered_items.map((item)=>{return item})
    
                            orderResult.push(cobj)
                            //console.log(cobj);

                        }
                        
                        //console.log(orderResult);
                            res.send(orderResult)
                    }).catch((e)=>{
                        res.send(e)
                    })
                
                
            }else{
                res.send(orderList);
            }
        }
    })

});

// getting raw material order's count which should be taken into consideration by admin
router.get('/confirmingordercount', (req, res, next)=>{
    MaterialOrder.countDocuments({status: 0}).then((count)=>{
        res.send({count: count})
    }).catch((e)=>{
        res.send(e)
    })
})


// getting product's details with respect to the given id
router.get('/viewproduct/:id', (req, res)=>{
    const _id = req.params.id;
    Product.findById((_id)).then((product)=>{
        if(!product){
            return res.send({notFound:'no product is found'});
        }
        res.send(product);
    }).catch((e)=>{
        res.status(500).send('internal error');
    })
})


// getting material's details with respect to the given id
router.get('/viewmaterial/:id', (req, res)=>{
    const _id = req.params.id;
    Material.findById((_id)).then((material)=>{
        if(!material){
            return res.send('no product is found');
        }
        res.send(material);

    }).catch((e)=>{
        res.status(500).send('internal error');
    })
})

// getting all the colors that the company is dealing with
router.get('/colors', (req, res)=>{

    Color.find({}).then((colors)=>{
        res.send(colors);
    }).catch((e)=>{
        res.status(500).send('Internal error');
    })
})

// get all the raw materials of the company
router.get('/materials', (req, res)=>{

    Material.find({}).then((materials)=>{
        res.send(materials);
    }).catch((e)=>{
        res.status(500).send('Internal error');
    })
})

// get all the complaints which are sent by customers
router.get('/viewcomplaints', function (req, res, next){
    Complaint.find({}).then((complaints)=>{

        res.send(complaints)
       
    }).catch((e)=>{
        res.status(500).send(e);
    })
})




/**UPDATE PROPERTIES */

// admin's profile updation
router.post('/profile/update', function (req, res, next) {
   
    console.log(req.files); // the file comes here
    var file = req.files.file
    console.log(req.body);

    var newAdmin = {
        ...req.body,
        img: req.files.file.name // the image name is file
    } 
    
    Admin.findOne({usertype: {$ne: 0}, email: req.body.email}, function ok(err, userData){
        if(err) throw err;
        else{
            if(userData === null){
                Admin.updateOne({ _id: req.user.id }, newAdmin,{new: true, runValidators: true},function ok(err, userData) {
                    if (err) throw err;
                    else{
                        file.mv('public/files/admin/'+file.name,function(err){
                            // store the files in public/files folder, the file can be accessed via localhost:5000/files/{fileName}
                            if(err) {
                                res.sendStatus(500);
                                throw err
                            }
                            else {
                                userData['already'] = false;
                                res.send(userData);
                            }
                    
                        });
                        
                    } 
            
                })
            }else{
                var Data ={
                    already : true
                }
                res.send(Data);
            }
        }
    }) 
    /*Admin.updateOne({ _id: req.user.id }, req.body,function ok(err, userData) {
        if (err) throw err;
        else{
            res.send(userData);
        } 

    })*/ 
 
});

// selected supplier's data upadation
router.patch('/editsupplier/:id', function (req, res, next){
    const id = req.params.id;
    Supplier.findOne({_id: {$ne: id}, email: req.body.email}).then((supplier)=>{
        if(!supplier){
            Supplier.findByIdAndUpdate({_id: id}, req.body, {new: true, runValidators: true}, function ok(err, userData){
                if(userData === null){
                    res.send({success: false})
                }else{
                    res.send({success: true})
                }
            }).catch((e)=>{
                res.send('Internal error');
            })
        }else{
            res.send({success: false})
        }
    })
    
})

// selected product's basic data updation
router.patch('/editproduct/:id', function (req, res, next){
    const _id = req.params.id;

    console.log(req.files); // the file comes here
    var file = req.files.file
    console.log(req.body);

    var newProduct = {
        ...req.body,
        img: req.files.file.name // the image name is file
    } 
    newProduct["colors"] = JSON.parse(newProduct["colors"])
    newProduct["size"] = JSON.parse(newProduct["size"])

    newProduct["sm"] = JSON.parse(newProduct["sm"])
    newProduct["m"] = JSON.parse(newProduct["m"])
    newProduct["l"] = JSON.parse(newProduct["l"])
    newProduct["xl"] = JSON.parse(newProduct["xl"])
    newProduct["xxl"] = JSON.parse(newProduct["xxl"])

    Product.findOne({_id: {$ne: _id}, pno: req.body.pno}).then((product)=>{
        if(!product){

            Product.findByIdAndUpdate((_id), newProduct,{new: true, runValidators: true}, function ok(err, userData){
                if(userData === null){
                    res.send({success: false, already: false}) 
                }else{
                    file.mv('public/files/products/'+file.name,function(err){
                        // store the files in public/files folder, the file can be accessed via localhost:5000/files/{fileName}
                        if(err) {
                            res.sendStatus(500);
                            throw err 
                        }

                        else  res.send({success: true, already: false})
                
                    });
                   
                }
            }).catch((e)=>{
                res.send('Internal error');
            })

        }else{
            res.send({already: true})
        }
    }).catch((e)=>{
        res.send('Internal error');
    })
    
})


// selected material's basic data updation
router.patch('/editmaterial/:id', function (req, res, next){
    const _id = req.params.id;

     console.log(req.files); // the file comes here
     var file = req.files.file
     console.log(req.body);
     
     var newMaterial = {
        ...req.body,
        img: req.files.file.name // the image name is file
    } 
    newMaterial["colors"] = JSON.parse(newMaterial["colors"])
   
    Material.findByIdAndUpdate((_id), newMaterial ,{new: true, runValidators: true}, function ok(err, userData){
        if(userData === null){
            res.send({success: false})
        }else{
            file.mv('public/files/materials/'+file.name,function(err){
                // store the files in public/files folder, the file can be accessed via localhost:5000/files/{fileName}
                if(err) {
                    res.sendStatus(500);
                    throw err
                }
                else  res.send({success: true})
        
            });
           
        }
    }).catch((e)=>{
        res.send('Internal error');
    })
})





router.post('/viewmaterial', function (req, res, next) {

    var supplier = new Supplier(req.body);
    supplier.save((err,supplier)=>{
        if(err) throw err
        else res.send(supplier)
    })


});

// accept or rejected orders which are requested by supervisor
router.patch('/acceptorder', (req, res, next)=>{
    var _id = req.body.id
    var customObj={
        ...req.body
    }
    customObj["supplier"] = mongoose.Types.ObjectId(req.body.supplier) 
    MaterialOrder.findByIdAndUpdate((_id), customObj, {new: true, runValidators: true}).then((resData)=>{
        if(resData === null){
            res.send({success: false})
        }else{
           
            if(req.body.status === 1){
                
                Supplier.findOne({_id: req.body.supplier}, 'email').then((supplierData)=>{
                    sendEmail(supplierData.email,materialEmail.replace("#orderNo#",req.body.id).replace("#materialName#",req.body.material).replace("#price#",req.body.price).replace("#date#",req.body.date),'New Material Order')
                    res.send({success: true})
                }).catch((e)=>{
                    res.send(e);
                })
            }else{
                res.send({success: true})
            }
            
           
        }
    }).catch((e)=>{
        res.send(e)
    })
})


// complaints are taken into consideration by admin
router.patch('/editcomplaint/:id', function (req,res,next){
    var _id = req.params.id;
    Complaint.findByIdAndUpdate((_id), req.body,{new: true, runValidators: true}).then((resData)=>{
        if(resData === null){
            res.send({success: false})
        }else{
            sendEmail(resData.email,compEmail.replace("#fName#",resData.name).replace("#topic#",resData.subject),'Complaint Consideration')
            res.send({success: true})
        }
    }).catch((e)=>{
        res.status(500).send('Internal error')
    })
})

// update courier's vehicles
router.patch('/editcourier', function (req, res, next){
    var email = req.body.email;
    Curior.findOneAndUpdate({email: email}, req.body,{new: true, runValidators: true}).then((resData)=>{
        if(resData === null){
            res.send({success: false})
        }else{
            res.send({success: true})
        }
    }).catch((e)=>{
        res.status(500).send('Internal error');
    })
})





/**REPORTS UNDER READ PROPERTIES*/

router.get('/viewnotconfirmingorders', (req, res, next)=>{

  
    MaterialOrder.find({status: 0}).then((orderData)=>{

        var orderArray = [];
        var supplierArray = [];
        var orderResult = [];
        if(orderData.length > 0) { 
            orderArray = orderData.map((obj)=>{return obj})
    
                Supplier.find({status: 1}).then((supplierData)=>{
                    //console.log(supplier);
                    supplierArray = supplierData.map((obj)=>{return obj})

                    for(let i=0; i< orderArray.length; i++){
                        var selectedMaterial = orderArray[i].material
                        //console.log(selectedMaterial);
                        var selectedSuppliers = []
                        for(let j=0; j <supplierArray.length; j++){

                            if (Object.values(supplierArray[j].materials).indexOf(selectedMaterial) > -1) {
                                
                                selectedSuppliers.push(supplierArray[j])
                            }

                        }
                        
                        var oobj={
                            ...orderArray[i]._doc,
                            suppliers : selectedSuppliers
                        }
                        //console.log(oobj);
                        orderResult.push(oobj)
                    }

                    res.send(orderResult)

                }).catch((e)=>{
                    console.log(e);
                })
                       
        }
        else{
            return res.send(orderData)
        }
    }).catch((e)=>{
        res.send(e)
    })
}) 

router.get('/customerreport', function (req, res, next){
    
    Province.find({},'province').then((provinceData)=>{

        const provinces = provinceData.map((province)=>{
            return province.province;
        })
        //res.send(provinces)
        Customer.find({usertype: 1}).then((customerData)=>{
           
            var province = [];
            var cpr = [];
            province = customerData.map((customer)=>{
                return customer.addressObj.province;
            })
            //res.send(province); 

            for(let i=0; i<provinces.length; i++){
                var cpo ={
                    name:String,
                    count:Number
                }

                cpo.name = provinces[i];
                cpo.count = province.filter((prov)=> {return prov === provinces[i]}).length;

                cpr.push(cpo);
            }

            res.send(cpr);
            
        }).catch((e)=>{
            res.status(500).send('Internal error...')
        })

        
    }).catch((e)=>{
        res.status(500).send('Internal error')
    })
})

router.get('/customerreportgender', function (req, res, next){
    Customer.find({usertype: 1}).then((customerData)=>{
        var gender = [];
        var cgr= [];
        gender = customerData.map((customer)=>{
            return customer.gender;
        })

        const male = gender.filter((gen)=> {return gen === "Male"}).length;
        const female = gender.filter((gen)=> {return gen === "Female"}).length;

        cgr.push({name: "Male", value: male});
        cgr.push({name: "Female", value: female});

        res.send(cgr);

    }).catch((e)=>{
        res.status(500).send('Internal error')
    })
})

router.get('/materialreport', function (req, res, next){
    Material.find({}).then((materials)=>{
        const materialsArray = materials.map((obj)=>{return obj.name})
        //console.log(materialsArray);
        var resultArray = [];
        MaterialOrder.find({status: 1}, 'ordered_items material').then((responseData)=>{

            //const ordersArray = responseData.map((data)=> {return data.ordered_items})
            const ordersArray = responseData.map((data)=> {return data})

            for(let i=0; i < materialsArray.length; i++ ){
                var specificMaterial = [];
                var specificMaterialItems = [];
                var specificMaterial_temp = ordersArray.filter((obj)=>{ return obj.material === materialsArray[i]})
                specificMaterial = specificMaterial.concat(specificMaterial_temp)
        
                if (specificMaterial.length > 0) {
                    for(let j =0; j < specificMaterial.length; j++){

                        specificMaterialItems = specificMaterialItems.concat(specificMaterial[j].ordered_items.map((obj)=>{return obj}))
                    }
                    
                }
                //console.log(specificMaterialItems);
               
                /**for(let j=0; j < ordersArray.length ; j++){
                    var specificMaterial_temp = ordersArray[j].filter((obj)=>{ return obj.material === materialsArray[i]})
                    specificMaterial = specificMaterial.concat(specificMaterial_temp)
            }  */

            /**const ordersArray = responseData.map((data)=> {return data})
            for(let i=0; i < materialsArray.length; i++){
                var specificMaterial = [];
                var specificMaterial_temp = ordersArray.filter((obj)=>{ return obj.material === materialsArray[i]})
                specificMaterial = specificMaterial.concat(specificMaterial_temp)
            } */

                var customeObject={
                    name:String,
                    img:String,
                    colors:Array,
                    stock:Number,
                    status:String,
                    rank:Number
                }

                customeObject.name = materials[i].name;
                customeObject.img = materials[i].img;
                customeObject.colors = materials[i].colors.map((color)=>{return color.color});
                customeObject.stock = materials[i].units;
                if(materials[i].units < materials[i].level){customeObject.status = 'out of stock'}else{customeObject.status='in stock'}
                    var specificMaterialAmount = 0;
                    if(specificMaterial.length > 0){
                        var x = specificMaterialItems.map((obj)=> {return obj.amount})
                        specificMaterialAmount = x.reduce((total, num)=>{return total + num})
                        //console.log(specificMaterialAmount);
                        customeObject.rank = specificMaterialAmount;
                    }else{
                        customeObject.rank = specificMaterialAmount;
                    }

                resultArray.push(customeObject); 
                //console.log( materialsArray[i] + '   ' + specificMaterial.length);
            }

            //console.log(resultArray);
            res.send(resultArray) 

        }).catch((e)=>{
            res.status(500).send('Internal Error - order');
        })

    }).catch((e)=>{
        res.status(500).send('Internal Error - material');
    })
})

router.get('/annualcashflow', function (req, res, next){
    var year = req.body.year;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    Order.find({status: {$ne: 'rejected'}}).then((orderData)=>{
        
        MaterialOrder.find({status: 1}).then((materialData)=>{
            var income;
            var cost;
            var profit;

            var cashflowResult = [];

            for(let i=0; i<=11; i++){
                income = 0;
                cost = 0;
                profit = 0;

                var data={
                    name: String,
                    cost: Number,
                    income: Number,
                    profit: Number
                }
               
                var filteredOrderData = orderData.filter((obj)=>{ return obj.date.getFullYear().toString() === year.toString() && obj.date.getMonth()+1 === i+1})
                var filteredMaterialData = materialData.filter((obj)=>{return obj.date.getFullYear().toString() === year.toString() && obj.date.getMonth()+1 === i+1})
               
                if(filteredOrderData.length > 0){
                    income = filteredOrderData.map((order)=>{return order.totalAmount}).reduce((total, num)=>{return total + num})
                }
                if(filteredMaterialData.length > 0){
                    cost = filteredMaterialData.map((material)=>{return material.price}).reduce((total, num)=>{return total + num})
                }

                profit = income - cost;

                //assign values into the object

                data.name = months[i];
                data.cost = cost;
                data.income = income;
                data.profit = profit;

                cashflowResult.push(data);
                
            }

            //console.log(cashflowResult);
            res.send(cashflowResult);
            
        }).catch((e)=>{
            res.status(500).send('Internal Error - cost');
        })
    }).catch((e)=>{
        res.status(500).send('Internal Error - income');
    })
})

router.get('/dashboard2', function (req, res, next){
    let today = new Date();
    today.setHours(0,0,0,0); // set to 0:00
    var orderResult = [];

    const doFirst = ()=>{
        for(let i=1; i>=-8; i--){
       
            let specificDate = new Date(today)
            let beforeSpecificDate = new Date(today)
            specificDate.setDate(specificDate.getDate() + i)
            beforeSpecificDate.setDate(beforeSpecificDate.getDate() + i-1)
    
            Order.find({date : {$gte: beforeSpecificDate, $lt: specificDate}, status: {$ne: 'rejected'}}, function (err, orderData){
                if (err) throw err
    
                else{
                    var data={
                        x: Number,
                        y: Number
                    }
    
                    
                    let income;
    
                    if(orderData.length === 0){
                        income = 0;
                    }else{
                        income = orderData.map((order)=>{return order.totalAmount}).reduce((total,num)=>{return total+num});
                    }
                   
                    data.x = 8 + i;
                    data.y = income/1000;
    
                   
                    orderResult.push(data);
                   
                }
            })
    
        }
    }

    const doSecond = ()=>{
        setTimeout(()=>{
            res.send(orderResult)
        },3000)
       
    }

    doFirst();
    doSecond();
    
   
})


router.post('/dashboard', function (req, res, next) {
    // if(req.isAuthenticated()){
        let today = new Date();
        today.setHours(0,0,0,0); // set to 0:00
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

    Admin.find({}, 'usertype status', function (err, userData) {
        if (err) throw err;

        else {

            Order.find({date : {$gte: today, $lt: tomorrow}, status: {$ne: 'rejected'}} , function (err, orderData) {
                if (err) throw err

                else {
                    Supplier.find({status: 1},'_id',function(err,supplyData){
                        if(err) throw err
                        else{
                            

                            MaterialOrder.find({ date : {$gte: today, $lt: tomorrow}, status: 1}, function (err, materialOrderData){
                                if (err) throw err
                                else{

                                    var dashboardData = {
                                        customerCount: userData.filter((cus) => { return cus.usertype === 1 && cus.status === 1}).length,
                                        supervisorCount: userData.filter((cus) => { return cus.usertype === 2 }).length,
                                        curiorCount: userData.filter((cus) => { return cus.usertype === 3 }).length,
                                        supplierCount: supplyData.length,
                                        income: (orderData.length > 0)? orderData.map((order)=>{return order.totalAmount}).reduce((total,num)=>{return total+num}): 0,
                                        sales: orderData.length,
                                        orderCost: (materialOrderData.length > 0) ? materialOrderData.map((order)=>{return order.price}).reduce((total, num)=>{return total+num}): 0,
                                        otherCost: 0
                                    }

                                    dashboardData.otherCost = dashboardData.income - dashboardData.orderCost;
                                    
                                    res.send(dashboardData);
                                    
                                }
                            })
                            

                        }
                    })
                
                }
            })
   
        }
    })
})

router.get('/bestcustomers', function (req, res, next){
    Customer.find({status: 1, usertype: 1}, 'email fName lName addressObj img').then((customerData)=>{
        var customerArray = [];
        var orderArray = [];
        var resultArray = [];
        if(customerData.length > 0){
            customerArray = customerData.map((customer)=>{return customer})
            Order.find({status : {$ne : 'rejected'}}, 'shipTo totalAmount').then((orderData)=>{
               
                if(orderData.length > 0){
                    orderArray = orderData.map((order)=> {return order})
                }
               
                for(let i=0; i < customerArray.length; i++){
                    var specificCustomer = [];
                    var amount = 0;
                    if(orderArray.length > 0){
                        specificCustomer = orderArray.filter((order)=>{ return customerArray[i].email === order.shipTo.email})
        
                        if(specificCustomer.length > 0){
                            amount = specificCustomer.map((obj)=>{return obj.totalAmount}).reduce((total, num)=>{ return total + num})
                        }
                       
                    }
                   
                    var customer={
                        name: String,
                        email: String,
                        address: Object,
                        total: Number,
                        image:String
                    }
                    customer.name = customerArray[i].fName +' '+ customerArray[i].lName;
                    customer.email = customerArray[i].email;
                    customer.address = customerArray[i].addressObj;
                    customer.total = amount;
                    customer.image = customerArray[i].img;
                    
                    resultArray.push(customer);
                }
                res.send(resultArray)
            }).catch((e)=>{
                console.log('hi');
                res.send(e)
            })
        }else{
            res.send(customerArray)
        }

    }).catch((e)=>{
        console.log('bye');
        res.send(e)
    })
}) 



/**file uploading */

console.log(path.join(__dirname,'../public/files/'));


/* Re use this code for file upload  */
router.post('/upload',function(req,res,next){
    var x = req.files.filename // get a single file from the request named fileName
    var fileName = x.name; // get file name
    x.mv('public/files/'+fileName,function(err){
        // store the files in public/files folder, the file can be accessed via localhost:5000/files/{fileName}
        if(err) {
            res.sendStatus(500);
            throw err
        }
        else res.sendStatus(200);

    });
    

})

        
module.exports = router;
