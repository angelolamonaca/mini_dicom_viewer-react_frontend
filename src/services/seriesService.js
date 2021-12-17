const axios = require("axios")

const apiURL = 'http://172.17.0.1:3301/api';

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

export const editSeriesModality = (seriesId, modalityId) => {
    console.log("Line 65 in seriesService.js", modalityId)
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
mutation EditSeriesModality {
  editSeriesModality(id: ${seriesId}, idModality: ${modalityId})
}
      `
        }
    });
}
