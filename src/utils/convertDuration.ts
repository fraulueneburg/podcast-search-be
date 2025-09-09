export function convertDuration(value: any) {
	const rawDuration = value
	let duration

	if (typeof rawDuration === 'number') {
		const secondsTotal = rawDuration
		const secondsPerHour = 3600
		const hours = Math.floor(secondsTotal / secondsPerHour)
		const minutes = Math.floor((secondsTotal % secondsPerHour) / 60)
		const seconds = secondsTotal % 60
		duration = `${hours > 0 ? `${hours}h ` : ''}${minutes > 0 ? `${minutes}m` : `${minutes}:${seconds}m`}`.trim()
	} else {
		duration = rawDuration
	}

	return duration
}
