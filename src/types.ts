export type Document = {
	title: string,
	documentId: string,
	diagrams: Diagram[]
}

export type Diagram = {
	valid: boolean,
	data?: Record<string, string | boolean>,
	url?: string,
}
