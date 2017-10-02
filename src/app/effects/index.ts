import { AuthEffects }     from './auth';
import { UserEffects }     from './user';

import { EntityEffects }   from './entity';
import { CmsAttrEffects }  from './cmsattr';
import { ShopAttrEffects } from './shopattr';
import { SysAttrEffects }  from './sysattr';
import { FeMenuEffects }     from './femenu';

export {
    AuthEffects,
    UserEffects,
    EntityEffects,
    CmsAttrEffects,
    ShopAttrEffects,
    SysAttrEffects,
    FeMenuEffects,
};

export default [
    AuthEffects,
    UserEffects,
    EntityEffects,
    CmsAttrEffects,
    ShopAttrEffects,
    SysAttrEffects,
    FeMenuEffects,
];
