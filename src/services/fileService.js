const axios = require("axios")

const apiURL = 'http://localhost:3301/api';

export const getAllFiles = () => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetAllFiles {
  getAllFiles {
    id
    filePath
    idPatient
    idStudy
    idSeries
    createdAt
    updatedAt
  }
}
      `
        }
    });
}
export const getSingleFile = (idFile) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetSingleFile {
        getSingleFile(id:` + idFile + `) {
            id
            filePath
            createdAt
            updatedAt
        }
       }
      `
        }
    });
}


