<script setup lang="ts">
import { computed, useTemplateRef, watch } from 'vue'

import { useSelect } from './useSelect'

defineOptions({
	inheritAttrs: false,
})

const contentRef = useTemplateRef<HTMLElement>('content')

const { context } = useSelect()

const MARGIN_TOP = 4

const floatingStyles = computed(() => ({
	transform: `translate(${context.value.triggerRect.left}px, ${context.value.triggerRect.top + context.value.triggerRect.height + MARGIN_TOP}px)`,
	width: `${context.value.triggerRect.width}px`,
}))

watch(contentRef, (newEl) => {
	context.value.setContentElement(newEl ?? undefined)
})
</script>

<template>
	<Teleport to="body">
		<div v-if="context.isOpen.value" ref="content" :style="floatingStyles" class="popper">
			<Transition name="inner-fade" appear>
				<div class="select-content">
					<slot />
				</div>
			</Transition>
		</div>
	</Teleport>
</template>

<style scoped>
.popper {
	position: absolute;
	z-index: 9999;
	top: 0;
	left: 0;
}

.inner-fade-enter-active,
.inner-fade-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.2s ease;
}

.inner-fade-enter-from,
.inner-fade-leave-to {
	opacity: 0;
	/* Теперь этот transform не конфликтует с translate родителя! */
	transform: scale(0.95);
}

.select-content {
	overflow: hidden;

	background: #fff;
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
