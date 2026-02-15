<script setup lang="ts">
const model = defineModel({
	default: '',
})
</script>

<template>
	<textarea v-model="model" class="ui-textarea" />
</template>

<style scoped lang="scss">
.ui-textarea {
	width: 100%;
	border-radius: 8px;
	padding: 14px 16px;

	background-color: var(--neutral-200);
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.75;

	resize: none;

	&::placeholder {
		color: var(--neutral-500);
	}
	&:focus {
		outline: 1px solid var(--base-blue);
	}
}

@media (max-width: 568px) {
	.ui-textarea {
		padding: 10px 16px;
		font-size: 0.875rem;
		line-height: 1.5;
	}
}
</style>
