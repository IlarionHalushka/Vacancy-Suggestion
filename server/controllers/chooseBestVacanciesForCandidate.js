import { City, Company, Vacancy } from '../models';
import { predicateBy } from '../utils/utils';

const getBestVacancies = async function getBestVacancies({ skills, citiesIds, companiesIds }) {
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
  let vacancies;

  // if no skills were provided in request body return any 20 Vacancies
  if (!skills) {
    vacancies = await Vacancy.find(query).limit(20);

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

  vacancies = await Vacancy.find(query);

  // prepare stringWithSkillsSeparatedByCommas make it an array
  for (let i = 0; i < vacancies.length; i++) {
    let counter = 0;
    for (let j = 0; j < vacancies[i].requirements.length; j++) {
      for (let k = 0; k < skills.length; k++) {
        // get each requirement are remove symbols and put each word into array oneVacancyRequirementsArray
        // stringWithOneRequirement example: "Good knowledge of JS." or "1+ years of experience!"
        const stringWithOneRequirement = vacancies[i].requirements[j];
        const oneVacancyRequirementsArray = stringWithOneRequirement.split(' ');
        const stringWithSkillLowerCase = skills[k].skill.toLowerCase();

        if (oneVacancyRequirementsArray.indexOf(stringWithSkillLowerCase.trim()) !== -1) {
          counter += 1;
        }
      }
    }
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

  searchResults.sort(predicateBy('counter'));
  searchResults.length = searchResults.length > 20 ? 20 : searchResults.length;
  return searchResults;
};

export default getBestVacancies;
