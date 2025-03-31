import React, { act } from 'react';
import {
	describe,
	test,
	expect,
	afterEach,
	afterAll,
	beforeAll,
	beforeEach,
	vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { movies } from './mocks test/mocks-test';
import App from '../src/App';

export const restHandlers = [
	http.get(`https://www.omdbapi.com/`, ({ request }) => {
		const url = new URL(request.url);
		// s = search
		const s = url.searchParams.get('s');

		if (s === 'star') {
			return HttpResponse.json(movies);
		}
	}),
];

const server = setupServer(...restHandlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());

describe('E2E test', () => {
	beforeEach(() => {
		// This feels weird to do, given what it does:
		// https://sinonjs.org/releases/latest/fake-timers/#:~:text=config.-,shouldAdvanceTime
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});
	test('get movies, sorted it, ', async () => {
		const userAction = userEvent.setup({
			// works even when I comment the following
			// advanceTimers: (ms) => vi.advanceTimersByTime(ms),
		});

		render(<App />);

		expect(screen.findAllByText('Buscador de películas')).toBeDefined();

		const input = screen.getByRole('textbox');
		expect(input).toBeDefined();

		const form = screen.getByRole('form');
		expect(form).toBeDefined();

		const button = form.querySelector('button');
		expect(button).toBeDefined();

		const movieText = 'star';

		await userAction.type(input, movieText);
		await act(() => vi.runAllTimers());
		// await userAction.click(button!);

		const list = screen.getByRole('list');
		expect(list).toBeDefined();
		expect(list.childNodes.length).toBeGreaterThan(0);

		const listElementBeforeSort = screen.getByText(
			'Star Wars: Episode IV - A New Hope'
		);
		expect(listElementBeforeSort).toBeDefined();

		const check = screen.getByRole('checkbox');
		expect(check).toBeDefined();

		await userAction.click(check);
		expect(list.childNodes.length).toBeGreaterThan(0);

		Array.from(list.childNodes).forEach((node) => {
			console.log(node.childNodes[0].textContent);
		});

		const listElementAfterSort = screen.getByText(
			'Rogue One: A Star Wars Story'
		);
		expect(listElementAfterSort).toBeDefined();
		// screen.debug();
		// await userAction.clear(input);
		// await userAction.click(button!);
	});
});
