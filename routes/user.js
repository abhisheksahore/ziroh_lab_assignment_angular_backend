import express from 'express';
import { request } from 'express';
import userModel from '../models/user.js';

const router = express.Router()

router.post(`/signup`, async (req, res) => {
    try {
        console.log(req.body);
        if (req.body.email === undefined || req.body.email === null || req.body.email === '') {
            return res.status(400).send({message: "Email is required"})
        }
        if (req.body.name == undefined || req.body.name == null || req.body.name == '') {
            return res.status(400).send({message: "Name is required"})
        }
        if (req.body.password == undefined || req.body.password == null || req.body.password == '') {
            return res.status(400).send({message: "Password is required"})
        }

        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)) {
            return res.status(400).send({status: "error", message: "invalid email"})
        }
        const newUser = new userModel(req.body)
        const newUserSaved = await newUser.save();
        return res.status(200).send({status: "success", data: {name: newUserSaved.name, email: newUserSaved.email}});
    } catch (error) {
        return res.status(500).send({message: "this is an error."});
    }
})


router.post(`/login`, async (req, res) => {
    try {
        if (req.body.email === undefined || req.body.email === null || req.body.email === '') {
            return res.status(400).send({message: "Email is required"})
        }
        if (req.body.password == undefined || req.body.password == null || req.body.password == '') {
            return res.status(400).send({message: "Password is required"})
        }

        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(req.body.email)) {
            return res.status(400).send({status: "error", message: "invalid email"})
        }
        const user = await userModel.findOne({"email": req.body.email, "password": req.body.password});
        if (user!== null) {
            return res.status(200).send({status: "success", data: {email: user.email, name: user.name}});
        } else {
            return res.status(400).send({status: "error", message: "no user found"});
        }
    } catch (error) {
        return res.status(500).send({message: "this is an error."});
    }
})

export default router;