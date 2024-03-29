const router = require('express').Router();
const Bus = require("../models/busModel");
const authMiddleware = require("../middlewares/authMiddleware");
// add bus
router.post('/add-bus', authMiddleware, async (req, res) => {
    try {
        const existingBus = await Bus.findOne({ number: req.body.number });
        if (existingBus) {
            return res.status(200).send({
                success: false,
                message: 'This bus number already exists'
            });
        }
        const newBus = new Bus(req.body);
        await newBus.save();
        return res.status(200).send({
            success: true,
            message: "bus added successfully",
        })
    }
    catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }

});


// update-bus
router.post("/update-bus", authMiddleware, async (req, res) => {
    try {
        await Bus.findByIdAndUpdate(req.body._id, req.body);
        return res.status(200).send({
            success: true,
            message: "Bus Updated Successfully",
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }

});

// delete-bus
router.post("/delete-bus", authMiddleware, async (req, res) => {
    try {
        await Bus.findByIdAndDelete(req.body._id);
        return res.status(200).send({
            success: true,
            message: "Bus Deleted Successfully",
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }

});

// get-all-buses

router.post("/get-all-buses", authMiddleware, async (req, res) => {
    try {
        const buses = await Bus.find();
        return res.status(200).send({
            success: true,
            message: "Buses feteched successfully",
            data: buses,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
        });
    }
});


module.exports = router;