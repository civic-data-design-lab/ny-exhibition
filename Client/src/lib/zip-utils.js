import nyZipCodes from '../data/ny-zip-codes.json'
import { BOROUGHS_MAP } from './constants'

export const isValidZip = (zip) => nyZipCodes.includes(zip)

export const getBorough = (zip) => (zip && BOROUGHS_MAP[zip] ? BOROUGHS_MAP[zip] : '')
