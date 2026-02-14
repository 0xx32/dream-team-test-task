export type SlotNode = number | string | SlotNode[] | { children: SlotNode }

export const getSlotText = (node: SlotNode): string => {
	if (typeof node === 'string' || typeof node === 'number') {
		return String(node)
	}

	if (Array.isArray(node)) {
		return node.map(getSlotText).join(' ')
	}

	if (node && node.children) {
		return getSlotText(node.children)
	}

	return ''
}
