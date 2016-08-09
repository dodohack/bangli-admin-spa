/**
 * Interface to get and set user preferences, this class is not instantiable,
 * we use the static method to retrieve and set preference.
 * 
 * All the user preference and settings are persisted in localStorage, and
 * loaded into sessionStorage when app bootstrap.
 */

//import { Menu } from './models';

/* Default user preference and keys */
const PREF_VALUE = [
    /* key: session and local storage key */
    /* value: default value */
    /* isJson: is this a json data */
    { key: 'user.toggleSidebar',  value: false,     isJson: false },
    { key: 'user.itemsPerList',   value: 20,        isJson: false },
    { key: 'user.showRichList',   value: false,     isJson: false },
    /* FIXME: Anchor[hover] color is overwritten by menuColor!! */
    { key: 'user.menuColor',      value: '#FFFFFF', isJson: false },
    { key: 'user.menuBgColor',    value: '#383838', isJson: false },
    { key: 'user.bodyBgColor',    value: '#EEEEEE', isJson: false },
    { key: 'user.contentBgColor', value: '#FFFFFF', isJson: false },
    { key: 'user.myTopbarMenus',  value: [],        isJson: true },
    { key: 'user.mySidebarMenus', value: [],        isJson: true },
];

export class UserPreference
{

    // TODO: Delete this test data
    //this.myTopbarMenus.push(new Menu('test', 'test', '/test_url', 0, 'fa fa-circle-o'));

    public static init() {
        console.log("UserPreference Initialized!");

        for (let i in PREF_VALUE) {

            let key   = PREF_VALUE[i].key;
            let dv    = PREF_VALUE[i].value;

            let value = localStorage.getItem(key) === null ?
                dv : localStorage.getItem(key);

            sessionStorage.setItem(key, String(value));
        }
    }

    /**
     * Save all settings
     */
    public static save(toggleSidebar: boolean,
                       itemsPerList: number,
                       showRichList: boolean,
                       menuColor: string,
                       menuBgColor: string,
                       contentBgColor: string,
                       bodyBgColor: string,
                       myTopbarMenus: string,
                       mySidebarMenus: string) {

        localStorage.setItem('user.toggleSidebar',  toggleSidebar.toString());
        localStorage.setItem('user.itemsPerList',   itemsPerList.toString());
        localStorage.setItem('user.showRichList',   showRichList.toString());
        localStorage.setItem('user.menuColor',      menuColor);
        localStorage.setItem('user.menuBgColor',    menuBgColor);
        localStorage.setItem('user.contentBgColor', contentBgColor);
        localStorage.setItem('user.bodyBgColor',    bodyBgColor);
        localStorage.setItem('user.myTopbarMenus',  JSON.stringify(myTopbarMenus));
        localStorage.setItem('user.mySidebarMenus', JSON.stringify(mySidebarMenus));

        /* Refresh sessionStorage */
        this.init();
    }

    public static setToggleSidebar() {
        let newState = this.toggleSidebar() ? 'false' : 'true';
        localStorage.setItem('user.toggleSidebar',  newState);
        sessionStorage.setItem('user.toggleSidebar', newState);
    }

    public static toggleSidebar(): boolean {
        return sessionStorage.getItem('user.toggleSidebar') === 'true' ? true : false;
    }
    public static itemsPerList(): number {
        return +sessionStorage.getItem('user.itemsPerList');
    }
    public static showRichList(): boolean {
        return sessionStorage.getItem('user.showRichList') === 'true' ? true : false;
    }
    public static menuColor(): string {
        return sessionStorage.getItem('user.menuColor');
    }
    public static menuBgColor(): string {
        return sessionStorage.getItem('user.menuBgColor');
    }
    public static contentBgColor(): string {
        return sessionStorage.getItem('user.contentBgColor');
    }
    public static bodyBgColor(): string {
        return sessionStorage.getItem('user.bodyBgColor');
    }
    public static myTopbarMenus(): any {
        return sessionStorage.getItem('user.myTopbarMenus');
    }
    public static mySidebarMenus(): any {
        return sessionStorage.getItem('user.mySidebarMenus');
    }
}