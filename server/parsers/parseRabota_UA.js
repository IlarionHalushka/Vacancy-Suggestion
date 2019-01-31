import request from 'request-promise';
import { Vacancy, City, Company } from '../models';
import translateWithTimeout from '../utils/translate';

const requestGeneralSearchOpts = {
  url: 'https://api.rabota.ua/vacancy/search',
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const getTotalNumberOfPages = async bodyQuery => {
  // get total number of pages
  const responseSearch = await request(
    Object.assign(requestGeneralSearchOpts, { body: bodyQuery })
  );
  // one page has 20 vacancies so divide total by 20
  return Math.floor(JSON.parse(responseSearch).total / 20);
};

const parseAllVacanciesList = async () => {
  const allItemsIds = [];
  const totalNumberOfPages = await getTotalNumberOfPages('{ keywords: "qa engineer"}');

  for (let pageIndex = 0; pageIndex <= totalNumberOfPages; pageIndex++) {
    const dataRequest = await request(
      Object.assign(requestGeneralSearchOpts, {
        body: `{ keywords: "qa engineer", page: ${pageIndex} }`,
      })
    );
    const vacanciesOnePage = JSON.parse(await dataRequest).documents;

    // push to allItemsIds only active vacancies
    vacanciesOnePage.forEach(vacancy => {
      if (vacancy.isActive) allItemsIds.push(vacancy.id);
    });
  }

  return allItemsIds;
};

const parseDetailOfEachVacancy = async ids => {
  const vacanciesArray = [];

  for await (const id of ids) {
    let vacancyDetails = await request({
      url: `https://api.rabota.ua/vacancy?id=${id}`,
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    vacancyDetails = JSON.parse(vacancyDetails);
    vacanciesArray.push(vacancyDetails);

    await Promise.all([
      saveCompaniesInDB(vacancyDetails),
      saveCityInDB(vacancyDetails),
      saveVacancyInDB(vacancyDetails),
    ]);
  }
  return vacanciesArray;
};

const saveCompaniesInDB = async vacancy => {
  // save company in DB avoiding duplicates
  return Company.updateOne(
    { name: vacancy.companyName },
    {
      $set: {
        name: vacancy.companyName,
        contactPerson: vacancy.contactPerson,
        contactPhone: vacancy.contactPhone,
        contactURL: vacancy.contactURL,
        externalId: vacancy.notebookId,
      },
    },
    { upsert: true }
  );
};

const saveCityInDB = async vacancy => {
  // save city in DB, avoiding duplicates
  return City.updateOne(
    { externalId: vacancy.cityId },
    {
      $set: {
        name: vacancy.cityName,
        externalId: vacancy.cityId,
      },
    },
    { upsert: true }
  );
};

const saveVacancyInDB = async vacancy => {
  // get ids of company and city
  const [ { _id: companyId }, { _id: cityId } ] = await Promise.all([
    Company.findOne({
      name: vacancy.companyName,
    }),
    City.findOne({
      externalId: vacancy.cityId,
    })
  ]);

  try {
    vacancy.description = await translateWithTimeout(vacancy.description, 30000);
  } catch (e) {
    console.error(e);
  }

  vacancy.description = vacancy.description.toLowerCase();
  // save vacancy in DB, avoiding duplicates
  return Vacancy.updateOne(
    { externalId: vacancy.id },
    {
      $set: {
        name: vacancy.name,
        description: vacancy.description,
        externalId: vacancy.id,
        companyId,
        cityId,
        dateExternal: vacancy.date,
      },
    },
    { upsert: true }
  );
};

const removeOldDataFromDB = async () => {
  await Promise.all([
    City.deleteMany({
      updatedAt: { $lte: new Date(new Date().setDate(new Date().getDate() - 2)) },
    }),
    Company.deleteMany({
      updatedAt: { $lte: new Date(new Date().setDate(new Date().getDate() - 2)) },
    }),
    Vacancy.deleteMany({
      updatedAt: { $lte: new Date(new Date().setDate(new Date().getDate() - 2)) },
    }),
  ]);
};

const parseRabota_UA = async () => {
  try {
    const idsOfVacancies = await parseAllVacanciesList();
    const vacanciesDetails = await parseDetailOfEachVacancy(idsOfVacancies);
    // TODO: no need to save it on disk on prod, just for testing or analysing purposes maybe
    /* await saveOnDiskAsJSON(
       vacanciesDetails,
       `${__dirname}_allVacancies_parseRabotaUA.json`
     ); */
    // TODO: don't remove old data, because now will only run parsing cron manually
    // await removeOldDataFromDB();
  } catch (e) {
    console.error(e);
  }
};

export default parseRabota_UA;
