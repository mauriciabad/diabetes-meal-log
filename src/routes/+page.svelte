<script lang="ts">
	import { persisted } from 'svelte-persisted-store';
	import { successScores } from '../utils/constants/successScores';
	import { testMealEntries, testMeals } from '../utils/testingData';
	import type { Insulin } from '../utils/types';

	export const preferences = persisted('preferences', {
		// meals: [] as Meal[],
		meals: testMeals,
		// mealEntries: [] as MealEntry[],
		mealEntries: testMealEntries,
		insulins: [
			{
				id: 1,
				name: 'Fast insulin',
				type: 'fast'
			},
			{
				id: 2,
				name: 'Basal insulin',
				type: 'long'
			}
		] as Insulin[]
	});

	$: mealsFullData = $preferences.meals.map((meal) => ({
		...meal,
		entries: $preferences.mealEntries
			.filter((entry) => entry.mealId === meal.id)
			.map((entry) => ({
				...entry,
				insulinInjections: entry.insulinInjections.map((injection) => ({
					...injection,
					insulin: $preferences.insulins.find((insulin) => insulin.id === injection.insulinId)!
				}))
			}))
	}));
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="text-center text-3xl font-bold">Meal log</h1>

	<ul class="space-y-4">
		{#each mealsFullData as mealFullData (mealFullData.id)}
			<li class="rounded-lg bg-white p-4 shadow-md">
				<h2 class="text-xl font-bold">{mealFullData.name}</h2>
				{#if mealFullData.description}
					<p>{mealFullData.description}</p>
				{/if}

				<ul class="mt-4 space-y-4">
					{#each mealFullData.entries as entry (entry.id)}
						<li class="rounded-lg bg-gray-100 p-4">
							<p>Created at: {entry.createdAt.toLocaleString()}</p>
							<p>
								Success score: <span class={`text-${successScores[entry.successScore].color}-500`}
									>{successScores[entry.successScore].text}</span
								>
							</p>
							<p>Notes: {entry.notes}</p>

							<ul class="mt-4 space-y-4">
								{#each entry.insulinInjections as injection (injection.insulinId)}
									<li class="rounded-lg bg-gray-200 p-4">
										<h4 class="text-lg font-bold">Insulin injection</h4>
										<p>Insulin: {injection.insulin.name}</p>
										<p>Dose: {injection.dose} units</p>
										<p>Moment: {injection.moment.minutes} minutes {injection.moment.from}</p>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</section>
