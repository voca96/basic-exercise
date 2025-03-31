import React from 'react';
import { render, renderHook, act } from '@testing-library/react';
import {
	afterAll,
	afterEach,
	beforeAll,
	beforeEach,
	describe,
	expect,
	test,
	vi,
} from 'vitest';
import { useMovie } from '../src/hooks/useMovies';
import { server } from './mocks test/mock-server';

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());

describe('Use movies hook', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});
	test('get movies', async () => {
		const { result } = renderHook(() => useMovie());
		expect(result.current.movies).toEqual([]);

		await act(async () => {
			// solicitudes a un server y acciones para testear un hook es necesario de usar act
			await result.current.getMovies('star');
		});

		expect(result.current.movies.length).toBe(10);

		expect(result.current.movies[0].title).toContain(
			'Star Wars: Episode IV - A New Hope'
		);

		act(() => {
			result.current.setSort(true);
		});

		expect(result.current.movies[0].title).toContain(
			'Rogue One: A Star Wars Story'
		);
	});
});
