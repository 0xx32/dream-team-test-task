<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { StarRating } from '@/components/ui/star-rating'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'
</script>

<template>
	<div class="wrapper">
		<form>
			<Typography class="form__title" tag="h2" variant="h2"> Форма обратной связи </Typography>

			<div class="rating">
				<Typography class="rating__title" weight="regular" tag="p" variant="small">
					Пожалуйста, оцените свой опыт прохождения тестового
				</Typography>
				<StarRating :size="35" class="rating_stars" />
			</div>

			<div class="form__fields-container">
				<Field class="form__field">
					<FieldLabel>ФИО</FieldLabel>
					<Input placeholder="Иван Иванов" />
				</Field>
				<Field class="form__field">
					<FieldLabel>Почта</FieldLabel>
					<Input placeholder="ivan@mail.com" />
				</Field>
				<Field class="form__field">
					<FieldLabel>Номер телефона</FieldLabel>
					<Input placeholder="+7 (000) 000 00 00" />
				</Field>
				<Field class="form__field">
					<FieldLabel>Грейд</FieldLabel>
					<Input placeholder="Выберите" />
				</Field>

				<Field class="additional-info-field">
					<FieldLabel>Дополнительная информация</FieldLabel>
					<Textarea placeholder="Что понравилось и не понравилось" />
				</Field>
			</div>

			<div class="form__actions">
				<Button variant="secondary" type="button" class="form__actions__button"> Отменить </Button>
				<Button type="submit" class="form__actions__button"> Отправить </Button>
			</div>
		</form>
	</div>
</template>

<style scoped lang="scss">
.wrapper {
	padding: 2.75rem;
	border-radius: 2rem;
	max-width: 39.875rem;

	background-color: var(--neutral-100);
}

.form__title {
	margin-bottom: 8px;
	text-align: center;
}
.rating {
	margin-bottom: 2.25rem;
}
.rating__title {
	margin-bottom: 1.25rem;
	text-align: center;
	color: #4b5563;
}
.rating_stars {
	display: flex;
	justify-content: center;
}
.form__fields-container {
	display: grid;
	grid-template-columns: 260px 260px;
	grid-template-rows: auto auto auto;
	gap: 28px;
	margin-bottom: 34px;
}
.form__field {
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.additional-info-field {
	grid-column: span 2;
}
.additional-info-field textarea {
	height: 144px;
}
.form__actions {
	display: flex;
	justify-content: space-between;
	gap: 28px;

	&__button {
		flex: 1;
	}
}
</style>
