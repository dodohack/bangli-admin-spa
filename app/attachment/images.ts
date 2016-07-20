/**
 *
 */

import { Component } from '@angular/core';

@Component({
    templateUrl: 'app/attachment/images.html'
})
export class ImagesPage
{
    constructor() {}

    /**
     * I should manage to dump sth from input
     * @param $sth
     */
    logInput(files)
    {
        console.log('logging input');
        console.log(files);
    }
}