import { request } from '../utilities/api'

const genomicsURL = 'http://localhost:3000/genomics'

const getGenomics = (specimen_id) => request('GET', `${genomicsURL}/${specimen_id}`)
const deleteGenomics = (genomics_id) => request('DELETE', `${genomicsURL}/${genomics_id}`)
const addGenomics = (genomics) => request('POST', genomicsURL, genomics)

export default{
    getGenomics, 
    deleteGenomics, 
    addGenomics
}