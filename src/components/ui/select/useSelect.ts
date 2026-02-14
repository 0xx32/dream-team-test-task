import type { ComputedRef, InjectionKey, MaybeRefOrGetter, Ref } from 'vue'

import { computed, inject, provide, toValue } from 'vue'

export type AcceptableValue = bigint | number | string | Record<string, any> | null

interface SelectContext<T = AcceptableValue> {
	contentElement: Ref<HTMLElement | undefined>

	isOpen: Ref<boolean>
	isSelected: ComputedRef<boolean>
	modelValue: Ref<T | undefined>
	selectedOptionText: Ref<string>
	triggerElement: Ref<HTMLElement | undefined>
	triggerRect: { top: number; left: number; width: number; height: number }
	setContentElement: (node: HTMLElement | undefined) => void
	setSelectedOptionText: (text: string) => void
	setTriggerElement: (node: HTMLElement | undefined) => void
	setValue: (value: T) => void
	toggle: (el: HTMLElement) => void
}

const selectKey: InjectionKey<MaybeRefOrGetter<SelectContext>> = Symbol('selectContext')

export const useSelectProvider = (context: SelectContext) => {
	provide(selectKey, context)
}

export const useSelect = () => {
	const contextRaw = inject(selectKey)

	if (!contextRaw) {
		throw new Error('useSelect must be called from a child component')
	}

	const context = computed(() => toValue(contextRaw))

	return {
		context,
	}
}
