/**
 * This is the model of geo-location used widely by the content, there are 3
 * levels of locations:
 * 1. city(town/area)
 * 2. region(province/county/state)
 * 3. country
 */

// name 'Location' conflicts with angular builtin type
export class GeoLocation {
    id: number;
    loc_type: string; // enum type: CITY, REGION and COUNTRY
    administrative_id: number;
    parent_id: number;
    rate: number; // editorial rate, 0-10 points
    slug: string; // url friendly name
    name: string; // English name
    name_cn: string; // Chinese name
    population: number;
    content: string; // !!GeoLocation topic content!!
    latitude: number;  // Only usable for city
    longitude: number; // Only usable for city
}
