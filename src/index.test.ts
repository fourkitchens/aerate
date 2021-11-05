import add from './index';

describe('index', () => {
  it('can add', () => {
    expect(add(1, 2)).toBe(3);
  });
});
