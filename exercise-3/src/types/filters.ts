export const TODO_FILTERS = {
	ALL: 'all',
	COMPLETED: 'completed',
	ACTIVE: 'active',
} as const;

export const FILTERS_BUTTONS = {
	[TODO_FILTERS.ALL]: {
		text: 'todos',
	},
	[TODO_FILTERS.COMPLETED]: {
		text: 'completados',
	},
	[TODO_FILTERS.ACTIVE]: {
		text: 'activos',
	},
} as const;

export type FiltersValue = (typeof TODO_FILTERS)[keyof typeof TODO_FILTERS];
