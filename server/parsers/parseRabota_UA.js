import request from "request-promise";
import { Vacancy, City, Company } from "../models";
import translateWithTimeout from "../utils/translate";
import { saveOnDiskAsJSON } from "../utils/utils";

const requestGeneralSearchOpts = {
  url: "https://api.rabota.ua/vacancy/search",
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
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
  let allItemsIds = [];
  let totalNumberOfPages = await getTotalNumberOfPages(
    '{ keywords: "qa engineer"}'
  );
  for (let pageIndex = 0; pageIndex <= totalNumberOfPages; pageIndex++) {
    const dataRequest = await request(
      Object.assign(requestGeneralSearchOpts, {
        body: `{ keywords: "qa engineer", page: ${pageIndex} }`
      })
    );
    const vacanciesOnePage = JSON.parse(await dataRequest).documents;
    // push to allItemsIds only active vacancies
    vacanciesOnePage.forEach(vacancy => {
      if (vacancy.isActive) {
        allItemsIds.push(vacancy.id);
      }
    });

    console.log(`pageIndex ${pageIndex} is fetched`);
  }

  return allItemsIds;
};

const parseDetailOfEachVacancy = async ids => {
  let vacanciesArray = [];

  for await (const id of ids) {
    console.log("parsing", id);

    let vacancyDetails = await request({
      url: `https://api.rabota.ua/vacancy?id=${id}`,
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    vacancyDetails = JSON.parse(vacancyDetails);
    vacanciesArray.push(vacancyDetails);

    await saveCompaniesInDB(vacancyDetails);
    await saveCityInDB(vacancyDetails);
    await saveVacancyInDB(vacancyDetails);
  }
  return vacanciesArray;
};

const saveCompaniesInDB = async vacancy => {
  // save company in DB avoiding duplicates
  await Company.updateOne(
    { name: vacancy.companyName },
    {
      $set: {
        name: vacancy.companyName,
        contactPerson: vacancy.contactPerson,
        contactPhone: vacancy.contactPhone,
        contactURL: vacancy.contactURL,
        externalId: vacancy.notebookId
      }
    },
    { upsert: true }
  );
  console.log("saved company ");
};

const saveCityInDB = async vacancy => {
  // save city in DB, avoiding duplicates
  await City.updateOne(
    { externalId: vacancy.cityId },
    {
      $set: {
        name: vacancy.cityName,
        externalId: vacancy.cityId
      }
    },
    { upsert: true }
  );
  console.log("saved city ");
};

const saveVacancyInDB = async vacancy => {
  // get ids of company and city
  const { _id: companyId } = await Company.findOne({
    name: vacancy.companyName
  });
  const { _id: cityId } = await City.findOne({
    externalId: vacancy.cityId
  });
  // translate vacancy description
  console.log("vacancyDescription", vacancy.description);
  try {
    vacancy.description = await translateWithTimeout(vacancy.description, 30000);
  }
  catch (e) {
    console.error(e);
  }
  console.log("vacancy", vacancy);
  console.log("vacancyDescription", vacancy.description);
  vacancy.description = vacancy.description.toLowerCase();
  // save vacancy in DB, avoiding duplicates
  await Vacancy.updateOne(
    { externalId: vacancy.id },
    {
      $set: {
        name: vacancy.name,
        description: vacancy.description,
        externalId: vacancy.id,
        companyId: companyId,
        cityId: cityId,
        dateExternal: vacancy.date
      }
    },
    { upsert: true }
  );
  console.log("saved vacancy ");
};

const removeOldDataFromDB = async () => {
  await City.deleteMany({
    updatedAt: { $lte: new Date(new Date().setDate(new Date().getDate() - 2)) }
  });
  await Company.deleteMany({
    updatedAt: { $lte: new Date(new Date().setDate(new Date().getDate() - 2)) }
  });
  await Vacancy.deleteMany({
    updatedAt: { $lte: new Date(new Date().setDate(new Date().getDate() - 2)) }
  });
};

const parseRabota_UA = async () => {
  try {
    const idsOfVacancies = await parseAllVacanciesList();
    const vacanciesDetails = await parseDetailOfEachVacancy(idsOfVacancies);
    // TODO: no need to save it on disk on prod, just for testing or analysing purposes maybe
    /* await saveOnDiskAsJSON(
       vacanciesDetails,
       `${__dirname}_allVacancies_parseRabotaUA.json`
     );*/
    // TODO: don't remove old data, because now will only run parsing cron manually
    // await removeOldDataFromDB();
  }
  catch (e) {
    console.error(e);
  }
};

export default parseRabota_UA;
