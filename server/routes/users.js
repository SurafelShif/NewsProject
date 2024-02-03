const express = require("express");
const auth = require("../middlewares/auth");
const bcrypt = require("bcrypt");

const {
  userValidation,
  UserModel,
  loginValidation,createToken
} = require("../models/userModel");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "express work!" });
});
//Upload user to database
router.post("/signUp", async (req, res) => {
  try {
    const validate = userValidation(req.body);
    if (validate.error) {
      return res.status(400).json(validate.error.details);
    }
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "******";
    res.json(user);
  } catch (err) {
    res.status(502).json({ err });
  }
});
router.post("/login", async (req, res) => {
  try {
    const validateUser = loginValidation(req.body);
    if (validateUser.error) {
      return res.status(400).json(validateUser.error.details);
    }
    let user =await UserModel.findOne({ name: req.body.name });
    if (!user) {
      return res.status(400).json({ msg: "name not found" });
    }
    let password = await bcrypt.compare(req.body.password, user.password);
    if (!password) {
      return res.status(400).json({ msg: "password not found" });
    }
    const token = createToken(user.id)
    
    res.cookie("token",token,{sameSite: 'None',secure:true,
      httpOnly:false,maxAge:1200000
    })
    res.json("Success")
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});


module.exports = router;
