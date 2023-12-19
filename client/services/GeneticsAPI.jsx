import { request } from '../utilities/api'

const geneticsURL = 'http://cosc-257-node09.cs.amherst.edu:3000/genetics'

const getGeneticsByParams = (params) => request('GET', geneticsURL, params)
const addGenetics = (genetics) => request('POST', geneticsURL, genetics)
const getAllGenetics = () => request('GET', geneticsURL + "/all")

export default{
    getGeneticsByParams, 
    addGenetics,
    getAllGenetics
}
