let formatFirstname = (firstname) => {
    let firstnames = firstname.split(' ')
    let _ = firstnames.map(one => `${one.substring(0, 1).toUpperCase()}${one.substring(1)}`)
    return _.join(" ")
}

module.exports = {
    formatFirstname
}