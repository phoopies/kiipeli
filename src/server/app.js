const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();
require('express-async-errors');
const logger = require('./util/logger');
const config = require('./util/config');
const middleware = require('./util/middleware');
const authRouter = require('./controllers/auth');
const wallsRouter = require('./controllers/walls');
const routesRouter = require('./controllers/routes');
const Wall = require('./models/Wall');
const WallHolds = require('./models/WallHolds');
const testDataHolds = require('./util/test-data-holds');
const User = require('./models/User');

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error);
  });

// In dev mode create holds setup if does not exist to ease development
if (config.IS_DEVELOPMENT) {
  mongoose.connection.once('open', async () => {
    try {
      const testWallName = 'Test wall';
      const exists = await Wall.exists({ name: testWallName });
      if (exists) {
        // The initialization is already done before
        return;
      }
      const user = await User.create({
        email: 'developer@developer.dev',
        username: 'developer',
        passwordHash: 'asdoihjaw',
      });
      const wall = await Wall.create({
        name: 'Test wall',
        image: 'image-1680262756806',
        user,
      });
      await WallHolds.create({ wallId: wall.id, holds: testDataHolds });
    } catch (err) {
      logger.error(err);
      // TODO handle error
    }
  });
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // TODO: What is this
app.use(morgan('common'));
app.use(cors());
app.use(helmet());

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
      res.redirect(`https://${req.header('host')}${req.url}`);
    else next();
  });
}

// ... other app.use middleware
app.use(express.static(path.join(__dirname, '../frontend', 'build')));

// ...
// Right before your app.listen(), add this:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'build', 'index.html'));
});

app.use(middleware.tokenExtractor);

app.use('/api/auth', authRouter);
app.use('/api/walls', wallsRouter);
app.use('/api/routes', routesRouter);

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
