/**
 * This file defines the options used to initialize froala editor
 */

import { APIS, API_PATH } from '../api';
import { AuthCache }      from '../auth.cache';

export class FroalaOptions {
    
    // Static method returns froala options
    static getDefault() {
        return {
            // Past in WYSIWYG edit in plain text
            pastePlain: true,

            // Editor height in pixel
            height: 600,

            // Toolbars icons
            toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline',
                'fontSize', 'color',
                'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent',
                'indent', 'insertHR', 'insertLink',
                'insertImage', 'insertVideo', 'insertFile',
                'insertTable', 'undo', 'redo', 'clearFormatting', 'html'],

            toolbarSticky: false,

            // Image upload
            imageAllowTypes: ['jpeg', 'jpg', 'png', 'gif'],
            imageUploadParam: 'file',
            imageUploadMethod: 'POST',
            imageUploadParams: {token: AuthCache.token()},
            imageUploadURL: APIS[AuthCache.domainKey()] + 
            API_PATH[AuthCache.domainKey()].file_upload,
        };
    }
}

/*
export const FROALA_OPTIONS = {
    // Past in WYSIWYG edit in plain text
    pastePlain: true,

    // Editor height in pixel
    height: 600,

    // Toolbars icons
    toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline',
        'fontSize', 'color',
        'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent',
        'indent', 'insertHR', 'insertLink',
        'insertImage', 'insertVideo', 'insertFile',
        'insertTable', 'undo', 'redo', 'clearFormatting', 'html'],

    toolbarSticky: false,

    // Image upload
    imageAllowTypes: ['jpeg', 'jpg', 'png', 'gif'],
    imageUploadMethod: 'POST',
    imageUploadURL: APIS['huluwa_uk'] + API_PATH['huluwa_uk'].file_upload,
};
*/