import sum from "../__tests_files__/sum";
import {test, expect} from '@jest/globals';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});