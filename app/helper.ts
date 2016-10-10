/**
 * This file defines helper functions
 */
import { Category }                from './models';

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
 * This function return direct children and all lower level childrens
 */
export function getCatChild(cat: Category) {
    // Get direct children
    let children = this.categories.filter(v => v.parent_id === cat.id);

    // Get children of direct children recursively
    let childrenOfChild = [];
    if (children) {
        for (let i = 0; i < children.length; i++) {
            let cc = this.getChild(children[i]);
            childrenOfChild = [...childrenOfChild, ...cc];
        }
        children = [...children, ...childrenOfChild];
    }

    return children;
}