import _ from 'lodash';
import developmentConfig from './development';
import testConfig from './test';
import common from './common';

const detectEnvironment = (env) => ({
  'test': testConfig,
  'dev': developmentConfig,
}[env]);

export default _.assign(common, detectEnvironment(process.env.NODE_ENV));
