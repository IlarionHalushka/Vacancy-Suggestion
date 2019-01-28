import developmentConfig from './development';
import testConfig from './test';

const detectEnvironment = (env) => ({
  'test': testConfig,
  'dev': developmentConfig,
}[env]);

export default detectEnvironment(process.env.NODE_ENV);
