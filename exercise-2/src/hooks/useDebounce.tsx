import { useRef } from 'react';

type callback = () => void;

// type UseDebounceReturn = [(fn: callback, time: number) => void, () => void];

// export function useDebounce(): UseDebounceReturn{
export function useDebounce() {
	const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

	const debounce = (fn: callback, time: number) => {
		// Debounce
		clearDebounce();

		debounceRef.current = setTimeout(() => {
			console.log('no se limpio');
			fn();
		}, time);
	};

	const clearDebounce = () => {
		if (debounceRef.current) {
			clearTimeout(debounceRef.current);
			console.log('se limpio');
		}
	};

	return [debounce, clearDebounce] as const;
}
