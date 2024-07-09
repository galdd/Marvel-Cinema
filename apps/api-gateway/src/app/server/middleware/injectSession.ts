import { NextFunction, Request, Response } from 'express';
import UsersService from '../../adapters/UsersService';

const injectSession = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.accessToken) {
    const currentUser = await UsersService.fetchUserSession({
      accessToken: req.cookies.accessToken,
    });
    res.locals.currentUser = currentUser;
  } else {
    res.locals.currentUser = null;
  }

  return next();
};

export default injectSession;