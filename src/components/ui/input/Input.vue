<script setup lang="ts">
const model = defineModel({
	default: '',
})
</script>

<template>
	<input v-model="model" class="ui-input" />
</template>

<style scoped lang="scss">
.ui-input {
	width: 100%;
	border-radius: 8px;
	padding: 14px 16px;

	background-color: var(--neutral-200);
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.75;

	&::placeholder {
		color: var(--neutral-500);
	}
	&:focus {
		outline: 1px solid var(--base-blue);
	}
}
[data-field-invalid] .ui-input {
	outline: 1px solid var(--semantic-danger);
}

@media (max-width: 568px) {
	.ui-input {
		padding: 10px 16px;
		font-size: 0.875rem;
		line-height: 1.5;
	}
}
</style>
