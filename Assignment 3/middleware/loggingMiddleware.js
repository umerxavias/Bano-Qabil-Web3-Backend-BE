const loggingMiddleware = (req, res, next) => {
  const currentDate = new Date();
  const date = currentDate.toLocaleDateString();
  const time = currentDate.toLocaleTimeString();
  
  console.log('='.repeat(50));
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Date: ${date}`);
  console.log(`Time: ${time}`);
  console.log('='.repeat(50));
  
  next();
};

module.exports = loggingMiddleware;
