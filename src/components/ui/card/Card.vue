<template>
	<div class="card">
		<slot />
	</div>
</template>

<style scoped lang="scss">
.card {
	padding: clamp(0.75rem, 3vw, 2.75rem);
	border-radius: clamp(1rem, 5vw, 2rem);
	background-color: var(--neutral-100);
}
</style>
