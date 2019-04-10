import { Qualification, Vacancy } from '../models';

const classify = async () => {
  const [qualifications, requirements] = Promise.all([
    await Qualification.find({}, { _id: 1, value: 1 }),
    await Vacancy.find({}, { requirements: 1 }),
  ]);

  // loop through all qualifications
  for (let i = 0; i < qualifications.length; i++) {
    let counter = 0;
    // loop through all requirements in vacancies
    for (let g = 0; g < requirements.length; g++) {
      for (let l = 0; l < requirements[g].length; l++) {
        // check that skill is in stringWithOneRequirement
        if (requirements[g][l].includes(qualifications[i].value)) counter += 1;
      }
    }
    if (counter)
      await Qualification.updateOne({ _id: qualifications[i]._id }, { $set: { counter } });
  }

  console.log('Finished classification');
};

export const qualifications = async () =>
  Qualification.find({ counter: { $gte: 1 } }).sort('-counter');

export default classify;
// classify();

// to run the script use
// export NODE_ENV=test && export USER=larry && export PASSWORD=amalarry4
// nodemon classification.js --exec babel-node --presets es2015,stage-2
