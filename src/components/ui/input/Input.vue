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
}
</style>
