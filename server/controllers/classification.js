import { predicateBy } from '../utils/utils';
import qualifications from '../../RabotaUA/qualifications+technologies+skills';
import requirementsJson from '../../RabotaUA/requirementsTranslated';

const classify = function classify() {
  const result = [];

  // loop through all qualifications
  for (let i = 0; i < qualifications.length; i++) {
    for (let j = 0; j < qualifications[i].qualificationsList.length; j++) {
      for (let k = 0; k < qualifications[i].qualificationsList[j].value.length; k++) {
        const skill = qualifications[i].qualificationsList[j].value[k];
        let counter = 0;

        // loop through all requirements in vacancies
        for (let g = 0; g < requirementsJson.length; g++) {
          for (let l = 0; l < requirementsJson[g].requirements.length; l++) {
            let stringWithOneRequirement = requirementsJson[g].requirements[l];
            // remove all unnecessary symbols
            stringWithOneRequirement = stringWithOneRequirement.replace(/[~@#$%^&*|<>,.:;!'`"(){}?=+/\\]/g, ' ');

            const oneVacancyRequirementsArray = stringWithOneRequirement.split(' ');

            // check that skill is in oneVacancyRequirementsArray
            const indexOfSkillInRequirement = oneVacancyRequirementsArray.findIndex(
              item => skill.toLowerCase() === item.toLowerCase()
            );
            // if skill is in requirement counter++
            if (indexOfSkillInRequirement !== -1) {
              counter += 1;
            }
          }
        }

        result.push({ skill: skill, counter: counter });
      }
    }
  }

  result.sort(predicateBy('counter'));
};

classify();

// to run the script use 'node classification.js'
