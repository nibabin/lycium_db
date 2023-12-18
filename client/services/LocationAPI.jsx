import { request } from '../utilities/api'

const locationURL = 'http://localhost:3000/location'

const getLocationByParams = (params) => request('GET', locationURL, params)
const addLocation = (location) =>request('POST', location)

export default{
    getLocationByParams, 
    addLocation
}