import { describe, test, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSeo } from '../src/hooks/useSEO';

describe('UseSEO Hook test', () => {
	test('get title and description from the UI head tag', () => {
		renderHook(() => useSeo({ title: 'hola', description: 'descripcion' }));
		const title = window.document.title;
		const description = window.document.querySelector(
			'meta[name="description"]'
		)?.textContent;

		expect(title).toBe('hola');
		expect(description).toBe('descripcion');
	});
});
