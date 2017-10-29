/**
 * Injectable helper, defines commonly used functions.
 */
import { Injectable } from "@angular/core";

import { THUMBS }            from '../.config';
import {CacheSingleton} from "./effects/cache.singleton";
import {Entity} from "./models/entity";

@Injectable()
export class Helper {

    cache = CacheSingleton.getInstance();

    /**
     * Convert given date into MySQL compatible GMT date format
     */
    GMT(value) {
        let d = new Date(value);
        let offset = d.getTimezoneOffset() / 60;
        // Patch user timezone offset, so we can get the GMT
        d.setHours(d.getHours() - offset);
        let newDate = d.toISOString().slice(0, 19).split('T');
        return newDate[0] + ' ' + newDate[1];
    }

    /**
     * Return MySQL compatible date in GMT
     * We set from date start from 00:00:00 of the day and to date end with
     * 23:59:59 of the day.
     */
    MySQLDateGMT(value: any, start: boolean) {
        let d = this.GMT(value);
        if (start)
            return d.slice(0, 10) + ' 00:00:00';
        else
            return d.slice(0, 10) + ' 23:59:59';
    }

    /**
     * Return ECMA compatible date format
     */
    DisplayDateGMT(value, start: boolean) {
        let d = this.GMT(value);
        if (start)
            return d.slice(0, 10) + 'T00:00:00';
        else
            return d.slice(0, 10) + 'T23:59:59';
    }

    /**
     * Get image full url
     * @param uri
     * @returns {string}
     */
    absUrl(uri: string) {
        // Do add base address to full image address.
        if (uri[0] == 'h' && uri[1] == 't')
            return uri;
        return this.cache.img_server + uri;
    }

    imageUrl(image: Entity) {
       if (image) return this.absUrl(image.path + image.filename);
    }

    /**
     * Get featured thumbnail image
     */
    thumbnailUrl(img, isLarge = false) {
        // FIXME: Can we improve ChangeDetection here?
        // console.log("This is called hundreds of times");
        let key = THUMBS.THUMB_AVATAR;
        if (isLarge) key = THUMBS.THUMB_CARD_LG;
        let thumbs = JSON.parse(img.thumbnail);
        if (thumbs && thumbs.hasOwnProperty(key))
            return this.cache.img_server + img.thumb_path + thumbs[key].file;
        else
            return 'http://via.placeholder.com/80x80?text=thumbs';
    }
}
