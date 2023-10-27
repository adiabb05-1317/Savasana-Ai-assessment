const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const connectDB=require('./db');
app.use(cors());
app.use(express.json({extended:false}));
app.use(bodyParser.json());
require('dotenv').config();

connectDB();

app.use('/api/translations',require('./Routes/TranslationRoutes'));

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>console.log(`Server started at port ${PORT}`));





