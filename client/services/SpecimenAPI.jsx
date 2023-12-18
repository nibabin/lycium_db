import { request } from '../utilities/api'

const specimenURL = 'http://localhost:3000/specimen'

const getAllSpecimen = () => request('GET', specimenURL)
const deleteSpecimen = (specimen_id) => request('DELETE', `${specimenURL}/${specimen_id}`)
const createSpecimen = (specimen) => request('POST', specimenURL, specimen)
const updateSpecimen = (specimen_id, specimen) => request('PUT', `${specimenURL}/${specimen_id}`, specimen)
const getFilteredSpecimen = (body) => request('POST', `${specimenURL}/filter_specimen/filter`, body)
const getSpecimenById = (specimen_id) => request('GET', `${specimenURL}/${specimen_id}`)

export default{
    getAllSpecimen, 
    deleteSpecimen, 
    updateSpecimen, 
    createSpecimen,
    getFilteredSpecimen,
    getSpecimenById
}