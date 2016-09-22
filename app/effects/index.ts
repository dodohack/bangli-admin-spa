import { AuthEffects }    from './auth';
import { UserEffects }    from './user';

import { EntityEffects }  from './entity';
import { CmsAttrEffects } from './cmsattr';
import { ShopAttrEffects } from './shopattr';

export {
    AuthEffects,
    UserEffects,
    EntityEffects,
    CmsAttrEffects,
    ShopAttrEffects,
};

export default [
    AuthEffects,
    UserEffects,
    EntityEffects,
    CmsAttrEffects,
    ShopAttrEffects
];
