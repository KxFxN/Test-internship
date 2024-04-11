const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  gender: String,
  birthday: Date,
  image: String,
});

const User = mongoose.model("users", UserSchema);

mongoose.connect(
  "mongodb+srv://sakarin14184:385739@cluster0.ctfgm26.mongodb.net/cluster0"
);

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/users", async (req, res) => {
  try {
    const id = req.query.id;

    if (id) {
      const user = await User.findById(id);
      res
        .status(200)
        .send({ message: "User retrieved successfully!", data: user });
    } else {
      const users = await User.find();
      res
        .status(200)
        .send({ message: "Users retrieved successfully!", data: users });
    }
  } catch (error) {
    res.status(500).send({ message: "Error retrieving users", error });
  }
});

app.get("/api/users/:nameSurname", async (req, res) => {
  try {
    const nameSurname = req.params.nameSurname;
    const [name, lastName] = nameSurname.split(" ");

    if (name && lastName) {
      const users = await User.find({
        $or: [
          {
            $and: [
              { name: { $regex: name, $options: "i" } },
              { lastname: { $regex: lastName, $options: "i" } },
            ],
          },
        ],
      });
      res.status(200).send({
        message: "Users retrieved successfully!",
        data: users,
      });
      return;
    }

    if (name) {
      const users = await User.find({
        $or: [
          { name: { $regex: name, $options: "i" } },
          { lastname: { $regex: name, $options: "i" } },
        ],
      });
      res.status(200).send({
        message: "Users retrieved successfully!",
        data: users,
      });
      return;
    }

    res.status(400).send({
      message: "Invalid name or surname",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error retrieving users",
      error,
    });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const { name, lastname, gender, birthday, image } = req.body;

    const user = new User({
      name,
      lastname,
      gender,
      birthday,
      image,
    });

    await user.save();

    res.status(201).send({
      message: "User created successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
      error,
    });
  }
});

app.put("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { name, lastname, gender, birthday, image } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      {
        name,
        lastname,
        gender,
        birthday,
        image,
      },
      { new: true }
    );

    res.status(201).send({
      message: "User created successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
      error,
    });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await User.findByIdAndDelete(id);

    res.status(201).send({
      message: "User created successfully!",
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating user",
      error,
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
