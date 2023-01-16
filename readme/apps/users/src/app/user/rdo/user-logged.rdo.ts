import { PickType } from '@nestjs/swagger';

import { UserRDO } from './user.rdo';

export class UserLoggedRDO extends PickType(
    UserRDO,
    ['id', 'email', 'token'] as const
) {}
