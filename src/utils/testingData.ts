import type { Meal, MealEntry } from './types';

export const testMeals: Meal[] = [
	{
		id: 1,
		name: "Burger from Eddy's"
	},
	{
		id: 2,
		name: 'Corral Chicken',
		description: 'Udon Corral Chicken Teriyaki from Udon'
	},
	{
		id: 3,
		name: 'Milk & Cookies',
		description: '500ml Milk + 6 cookies'
	}
];

export const testMealEntries: MealEntry[] = [
	{
		id: 1,
		mealId: 1,
		createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
		insulinInjections: [
			{
				insulinId: 1,
				dose: 10,
				moment: {
					minutes: 0,
					from: 'end'
				}
			}
		],
		successScore: 4,

		notes: 'Maybe try 1u less next time'
	},
	{
		id: 2,
		mealId: 1,
		createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 day ago
		insulinInjections: [
			{
				insulinId: 1,
				dose: 7,
				moment: {
					minutes: 0,
					from: 'end'
				}
			},
			{
				insulinId: 1,
				dose: 2,
				moment: {
					minutes: 120,
					from: 'end'
				}
			}
		],
		successScore: 2,

		notes: 'Do 9u directly next time'
	},
	{
		id: 3,
		mealId: 2,
		createdAt: new Date(Date.now() - 60 * 1000), // 1 minute ago
		insulinInjections: [
			{
				insulinId: 1,
				dose: 8,
				moment: {
					minutes: -10,
					from: 'start'
				}
			}
		],
		successScore: 3,

		notes: 'Try 10u directly next time'
	},
	{
		id: 4,
		mealId: 3,
		createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 day ago
		insulinInjections: [
			{
				insulinId: 1,
				dose: 5,
				moment: {
					minutes: 0,
					from: 'during'
				}
			},
			{
				insulinId: 1,
				dose: 2,
				moment: {
					minutes: 120,
					from: 'end'
				}
			}
		],
		successScore: 5,

		notes: 'Perfect'
	},
	{
		id: 5,
		mealId: 3,
		createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 day ago
		insulinInjections: [
			{
				insulinId: 1,
				dose: 15,
				moment: {
					minutes: 0,
					from: 'start'
				}
			},
			{
				insulinId: 2,
				dose: 20,
				moment: {
					minutes: -1 * 60 * 10, // 10 hours before
					from: 'start'
				}
			}
		],
		successScore: 1,

		notes: 'Very bad'
	}
];
