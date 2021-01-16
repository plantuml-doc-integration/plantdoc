export interface Document {
	title: string,
	documentId: string,
	diagrams: Diagram[]
}

export interface Diagram {
	valid: boolean,
	data?: Record<string, string | boolean>,
	url?: string,
}
