import { Vacancy } from '../models';
import { predicateBy } from '../utils/utils';

const getVacancies = async (query, count = Number.MAX_SAFE_INTEGER) =>
  Vacancy.aggregate([
    { $match: query },
    {
      $lookup: {
        from: 'cities',
        localField: 'cityId',
        foreignField: '_id',
        as: 'city',
      },
    },
    { $unwind: { path: '$city', preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: 'companies',
        localField: 'companyId',
        foreignField: '_id',
        as: 'company',
      },
    },
    { $unwind: { path: '$company', preserveNullAndEmptyArrays: true } },
    { $limit: count },
    {
      $group: {
        _id: null,
        records: {
          $push: '$$ROOT',
        },
        total: {
          $first: '$$ROOT.total',
        },
      },
    },
  ]);

const formatSkills = skills => skills.map(({ skill }) => skill.toLowerCase().trim());

const getBestVacancies = async ({ skills, citiesIds, companiesIds }) => {
  // define filters by city and company
  const query = { $and: [] };
  if (citiesIds) {
    query.$and.push({ cityId: { $in: citiesIds } });
  }
  if (companiesIds) {
    query.$and.push({ companyId: { $in: companiesIds } });
  }

  if (!query.$and.length) delete query.$and;

  const searchResults = [];

  // if no skills were provided in request body return any 20 Vacancies
  if (!skills) {
    return getVacancies(query, 20);
  }

  // if skills were provided fetch all vacancies
  const vacancies = await getVacancies(query);

  // prepare skills: toLowerCase and trim
  const skillsFormatted = formatSkills(skills);

  // prepare stringWithSkillsSeparatedByCommas make it an array
  for (let i = 0; i < vacancies.length; i++) {
    let counter = 0;

    if (vacancies[i].requirements && vacancies[i].requirements.length) {
      for (let j = 0; j < vacancies[i].requirements.length; j++) {
        const stringWithOneRequirement = vacancies[i].requirements[j];

        for (let k = 0; k < skillsFormatted.length; k++) {
          if (stringWithOneRequirement.includes(skillsFormatted[k])) {
            counter += 1;
          }
        }
      }
    }

    if (counter) {
      searchResults.push({
        ...vacancies[i],
        counter,
      });
    }
  }

  // get top 20 vacancies that matched skills
  searchResults.sort(predicateBy('counter'));
  searchResults.length = searchResults.length > 20 ? 20 : searchResults.length;

  return searchResults;
};

export default getBestVacancies;
