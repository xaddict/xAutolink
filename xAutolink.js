/**
 * @param {string} text
 * @param {object} options Attributes for the links, or an optional callback function that accepts `url`
 * @param {string} [options.target] A target for the link
 * @param {string} [options.rel] A rel for the link
 * @param {string} [options.callback] A callback function that accepts `url` and returns the linkified string
 * @returns {string} The text with urls replaced by links
 */
export default function xAutolink(text = '', options = {}) {
	const pattern = /(^|[\s\n]|<[A-Za-z]*\/?>)((?:https?|ftp):\/\/[-A-Z0-9+\u0026\u2019@#/%?=()~_|!:,.;]*[-A-Z0-9+\u0026@#/%=~()_|])/gi

	if (Object.keys(options).length === 0) {
		return text.replace(pattern, '$1<a href=\'$2\'>$2</a>')
	}

	const linkAttributes = (function () {
		const results = []
		for (const key in options) {
			if (key === 'callback') { continue }
			results.push(`${key}='${options[key]}'`)
		}
		return results
	})().join(' ')

	return text.replace(pattern, function (match, space, url) {
		const link = (typeof options.callback === 'function' ? options.callback(url) : void 0) || (`<a href='${url}' ${linkAttributes}>${url}</a>`)
		return '' + space + link
	})
}
