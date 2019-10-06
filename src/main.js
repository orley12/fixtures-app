import express from 'express';
import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import apiRouter from './routes';
import { respondWithSuccess, respondWithWarning } from './utils/responseHandler';
import { config } from './config/constants';
import { apiCallsManager } from './middlewares/util.middleware';

const { DATABASE_URL, PORT } = config();

const client = redis.createClient();
const redisStore = connectRedis(session);

const app = express();

mongoose.connect( DATABASE_URL, { useCreateIndex:true, useNewUrlParser: true });
const db = mongoose.connection;

//mongo error
db.on('error', console.error.bind(console, 'connection error'));

app.use(session({
  secret: "fixture_app",
  name: 'auth-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new redisStore({
    host: 'localhost', 
    port: 6379, 
    client: client, 
    ttl: 500000
  })
}));

app.use(apiCallsManager);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(logger('dev'));

// handles default route
app.get('/', (req, res) => respondWithSuccess(res, 200, 'Welcome to fixtures app'));

app.use(apiRouter);

// handles non-existing routes
app.all('*', (req, res) => respondWithWarning(res, 404, 'route not found'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});

export default app;
