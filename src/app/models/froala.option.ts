/**
 * This file defines the options used to initialize froala editor
 */

import { APIS, API_PATH }            from '../api';
import { rehydrateApplicationState } from 'ngrx-store-localstorage';

export class FroalaOptions {
    
    // Static method returns froala options
    static getDefault() {
        // FIXME: 3rd parameter!
        let auth = rehydrateApplicationState(['auth'], localStorage, (key) => key);
        let key  = sessionStorage.getItem('key');

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


            placeholderText: "正文内容。 专题内容的前面120字用于桌面版专题页面的简介!",

            /*
             // Image managers
            imageManagerLoadURL: APIS[key] + API_PATH.froala_images,
            imageManagerLoadParams: {token: auth.token},

            // Image upload
            imageAllowTypes: ['jpeg', 'jpg', 'png', 'gif'],
            imageUploadParam: 'file',
            imageUploadMethod: 'POST',
            imageUploadParams: {token: auth.token},
            imageUploadURL: APIS[key] + API_PATH.file_upload,
            */
        };
    }

    // Simplified editor for topic introduction
    /*
    static getSimplified() {
        return {
            // Past in WYSIWYG edit in plain text
            pastePlain: true,

            // Editor height in pixel
            height: 200,

            // Toolbars icons
            toolbarButtons: ['bold', 'italic', 'insertLink',
                'undo', 'redo', 'clearFormatting', 'html'],

            toolbarSticky: false,
        };
    }
    */
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
    imageUploadURL: APIS['bangli_uk'] + API_PATH['bangli_uk'].file_upload,
};
*/