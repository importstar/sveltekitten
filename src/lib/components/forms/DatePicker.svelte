<script lang="ts">
	import { Popover } from 'bits-ui';
	import Calendar from '../ui/Calendar.svelte';
	import { DateFormatter, getLocalTimeZone, type DateValue } from '@internationalized/date';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';

	const df = new DateFormatter('en-GB', {
		dateStyle: 'short'
	});

	type Props = {
		locale?: string;
		value?: DateValue;
		placeholder?: string;
		formatter?: DateFormatter;
		selectableYears?: number[];
		selectable?: boolean;
		onValueChange?: (value: DateValue | undefined) => void;
	};

	let {
		locale = $bindable('en-GB'),
		value = $bindable(),
		placeholder = 'Pick a date',
		formatter = df,
		onValueChange
	}: Props = $props();
</script>

<div>
	<Popover.Root>
		<Popover.Trigger class="input cursor-pointer items-center">
			<CalendarBlank class="size-5" />
			{#if value}
				{formatter.format(value.toDate(getLocalTimeZone()))}
			{:else}
				{placeholder}
			{/if}
		</Popover.Trigger>
		<Popover.Portal>
			<Popover.Content>
				<Calendar bind:locale bind:value {onValueChange} />
			</Popover.Content>
		</Popover.Portal>
	</Popover.Root>
</div>
