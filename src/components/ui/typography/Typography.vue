<script setup lang="ts">
type Variant = 'base' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'mini' | 'small'
type Tag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
type Weight = 'bold' | 'medium' | 'regular'

interface Props {
	isLink?: boolean
	tag?: Tag
	variant?: Variant
	weight?: Weight
}

const { tag = 'p', variant = 'base', weight, isLink = false } = defineProps<Props>()
</script>

<template>
	<component
		:is="tag"
		class="ui-typography"
		:class="[`variant-${variant}`, weight, isLink && 'link']"
	>
		<slot />
	</component>
</template>

<style scoped lang="scss">
.ui-typography {
	margin: 0;
	font-family: var(--font-family), sans-serif;
	color: #1a1a1a;

	&.variant-h1 {
		font-weight: 700;
		font-size: 50px;
		line-height: 1.25;
	}

	&.variant-h2 {
		font-weight: 700;
		font-size: 34px;
		line-height: 1.35;
	}

	&.variant-h3 {
		font-weight: 700;
		font-size: 24px;
		line-height: 1.45;
	}

	&.variant-h4 {
		font-weight: 500;
		font-size: 22px;
		line-height: 1.25;
	}

	&.variant-h5 {
		font-weight: 700;
		font-size: 18px;
		line-height: 1.3;
	}

	&.variant-base {
		font-size: 16px;
		line-height: 1.75;
	}

	&.variant-small {
		font-size: 14px;
		line-height: 1.45;
	}

	&.variant-mini {
		font-size: 12px;
		line-height: 1.33;
	}

	&.regular {
		font-weight: 400;
	}

	&.medium {
		font-weight: 500;
	}

	&.bold {
		font-weight: 700;
	}

	&.link {
		color: var(--base-blue);
		text-decoration: underline;
		cursor: pointer;

		&:hover {
			opacity: 0.8;
		}
	}
}
</style>
