const Customer = require('../models/Customer.model')
const House = require('../models/House.model')
const fs = require('fs');
exports.createCustomer = async (req, res, next) => {
    try {
        const customer = new Customer({
            Name: req.body.Name,
            Age: req.body.Age,
            DateOfBirth: req.body.DateOfBirth,
            Phone: req.body.Phone,
            Email: req.body.Email,
            PermanentAddress: req.body.PermanentAddress,
            Cmnd: req.body.Cmnd,
            DateCmnd: req.body.DateCmnd,
            PlaceCmnd: req.body.PlaceCmnd,
            Image: req.file.path
        })
        let result = await customer.save()
        res.json(result)
    } catch (err) {
        res.json({ message: err.message })
    }

}

exports.getAllCustomerOfUser = async (req, res) => {
    try {
        const list = await House.find({_id: req.jwt.userId}).populate({
            path: 'Rooms',
            populate: { path: 'ListPerson' }
        })
        
        res.json(list);
    } catch (err) {
        res.json({ message: err });
    }

}
exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.customerId);
        res.json(customer);
    } catch (err) {
        res.json({ message: err.message });
    }
}
exports.updateCustomer = async (req, res) => {

    const customer = await Customer.findById(req.params.customerId)
    
    if (customer.Image && req.file) {
        fs.unlink(customer.Image, err => {
            console.log(err.message);
        });
    }

    if(req.file)
    { req.body.Image = req.file.path}

    const update = req.body;
    try {
        
        const updatedCustomer = await Customer.updateOne(
            { _id: req.params.customerId },
            { $set: update }

        );
        res.json(updatedCustomer);
    } catch (err) {
        res.json({ message: err.message });
    }

}
exports.deleteCustomer = async (req, res) => {
    const customer = await Customer.findById( req.params.customerId)
    if(customer.Image){
        fs.unlink(customer.Image, err => {
            console.log(err);
          });
    }
    try {
       
        const removeCustomer = await Customer.remove({ _id: req.params.customerId })
        res.json(removeCustomer)

    } catch (err) {
        res.json({ message: err })
    }
}


