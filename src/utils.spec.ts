import { expect, test } from 'vitest';
import { capitalize } from './utils';

test('capitalize text', () => {
  expect(capitalize('test')).toBe('Test');
});
