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
      cityId: { $in: companiesIds },
    };
  }
  const vacancies = await Vacancy.find(query);
  // prepare stringWithSkillsSeparatedByCommas make it an array
  let counters = [];
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
      counters.push({
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
  counters = counters.sort(predicateBy('counter'));
  counters.length = counters.length > 20 ? 20 : counters.length;
  return counters;
};

export default getBestVacancies;
