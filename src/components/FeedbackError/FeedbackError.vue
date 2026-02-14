<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
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
			<Button class="button-action" variant="secondary"> Закрыть </Button>
			<Button class="button-action"> Попробовать снова </Button>
		</div>
	</Card>
</template>

<style scoped lang="scss">
.wrapper {
	display: flex;
	flex-direction: column;
	gap: 95px;
	width: 100%;
	max-width: 39.813rem;
}

.title {
	margin-bottom: 8px;
	text-align: center;
}
.subtitle {
	text-align: center;
	color: var(--neutral-800);
}
.image {
	display: flex;
	justify-content: center;
	align-items: center;
}
.button-container {
	display: flex;
	justify-content: center;
	gap: 28px;
}
.button-action {
	flex: 1;
}
</style>
