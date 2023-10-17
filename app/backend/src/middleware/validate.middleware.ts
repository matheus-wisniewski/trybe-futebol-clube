import { RequestHandler, Response } from 'express';
import * as jwt from 'jsonwebtoken';

class Validate {
  static validateLogin: RequestHandler = (req, res, next): Response | void => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
    // regex mt pica
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/;
    const validEmail = regex.test(email);
    const validPassword = password.length < 6 || typeof password !== 'string';
    if (!validEmail || validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  };

  static checkToken: RequestHandler = (req, res, next): Response | void => {
    const { authorization } = req.headers;
    if (!authorization) { return res.status(401).json({ message: 'Token not found' }); }
    const token = authorization.split(' ')[1];
    try {
      const getToken = jwt.verify(token, process.env.JWT_SECRET || '');
      res.locals.user = getToken;
    } catch (e) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  };

  static validateNewMatch: RequestHandler = (req, res, next): Response | void => {
    const bodyData = req.body;
    const bodyKeys = ['homeTeamId', 'homeTeamGoals', 'awayTeamId', 'awayTeamGoals'];
    const getKey = bodyKeys.find((key) => !(key in bodyData));
    if (getKey) { return res.status(400).json({ message: `${getKey} is required` }); }
    next();
  };
}

export default Validate;
