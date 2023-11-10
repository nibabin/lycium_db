import { request } from '../utilities/api'

const specimenURL = 'http://localhost:3000/specimen'

const getAllSpecimen = () => request('GET', specimenURL)

export default{
    getAllSpecimen
}