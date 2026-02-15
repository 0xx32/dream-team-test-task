<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { ref, watch } from 'vue'

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

const steps = {
	initial: 1,
	final: 2,
} as const

const step = ref(1)

const nextStep = () => {
	if (step.value === steps.final) return
	step.value++
}

const prevStep = () => {
	if (step.value === steps.initial) return
	step.value--
}

const transitionName = ref('slide-next')

watch(step, (newValue, oldValue) => {
	transitionName.value = newValue > oldValue ? 'slide-next' : 'slide-prev'
})
</script>

<template>
	<Card class="wrapper">
		<form class="form" @submit="onSubmit">
			<FeedbackFormHeader>
				<Transition :name="transitionName" mode="out-in">
					<div v-if="step === steps.final" class="form__rating">
						<FeedbackRating @update:rating="setRating" />
					</div>
				</Transition>
			</FeedbackFormHeader>

			<Transition :name="transitionName" mode="out-in">
				<div v-if="step === steps.initial" key="step-initial" class="form__fields-container">
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
				</div>

				<div v-else-if="step === steps.final" key="step-final" class="form__fields-container">
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

					<Field
						class="form__field additional-info-field"
						:data-field-invalid="!!errors.additionalInfo || null"
					>
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
			</Transition>

			<div class="form__footer">
				<div class="form__steps steps">
					<div class="steps__step steps__step--active">1</div>
					<div>
						<div
							class="steps__indicator-line"
							:class="{
								'steps__indicator-line--active': step === steps.final,
							}"
						/>
					</div>
					<div
						class="steps__step"
						:class="{
							'steps__step--active': step === steps.final,
						}"
					>
						2
					</div>
				</div>

				<div class="form__actions">
					<Button variant="secondary" type="button" class="form__actions__button" @click="prevStep">
						Отменить
					</Button>
					<Button
						v-if="step !== steps.final"
						type="button"
						class="form__actions__button"
						@click="nextStep"
					>
						Далее
					</Button>
					<Button v-else type="submit" class="form__actions__button"> Отправить </Button>
				</div>
			</div>
		</form>
	</Card>
</template>

<style scoped lang="scss">
.wrapper {
	max-width: 568px;
	min-height: 538px;
	width: 100%;
	padding: 20px 12px;
}
.form {
	display: flex;
	flex-direction: column;
	height: 100%;
	overflow: hidden;
	padding-inline: 1px;
}
.form__rating {
	margin-top: 8px;
}
.form__fields-container {
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto auto auto;
	gap: clamp(16px, 5vw, 28px);
	margin-bottom: 34px;
}
.form__field {
	display: flex;
	flex-direction: column;
	gap: 4px;
}
.form__field.additional-info-field textarea {
	height: 76px;
}
.steps {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 16px;
}
.form__steps {
	margin-bottom: 20px;
}
.steps__step {
	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 17px;
	padding: 8px 14px;
	width: 34px;
	height: 34px;

	background-color: var(--neutral-300);
	color: var(--neutral-600);

	font-weight: 500;
	font-size: 1rem;
	line-height: 1.13;

	&--active {
		background-color: var(--base-blue);
		color: var(--neutral-100);
	}
}
.steps__indicator-line {
	border-radius: 40px;
	width: 98px;
	height: 6px;
	background-color: var(--neutral-300);

	&--active {
		background-color: var(--base-blue);
	}
}
.form__actions {
	display: flex;
	justify-content: space-between;
	gap: clamp(20px, 5vw, 28px);

	&__button {
		flex: 1;
	}
}
.form__footer {
	margin-top: auto;
}
.slide-next-enter-from {
	transform: translateX(30px);
	opacity: 0;
}
.slide-next-leave-to {
	transform: translateX(-30px);
	opacity: 0;
}

/* Анимация "Назад" */
.slide-prev-enter-from {
	transform: translateX(-30px);
	opacity: 0;
}
.slide-prev-leave-to {
	transform: translateX(30px);
	opacity: 0;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
	transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-leave-active {
	position: absolute;
	width: 100%;
}
</style>
