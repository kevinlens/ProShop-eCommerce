//middleware for throwing 404 errors
const notFound = (req, res, next) => {
  //this is to to user sending wrong HTTP request
  //this is how we throw an error ourselves for page not found
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};


//middleware for handling errors
const errorHandler = (err, req, res, next) => {
  //if the client side is a 'success'(200) then it is a server side error but most like user sent wrong HTTP
  //500 means server side error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  //set the status to the statusCode
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
