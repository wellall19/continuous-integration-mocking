import getLevel from '../getLevel';
import fetchData from '../fetchData';

jest.mock('../fetchData');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should return level when response status is "ok"', () => {
  const mockResponse = {
    status: 'ok',
    level: 42,
  };
  fetchData.mockReturnValue(mockResponse);

  const result = getLevel(1);

  expect(result).toBe('Ваш текущий уровень: 42');
});

test('should return level when response status is not "ok"', () => {
  const mockResponse = {
    status: 'null',
    level: 42,
  };
  fetchData.mockReturnValue(mockResponse);

  const result = getLevel(1);

  expect(result).toBe('Информация об уровне временно недоступна');
});

test('should errors thrown by fetchData', () => {
  fetchData.mockImplementation(() => {
    throw new Error('Mock this!');
  });

  expect(() => getLevel(1)).toThrow('Mock this!');
});
