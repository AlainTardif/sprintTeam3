let consoleSpy;

beforeEach(() => {
  consoleSpy = jest.spyOn(console, 'log').mockImplementation();
});

afterEach(() => {
  consoleSpy.mockRestore();
});

test('should log and return "Hello world!"', () => {
  const expected = 'Hello world!';

  jest.isolateModules(() => {
    const result = require('../src/main');

    expect(result).toBe(expected);
    expect(consoleSpy).toHaveBeenCalledWith(expected);
  });
});
