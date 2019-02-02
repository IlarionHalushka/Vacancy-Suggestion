import { predicateBy } from '../utils/utils';
import qualifications from '../../RabotaUA/qualifications+technologies+skills';
import requirementsJson from '../../RabotaUA/requirementsTranslated';

const classify = function classify() {
  const skillsFrequency = [];

  // prepare all requirements in vacancies
  // remove symbols and make lowercase
  for (let g = 0; g < requirementsJson.length; g++) {
    for (let l = 0; l < requirementsJson[g].requirements.length; l++) {
      requirementsJson[g].requirements[l] = requirementsJson[g].requirements[l]
        .replace(/[~@#$%^&*|<>,.:;!'`"(){}?=+/\\]/g, ' ')
        .toLowerCase();
    }
  }

  // loop through all qualifications
  for (let i = 0; i < qualifications.length; i++) {
    for (let j = 0; j < qualifications[i].qualificationsList.length; j++) {
      for (let k = 0; k < qualifications[i].qualificationsList[j].value.length; k++) {
        let counter = 0;

        // loop through all requirements in vacancies
        for (let g = 0; g < requirementsJson.length; g++) {
          for (let l = 0; l < requirementsJson[g].requirements.length; l++) {
            // check that skill is in stringWithOneRequirement
            if (requirementsJson[g].requirements[l].indexOf(qualifications[i].qualificationsList[j].value[k].toLowerCase()) !== -1) counter += 1;
          }
        }

        if (counter) skillsFrequency.push({ skill: qualifications[i].qualificationsList[j].value[k], counter });
      }
    }
  }

  return skillsFrequency.sort(predicateBy('counter'));
};

console.log(classify());

// to run the script use 'node classification.js'
