export const getTodaysDateAsString = () => {
    return getDateAsString(new Date())
}

export const getDateAsString = (providedDate) => {
    let date = ('0' + providedDate.getDate()).slice(-2)
    let month = ('0' + providedDate.getMonth()).slice(-2)
    const formattedDate = date + "/" + month + "/" + providedDate.getFullYear().toString()
    return formattedDate
}