const axios = require("axios")

const apiURL = 'http://localhost:3302/api';

export const getAllStudies = () => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetAllStudies {
        getAllStudies {
            id
            studyName
            idPatient
            createdAt
            updatedAt
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
        }
       }
      `
        }
    });
}

export const getSingleStudyWithSeries = (studyId) => {
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
                idModality
                createdAt
                updatedAt
            }
        }
       }
      `
        }
    });
}

export const editStudy = (studyId, studyName) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
mutation EditStudy {
  editStudy(id: ${studyId}, studyName: "${studyName}")
}
      `
        }
    });
}
