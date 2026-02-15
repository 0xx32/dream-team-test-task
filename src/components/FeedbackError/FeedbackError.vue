<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

const emits = defineEmits<{
	(event: 'close'): void
	(event: 'tryAgain'): void
}>()
</script>

<template>
	<Card class="wrapper">
		<div class="header">
			<Typography class="title" tag="h2" variant="h2" weight="bold">
				Что-то пошло не так
			</Typography>
			<Typography class="subtitle" tag="p" variant="small" weight="regular">
				Попробуйте заполнить форму позже
			</Typography>
		</div>

		<div class="image">
			<img src="/error.png" alt="success-img" />
		</div>

		<div class="button-container">
			<Button class="button-action" variant="secondary" @click="emits('close')"> Закрыть </Button>
			<Button class="button-action" @click="emits('tryAgain')"> Попробовать снова </Button>
		</div>
	</Card>
</template>

<style scoped lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	gap: clamp(44px, 5vw, 95px);
	width: 100%;
	max-width: 39.813rem;
}

.title {
	margin-bottom: 8px;
	text-align: center;
	font-size: clamp(1.125rem, 5vw, 2.125rem);
}
.subtitle {
	text-align: center;
	color: var(--neutral-800);
	font-size: clamp(0.75rem, 3vw, 0.875rem);
}
.image {
	display: flex;
	justify-content: center;
	align-items: center;
	width: clamp(100px, 20vw, 157px);
	margin: 0 auto;
}
.button-container {
	display: flex;
	justify-content: center;
	gap: 28px;
}
.button-action {
	flex: 1;
}
@media (max-width: 449px) {
	.button-container {
		flex-direction: column-reverse;
		gap: 20px;
	}
}
</style>
