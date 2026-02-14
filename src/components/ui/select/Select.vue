<script setup lang="ts">
import type { AcceptableValue } from './useSelect'

import { computed, reactive, ref, toRefs } from 'vue'

import { useClickOutside } from '../../../composables/useClickOutside'
import { useSelectProvider } from './useSelect'

interface Props {
	isOpen?: boolean
	modelValue?: AcceptableValue
}

const props = withDefaults(defineProps<Props>(), { isOpen: false })

const emit = defineEmits<{
	(e: 'update:modelValue', value: AcceptableValue): void
}>()

const { modelValue } = toRefs(props)

const isOpen = ref(props.isOpen)
const triggerRect = reactive({ top: 0, left: 0, width: 0, height: 0 })
const selectedOptionText = ref('')
const isSelected = computed(() => !!modelValue.value)

const triggerElement = ref<HTMLElement>()
const contentElement = ref<HTMLElement>()

const toggle = (el: HTMLElement) => {
	if (el) {
		const rect = el.getBoundingClientRect()

		triggerRect.top = rect.top + window.scrollY
		triggerRect.left = rect.left + window.scrollX
		triggerRect.width = rect.width
		triggerRect.height = rect.height
	}

	isOpen.value = !isOpen.value
}

const close = () => {
	isOpen.value = false
}
const onSelect = (value: AcceptableValue) => {
	emit('update:modelValue', value)
	isOpen.value = false
}

const setSelectedOptionText = (text: string) => {
	selectedOptionText.value = text
}

useClickOutside([triggerElement, contentElement], close)

useSelectProvider({
	isOpen,
	isSelected,
	triggerRect,
	modelValue,
	selectedOptionText,
	triggerElement,
	contentElement,
	toggle,
	setValue: onSelect,
	setSelectedOptionText,
	setTriggerElement: (node) => {
		triggerElement.value = node
	},
	setContentElement: (node) => {
		contentElement.value = node
	},
})
</script>

<template>
	<div class="ui-select-root" :data-selected="isSelected || null">
		<slot />
	</div>
</template>
