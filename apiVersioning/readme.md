# Api Versioning
    - importance of api versioning
    - implementation of api versioning

**importance of api versioning**

- api versioning is employed when some **new features** or **major bug fixes** or **some security changes** must be implemented to an api.

- but implementing these changes may cause the users to completely change their existing code base, to handle the new version of api properly.

- api versioning ensures backwards compatibility, i.e. all users can choose to modify their code base to switch to new api version or to keep using the older version.

        example:
        v1 -> api/order/all.get = all orders
        v2 -> api/orders.get = all orders

        a change like this will affect all the
        users, as their request will hit route1
        which is depricated, it will return 404
        or can't get at route api/order/all.

**implementation of api versioning**

- api versioning can be implemented using:

        - URI vs URL
        - URI Versioning
        - Header-based Versioning
        - pros and cons

*tip URI vs URL*
- URI - Unique Resource Identifier
- URL - Unique Resource Locator

- URI is used to identify a specific thing, like an image, a website or a service
- Has a wide range of schemas like http, mailto,etc.
- example: mailto:sarthakrajesh777@gmail.com.
here you don't need to know where my inbox is located you can directly mail me.

- URL is used to locate a resource, i.e. it includes the protocol through which you can access a resource as well as the location to access the resource.
- example: *https* : *google.com* here we can access the resource at google.com through https protocol only.

- URL is a subset or URI.

*URI Versioning*

- URI is updated to inculde the api version in the URI.

        https://api.example.com/v1/myservice
        https://apiv1.example.com/myservice
        https://api.example.com/myservice?v=1

- this can be done through different methods shown above

*Header-based versioning*

- Utilizes http headers to specify the api version

        fetch('/route',{

            //method : "GET",-> default

            headers:{
                "APIVER":"v1"
            }
        })

- here I'm passing api version in headers, which can be extracted on the backend and based on the version the server will respond.

        app.get('/route',(req,res)=>{

            if(req.headers["APIVER"] === "v1"){
                // v1 response
            }
            else{
                // v2 response
            }
        })


**pros and cons**

**URI Versioning:**

*Pros:*

- Explicit and clear: easily identifiable and understandable to anyone reading the request.
- SEO-friendly: Search engines can index and rank different versions based on the URI
- Caching: Caching mechanisms can leverage the version in the URI to store and serve appropriate responses efficiently.
- Backward compatibility

*Cons:*

- Clutters URLs: Adding version information can make URLs long and messy.
- Breaking changes: Modifying the URI requires careful planning and communication to avoid breaking existing clients.
- Limited flexibility: Changing versions might involve URL restructuring, affecting existing client integrations.

**Header-based Versioning:**

*Pros:*

- Clean URLs: Keeps URLs concise and focused on the resource path.
- Flexibility: Easier to modify header names or values without disrupting URLs.
- Backward compatibility
- Future-proofing: Doesn't limit future URL changes or additions, leaving more flexibility for evolving API structure.

*Cons:*

- Less transparent: Version information isn't readily visible in the URL, requiring deeper inspection of request headers.
- SEO limitations: Search engines might struggle to identify and rank different versions.
- Caching complexities: Caching mechanisms need to consider both URL and headers for accurate version handling.
- Client compatibility: Older clients without header awareness might require custom handling or updates to understand the versioning system.