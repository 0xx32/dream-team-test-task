<script setup lang="ts">
import { ref } from 'vue'

import { FeedbackError } from '@/components/FeedbackError'
import FeedbackForm from '@/components/FeedbackForm/FeedbackForm.vue'
import { FeedbackSuccess } from '@/components/FeedbackSuccess'

type State = 'error' | 'form' | 'success'
const state = ref<State>('form')

const setState = (newState: State) => {
	state.value = newState
}

const openForm = () => {
	state.value = 'form'
}
const submitForm = () => {
	state.value = 'success'
}
const onClose = () => {
	state.value = 'form'
}

//По макету форма вроде бы находится внутри диалогового окна но
//в задании не было указано что нужно его реализовывать
//поэтому реализовал через простое состояние
</script>

<template>
	<div class="container">
		<FeedbackForm
			v-if="state === 'form'"
			@close="onClose"
			@submit-form="submitForm"
			@try-again="setState('error')"
		/>
		<FeedbackSuccess v-else-if="state === 'success'" @on-click="openForm" />
		<FeedbackError v-else-if="state === 'error'" @close="onClose" @try-again="openForm" />
	</div>
</template>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	padding: 68px 12px;
}

@media (max-width: 568px) {
	.container {
		padding: 32px 12px 47px 12px;
	}
}
</style>
