import { Vacancy } from '../models';
import config from '../config/enviroment';
import { escapeHTMLTags } from '../utils/utils';

exports.removeNotNeededInfoFromVacancyTop = async () => {
  const vacancies = await Vacancy.find();
  const arrayWithKeyWords = config.keyWordsTop;

  for (const vacancy of vacancies) {
    for (const keyWord of arrayWithKeyWords) {
      const startIndex = vacancy.description.indexOf(keyWord);

      if (startIndex !== -1) {
        const obj = {
          ...vacancy,
          description: vacancy.description.substring(keyWord.length + startIndex),
        };

        await Vacancy.updateOne({ _id: vacancy._id }, { $set: obj });
        break;
      }
    }
  }
};

exports.removeNotNeededInfoFromVacancyBottom = async () => {
  const vacancies = await Vacancy.find();
  const arrayWithKeyWords = config.keyWordsBottom;

  for (const vacancy of vacancies) {
    // minStartIndex - the lower the index is the better the vacancies will be cut
    let minStartIndex = vacancy.description.length;

    for (const keyWord of arrayWithKeyWords) {
      const startIndex = vacancy.description.indexOf(keyWord);

      if (startIndex < minStartIndex && startIndex !== -1) {
        minStartIndex = startIndex;
      }
    }
    const obj = {
      ...vacancy,
      description: vacancy.description.substring(0, minStartIndex),
    };

    await Vacancy.updateOne({ _id: vacancy._id }, { $set: obj });
  }
};

exports.getRequirementsFromVacancies = async () => {
  const vacancies = await Vacancy.find();

  for (const vacancy of vacancies) {
    const { description } = vacancy;
    let requirementsArray = [];

    if (!description.includes('<li>')) {
      requirementsArray = description.split('<p>');
    } else {
      requirementsArray = description.split('<li>');
    }

    // escape not needed symbols
    requirementsArray = requirementsArray.map(requirement => escapeHTMLTags(requirement));
    requirementsArray = requirementsArray.map(requirement => requirement.trim());
    requirementsArray = requirementsArray.filter(requirement => requirement !== '');
    // update the vacancy requirements
    if (requirementsArray.length > 2) {
      await Vacancy.updateOne({ _id: vacancy._id }, { $set: { requirements: requirementsArray } });
    }
  }
};
