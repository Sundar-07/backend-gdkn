const express = require("express");
const CustomerModels = require("../models/CustomerModels");
const router = express.Router();

router.get("/",(req,res)=>{
  res.send("Please Check the API routes")
})

//getting all customers data
router.get("/selectCustomers", async (req, res) => {
  try {
    const customerData = await CustomerModels.find();
    res.status(201).json(customerData);
    // console.log("Select all customers");
  } catch (error) {
    console.log("Error from getting data: ", error.message);
  }
});

//getting single customer data
router.get("/selectCustomerById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customerData = await CustomerModels.findById(id);
    res.status(201).json(customerData);
    // console.log("Select customer by id");
  } catch (error) {
    console.log("Error from getting single data by ID: ", error);
  }
});

//adding a customer data
router.post("/insertCustomer", async (req, res) => {
  const {
    firstName,
    lastName,
    userName,
    email,
    phone,
    dob,
    gender,
    address,
    landmark,
    city,
    state,
    country,
    zipcode,
  } = req.body;
  try {
    const userExists = await CustomerModels.findOne({ email });
    if (userExists) {
      if (userExists) {
        res.status(400);
        throw new Error("User already exists");
      }
    }

    const customerData = new CustomerModels({
      firstName,
      lastName,
      userName,
      email,
      phone,
      dob,
      gender,
      address,
      landmark,
      city,
      state,
      country,
      zipcode,
    });
    const savedData = await customerData.save();
    res.status(201).json(savedData);
    // console.log("inserting a customer");
  } catch (error) {
    res.status(400).json({ message: error.message });
    console.log("Error while inserting the data: ", error);
  }
});

//updating a customer data
router.put("/updateCustomer/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    const options = { new: true };

    const id = req.params.id;
    const customerData = await CustomerModels.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.status(201).json(customerData);
    // console.log("updating a customer");
  } catch (error) {
    console.log("Error while updating the data: ", error);
  }
});
//deleting the customer data
router.delete("/deleteCustomer/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customerData = await CustomerModels.findByIdAndDelete(id);
    res
      .status(201)
      .send(`Document with ${customerData.email} has been deleted...`);
    // console.log("deleting the customer");
  } catch (error) {
    console.log("Error while deleting the data: ", error);
  }
});

module.exports = router;
