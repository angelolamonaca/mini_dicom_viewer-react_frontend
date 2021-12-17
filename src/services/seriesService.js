const axios = require("axios")

const apiURL = 'http://localhost:3302/api';

export const getAllSeries = () => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetAllSeries {
        getAllSeries {
            id
            seriesName
            createdAt
            updatedAt
        }
       }
      `
        }
    });
}

export const getSingleSeries = (idSeries) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetSingleSeries {
        getSingleSeries(id:` + idSeries + `) {
            id
            seriesName
            idStudy
            idModality
            createdAt
            updatedAt
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

export const editSeries = (seriesId, seriesName) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
mutation EditSeries {
  editSeries(id: ${seriesId}, seriesName: "${seriesName}")
}
      `
        }
    });
}
