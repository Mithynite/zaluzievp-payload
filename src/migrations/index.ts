import * as migration_20260322_213050_new_beginning from './20260322_213050_new_beginning';

export const migrations = [
  {
    up: migration_20260322_213050_new_beginning.up,
    down: migration_20260322_213050_new_beginning.down,
    name: '20260322_213050_new_beginning'
  },
];
