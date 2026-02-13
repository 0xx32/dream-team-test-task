<script setup lang="ts">
import { ref } from 'vue'

import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Textarea } from './components/ui/textarea'
import { Typography } from './components/ui/typography'

const inputed = ref('')
</script>

<template>
	{{ inputed }}
	<Typography tag="span" variant="h2"> Dream Team </Typography>
	<Button size="L"> Button </Button>
	<Input placeholder="Input" class="sadasda" />
	<Textarea placeholder="Input" />
</template>
