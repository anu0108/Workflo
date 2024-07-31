const  checkAuth=  (req, res, next)=>{
    const token = req.cookies.token;
    console.log(req.cookies)
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    // If token is present, proceed to the next middleware or route handler
    next();
  };

  module.exports = { checkAuth };
