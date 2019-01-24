import mongoose from 'mongoose';
import schedule from 'node-schedule';
import config from '../config/enviroment';
import scheduledTasks from './index';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.on('unhandledRejection', reason => {
  console.error(reason);
  process.exit(1);
});

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

mongoose.connect(config.mongo.uri, err => {
  if (err) {
    console.error(`Error Connection ${config.mongo.uri} :${err.message}`);
  } else {
    console.info(`Connection to ${config.mongo.uri} has been successfully established.`);
  }
});

/**
 * Server backgroud jobs for parsing
 */
scheduledTasks.forEach(task => schedule.scheduleJob(task.timePattern, task.handler));
