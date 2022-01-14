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

export const getBounds = coords =>
  coords?.reduce?.(
    (acc, cur) => {
      return [
        Math.min(acc[0], cur?.lng),
        Math.min(acc[1], cur?.lat),
        Math.max(acc[2], cur?.lng),
        Math.max(acc[3], cur?.lat),
      ]
    },
    [coords?.[0]?.lng || 0, coords?.[0]?.lat || 0, coords?.[0]?.lng || 0, coords?.[0]?.lat || 0]
  )

export const prettyCoords = stop => {
  const coords = stop?.location?.coords,
    ns = coords?.lat >= 0 ? "N" : "S",
    ew = coords?.lng >= 0 ? "E" : "W",
    { lat, lng } = coords
  return `${Math.abs(lat)}°${ns}, ${Math.abs(lng)}°${ew}`
}
