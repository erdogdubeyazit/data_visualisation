import axios from 'axios'
import errorParser from '@/util/error-parser'

function getAllNodes() {
    return new Promise((resolve, reject) => {
        axios.get('/nodes').then(({data}) => {
            const result = parseTreeData(data.data)
            resolve(result)
        }).catch((error) => {
            reject(errorParser.parse(error))
        })
    })
}

function parseTreeData(data) {
    if (!data || !Array.isArray(data)) {
        throw new Error("Invalid data format. Expected an array.");
    }
    if (data.length > 1) {
        throw new Error("There can not be multiple roots in a tree.");
    }
    return data[0];
}

export default {getAllNodes}