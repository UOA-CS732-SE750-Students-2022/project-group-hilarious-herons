export const getTodaysDateAsString = () => {
    return getDateAsString(new Date())
}

export const getDateAsString = (providedDate) => {
    let date = ('0' + providedDate.getDate()).slice(-2)
    let month = ('0' + (providedDate.getMonth() + 1)).slice(-2)
    const formattedDate = date + "/" + month + "/" + providedDate.getFullYear().toString()
    return formattedDate
}

export const formatLocaleString = (localeDateString) => {
    let splitString = localeDateString.split("/")
    let month = splitString[0]
    let day = splitString[1]
    let year = splitString[2]
    if (month.length === 1) {
        month = "0" + month
    }
    if (day.length === 1) {
        day = "0" + day
    }
    return day + "/" + month + "/" + year
}

export const getTimestampFromId = (id) => {
    let timestamp = id.toString().substring(0, 8)
    let date = new Date(parseInt(timestamp, 16) * 1000)
    let formattedDate = formatLocaleString(date.toLocaleDateString())
    return formattedDate
}