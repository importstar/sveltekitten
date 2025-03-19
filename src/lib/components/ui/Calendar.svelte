<script lang="ts">
	import { Calendar } from 'bits-ui';
	import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';

	const currentDate = today(getLocalTimeZone());
	let value = $state(today(getLocalTimeZone()));

	const formatter = new DateFormatter('en-US', {
		month: 'long'
	});

	const monthList = Array.from({ length: 12 }, (_, i) => {
		const month = currentDate.set({ month: i + 1 });
		return {
			value: month.month,
			label: formatter.format(month.toDate(getLocalTimeZone()))
		};
	});

	const currentYear = new Date().getFullYear();
	const yearList = Array.from({ length: 30 }, (_, i) => currentYear - i);
	let placeholder = $state(currentDate);
</script>

<Calendar.Root
	class="calendar__card"
	weekdayFormat="short"
	fixedWeeks={true}
	bind:placeholder
	type="single"
	bind:value
>
	{#snippet children({ months, weekdays })}
		<Calendar.Header class="flex items-center justify-between gap-3">
			<Calendar.PrevButton class="calendar__button">
				<CaretLeft class="size-4" />
			</Calendar.PrevButton>
			<select
				aria-label="Select month"
				value={placeholder.month}
				class="select select-sm text-sm"
				onchange={(e) => {
					const month = parseInt(e.currentTarget.value);
					placeholder = placeholder.set({ month });
				}}
			>
				{#each monthList as month}
					<option value={month.value}>{month.label}</option>
				{/each}
			</select>
			<Calendar.NextButton class="calendar__button">
				<CaretRight class="size-4" />
			</Calendar.NextButton>
			<select
				class="select select-sm text-sm"
				aria-label="Select year"
				value={placeholder.year}
				onchange={(e) => {
					const year = parseInt(e.currentTarget.value);
					placeholder = placeholder.set({ year });
				}}
			>
				{#each yearList as year}
					<option value={year}>{year}</option>
				{/each}
			</select>
		</Calendar.Header>
		<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
			{#each months as month, i (i)}
				<Calendar.Grid class="w-full border-collapse space-y-1 select-none">
					<Calendar.GridHead>
						<Calendar.GridRow class="mb-1 flex w-full justify-between">
							{#each weekdays as day}
								<Calendar.HeadCell
									class="text-muted-foreground w-10 rounded-md text-xs font-normal!"
								>
									<div>{day.slice(0, 2)}</div>
								</Calendar.HeadCell>
							{/each}
						</Calendar.GridRow>
					</Calendar.GridHead>
					<Calendar.GridBody>
						{#each month.weeks as weekDates}
							<Calendar.GridRow class="flex w-full">
								{#each weekDates as date}
									<Calendar.Cell {date} month={month.value} class="calendar__cell">
										<Calendar.Day class="calendar__day group">
											<div class="calendar__today"></div>
											{date.day}
										</Calendar.Day>
									</Calendar.Cell>
								{/each}
							</Calendar.GridRow>
						{/each}
					</Calendar.GridBody>
				</Calendar.Grid>
			{/each}
		</div>
	{/snippet}
</Calendar.Root>
