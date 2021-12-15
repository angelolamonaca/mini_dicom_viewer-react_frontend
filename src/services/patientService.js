const axios = require("axios")

const apiURL='http://localhost:3301/api';

export const getAllPatients = () => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetAllPatients {
        getAllPatients {
            id
            name
            createdAt
            updatedAt
            studies {
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

export const getSinglePatient = (patientId) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetSinglePatient {
        getSinglePatient(id:` + patientId + `) {
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
