const pretty = require('pino-pretty');
const pino = require('pino');

const logger = pino(pretty);

module.exports = logger;
