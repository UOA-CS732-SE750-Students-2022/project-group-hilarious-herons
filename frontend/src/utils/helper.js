export const getTodaysDateAsString = () => {
    const currentDate = new Date()
    let dateVal = currentDate.getDate().toString()
    let date = currentDate.getDate().toString()
    if (dateVal < 10) {
        date = "0" + month
    }
    let monthVal = currentDate.getMonth()
    let month = currentDate.getMonth().toString()
    if (monthVal < 10) {
        month = "0" + month
    }
    const formattedDate = date + "/" + month + "/" + currentDate.getFullYear().toString()
    return formattedDate
}

export const getDateAsString = (providedDate) => {
    let dateVal = providedDate.getDate().toString()
    let date = providedDate.getDate().toString()
    if (dateVal < 10) {
        date = "0" + month
    }
    let monthVal = providedDate.getMonth()
    let month = providedDate.getMonth().toString()
    if (monthVal < 10) {
        month = "0" + month
    }
    const formattedDate = date + "/" + month + "/" + providedDate.getFullYear().toString()
    return formattedDate
}