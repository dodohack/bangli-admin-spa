/**
 * This is the model of geo-location used widely by the content, there are 3
 * levels of locations:
 * 1. city(town/area)
 * 2. region(province/county/state)
 * 3. country
 */

export class Location {
    id: number;
    loc_type: number; // enum type: 1 - city, 2 - region, 3 - country
    parent_id: number;
    rate: number; // editorial rate, 0-10 points
    slug: string; // url friendly name
    name: string; // English name
    name_cn: string; // Chinese name
    description: string; // !!Location topic content!!
    latitude: number;  // Only usable for city
    longitude: number; // Only usable for city
}
