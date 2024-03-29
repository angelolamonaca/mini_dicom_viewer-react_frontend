const axios = require("axios")

const apiURL = 'http://localhost:3301/api';

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

export const createStudy = (studyName, idPatient) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
mutation CreateStudy {
  createStudy(studyName: "${studyName}", idPatient: ${idPatient}) {
  id
  studyName
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

export const deleteStudy = (studyId) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
mutation DeleteStudy {
  deleteStudy(id: ${studyId})
}
      `
        }
    });
}
