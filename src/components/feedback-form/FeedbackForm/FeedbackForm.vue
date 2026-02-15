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

import { FeedbackFormHeader } from '../FeedbackFormHeader'
import { FeedbackRating } from '../FeedbackRating'
import { useFeedbackForm } from '../useFeedbackForm'

const emits = defineEmits<{
	(event: 'close'): void
	(event: 'submitForm'): void
	(event: 'tryAgain'): void
}>()

const feedbackForm = useFeedbackForm()
const { setPhoneValue, setRating } = feedbackForm.functions
const { register, errors, handleSubmit } = feedbackForm.form

const onSubmit = handleSubmit((values) => {
	// eslint-disable-next-line no-console
	console.log('@submit', values)

	//Симуляция ошибки при отправке формы например на сервер
	//Так как по заданию нужно при валидации показывать экран ошибки
	//Не удобный UX получается
	const random = Math.floor(Math.random() * 6)
	if (random > 3) {
		emits('submitForm')
	} else {
		emits('tryAgain')
	}
})
</script>

<template>
	<Card class="wrapper">
		<form class="form" @submit="onSubmit">
			<FeedbackFormHeader>
				<div class="form__rating">
					<FeedbackRating @update:rating="setRating" />
				</div>
			</FeedbackFormHeader>

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
				<Button
					variant="secondary"
					type="button"
					class="form__actions__button"
					@click="emits('close')"
				>
					Отменить
				</Button>
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
.form {
	.form__title {
		margin-bottom: 8px;
		text-align: center;
		font-size: clamp(1.125rem, 5vw, 2.125rem);
	}
	.form_subtitle {
		font-size: clamp(0.75rem, 3vw, 0.875rem);
		margin-bottom: 20px;
		text-align: center;
		color: #4b5563;
		white-space: break-spaces;
	}
	.form__rating {
		margin-top: 20px;
	}

	.form__fields-container {
		display: grid;
		grid-template-columns: repeat(2, minmax(220px, 1fr));
		grid-template-rows: auto auto auto;
		gap: clamp(16px, 5vw, 28px);
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
		gap: clamp(20px, 5vw, 28px);

		&__button {
			flex: 1;
		}
	}
}

@media (max-width: 568px) {
	.form {
		.form__title {
			margin-bottom: 4px;
		}
		.form_subtitle {
			margin-bottom: 16px;
		}
		.form__fields-container {
			grid-template-columns: 1fr;
		}
		.additional-info-field {
			grid-column: span 1;
		}
	}
}
</style>
