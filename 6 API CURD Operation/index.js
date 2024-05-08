var express = require('express');
var mongoose = require('mongoose');
var app = express();

// Middleware to parse JSON bodies
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/JSPM")
    .then(() => { console.log("Connection Established") })
    .catch((err) => { console.error("Connection Error:", err) });

const allstud = mongoose.Schema({
    "Roll": Number,
    "Name": String,
    "Percentage": Number
});

const StudModel = mongoose.model('Student', allstud);

// GET route to fetch all students
app.get("/api/student", (req, res) => {
    StudModel.find({})
        .then((data) => { res.send(data) })
        .catch((err) => { console.error(err); res.status(500).send("Error fetching students") });
});

// POST route to add a new student
app.post("/api/student", (req, res) => {
    const s = req.body;
    StudModel.create(s)
        .then((data) => { res.send(data) })
        .catch((err) => { console.error(err); res.status(500).send("Error adding student") });
});

// PUT route to update student's percentage by ID
app.put('/api/student/:id', (req, res) => {
    const id = req.params.id;
    StudModel.findByIdAndUpdate(id, { "Percentage": req.body.Percentage }, { new: true })
        .then((data) => {
            if (!data) {
                return res.status(404).send("Student not found");
            }
            res.send(data);
        })
        .catch((err) => { console.error(err); res.status(500).send("Error updating student") });
});

// DELETE route to delete a student by ID
app.delete('/api/student/:id', (req, res) => {
    const id = req.params.id;
    StudModel.findByIdAndDelete(id)
        .then((data) => {
            if (!data) {
                return res.status(404).send("Student not found");
            }
            res.send("Object Deleted");
        })
        .catch((err) => { console.error(err); res.status(500).send("Error deleting student") });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(8002, () => {
    console.log("Server started");
});
