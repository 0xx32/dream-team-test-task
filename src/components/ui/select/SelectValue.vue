<script setup lang="ts">
import { computed } from 'vue'

import { useSelect } from './useSelect'
interface Props {
	placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
	placeholder: '',
})
const { context } = useSelect()

const slotText = computed(() => {
	return context.value.selectedOptionText.value || props.placeholder
})
</script>

<template>
	<div class="ui-select-value">
		<slot>
			{{ slotText }}
		</slot>
	</div>
</template>

<style scoped>
[data-selected] .ui-select-value {
	color: black;
}
</style>
