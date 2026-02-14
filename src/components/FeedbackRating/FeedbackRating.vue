<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue'

import { StarRating } from '@/components/ui/star-rating'

export interface Rating {
	value: number
	variants: string[]
}

const emits = defineEmits<{
	(event: 'update:rating', rating: Rating): void
}>()

const goodQuickAnswers = [
	'Интересно',
	'Легко',
	'Быстро сделал',
	'Красиво',
	'Подробно описано',
	'Все понятно и по делу',
]
const badQuickAnswers = [
	'Не понятно',
	'Однообразно',
	'Скучно',
	'Неудобно',
	'Ничего не понял',
	'Слишком сложно для тестового',
]
const estimation = ref(0)
const answerToShow = computed(() => {
	if (estimation.value === 0) return []

	return estimation.value > 3 ? goodQuickAnswers : badQuickAnswers
})
const selectedVariants = ref(new Set<string>())

const toggleVariant = (variant: string) => {
	const newSet = new Set(selectedVariants.value)

	if (newSet.has(variant)) {
		newSet.delete(variant)
	} else {
		newSet.add(variant)
	}
	selectedVariants.value = newSet
}

watch(estimation, (newValue, oldValue) => {
	if ((oldValue >= 4 && newValue < 4) || (oldValue < 4 && newValue >= 4)) {
		selectedVariants.value = new Set()
	}
})

watchEffect(() => {
	emits('update:rating', { value: estimation.value, variants: Array.from(selectedVariants.value) })
})
</script>

<template>
	<div>
		<StarRating v-model="estimation" :size="35" class="rating-stars" />

		<div v-if="!!estimation" class="rating-container">
			<button
				v-for="variant in answerToShow"
				:key="variant"
				class="rating-button"
				:class="{ selected: selectedVariants.has(variant) }"
				type="button"
				@click="toggleVariant(variant)"
			>
				{{ variant }}
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
.rating-stars {
	display: flex;
	justify-content: center;
}
.rating-container {
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	margin-top: 36px;
}
.rating-button {
	padding: 5px 15px;

	font-weight: 400;
	line-height: 1.75;
	color: var(--neutral-800);
	background-color: var(--neutral-300);
	border-radius: 100px;

	&:hover {
		background-color: var(--neutral-400);
		transition: background-color 0.2s ease;
	}

	&.selected {
		background-color: var(--neutral-600);
		color: var(--neutral-100);
	}
}
</style>
