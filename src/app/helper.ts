/**
 * This file defines helper functions
 */

/**
 * Convert given date into MySQL compatible GMT date format  
 */
export function GMT(value) {
    let d = new Date(value);
    let offset = d.getTimezoneOffset() / 60;
    // Patch user timezone offset, so we can get the GMT
    d.setHours(d.getHours() - offset);
    let newDate = d.toISOString().slice(0,19).split('T');
    return newDate[0] + ' ' + newDate[1];
}

/**
 * Return MySQL compatible date in GMT
 * We set from date start from 00:00:00 of the day and to date end with
 * 23:59:59 of the day.
 */
export function getMySQLDateGMT(value: any, start: boolean) {
    let d = GMT(value);
    if (start)
        return d.slice(0,10) + ' 00:00:00';
    else
        return d.slice(0,10) + ' 23:59:59';
}

/**
 * Return ECMA compatible date format
 */
export function getDisplayDateGMT(value, start: boolean) {
    let d = GMT(value);
    if (start)
        return d.slice(0,10) + 'T00:00:00';
    else
        return d.slice(0,10) + 'T23:59:59';
}
