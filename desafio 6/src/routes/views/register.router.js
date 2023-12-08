import express from 'express';

const registerRouter = express.Router();

registerRouter.get('/', async (req, res)=>{
    let data = {
        layout: 'index'
    }
    res.render('register', data)
});

export default registerRouter