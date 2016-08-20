/**
 * This defines the user model such as author, editor, etc
 */
import { Domain } from './domain';
import { Menu }   from './menu';
    
export const USER_ROLES = [
    'customer', 'administrator', 'shop_manager', 'editor', 'author'
];

export const USER_GENDERS = [
    {key: 'M', display_name: '男性'},
    {key: 'F', display_name: '女性'},
    {key: 'U', display_name: '火星人'}
];


export interface UserRole {
    id: number;
    name: string;
    display_name: string;
    description: string;
}

export interface UserProfile {
    gender: string; /* ENUM, One of 'M', 'F' or 'U' */
    first_name: string;
    last_name: string;
    birthday: string;
    point_available: number;
    point_used: number;
    currency: string;
    money_available: number;
    money_spent: number;
    order_count: number;
    cart_items: Object;
    profile_image: string;
    subscription: boolean;
    description: string;
}

/* Decoded JWT payload */
export interface JwtPayLoad {
    iss: string;
    iat: number;
    exp: number;
    nbf: number;
    jti: string;
    dbu: boolean; /* Is a dashboard user */
    spu: boolean; /* Is a super user */
    sub: string;
    aud: string;
}


/* Login, register, token refresh all uses the same User model */
export class User {
    id: number;
    uuid: string;
    role_id: number;
    display_name: string;
    name: string;
    email: string;
    password: string;
    created_at: string;

    token: string; /* JWT token */
    jwt: string; /* DEPRECATED: JWT token */
    jwtPayload: JwtPayLoad; /* Decoded JWT token */

    role: UserRole;
    profile: UserProfile;

    domain_key: string;
    domains: Domain[];
}
