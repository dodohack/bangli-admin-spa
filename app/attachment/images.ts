/**
 *
 */

import { Component }                          from '@angular/core';
import {FILE_UPLOAD_DIRECTIVES, FileUploader} from 'ng2-file-upload';

const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
    templateUrl: 'app/attachment/images.html',
    directives: [FILE_UPLOAD_DIRECTIVES]
})
export class ImagesPage
{
    public uploader:FileUploader = new FileUploader({url: URL});
    public hasDropZoneOver:boolean = false;

    public fileOverBase(e:any):void {
        this.hasDropZoneOver = e;
    }
}