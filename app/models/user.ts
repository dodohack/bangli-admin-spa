/**
 * This defines the user model such as author, editor, etc
 */


    
export const USER_ROLES = [
    'customer', 'administrator', 'shop_manager', 'editor', 'author'
];

export class User {
    id: string;
    role: string;
    name: string;
    nicename: string;
    email: string;
}
