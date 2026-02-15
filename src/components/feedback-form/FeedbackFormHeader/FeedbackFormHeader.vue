<script setup lang="ts">
import { Typography } from '@/components/ui/typography'
</script>

<template>
	<div class="form-header">
		<Typography class="form-header__title" tag="h2" variant="h2"> Форма обратной связи </Typography>

		<Typography class="form-header__subtitle" weight="regular" tag="p" variant="small">
			Пожалуйста, оцените свой опыт прохождения тестового
		</Typography>

		<slot />
	</div>
</template>

<style scoped lang="scss">
.form-header {
	margin-bottom: 16px;

	.form-header__title {
		margin-bottom: 8px;
		text-align: center;
		font-size: clamp(1.125rem, 5vw, 2.125rem);
	}
	.form-header__subtitle {
		font-size: clamp(0.75rem, 3vw, 0.875rem);
		text-align: center;
		color: #4b5563;
		white-space: break-spaces;
	}
}

@media (max-width: 568px) {
	.form-header__title {
		margin-bottom: 4px;
	}
	.form-header__subtitle {
		margin-bottom: 16px;
		max-width: 250px;
		margin: 0 auto;
	}
}
</style>
