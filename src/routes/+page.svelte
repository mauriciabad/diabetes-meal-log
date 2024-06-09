<script lang="ts">
	import { persisted } from 'svelte-persisted-store';
	import { successScores } from '../utils/constants/successScores';
	import { testMealEntries, testMeals } from '../utils/testingData';
	import type { Insulin } from '../utils/types';
	import Time from 'svelte-time';

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
							<ul class="flex flex-wrap space-x-4">
								{#each entry.insulinInjections as injection}
									<li class="rounded-lg">
										<p>
											<span
												class={`${injection.insulin.type === 'fast' ? 'text-red-500' : 'text-blue-500'}`}
											>
												{injection.dose}u
											</span>

											{#if injection.moment.minutes}
												{Math.abs(injection.moment.minutes)}min
											{/if}

											{injection.moment.minutes === 0
												? ''
												: injection.moment.minutes > 0
													? 'after'
													: 'before'}
											{injection.moment.from === 'start'
												? 'starting'
												: injection.moment.from === 'end'
													? 'ending'
													: 'during'}
										</p>
									</li>
								{/each}
							</ul>

							<p>
								<Time relative timestamp={entry.createdAt} />
							</p>
							<p>
								<span class={`text-${successScores[entry.successScore].color}-500`}
									>{successScores[entry.successScore].text}</span
								>
							</p>
							{#if entry.notes}
								<p class="mt-4">{entry.notes}</p>
							{/if}
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</section>
