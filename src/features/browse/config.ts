export const DEBOUNCE_DELAY = 600;

export const RANGE_FILTER_CONFIG = {
	year: {
		min: 1900,
		max: new Date().getFullYear(),
		step: 1
	},
	price: {
		min: 0,
		max: 1000000,
		step: 1000
	}
} as const;