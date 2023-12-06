import { request } from '../utilities/api'

const geneticsURL = 'http://localhost:3000/genetics'

const getGeneticsByParams = (params) => request('GET', geneticsURL, params)
const addGenetics = (genetics) => request('POST', geneticsURL, genetics)

export default{
    getGeneticsByParams, 
    addGenetics
}
