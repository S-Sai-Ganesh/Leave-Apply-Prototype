const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database');

const app = express();
app.use(cors());
app.use(bodyparser.json());


const userRoutes = require('./routes/user');
const leaveRoutes = require('./routes/leave');

const User = require('./models/User');
const leave = require('./models/leave');

app.use('/user', userRoutes);
app.use('/leave', leaveRoutes);

User.hasMany(leave);
leave.belongsTo(User);

sequelize
    .sync()
    // .sync({ force: true })
    .then(res => {
        app.listen(process.env.PORT, (err) => {
            if (err) console.log(err);
            console.log('Server is listening for requests');
        });
    })
    .catch(err => {
        console.log(err);
    })
