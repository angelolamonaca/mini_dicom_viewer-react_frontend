const axios = require("axios")

const apiURL = 'http://172.17.0.1:3301/api';

export const getAllModalities = () => {
    return axios({
        url: apiURL,
        method: 'post',
        data: {
            query: `
      query GetAllModalities {
        getAllModalities {
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
