import { Request, Response } from 'express';

export interface UserSessionType {
  user: {
    id: string;
    email: string;
    isAdmin: boolean;
    iat: number;
    exp: number;
  };
}

export interface ResolverContext {
  req: Request;
  res: Response;
  currentUser?: UserSessionType;
}
