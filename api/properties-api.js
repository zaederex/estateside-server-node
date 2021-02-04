const axios = require('axios');

const API_URL = 'https://api.bridgedataoutput.com/api/v2';

const getAllProperties = (location, offset, limit) => {
    let url = `${API_URL}/zestimates?access_token=${process.env.API_KEY}&offset=${offset}&limit=${limit}`
    if (location) {
        url = `${url}&near=${location}`
    }
    return axios.get(`${url}`)
}

const getPropertyById = (zpid, res) => {
    let url = `${API_URL}/zestimates?access_token=${process.env.API_KEY}&zpid=${zpid}`
    axios.get(`${url}`)
        .then(response => {
            if (response.data.bundle.length === 0) {
                res.send({})
            }
            let data = response.data.bundle[0]

            // get property details
            axios.get(
                `${API_URL}/pub/assessments?access_token=${process.env.API_KEY}&zpid=${zpid}`)
                .then(resp => {
                    if (resp.data.bundle.length !== 0) {
                        const allDetails = resp.data.bundle[0];
                        if (allDetails.building.length !== 0) {
                            data.building = allDetails.building[0]
                        }
                        data.address = allDetails.address;
                        data.ownerName = allDetails.ownerName
                    }
                    res.send(data)
                }).catch(error => {
                console.log(error);
            })

        })
        .catch(error => {
            console.log(error);
        });
};

const getSpecificExternalProperty = (zpid) => {
    let url = `${API_URL}/zestimates?access_token=${process.env.API_KEY}&zpid=${zpid}`
    return axios.get(`${url}`)
};

module.exports = {
    getAllProperties, getPropertyById
    , getSpecificExternalProperty
};
