import axios from "axios";

const baseUrl = '/api/persons'

const getAll = async () => {
    try {
        const res = await axios.get(baseUrl);
        console.log(res);
        return res.data;
    }
    catch(e) {
        console.log(e)
    }
}

const addPerson = async (personObject) => {
    try {
        const res = await axios.post(baseUrl, personObject);
        console.log(res);
        return res.data;
    }
    catch(e) {
        console.log(e)
    }
}

const deletePerson = async (id) => {
    try {
        const res = await axios.delete(`${baseUrl}/${id}`);
        console.log(res);
        return res.data;
    }
    catch(e) {
        console.log(e)
    }
}

const updatePerson = async (id, data) => {
    try {
        const res = await axios.put(`${baseUrl}/${id}`, data);
        console.log(res);
        return res.data;
    }
    catch(e) {
        console.log(e)
    }
}

export default {getAll, addPerson, deletePerson, updatePerson};