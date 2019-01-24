import { City, Company, Vacancy } from "../models";

const getBestVacancies = async function getBestVacancies({
  skills,
  citiesIds,
  companiesIds
}) {
  let query = {};
  if (citiesIds) {
    query.$and = {
      cityId: { $in: citiesIds }
    };
  }
  if (companiesIds) {
    query.$and = {
      cityId: { $in: companiesIds }
    };
  }
  let vacancies = await Vacancy.find(query);
  // prepare stringWithSkillsSeparatedByCommas make it an array
  let counters = [];
 // console.log(skills);
 // console.log(vacancies);
 // console.log(vacancies[0].requirements);
  for (let i = 0; i < vacancies.length; i++) {
    let counter = 0;
    for (let j = 0; j < vacancies[i].requirements.length; j++) {
      for (let k = 0; k < skills.length; k++) {
        // get each requirement are remove symbols and put each word into array oneVacancyRequirementsArray
        // stringWithOneRequirement example: "Good knowledge of JS." or "1+ years of experience!"
        let stringWithOneRequirement = vacancies[i].requirements[j];
       // console.log("stringWithOneRequirement", stringWithOneRequirement);
        let oneVacancyRequirementsArray = stringWithOneRequirement.split(" ");
        let stringWithSkillLowerCase = skills[k].skill.toLowerCase();
       // console.log("stringWithSkillLowerCase", stringWithSkillLowerCase);

        if (
          oneVacancyRequirementsArray.indexOf(
            stringWithSkillLowerCase.trim()
          ) !== -1
        ) {
          counter++;
        }
      }
    }
    // console.log(counter)
    if (counter) {
      const city = await City.findOne(
        { _id: vacancies[i].cityId },
        { name: 1, externalId: 1 }
      );
      const company = await Company.findOne(
        { _id: vacancies[i].companyId },
        { name: 1, externalId: 1 }
      );
      counters.push({
        vacancyId: vacancies[i].externalId,
        vacancyName: vacancies[i].name,
        companyId: vacancies[i].companyId,
        companyExternalId: company.externalId,
        cityId: vacancies[i].cityId,
        companyName: company.name,
        cityName: city.name,
        counter: counter
      });
    }
  }
  counters = counters.sort(predicateBy("counter"));
  counters.length = counters.length > 20 ? 20 : counters.length;
 // console.log(counters)
  return counters;
};

function predicateBy(prop) {
  return function(a, b) {
    if (a[prop] < b[prop]) {
      return 1;
    } else if (a[prop] > b[prop]) {
      return -1;
    }
    return 0;
  };
}

export default getBestVacancies;
