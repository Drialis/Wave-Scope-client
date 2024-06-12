export const wasItAddedToday = (dayOfAddition) => {

    const creationDate = new Date(dayOfAddition)
    const now = new Date()
    const dayInMillis = 1000 * 60 * 60 * 24

    const addedToday = now.getTime() - creationDate.getTime() < dayInMillis

    return addedToday

}