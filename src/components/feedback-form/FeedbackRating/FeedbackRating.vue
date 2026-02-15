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

const goodQuickAnswers = ['Интересно', 'Легко', 'Быстро сделал', 'Красиво', 'Подробно описано']
const badQuickAnswers = ['Не понятно', 'Однообразно', 'Скучно', 'Неудобно', 'Ничего не понял']
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
		<StarRating v-model="estimation" class="rating-stars" star-class="rating-stars__star" />

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
	gap: clamp(0.75rem, 5vw, 1.375rem);

	:deep(.rating-stars__star) {
		width: clamp(24px, 5vw, 33px);
		height: clamp(24px, 5vw, 33px);
	}
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

@media (max-width: 568px) {
	.rating-container {
		gap: 8px;
		margin-top: 16px;
	}
	.rating-button {
		padding: 8px 12px;
		line-height: 1.33;
		font-size: 12px;
	}
}
</style>
