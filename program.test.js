// Example Test
const sum = require('./program');

test('1+2=3', () => {
    expect(sum(1, 2)).toBe(3);
});