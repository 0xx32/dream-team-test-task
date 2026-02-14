<script setup lang="ts">
import { vMaska } from 'maska/vue'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectOption,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'

import { FeedbackRating } from '../FeedbackRating'
import { useFeedbackForm } from './useFeedbackForm'

const feedbackForm = useFeedbackForm()
const { onSubmit, setPhoneValue, setRating } = feedbackForm.functions
const { register, errors } = feedbackForm.form
</script>

<template>
	<Card class="wrapper">
		<form @submit="onSubmit">
			<Typography class="form__title" tag="h2" variant="h2"> Форма обратной связи </Typography>

			<Typography class="form_subtitle" weight="regular" tag="p" variant="small">
				Пожалуйста, оцените свой опыт прохождения тестового
			</Typography>
			<div class="rating">
				<FeedbackRating @update:rating="setRating" />
			</div>

			<div class="form__fields-container">
				<Field class="form__field" :data-field-invalid="!!errors.fio || null">
					<FieldLabel>ФИО</FieldLabel>
					<Input v-bind="register('fio')" placeholder="Иван Иванов" />
					<FieldError v-if="errors.fio">
						{{ errors.fio }}
					</FieldError>
				</Field>
				<Field class="form__field" :data-field-invalid="!!errors.email || null">
					<FieldLabel>Почта</FieldLabel>
					<Input v-bind="register('email')" placeholder="ivan@mail.com" type="email" />
					<FieldError v-if="errors.email">
						{{ errors.email }}
					</FieldError>
				</Field>
				<Field class="form__field" :data-field-invalid="!!errors.phone || null">
					<FieldLabel>Номер телефона</FieldLabel>
					<Input
						v-maska="'+7 (###) ###-##-##'"
						placeholder="+7 (000) 000 00 00"
						@maska="setPhoneValue"
					/>
					<FieldError v-if="errors.phone">
						{{ errors.phone }}
					</FieldError>
				</Field>
				<Field class="form__field" :data-field-invalid="!!errors.grade || null">
					<FieldLabel>Грейд</FieldLabel>
					<Select v-bind="register('grade')">
						<SelectTrigger class="trigger">
							<SelectValue placeholder="Выберите" />
						</SelectTrigger>

						<SelectContent class="select-content">
							<SelectOption value="junior"> Junior </SelectOption>
							<SelectOption value="middle"> Middle </SelectOption>
							<SelectOption value="senior"> Senior </SelectOption>
							<SelectOption value="teamlead"> Team lead </SelectOption>
						</SelectContent>
					</Select>
					<FieldError v-if="errors.grade">
						{{ errors.grade }}
					</FieldError>
				</Field>

				<Field class="additional-info-field" :data-field-invalid="!!errors.additionalInfo || null">
					<FieldLabel>Дополнительная информация</FieldLabel>
					<Textarea
						v-bind="register('additionalInfo')"
						placeholder="Что понравилось и не понравилось"
					/>
					<FieldError v-if="errors.additionalInfo">
						{{ errors.additionalInfo }}
					</FieldError>
				</Field>
			</div>

			<div class="form__actions">
				<Button variant="secondary" type="button" class="form__actions__button"> Отменить </Button>
				<Button type="submit" class="form__actions__button"> Отправить </Button>
			</div>
		</form>
	</Card>
</template>

<style scoped lang="scss">
.wrapper {
	width: 100%;
	max-width: 39.813rem;
}
.form__title {
	margin-bottom: 8px;
	text-align: center;
}
.form_subtitle {
	margin-bottom: 1.25rem;
	text-align: center;
	color: #4b5563;
}
.rating {
	margin-bottom: 2.25rem;
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
