
const express = require('express');
const session = require('express-session');
require('dotenv').config();
var path = require('path');
import  bodyParser  from 'body-parser';
import cors from 'cors';
import { mongoconnection } from './db';
// import authRoutes from './route/buyer';
// import productRoutes from './route/Product'
// import cartRoutes from './route/Cart'
// import buyerRoutes from './route/buyer'
// import factoryRoutes from './route/factory'
import patientRoute from './route/patient'
import doctorRoutes from './route/doctor'
import categoriesRoutes from './route/categories'
import adminRoutes from './route/admin'
import servicesRoutes from './route/services'
import topicRoutes from './route/topic'

const app = express()

mongoconnection();
app.use(cors({origin:'*'}));

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send("server listining on 8600")
})

app.use(express.json());
// app.use('/api',authRoutes)
// app.use('/api',productRoutes)
// app.use('/api',cartRoutes)
// app.use('/api',buyerRoutes)
// app.use('/api',factoryRoutes)
app.use('/api',patientRoute)
app.use('/api',doctorRoutes)
app.use('/api',adminRoutes)
app.use('/api',categoriesRoutes)
app.use('/api',servicesRoutes)
app.use('/api',topicRoutes)
export default app;