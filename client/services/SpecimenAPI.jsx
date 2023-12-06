import { request } from '../utilities/api'

const specimenURL = 'http://localhost:3000/specimen'

const getAllSpecimen = () => request('GET', specimenURL)
const deleteSpecimen = (specimen_id) => request('DELETE', `${specimenURL}/${specimen_id}`)
const createSpecimen = (specimen) => request('POST', specimenURL, specimen)
const updateSpecimen = (specimen_id, specimen) => request('PUT', `${specimenURL}/${specimen_id}`, specimen)


export default{
    getAllSpecimen, 
    deleteSpecimen, 
    updateSpecimen, 
    createSpecimen
}