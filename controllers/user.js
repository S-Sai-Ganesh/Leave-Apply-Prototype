const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const algorithm = process.env.ALGORITHM;
const iv = process.env.IV;
const key = process.env.SECURITYKEY;

const initVector = Buffer.from(iv, "utf-8");  

const Securitykey = Buffer.from(key, "utf-8");

function encryptData (data){
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
}

function decryptData(data){
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    let decryptedData = decipher.update(data, "hex", "utf-8");
    decryptedData += decipher.final("utf8");

    return decryptedData;
}

exports.postUser = async (req, res, next) => {
    try {
        const name = encryptData(req.body.name);
        console.log(name);
        const email = encryptData(req.body.email);
        const password = req.body.password;
        const role = encryptData(req.body.role);

        bcrypt.hash(password, 10, async (err, hash) => {
            if(err) console.log(err);
            await User.create({ name, email, password: hash, role });
            res.status(201).json({ message: 'Succcessfully created new user' });
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
    }
};

exports.generateAccessToken=(id, name, role) => {
    return jwt.sign({ userId: id, name: name, role:role}, process.env.TOKEN_SECRET);
}

exports.postLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const loginPassword = req.body.password;

        const userExist = await User.findAll({ where: { email: encryptData(email) } });

        if (userExist && userExist.length) {
            bcrypt.compare(loginPassword, userExist[0].dataValues.password, (err, result) => {
                if (err) {
                    throw new Error('Something went wrong');
                }
                if (result) {
                    res.status(200).json({ message: 'User logged in successfully', 
                    success: true, 
                    token: exports.generateAccessToken(userExist[0].dataValues.id, decryptData(userExist[0].dataValues.name), decryptData(userExist[0].dataValues.role) )});
                } else {
                    res.status(401).json({ error: "User not authorized. Wrong password", success: false });
                }
            })
        } else {
            res.status(404).json({ error: "User doesnot exist. Try with different email", success: false });
        }
    } catch (err) {
        res.status(500).json({ error: err, success: false })
    }
}