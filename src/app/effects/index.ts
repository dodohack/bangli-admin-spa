import { AuthEffects }     from './auth';
import { UserEffects }     from './user';

import { EntityEffects }   from './entity';
import { CmsAttrEffects }  from './cmsattr';
import { SysAttrEffects }  from './sysattr';
import { FeMenuEffects }     from './femenu';
import { OfferFilterEffects } from './offer.filter';

export {
    AuthEffects,
    UserEffects,
    EntityEffects,
    CmsAttrEffects,
    SysAttrEffects,
    FeMenuEffects,
    OfferFilterEffects,
};

export default [
    AuthEffects,
    UserEffects,
    EntityEffects,
    CmsAttrEffects,
    SysAttrEffects,
    FeMenuEffects,
    OfferFilterEffects,
];
