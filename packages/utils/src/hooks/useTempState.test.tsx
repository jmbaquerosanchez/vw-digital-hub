import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTempState } from './useTempState';

describe('useTempState', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  describe('initialization', () => {
    it('should initialize with undefined state when no initial value is provided', () => {
      const { result } = renderHook(() => useTempState<string>());
      
      expect(result.current[0]).toBeUndefined();
      expect(typeof result.current[1]).toBe('function');
    });

    it('should initialize with provided initial state', () => {
      const initialValue = 'initial value';
      const { result } = renderHook(() => useTempState<string>(initialValue));
      
      expect(result.current[0]).toBe(initialValue);
    });

    it('should handle different types of initial values', () => {
      // String
      const { result: stringResult } = renderHook(() => useTempState<string>('test'));
      expect(stringResult.current[0]).toBe('test');

      // Number
      const { result: numberResult } = renderHook(() => useTempState<number>(42));
      expect(numberResult.current[0]).toBe(42);

      // Object
      const obj = { key: 'value' };
      const { result: objectResult } = renderHook(() => useTempState<typeof obj>(obj));
      expect(objectResult.current[0]).toBe(obj);

      // Array
      const arr = [1, 2, 3];
      const { result: arrayResult } = renderHook(() => useTempState<number[]>(arr));
      expect(arrayResult.current[0]).toBe(arr);
    });
  });

  describe('state updates', () => {
    it('should update state immediately when setState is called', () => {
      const { result } = renderHook(() => useTempState<string>());
      
      act(() => {
        result.current[1]('new value');
      });
      
      expect(result.current[0]).toBe('new value');
    });

    it('should allow multiple state updates', () => {
      const { result } = renderHook(() => useTempState<string>());
      
      act(() => {
        result.current[1]('first value');
      });
      expect(result.current[0]).toBe('first value');
      
      act(() => {
        result.current[1]('second value');
      });
      expect(result.current[0]).toBe('second value');
    });    it('should handle different types of state updates', () => {
      const { result } = renderHook(() => useTempState<string | number | { test: boolean }>());
      
      // String
      act(() => {
        result.current[1]('string value');
      });
      expect(result.current[0]).toBe('string value');
      
      // Number
      act(() => {
        result.current[1](123);
      });
      expect(result.current[0]).toBe(123);
      
      // Object
      const obj = { test: true };
      act(() => {
        result.current[1](obj);
      });
      expect(result.current[0]).toBe(obj);
    });
  });

  describe('timeout behavior', () => {
    it('should reset state to undefined after default timeout (1000ms)', () => {
      const { result } = renderHook(() => useTempState<string>());
      
      act(() => {
        result.current[1]('temporary value');
      });
      expect(result.current[0]).toBe('temporary value');
      
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current[0]).toBeUndefined();
    });

    it('should reset state to undefined after custom timeout', () => {
      const customTimeout = 2500;
      const { result } = renderHook(() => useTempState<string>(undefined, customTimeout));
      
      act(() => {
        result.current[1]('temporary value');
      });
      expect(result.current[0]).toBe('temporary value');
      
      // Should not reset before timeout
      act(() => {
        vi.advanceTimersByTime(2000);
      });
      expect(result.current[0]).toBe('temporary value');
      
      // Should reset after timeout
      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current[0]).toBeUndefined();
    });

    it('should not reset state before timeout expires', () => {
      const { result } = renderHook(() => useTempState<string>());
      
      act(() => {
        result.current[1]('temporary value');
      });
      
      act(() => {
        vi.advanceTimersByTime(500); // Half the default timeout
      });
      
      expect(result.current[0]).toBe('temporary value');
    });

    it('should clear previous timeout when state is updated again', () => {
      const { result } = renderHook(() => useTempState<string>());
      
      // Set initial value
      act(() => {
        result.current[1]('first value');
      });
      
      // Advance time partially
      act(() => {
        vi.advanceTimersByTime(500);
      });
      
      // Set new value (should clear previous timeout)
      act(() => {
        result.current[1]('second value');
      });
      
      // Advance time to when first timeout would have expired
      act(() => {
        vi.advanceTimersByTime(500);
      });
      
      // State should still be 'second value', not undefined
      expect(result.current[0]).toBe('second value');
      
      // Advance remaining time to complete second timeout
      act(() => {
        vi.advanceTimersByTime(500);
      });
      
      // Now it should be undefined
      expect(result.current[0]).toBeUndefined();
    });

    it('should handle rapid successive state updates correctly', () => {
      const { result } = renderHook(() => useTempState<string>());
      
      // Rapidly set multiple values
      act(() => {
        result.current[1]('value1');
        result.current[1]('value2');
        result.current[1]('value3');
      });
      
      expect(result.current[0]).toBe('value3');
      
      // Only the last timeout should be active
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current[0]).toBeUndefined();
    });
  });

  describe('edge cases', () => {
    it('should handle setting state to undefined explicitly', () => {
      const { result } = renderHook(() => useTempState<string | undefined>('initial'));
      
      act(() => {
        result.current[1](undefined);
      });
      
      expect(result.current[0]).toBeUndefined();
      
      // Should still reset after timeout
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current[0]).toBeUndefined();
    });

    it('should handle setting state to null', () => {
      const { result } = renderHook(() => useTempState<string | null>());
      
      act(() => {
        result.current[1](null);
      });
      
      expect(result.current[0]).toBe(null);
      
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current[0]).toBeUndefined();
    });

    it('should handle zero timeout', () => {
      const { result } = renderHook(() => useTempState<string>(undefined, 0));
      
      act(() => {
        result.current[1]('immediate reset');
      });
      
      expect(result.current[0]).toBe('immediate reset');
      
      act(() => {
        vi.advanceTimersByTime(0);
      });
      
      expect(result.current[0]).toBeUndefined();
    });

    it('should handle very large timeout values', () => {
      const largeTimeout = 999999999;
      const { result } = renderHook(() => useTempState<string>(undefined, largeTimeout));
      
      act(() => {
        result.current[1]('long term value');
      });
      
      // Should not reset after normal timeout
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current[0]).toBe('long term value');
      
      // Should not reset even after much longer time
      act(() => {
        vi.advanceTimersByTime(100000);
      });
      expect(result.current[0]).toBe('long term value');
    });
  });  describe('hook stability', () => {
    it('should provide a new setState function reference on each render', () => {
      const { result, rerender } = renderHook(() => useTempState<string>());
      
      const initialSetState = result.current[1];
      
      rerender();
      
      // The setState function is recreated on each render, so it won't be the same reference
      expect(result.current[1]).not.toBe(initialSetState);
      expect(typeof result.current[1]).toBe('function');
    });

    it('should maintain state when hook is rerendered with same props', () => {
      const { result, rerender } = renderHook(() => useTempState<string>('initial', 1000));
      
      // Set a temporary value
      act(() => {
        result.current[1]('temp value');
      });
      expect(result.current[0]).toBe('temp value');
      
      // Rerender with same props
      rerender();
      
      // State should be maintained
      expect(result.current[0]).toBe('temp value');
      
      // And still reset after timeout
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      expect(result.current[0]).toBeUndefined();
    });
  });

  describe('performance considerations', () => {
    it('should not cause memory leaks with multiple rapid updates', () => {
      const { result } = renderHook(() => useTempState<number>());
      
      // Simulate many rapid updates
      act(() => {
        for (let i = 0; i < 100; i++) {
          result.current[1](i);
        }
      });
      
      expect(result.current[0]).toBe(99);
      
      // All intermediate timeouts should be cleared, only final one should trigger
      act(() => {
        vi.advanceTimersByTime(1000);
      });
      
      expect(result.current[0]).toBeUndefined();
    });
  });

  describe('type safety', () => {
    it('should maintain type safety with generic type parameter', () => {
      const { result } = renderHook(() => useTempState<{ id: number; name: string }>());
      
      const testObject = { id: 1, name: 'test' };
      
      act(() => {
        result.current[1](testObject);
      });
      
      expect(result.current[0]).toEqual(testObject);
      expect(result.current[0]?.id).toBe(1);
      expect(result.current[0]?.name).toBe('test');
    });
  });
});
