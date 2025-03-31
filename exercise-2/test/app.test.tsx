import React from 'react';
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
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { server } from './mocks test/mock-server';
import App from '../src/App';

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test for test isolation
afterEach(() => server.resetHandlers());

describe('E2E test', () => {
	beforeEach(() => {
		vi.useFakeTimers({ shouldAdvanceTime: true });
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});
	test('get movies, sorted it by button & debounce', async () => {
		const userAction = userEvent.setup();

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
		await userAction.click(button!);

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

		// Array.from(list.childNodes).forEach((node) => {
		// 	console.log(node.childNodes[0].textContent);
		// });

		const listElementAfterSort = screen.getByText(
			'Rogue One: A Star Wars Story'
		);
		expect(listElementAfterSort).toBeDefined();

		await userAction.clear(input);
		expect(input.textContent).toBe('');

		await userAction.type(input, 'sam');
		await act(() => vi.runAllTimers());

		expect(list.childNodes.length).toBeGreaterThan(0);
		const samListElement = screen.getByText('I Am Sam');

		expect(samListElement).toBeDefined();
	});
});
