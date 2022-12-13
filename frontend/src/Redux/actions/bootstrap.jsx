import logger from '../../Common/logger';

const bootstrap = () => () => {
  logger.log('bootstrap');
};

export default bootstrap;
