//converts a number to base 62
exports.toShort = function(numeric_id) {
    
    const base62_id = intoArray(numeric_id)
    const key = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    let shortUrl = ''

    base62_id.forEach(element => {
        shortUrl += key[element]
    });

    return shortUrl
}

// Converts a number into an array based on
// https://stackoverflow.com/questions/742013/how-do-i-create-a-url-shortener?answertab=votes#tab-top
function intoArray(id){

    let newUrl = []
    let remainder = 0

    while(id > 0){
        remainder = id % 62
        newUrl.push(remainder)
        id = Math.floor(id / 62)
    }

    // Adds additional empty elements to ensure a 3 digit value
    while(newUrl.length < 3){
        newUrl.push(0)
    }
    newUrl.reverse()
    
    return newUrl
}