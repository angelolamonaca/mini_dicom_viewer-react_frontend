const axios = require("axios")

const apiURL = 'http://localhost:3301/api';

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
        }
       }
      `
        }
    });
}

export const getAllPatientsWithStudies = () => {
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
export const getAllPatientsWithAll = () => {
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
      updatedAt
      createdAt
      series {
        id
        seriesName
        createdAt
        updatedAt
        idModality
        files {
          id
          filePath
          createdAt
          updatedAt
        }
      }
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
        getSinglePatient(id:${patientId}) {
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

export const createPatient = (patientName) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      mutation CreatePatient {
  createPatient(name: "${patientName}") {
  id
  name
  }
}
      `
        }
    });
}

export const editPatient = (patientId, patientName) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      mutation EditPatient {
  editPatient(id: ${patientId}, name: "${patientName}")
}
      `
        }
    });
}

export const deletePatient = (patientId) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
mutation DeletePatient {
  deletePatient(id: ${patientId})
}
      `
        }
    });
}
