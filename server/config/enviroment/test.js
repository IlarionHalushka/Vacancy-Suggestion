module.exports = {
  mongo: {
    //  uri: 'mongodb://localhost:27017/vacanciesSuggestion-dev',
    uri: `mongodb://${process.env.USER}:${
      process.env.PASSWORD
    }@ds125953.mlab.com:25953/vacancies-suggestions`,
  },
  serverPort: 8080,
  apiPrefix: 'https://vacancies-suggestions-219018.appspot.com',
  keyWordsTop: [
    'what we expect from our candidate',
    'requirements:',
    'требования:',
    'необходимые навыки',
    'вимоги:',
    'qualifications:',
    'essential skills',
    'our expectations',
    'знать и уметь',
    'must have skill',
    'требуется',
    'к кандидату',
    'идеального кандидата',
    'relevant experience',
    'ожидания к вам',
    'ожидаем от',
    '>skills:</',
    'нам важны:<',
    'experience in:',
    'требования',
    'требовани',
    'вимоги',
    'qualifications',
    'required',
    'requirements',
    'require',
  ],
  keyWordsBottom: [
    "what's in it for you",
    'условия работы',
    'responsibilities',
    'we offer:',
    'we offer',
    'what we offer:',
    'what we offer',
    'предлагае',
    'conditions',
    'please send',
    'offer',
    'пропону',
    'обязанности',
    'сылайте',
    'силайте',
    'send your',
    'работа в veon',
    'what is it for',
    'from our side',
    'what we love about',
    'desirable',
    'benefit',
    'personal profile',
    'about the',
    'what we love',
    'what we like about',
    'one of many reasons',
    'режим работы',
    'will be an advantage',
    'will be a plus',
    'job details',
    'what will you get',
    'what you will get',
    'why is eric',
    'phone',
    'location',
    'if you are not',
    'ready to relocate',
    'наше предложение',
    'what you gain',
    'what should you',
    'give in exchange',
    'вакансия предусматриваем',
    'основные принципы',
    'we guarantee',
    'you will get',
    'what you will get',
    'constant professional',
    'working from',
    'we provide',
    'what we can',
    'schedule',
    'from us',
    'you are welcome',
    'it would be',
    'the candidate who meets',
    'employment conditions',
    'out product',
    'at work',
  ],
};
