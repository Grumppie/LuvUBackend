const express = require('express');

const app = express();

// middleware definition: line 30
app.use(logger);

app.get('/', (req, res) => {
    res.send('Global Error handler')
})

app.post('/',(req,res,next)=>{
    try {
        if(req.autorized){
            res.status(200).send('authorized')
        }
        else{
            throw new Error('Not Authorized')    
        }
    } catch (error) {
        next({status: 401,message: error.message})
    }

})

app.use(globalErrorHandler)

app.listen(3000, () => {console.log('Server is running on port 3000')})

// middleware functions
function logger(req, res, next) {
    console.log(Date.now(), req.method, req.originalUrl);
    next();
}

function globalErrorHandler(error, req,res,next){
    console.error('Error: ')
    console.error(error.status || 500);
    console.error(error.message || 'Internal server Error');

    res.status(error.status).send(error.message)
    next();
}