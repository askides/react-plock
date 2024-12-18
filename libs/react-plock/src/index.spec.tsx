import { describe, expect, it } from 'vitest';
import { createBalancedColumns, createChunks, createDataColumns } from '.';

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

describe('Balanced Layout', () => {
  it('should distribute items to columns based on height', () => {
    const items = [1, 2, 3, 4];
    const heightMap = new Map([
      [1, 100], // tall
      [2, 50], // short
      [3, 120], // tallest
      [4, 30], // shortest
    ]);

    const result = createBalancedColumns(
      items,
      2,
      (item) => heightMap.get(item) || 0
    );

    expect(result).toEqual([
      [1, 4], // Column 1: 100 + 30 = 130
      [2, 3], // Column 2: 50 + 120 = 170
    ]);
  });

  it('should handle empty items array', () => {
    const result = createBalancedColumns([], 3, () => 0);
    expect(result).toEqual([[], [], []]);
  });

  it('should handle single column', () => {
    const items = [1, 2, 3];
    const result = createBalancedColumns(items, 1, () => 100);
    expect(result).toEqual([[1, 2, 3]]);
  });

  it('should maintain item order within columns', () => {
    const items = [1, 2, 3, 4, 5, 6];
    const heightMap = new Map([
      [1, 50],
      [2, 50],
      [3, 50],
      [4, 50],
      [5, 50],
      [6, 50],
    ]);

    const result = createBalancedColumns(
      items,
      3,
      (item) => heightMap.get(item) || 0
    );

    // With equal heights, items should be distributed evenly while maintaining order
    expect(result).toEqual([
      [1, 4],
      [2, 5],
      [3, 6],
    ]);
  });
});
