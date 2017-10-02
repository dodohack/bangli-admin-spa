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
