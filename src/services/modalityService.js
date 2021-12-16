const axios = require("axios")

const apiURL='http://localhost:3301/api';

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
