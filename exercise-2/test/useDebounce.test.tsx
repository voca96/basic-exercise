import { describe, vi, expect, test, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../src/hooks/useDebounce';

describe('useDebounce hook', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});
	afterEach(() => {
		vi.useRealTimers();
	});
	test('execute a fn after a time X', () => {
		const { result } = renderHook(() => useDebounce());
		const [debounce, clear] = result.current;

		let sumVal = 0;

		const sum = (a: number, b: number) => {
			return a + b;
		};

		act(() => {
			debounce(() => {
				sumVal = sum(10, 10);
			}, 5000);
		});

		act(() => {
			vi.runAllTimers();
		});

		expect(sumVal).toBe(20);

		act(() => {
			debounce(() => {
				sumVal = sum(40, 40);
			}, 5000);
			clear();
		});

		act(() => {
			vi.runAllTimers();
		});

		expect(sumVal).toBe(20);
	});
});
