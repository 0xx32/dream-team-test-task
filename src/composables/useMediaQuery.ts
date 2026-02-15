import type { MaybeRefOrGetter } from 'vue'

import { computed, onMounted, onUnmounted, shallowRef, toValue, watchEffect } from 'vue'

export function useMediaQuery(query: MaybeRefOrGetter<string>) {
	const mediaQuery = shallowRef<MediaQueryList>()
	const matches = shallowRef(false)

	const handler = (event: MediaQueryListEvent) => {
		matches.value = event.matches
	}

	watchEffect(() => {
		mediaQuery.value = window.matchMedia(toValue(query))
		matches.value = mediaQuery.value.matches
	})

	onMounted(() => {
		mediaQuery.value?.addEventListener('change', handler)
	})

	onUnmounted(() => {
		mediaQuery.value?.removeEventListener('change', handler)
	})

	return computed(() => matches.value)
}
