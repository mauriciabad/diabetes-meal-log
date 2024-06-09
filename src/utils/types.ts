import { IconStar } from '@tabler/icons-svelte';
import type { SuccessScore, successScores } from './constants/successScores';

export type TablerIcon = typeof IconStar;

export type Meal = {
	id: number;
	name: string;
	description?: string;
};

export type Insulin = {
	id: number;
	name: string;
	type: 'fast' | 'long';
};

export type MealEntry = {
	id: number;
	mealId: Meal['id'];
	createdAt: Date;
	insulinInjections: {
		insulinId: Insulin['id'];
		dose: number;
		moment: {
			minutes: number;
			from: 'start' | 'during' | 'end';
		};
	}[];
	successScore: SuccessScore;
	notes?: string;
};
