const axios = require("axios")

const apiURL='http://localhost:3301/api';

export const getAllSeries = () => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetAllSeries {
        getAllSeries {
            id
            name
            createdAt
            updatedAt
        }
       }
      `
        }
    });
}

export const getSingleSeries = (seriesId) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetSingleSeries {
        getSingleSeries(id:` + seriesId + `) {
            id
            seriesName
            idStudy
            idModality
            createdAt
            files {
                id
                filePath
                createdAt
            }
        }
       }
      `
        }
    });
}