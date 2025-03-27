import { useRef } from 'react';

export function useDebounce() {
	const debounceRef = useRef(null);

	const debounce = (fn, time) => {
		// Debounce
		clearDebounce();

		debounceRef.current = setTimeout(() => {
			fn();
		}, time);
	};

	const clearDebounce = () => {
		clearTimeout(debounceRef.current);
	};

	return [debounce, clearDebounce];
}
