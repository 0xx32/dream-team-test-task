<template>
	<p class="field__error">
		<slot />
	</p>
</template>

<style scoped lang="scss">
.field__error {
	font-weight: 400;
	font-size: 0.75rem;
	line-height: 1.4;
	color: var(--semantic-danger);
}
</style>
