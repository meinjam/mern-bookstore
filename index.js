const app = require('./app'); // the actual Express application
const config = require('./utils/config');
const logger = require('./utils/logger');

//listen for request
app.listen(config.PORT, () => {
  logger.info('Server running at:', `http://localhost:${config.PORT}`);
});
