<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'

const emits = defineEmits<{
	(event: 'onClick'): void
}>()
</script>

<template>
	<Card class="wrapper">
		<div class="header">
			<Typography class="title" tag="h2" variant="h2" weight="bold">
				Спасибо, ваш ответ отправлен
			</Typography>
			<Typography class="subtitle" tag="p" variant="small" weight="regular">
				Свяжемся с вами в ближайшее время
			</Typography>
		</div>

		<div class="image">
			<img src="/success.png" alt="success-img" />
		</div>

		<div class="button-container">
			<Button class="button-action" @click="emits('onClick')"> На главную </Button>
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
}
.button-action {
	width: 16.25rem;
}

@media (max-width: 399px) {
	.button-action {
		width: 100%;
	}
}
</style>
