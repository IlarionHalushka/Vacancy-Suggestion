export default {
  mongo: {
    //  uri: 'mongodb://localhost:27017/vacanciesSuggestion-dev',
    uri: `mongodb://${process.env.USER}:${
      process.env.PASSWORD
    }@ds125953.mlab.com:25953/vacancies-suggestions`,
  },
  serverPort: 8080,
  apiPrefix: 'https://vacancies-suggestions-219018.appspot.com',
};
