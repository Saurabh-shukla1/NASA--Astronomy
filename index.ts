import { writeFileSync } from "node:fs"

const getData = async () => {
    const url = "https://api.nasa.gov/planetary/apod?api_key=Xi8NOs3v7Ogxe2Edj2U3v0HHkgR9EcfATmIgepkA"

    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}

const currentDate = new Date()
const day = currentDate.getDate()

let daySuffix
if(day == 1 || day == 21 || day == 31) {
    daySuffix = "st"
} else if(day == 2 || day == 22) {
    daySuffix = "nd"
} else if(day == 3 || day == 23) {
    daySuffix = "rd"
} else {
    daySuffix = "th"
}

const formattedDate = `${day}${daySuffix}`


const upadateReadme = async (data: any) => {
    const dateFormatter = new Intl.DateTimeFormat('en-us', {
        dateStyle: 'long'
    })

    const timeStamp = new Date().toLocaleDateString();

    const content = `
    # Astronomy Picture of the Day - ${formattedDate}

 Discover the wonders of the universe with NASA's Astronomy Picture of the Day (APOD). Each day, a new image or photograph of our fascinating cosmos is featured, accompanied by a brief explanation written by a professional astronomer.

![NASA APOD](${data.url})

## ${data.title}

${formattedDate}

## Explanation:

${
    data && data.explanation
    ? data.explanation.split('NASA Coverage').join('NASA Coverage')
    : "No explanation available."
}

>_Updated on: ${timeStamp} (in GMT)_

    `
    writeFileSync("README.md", content.trim())
}

const main = async () => {
    try {
        const data = await getData()
        await upadateReadme(data)
    } catch (error) {
        console.error("Error in main execution:", error)
    }
}

main()