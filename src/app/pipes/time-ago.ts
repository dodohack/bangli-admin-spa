/**
 * Transform a date string to sth like '5 mins ago', '2 days ago'.
 */
import { Pipe } from '@angular/core';

@Pipe({
    name: 'timeAgo',
    pure: true
})
export class TimeAgo
{
    transform(/*obj: any, args?: any[]*/) : any
    {

    }
}