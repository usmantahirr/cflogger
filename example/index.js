const Logger = require('./../index.js');

const logger = new Logger('TEST');

logger.error('this is error');
logger.warn('this is warn');
logger.log('this is log');

function callit() {
	logger.log('this log is from another function', 'callIt');
}

callit();