const http = require('http');
const app = require('./app'); // varsinainen Express-sovellus
const config = require('./util/config');
const logger = require('./util/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
