# Global Error Handler
    - Middleware
    - Global Middleware
    - Global Error Handler
    - Miscellaneous Tips

**Middleware**

- Middleware is used to intercept and add checks between request and response flow.

- Any Function that is processed between any request and its response.


*How to write a Middleware?*

    function mw(req,res,next){
        // code for middleware
        next()
    }

    -> app.use(mw)

    -> app.use('/route',mw,handler)


- All middlewares are functions that take req, res & next as arguments

- req: request object sent to the server
- res: response object which is sent to the client
- next: used to push next middleware on the execution stack.

**app.use()**

- app.use() is used to add the middleware in server flow i.e. it is processed before any line of code written under it.

        app.use(mw1)
        app.use(mw2)
        app.use(ErrorHandler)

- here mw1 is executed first then mw2. iff both don't generate any errors/exceptions

- if there are any errors or exceptions in mw1, mw2 is not executed and the ErrorHandler is executed.


**app.use('/route',mw,handler)**

        app.post('/signin',auth, (req,res)=>{
            // sigin handler code
        })

- here the auth middleware is used to authenticate the request before it is processed.


**Global Middleware**

- Middleware expecuted at every request to the server

- perform comman tasks across routes like: authentication of request, cors support, ratelimiting, Error handling.


        ex:
        app.use(cors(config))

        app.use(mw1)
        app.use('/route',handler)
        // routes and middlewares

        ap.use(errorHandler)


**Global Error Handler** 
- A special middleware used to gracefully handle known as well as unknown Errors/Exceptions on the server.

- A Global Middleware Function used to handle all errors on the server. 


- refer index.js for detailed overview

**Miscellaneous Tips**

- next !== return. after execution of next middleware the control returns back to the previous middleware.

- This can be used to execute something after the response has been sent.

        async function mw(req,res,next){
            try{
                //functionality

                next();

                console.log("mw and next executed")
            }
            catch{
                // handle error
            }
        }

- setting things on req or res object

        function authorize(req,res,next){
            const {user} = req;

            if(checkAdmin(user)){
                req.admin = true;
            }
            else{
                req.admin = false;
            }
            next();
        }

        req.use('/route',authorize,handler)
- here the req is modified to authorize the user as admin.

*Configurable Middleware*

- Execution of middleware is situational.

        function middleware(options){
            // based on options a middleware is *Returned*
            
            if(options['option']){

                return (req,res,next)=>{
                    //functionality based on option
                }

            }
        }

        app.use(middleware(options));

- if an object can be undefined or null use nullable chaining:

        Array?.length

- this will return undefined if Array is undefined/null.