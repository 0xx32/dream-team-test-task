<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue'

import ChevronDownIcon from '@/components/icons/ChevronDownIcon.vue'

import { useSelect } from './useSelect'

const triggerRef = useTemplateRef<HTMLElement>('trigger')

const { context } = useSelect()

const isOpen = computed(() => context.value.isOpen.value)

const handleClick = () => {
	if (triggerRef.value) {
		context.value.toggle(triggerRef.value)
	}
}

onMounted(() => {
	context.value.setTriggerElement(triggerRef.value ?? undefined)
})
</script>

<template>
	<div
		ref="trigger"
		class="ui-select-trigger"
		:class="{
			active: isOpen,
		}"
		@click="handleClick"
	>
		<slot />

		<ChevronDownIcon class="chevron" />
	</div>
</template>

<style scoped lang="scss">
.ui-select-trigger {
	position: relative;
	padding: 14px 16px;

	border-radius: 8px;
	background-color: var(--neutral-200);
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.75;
	color: var(--neutral-500);

	&.active {
		outline: 1px solid var(--base-blue);
	}

	& .chevron {
		position: absolute;
		right: 16px;
		top: 50%;
		transform: translateY(-50%);
	}
	&.active .chevron {
		transform: translateY(-50%) rotate(180deg);
	}
}
[data-field-invalid] .ui-select-trigger {
	outline: 1px solid var(--semantic-danger);
}

@media (max-width: 568px) {
	.ui-select-trigger {
		padding: 12px 16px;
		font-size: 0.875rem;
		line-height: 1.5;
	}
}
</style>
