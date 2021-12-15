const axios = require("axios")

const apiURL='http://localhost:3301/api';

export const getAllStudies = () => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetAllStudies {
        getAllStudies {
            id
            name
            createdAt
            updatedAt
            series {
                id
                studyName
                createdAt
                updatedAt
            }
        }
       }
      `
        }
    });
}

export const getSingleStudy = (studyId) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetSingleStudy {
        getSingleStudy(id:` + studyId + `) {
            id
            studyName
            createdAt
            updatedAt
            series {
                id
                seriesName
                createdAt
                updatedAt
            }
        }
       }
      `
        }
    });
}
