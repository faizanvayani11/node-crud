const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const User = require("./models/user.js");

const DbURL = "mongodb+srv://faizan:faizan@cluster0.kfao2mc.mongodb.net/?retryWrites=true&w=majority";


mongoose.connect(DbURL).then(() => console.log('database connected')).catch((err) => console.log(err));

app.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    }
    catch (error) {
        console.log("users"), res.send("something went wrong");
    }
})


app.post('/', async (req, res) => {
    try {
        const users = await User.create(req.body);
        res.json(users);
    } catch (error) {
        console.log("users"), res.send("something went wrong");
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const users = await User.findByIdAndDelete(id);
        res.send("Delete Successfully");
    } catch (error) {
        console.log("users"), res.send("something went wrong");
    }

})



app.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const userUpdate = await User.findbyIdAndUpdate(id, req.body, { new: true });
        res.json(userUpdate);
    } catch (error) {
        console.log("users"), res.send("something went wrong");
    }
});

// app.put('/:id', async (req, res) => {
//     const { id } = req.params;

//     try {
//         const userUpdate = await User.findByIdAndUpdate(id, req.body, { new: true });
//         // The { new: true } option returns the modified document rather than the original


//         res.json(userUpdate);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Something went wrong');
//     }
// });

app.listen(2000, () => {
    console.log("Server is Running on $(2000)");

});
