import express from 'express'
import cors from 'cors'
import { XMLParser } from 'fast-xml-parser'

const app = express()
const PORT = 3001

const limit = 25

app.use(cors())
app.use(express.json())

app.get('/search', async (req, res) => {
	const term = req.query.term

	try {
		const response = await fetch(
			`https://itunes.apple.com/search?term=${term}&media=podcast&attribute=titleTerm&limit=${limit}`
		)
		const data = await response.json()
		res.json(data)
	} catch (err) {
		res.status(500).json({ error: 'Failed to fetch podcast data' })
	}
})

app.get('/podcast/:id', async (req, res) => {
	const id = req.params.id

	try {
		const response = await fetch(`https://itunes.apple.com/lookup?id=${id}`)
		const data = await response.json()
		const podcastDetails = data.results[0]

		const rssRes = await fetch(podcastDetails.feedUrl)
		const rssText = await rssRes.text()

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: '@_',
		})
		const parsedRSS = parser.parse(rssText)
		let episodes = parsedRSS.rss?.channel?.item

		episodes = Array.isArray(episodes) ? episodes : [episodes]

		const normalizedEpisodes = episodes.map((episode: any) => ({
			title: episode.title,
			description: episode.description,
			pubDate: episode.pubDate,
			guidId: episode.guid?.['#text'] || null,
		}))

		res.json({
			episodes: normalizedEpisodes,
			info: podcastDetails,
		})
	} catch (err) {
		console.error('Error fetching podcast data:', err)
		res.status(500).json({ error: 'Failed to fetch episode data' })
	}
})

app.listen(PORT, () => {
	console.log(`Backend running at http://localhost:${PORT}`)
})
