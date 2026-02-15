<script setup lang="ts">
import { ref } from 'vue'

import { FeedbackForm } from './components/feedback-form/FeedbackForm'
import { FeedbackFormMobile } from './components/feedback-form/FeedbackFormMobile'
import { FeedbackError } from './components/FeedbackError'
import { FeedbackSuccess } from './components/FeedbackSuccess'
import { useMediaQuery } from './composables/useMediaQuery'

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

const isMobile = useMediaQuery('(max-width: 468px)')

//По макету форма вроде бы находится внутри диалогового окна но
//в задании не было указано что нужно его реализовывать
//поэтому реализовал через простое состояние
</script>

<template>
	<div class="container">
		<FeedbackFormMobile
			v-if="isMobile && state === 'form'"
			state="==@try-again=&quot;setState('error')"
			@close="onClose"
			@submit-form="submitForm"
			@try-again="setState('error')"
		/>
		<FeedbackForm
			v-if="state === 'form' && !isMobile"
			@close="onClose"
			@submit-form="submitForm"
			@try-again="setState('error')"
		/>

		<FeedbackSuccess v-if="state === 'success'" @on-click="openForm" />
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
