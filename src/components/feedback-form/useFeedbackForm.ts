import type { Rating } from './FeedbackRating'
import type { MaskaDetail } from 'maska'

import { ref } from 'vue'

import { useForm } from '@/composables/useForm'
import { isEmail } from '@/utils/helpers/isEmail'

interface FeedbackForm {
	additionalInfo: string
	email: string
	fio: string
	grade: 'junior' | 'middle' | 'senior' | 'teamlead' | null
	phone: string
}

export const useFeedbackForm = () => {
	const form = useForm<FeedbackForm>({
		validate: (values) => {
			const errors: Partial<Record<keyof FeedbackForm, string>> = {}

			if (values.email) {
				if (!values.email.includes('@')) {
					errors.email = 'Неверный формат почты'
				}
				if (!isEmail(values.email)) {
					errors.email = 'Неверный формат электронной почты'
				}
			} else {
				errors.email = 'Почта не может быть пустой'
			}

			if (!values.fio || (values.email && values.email.length < 0)) {
				errors.fio = 'ФИО не может быть пустым'
			}

			if (values.phone) {
				if (values.phone?.length < 10) {
					errors.phone = 'Номер телефона не может быть короче 10 цифр'
				}
			} else {
				errors.phone = 'Номер телефона не может быть пустым'
			}

			if (!values.grade) {
				errors.grade = 'Грейд не может быть пустым'
			}

			return errors
		},
	})

	const setPhoneValue = ({ detail }: { detail: MaskaDetail }) => {
		form.resetFieldError('phone')
		form.setFieldValue('phone', detail.unmasked)
	}

	const rating = ref<Rating>({ value: 0, variants: [] })

	const setRating = (newRating: Rating) => {
		rating.value = newRating
	}

	return {
		form,
		functions: {
			setPhoneValue,
			setRating,
		},
	}
}
