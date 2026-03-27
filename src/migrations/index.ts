import * as migration_20260325_133101_add_nested_docs_to_pages from './20260325_133101_add_nested_docs_to_pages';

export const migrations = [
  {
    up: migration_20260325_133101_add_nested_docs_to_pages.up,
    down: migration_20260325_133101_add_nested_docs_to_pages.down,
    name: '20260325_133101_add_nested_docs_to_pages'
  },
];
