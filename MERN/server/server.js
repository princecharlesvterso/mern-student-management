const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.log("MongoDB connection error:", error);
	});

app.get("/", (_req, res) => {
	res.send("Server is running!");
});

app.get("/students", async (_req, res) => {
	try {
		const students = await Student.find();
		res.json(students);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.post("/students", async (req, res) => {
	try {
		const newStudent = new Student({
			name: req.body.name,
			course: req.body.course,
			age: req.body.age,
		});
		const savedStudent = await newStudent.save();
		res.json(savedStudent);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.put("/students/:id", async (req, res) => {
	try {
		const updatedStudent = await Student.findByIdAndUpdate(
			req.params.id,
			{
				name: req.body.name,
				course: req.body.course,
				age: req.body.age,
			},
			{ new: true },
		);
		res.json(updatedStudent);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

app.delete("/students/:id", async (req, res) => {
	try {
		await Student.findByIdAndDelete(req.params.id);
		res.json({
			message: "Student deleted successfully",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
