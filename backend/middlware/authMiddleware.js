import jwt from 'jsonwebtoken';
//gets rid of the '.then()' syntax
import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

//

//

//

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      //split the Bearer token speace and collect the token itself
      token = req.headers.authorization.split(' ')[1];
      //verify if token is legit/valid
      //{ id: '5f9c9b6e3146e81355101d7b', iat: 1604258151, exp: 1606850151 }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //to be accessed and used globally
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
  //
});

//

//

//

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
