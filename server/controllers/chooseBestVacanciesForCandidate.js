import { City, Company, Vacancy } from '../models';
import { predicateBy } from '../utils/utils';

const getBestVacancies = async function getBestVacancies({ skills, citiesIds, companiesIds }) {
  console.time()

  const query = {};
  if (citiesIds) {
    query.$and = {
      cityId: { $in: citiesIds },
    };
  }
  if (companiesIds) {
    query.$and = {
      companyId: { $in: companiesIds },
    };
  }

  const searchResults = [];

  // if no skills were provided in request body return any 20 Vacancies
  if (!skills) {
    const vacancies = await Vacancy.find(query).limit(20);

    for (let i = 0; i < vacancies.length; i++) {
      const [city, company] = await Promise.all([
        City.findOne({ _id: vacancies[i].cityId }, { name: 1, externalId: 1 }),
        Company.findOne({ _id: vacancies[i].companyId }, { name: 1, externalId: 1 }),
      ]);
      searchResults.push({
        vacancyId: vacancies[i].externalId,
        vacancyName: vacancies[i].name,
        companyId: vacancies[i].companyId,
        companyExternalId: company.externalId,
        cityId: vacancies[i].cityId,
        companyName: company.name,
        cityName: city.name,
      });
    }

    return searchResults;
  }

  // if skills were provided
  const vacancies = await Vacancy.find(query);

  // prepare skills: toLowerCase and trim
  for (let k = 0; k < skills.length; k++) {
    skills[k].skill = skills[k].skill.toLowerCase().trim();
  }

  // prepare stringWithSkillsSeparatedByCommas make it an array
  for (let i = 0; i < vacancies.length; i++) {
    let counter = 0;
    for (let j = 0; j < vacancies[i].requirements.length; j++) {
      const stringWithOneRequirement = vacancies[i].requirements[j];

      for (let k = 0; k < skills.length; k++) {
        if (stringWithOneRequirement.indexOf(skills[k].skill) !== -1) {
          counter += 1;
        }
      }
    }

    // TODO: first sort results by predicate 'counter' and only after that query City, Company
    if (counter) {
      const [city, company] = await Promise.all([
        City.findOne({ _id: vacancies[i].cityId }, { name: 1, externalId: 1 }),
        Company.findOne({ _id: vacancies[i].companyId }, { name: 1, externalId: 1 }),
      ]);
      searchResults.push({
        vacancyId: vacancies[i].externalId,
        vacancyName: vacancies[i].name,
        companyId: vacancies[i].companyId,
        companyExternalId: company.externalId,
        cityId: vacancies[i].cityId,
        companyName: company.name,
        cityName: city.name,
        counter,
      });
    }
  }
  console.timeEnd()

  searchResults.sort(predicateBy('counter'));
  searchResults.length = searchResults.length > 20 ? 20 : searchResults.length;

  return searchResults;
};

export default getBestVacancies;
