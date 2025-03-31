import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { moviesStar, moviesSam } from './mocks-test';

const restHandlers = [
	http.get(`https://www.omdbapi.com/`, ({ request }) => {
		const url = new URL(request.url);
		// s = search
		const s = url.searchParams.get('s');

		if (s === 'star') {
			return HttpResponse.json(moviesStar);
		}

		if (s === 'sam') return HttpResponse.json(moviesSam);
	}),
];

export const server = setupServer(...restHandlers);
