const newsImage = document.querySelectorAll('.news-image'),
    title = document.querySelectorAll('.news-title'),
    uploadDate = document.querySelectorAll('.time-news-uploaded');


const getData = async (url) => {
    const response = await fetch(url)
    const jsonData = await response.json()
    console.log(jsonData[0])
    displayData(jsonData)
}

getData('https://fuel-review-api.onrender.com/')

const displayData = (data) => {
    newsImage.forEach((element, index) => {
        element.src = data[index].imgURL
    })
    title.forEach((element, index) => {
        element.innerHTML = data[index].title
    })
    uploadDate.forEach((element, index) => {
        element.innerHTML = data[index].date
        
    })
}