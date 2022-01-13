import dayjs from "dayjs"

export const colorPicker = stop => {
  const { time, metadata } = stop
  if (metadata?.home) return "#ff9edd"
  if (time?.when === "next") return "#ffb05c"
  else if (time?.startDate && time?.endDate) {
    const startDate = dayjs(time?.startDate, "MM/DD/YYYY").valueOf(),
      endDate = dayjs(time?.endDate, "MM/DD/YYYY").valueOf(),
      today = dayjs().valueOf()
    if (endDate < today) return "#c20e0e"
    if (startDate < today && endDate > today) return "#fffc5c"
    if (startDate > today) return "#42b52b"
    return "#c2c2c2"
  } else if (time?.date) {
    const date = dayjs(time?.startDate, "MM/DD/YYYY").valueOf(),
      today = dayjs().valueOf()
    if (date < today) return "#c20e0e"
    if (date > today) return "#42b52b"
  } else if (time?.when)
    switch (time?.when) {
      case "past":
        return "#c20e0e"
      case "current":
        return "#fffc5c"
      case "future":
        return "#42b52b"
      default:
        return "#c2c2c2"
    }
}
