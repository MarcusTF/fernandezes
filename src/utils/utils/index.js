import dayjs from "dayjs"

export const colorPicker = data => {
  if (data?.when === "next") return "#ffb05c"
  else if (data?.startDate && data?.endDate) {
    const startDate = dayjs(data?.startDate, "MM/DD/YYYY").valueOf(),
      endDate = dayjs(data?.endDate, "MM/DD/YYYY").valueOf(),
      today = dayjs().valueOf()
    if (endDate < today) return "#c20e0e"
    if (startDate < today && endDate > today) return "#fffc5c"
    if (startDate > today) return "#42b52b"
    return "#c2c2c2"
  } else if (data?.date) {
    const date = dayjs(data?.startDate, "MM/DD/YYYY").valueOf(),
      today = dayjs().valueOf()
    if (date < today) return "#c20e0e"
    if (date > today) return "#42b52b"
  } else if (data?.when)
    switch (data?.when) {
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
