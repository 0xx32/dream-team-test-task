import type { Ref } from 'vue'

import { isRef, onMounted, onUnmounted } from 'vue'

export const useClickOutside = (
	elements: HTMLElement[] | Ref<HTMLElement | undefined>[],
	callback: () => void
) => {
	const handler = (event: MouseEvent) => {
		const target = event.target as Node

		const isInside = elements.some((element) => {
			const el = isRef(element) ? element.value : element

			return el && el.contains(target)
		})

		if (!isInside) {
			callback()
		}
	}

	onMounted(() => {
		document.addEventListener('mousedown', handler)
	})

	onUnmounted(() => {
		document.removeEventListener('mousedown', handler)
	})
}
