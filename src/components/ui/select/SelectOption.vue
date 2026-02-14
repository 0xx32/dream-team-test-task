<script setup lang="ts">
import type { AcceptableValue } from './useSelect'
import type { SlotNode } from './utils'

import { useSlots } from 'vue'

import { useSelect } from './useSelect'
import { getSlotText } from './utils'

const props = defineProps<{ value: AcceptableValue }>()

const slots = useSlots()

const { context } = useSelect()

const handleClick = () => {
	context.value.setValue(props.value)

	if (slots.default) {
		const children = slots.default()
		context.value.setSelectedOptionText(getSlotText(children as SlotNode))
	}
}
</script>

<template>
	<div class="ui-select-option" @click="handleClick">
		<slot />
	</div>
</template>

<style scoped>
.ui-select-option {
	padding: 13px 16px;

	font-weight: 400;
	line-height: 1.75;
	color: var(--neutral-800);
	cursor: pointer;
}
.ui-select-option:hover {
	background: var(--neutral-300);
}
</style>
