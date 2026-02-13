<template>
	<label class="field__label">
		<slot />
	</label>
</template>

<style scoped lang="scss">
.field__label {
	font-weight: 400;
	font-size: 0.875rem;
	line-height: 1.4;
	color: var(--neutral-600);
}
</style>
