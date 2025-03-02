import React from 'react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

// CUALQUIER REFACTOR QUE NO ESTE BASADO EN LOS TEST ESTA MAL ... SOLO CAUSARA PROBLEMAS

describe('<App/>', () => {
	test('shoud add  items and remove them', async () => {
		const user = userEvent.setup();

		render(<App />);

		const input = screen.getByRole('textbox');
		expect(input).toBeDefined();

		const form = screen.getByRole('form');
		expect(form).toBeDefined();

		const button = form.querySelector('button');
		expect(button).toBeDefined();

		const randomText = crypto.randomUUID();
		await user.type(input, randomText);
		await user.click(button!);

		const list = screen.getByRole('list');
		expect(list).toBeDefined();
		expect(list.childNodes.length).toBe(1);

		const item = screen.getByText(randomText);
		const removeButton = item.querySelector('button');
		expect(removeButton).toBeDefined();

		await user.click(removeButton!);

		const noResult = screen.getByText('No hay elementos en la lista');
		expect(noResult).toBeDefined();
	});
});
