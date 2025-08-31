import { BadRequestException } from '@nestjs/common';
import { validatePagination } from './pagination';

describe('validatePagination', () => {
  it('should return null when no pagination params are provided', () => {
    const result = validatePagination({});
    expect(result).toBeNull();
  });

  it('should use defaults when only page is provided', () => {
    const result = validatePagination({ page: '2' });
    expect(result).toEqual({ skip: 10, take: 10 });
  });

  it('should use defaults when only take is provided', () => {
    const result = validatePagination({ take: '5' });
    expect(result).toEqual({ skip: 0, take: 5 });
  });

  it('should calculate skip correctly for valid pagination', () => {
    const result = validatePagination({ page: '3', take: '20' });
    expect(result).toEqual({ skip: 40, take: 20 });
  });

  it('should throw error for invalid page number', () => {
    expect(() => validatePagination({ page: 'abc', take: '10' })).toThrow(
      BadRequestException,
    );
  });

  it('should throw error for invalid take number', () => {
    expect(() => validatePagination({ page: '1', take: 'xyz' })).toThrow(
      BadRequestException,
    );
  });

  it('should throw error for page less than 1', () => {
    expect(() => validatePagination({ page: '0', take: '10' })).toThrow(
      'Page and take must be positive numbers greater than 0',
    );
  });

  it('should throw error for take less than 1', () => {
    expect(() => validatePagination({ page: '1', take: '0' })).toThrow(
      'Page and take must be positive numbers greater than 0',
    );
  });

  it('should throw error for take greater than maxTake', () => {
    expect(() => validatePagination({ page: '1', take: '101' })).toThrow(
      'Take cannot be greater than 100',
    );
  });

  it('should respect custom maxTake option', () => {
    expect(() =>
      validatePagination({ page: '1', take: '51' }, { maxTake: 50 }),
    ).toThrow('Take cannot be greater than 50');
  });

  it('should respect custom defaultTake option', () => {
    const result = validatePagination({ page: '2' }, { defaultTake: 25 });
    expect(result).toEqual({ skip: 25, take: 25 });
  });
});
