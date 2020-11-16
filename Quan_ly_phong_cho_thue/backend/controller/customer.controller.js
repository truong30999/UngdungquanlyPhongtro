const Customer = require('../models/Customer.model')

exports.createCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body)
        let result = await customer.save()
        res.json(result)
    } catch (err) {
        res.json({ message: err });
    }

}