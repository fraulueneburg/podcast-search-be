import sanitizeHtml from 'sanitize-html'

export function sanitizeHtmlString(html: string): string {
	return sanitizeHtml(html, {
		allowedTags: ['strong', 'b', 'em', 'i', 'a', 'p', 'ul', 'ol', 'li', 'br'],
		allowedAttributes: {
			a: ['href', 'target', 'rel'],
		},
		transformTags: {
			h1: 'strong',
			h2: 'strong',
			h3: 'strong',
			h4: 'strong',
			h5: 'strong',
			h6: 'strong',
		},
	})
}
