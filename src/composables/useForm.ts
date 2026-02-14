import { computed, reactive, ref, toValue } from 'vue'

interface UseFormOptions<Values> {
	initialValues?: Values
	validate?: (values: Partial<Values>) => Partial<Record<keyof Values, string>>
}

export const useForm = <Values extends Record<string, any>>(options: UseFormOptions<Values>) => {
	const { initialValues, validate } = options
	const initial = initialValues || ({} as Values)

	const values = reactive<typeof initial>(initial)

	const errors = ref<Partial<Record<keyof Values, string>>>({})
	const isSubmitting = ref(false)

	const isValid = computed(() => Object.values(errors.value).every((err) => !err))

	const register = <K extends keyof Values>(path: K) => {
		return {
			modelValue: (values as Values)[path],

			// Используем 'any' для аргумента, чтобы TS не ругался на несовместимость
			// с AcceptableValue компонента, но записываем данные в правильное поле.
			'onUpdate:modelValue': (val: any) => {
				;(values as Values)[path] = val

				if (errors.value[path]) {
					errors.value[path] = undefined
				}
			},
		}
	}

	const handleSubmit = (handler: (payload: Values) => Promise<void> | void) => {
		return async (event: SubmitEvent) => {
			if (event) {
				event.preventDefault()
			}

			if (validate) {
				const validationErrors = validate(toValue(values))
				errors.value = validationErrors

				const hasErrors = Object.values(validationErrors).some((err) => !!err)
				if (hasErrors) return
			}

			isSubmitting.value = true
			try {
				await handler(toValue(values))
			} finally {
				isSubmitting.value = false
			}
		}
	}

	const setFieldValue = (path: keyof Values, value: Values[keyof Values]) => {
		values[path as string] = value
	}

	const reset = () => {
		Object.keys(values).forEach((key) => delete values[key])
		Object.assign(values, initial)
		errors.value = {}
	}

	const resetErrors = () => {
		Object.keys(errors.value).forEach((key) => delete errors.value[key])
	}

	const resetFieldError = (field: keyof Values) => {
		delete errors.value[field]
	}

	return {
		values,
		errors,
		isSubmitting,
		isValid,
		handleSubmit,
		reset,
		register,
		setFieldValue,
		resetErrors,
		resetFieldError,
	}
}
