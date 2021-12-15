const axios = require("axios")

export const getAllPatients = () => {
    return axios({
        url: 'http://localhost:3301/api',
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
