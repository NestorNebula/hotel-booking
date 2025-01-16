import passport from 'passport';
import { Strategy, StrategyOptionsWithoutRequest } from 'passport-jwt';
import { Request } from 'express';
import { query, getUserById } from '@models/queries';
import 'dotenv/config';

const cookieExtractor = (req: Request) => {
  return req.cookies.token;
};

const options: StrategyOptionsWithoutRequest = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.T!,
};

passport.use(
  new Strategy(options, async (data: { id: number }, done) => {
    const { result: user, error } = await query(() => getUserById(data.id));
    if (error) {
      return error.type === 'Unexpected'
        ? done(error, false)
        : done(null, false);
    } else {
      return done(null, user);
    }
  })
);
