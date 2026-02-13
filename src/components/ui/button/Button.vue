<script setup lang="ts">
type Variant = 'primary' | 'secondary'

interface Props {
	size?: 'L' | 'S'
	variant?: Variant
}

const { size = 'L', variant = 'primary' } = defineProps<Props>()
</script>

<template>
	<button class="ui-button" :class="[variant, `size-${size}`]">
		<slot />
	</button>
</template>

<style scoped lang="scss">
.ui-button {
	border-radius: 8px;

	&.primary {
		background-color: var(--base-blue);
		color: var(--neutral-100);

		&:hover {
			background-color: #2a1cca;
		}

		&:active {
			background-color: #191086;
		}

		&:disabled {
			background-color: var(--neutral-400);
		}
	}

	&.secondary {
		border: 1px solid var(--base-blue);
		color: var(--base-blue);
	}

	&.size-L {
		padding: 14px 16px;
		line-height: 1.75;
		font-size: 1rem;
	}

	&.size-S {
		padding: 12px 16px;
		font-size: 0.875rem;
		line-height: 1.5;
	}
}
</style>
