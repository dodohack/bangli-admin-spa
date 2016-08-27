/**
 * Prviously, I have messed up the definition of models, I have defined so
 * many models which does not have corresponding existence on server side.
 *
 * The models we defined here at client side, should matches database table
 * entries or joined tables on server side. When dealing with those models,
 * we choose part of the entries we want to process, instead of dividing
 * them into small pieces, such as model 'User' should be used in login,
 * register, jwt and user info related area, so no separate 'Login',
 * 'Register', 'JWT' module should exists.
 *
 * AFAIK, Client side model is a projection of server side tables/jointed tables
 */

export * from './menu';
export * from './user';
export * from './paginator';
export * from './category';
export * from './tag';
export * from './topic';
export * from './post';
export * from './page';
export * from './deal';
export * from './order';
export * from './product';
export * from './voucher';
export * from './newsletter';
export * from './auth';
export * from './alert';
export * from './preference';
