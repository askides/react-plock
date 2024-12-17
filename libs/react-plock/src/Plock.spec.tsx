import { describe, it, expect } from 'vitest';
import { createChunks, createDataColumns } from './Plock';

describe('Plock', () => {
  it('should create chunks', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8];
    const result = createChunks(data, 4);

    expect(result).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ]);
  });

  it('should create columns', () => {
    const result = createDataColumns(
      [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
      ],
      4
    );

    expect(result).toEqual([
      [1, 5],
      [2, 6],
      [3, 7],
      [4, 8],
    ]);
  });

  it('should create columns even with not equal values', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const chunks = createChunks(data, 4);
    const result = createDataColumns(chunks, 4);

    expect(result).toEqual([
      [1, 5, 9],
      [2, 6],
      [3, 7],
      [4, 8],
    ]);
  });

  it('should create columns even with not equal values', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const chunks = createChunks(data, 4);
    const result = createDataColumns(chunks, 4);

    expect(result).toEqual([
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [4, 8, 12],
    ]);
  });

  it('should create columns even with not equal values another', () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const chunks = createChunks(data, 2);
    const result = createDataColumns(chunks, 2);

    expect(chunks).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
      [9, 10],
      [11, 12],
      [13, 14],
    ]);

    expect(result).toEqual([
      [1, 3, 5, 7, 9, 11, 13],
      [2, 4, 6, 8, 10, 12, 14],
    ]);
  });
});
