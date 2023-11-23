const leavemodel = require('../models/leave.js');
const Usermodel = require('../models/User.js');

exports.postleave = async ( req, res) => {
    const date = req.body.date;
    await leavemodel.create({
        date: date,
        userId: req.user.id
    })

    res.status(200).json('Applied');
}

exports.getEmp = async (req,res) => {

    const data = await leavemodel.findAll({
        include: [{
            model: Usermodel,
            attributes: ['name']
        }],
        attributes: ['userId','date'],
        order:[['userId'],['id']]
    });

    console.log(data);

    res.status(200).json(data);
}