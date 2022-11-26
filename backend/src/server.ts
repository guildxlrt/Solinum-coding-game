import express from 'express';
import http from 'http';
import {config} from './config/config'
import mongoose from 'mongoose'
import Logging from './config/Logging'
import pointRoutes from './routes/Point'

const router = express();

/** Connecter a Mongo */
mongoose
  .connect(config.mongo.url, {retryWrites : true, w : 'majority'})
  .then(() => {
    Logging.info('Connected to mongoDB.')
    StartServer();
  })
  .catch((error) => {
    Logging.error('Unable to connect : ')
    Logging.error(error)
  })

/** After Mongo Connects */
const StartServer = () => {
  router.use((req, res, next) => {
    /** Log the response */
    Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    
    res.on('finish', () => {
      /** Log the res */
      Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });
  
    next();
  })

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
  });

  /** Routes*/
  router.use('/points', pointRoutes)

  /** Verification de sante */
  router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

  /** Erreurs */
  router.use((req, res, next) => {
    const error = new Error('Not found');

    Logging.error(error);

    res.status(404).json({
        message: error.message
    });
  });

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
}