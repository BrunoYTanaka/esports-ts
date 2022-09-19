export function convertMinutesToHourString(minutesAmount: number) {
  const hours = Math.floor(minutesAmount / 60)

  const minutes = minutesAmount % 60

  const hoursFormatted = String(hours).padStart(2, '0')
  const minutesFormatted = String(minutes).padStart(2, '0')

  return `${hoursFormatted}:${minutesFormatted}`
}
