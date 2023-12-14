import { request } from '../utilities/api'

const locationURL = 'http://cosc-257-node09.cs.amherst.edu:3000/location'

const getLocationByParams = (params) => request('GET', locationURL, params)
const addLocation = (location) =>request('POST', location)

export default{
    getLocationByParams, 
    addLocation
}