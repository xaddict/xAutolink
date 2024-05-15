import xAutolink from './xAutolink.js'
import { describe, expect, it } from 'vitest'

describe('xAutolink', () => {
	it('replaces urls with links', () => {
		expect(xAutolink()).toBe('')
		expect(xAutolink('http://example.com'))
			.toBe('<a href=\'http://example.com\'>http://example.com</a>')
		expect(xAutolink('visit my site: http://example.com'))
			.toBe('visit my site: <a href=\'http://example.com\'>http://example.com</a>')
	})

	it('supports setting attributes', () => {
		expect(xAutolink('http://example.com', { target: '_blank' }))
			.toBe('<a href=\'http://example.com\' target=\'_blank\'>http://example.com</a>')
		expect(xAutolink('http://example.com', { target: '_blank', rel: 'noopener noreferrer' }))
			.toBe('<a href=\'http://example.com\' target=\'_blank\' rel=\'noopener noreferrer\'>http://example.com</a>')
	})

	it('supports a custom callback', () => {
		const callback = function (url) {
			return /\.(gif|png|jpe?g)$/i.test(url) ? `<img src='${url}'>` : null
		}

		expect(xAutolink('http://example.gif', { callback }))
			.toBe('<img src=\'http://example.gif\'>')

		expect(xAutolink('http://example.png', { callback }))
			.toBe('<img src=\'http://example.png\'>')

		expect(xAutolink('http://example.jpg', { callback }))
			.toBe('<img src=\'http://example.jpg\'>')

		expect(xAutolink('http://example.jpeg', { callback }))
			.toBe('<img src=\'http://example.jpeg\'>')
	})
})
