const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const WEEK = DAY * 7

export const formatDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }

  return new Date(date).toLocaleDateString("en-US", options)
}

export const calculateDeltaTime = (date) => {
  const deltaTime = new Date() - new Date(date)
  const weeks = Math.floor(deltaTime / WEEK)

  if (weeks > 0) {
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`
  }

  const days = Math.floor(deltaTime / DAY)

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`
  }

  const hours = Math.floor(deltaTime / HOUR)

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  }

  const minutes = Math.floor(deltaTime / MINUTE)

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  }

  const seconds = Math.floor(deltaTime / SECOND)

  if (seconds === 0) {
    return "just now"
  }

  return `${seconds} second${seconds > 1 ? "s" : ""} ago`
}
