import { IconHelp, IconPoo, IconStar, IconThumbDown, IconThumbUp } from '@tabler/icons-svelte';
import type { TablerIcon } from '../types';

export const successScores = {
	1: { text: 'Very bad', icon: IconPoo, color: 'red' },
	2: { text: 'Bad', icon: IconThumbDown, color: 'orange' },
	3: { text: 'Unknown', icon: IconHelp, color: 'blue' },
	4: { text: 'Good', icon: IconThumbUp, color: 'lime' },
	5: { text: 'Very good', icon: IconStar, color: 'green' }
} as const satisfies Record<
	number,
	{
		text: string;
		icon: TablerIcon;
		color: string;
	}
>;

export type SuccessScore = keyof typeof successScores;
