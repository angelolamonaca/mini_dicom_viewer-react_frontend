const axios = require("axios")

const apiURL = 'http://localhost:3302/api';

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

export const editFile = (fileId, filePath) => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
mutation EditFile {
  editFile(id: ${fileId}, filePath: "${filePath}")
}
      `
        }
    });
}


