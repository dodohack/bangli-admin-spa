/**
 * This defines the user model such as author, editor, etc
 */

import { Domain } from './index';

export const USER_ROLES = [
    'customer', 'administrator', 'editor', 'author'
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

// API request parameters to filter list of users
export interface UserParams {
    page: string;
    datetype?: string;
    datefrom?: string;
    dateto?: string;
    query?: string;
}

/* This is user for APP domain */
export interface User {
    id: number;
    role_id?: number;
    avatar_id?: number;
    uuid?: string;
    name?: string;
    display_name?: string;
    email?: string;
    gender?: string; /* ENUM, One of 'M', 'F' or 'U' */
    first_name?: string;
    last_name?: string;
    birthday?: string;
    subscription?: boolean;
    description?: string;
    created_at?: string;

    role?: UserRole;
};

/* This is user for Auth server */
export interface AuthUser {
    uuid?: string;
    name?: string;
    display_name?: string;
    email?: string;
    email_validated?: boolean;
    password?: string;         // User password updating use only
    password_repeat?: string;  // Form validation only
    created_at?: string;
    updated_at?: string;
    register_ip?: string;
    last_ip?: string;

    domains?: any; // Object of { domain.id: dashboard_user }
    super_user?: any;
}
