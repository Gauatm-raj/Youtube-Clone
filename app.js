let menuIcon=document.querySelector(".menu-icon");
let sidebar=document.querySelector(".sidebar");
let container=document.querySelector(".container");
const searchInput=document.querySelector(".search-bar");
const searchBtn = document.querySelector(".serarch-btn");

const  videoConatiner=document.querySelector(".list-container");
const  videoConatiner1=document.querySelector(".list-container1")


const API_KEY = "AIzaSyCNFFtwfi-MQL3fEO4GaAVYxfQby8X-Qzc/";

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const channelList="https://www.googleapis.com/youtube/v3/channels?";

function collapse(){
    sidebar.classList.toggle("small-sidebar");
    container.classList.toggle("large-container");
}

async function fetchVideos(searchQuery, maxResults) {
  try {
    const response = await fetch(
      BASE_URL +
        "/search" +
        `?key=${API_KEY}` +
        "&part=snippet" +
        `&q=${searchQuery}` +
        `&maxResults=${maxResults}`
    );
    const data = await response.json();
    console.log(data.items);
    data.items.forEach(item => {
        getChannelIcon(item);
    });
  } catch (e) {
    console.log(e);
  }
}
fetchVideos("",20)

const getChannelIcon=(video_data)=>{
     fetch(channelList + new URLSearchParams({
        key: API_KEY,
        part: 'snippet',
        id: video_data.snippet.channelId
     }))
     .then(res=> res.json())
     .then(data=>{
        video_data.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
        console.log(video_data);
          makeVideoCard(video_data);
     })
}

const makeVideoCard = (data)=>{
    videoConatiner.innerHTML +=`
    <div class="vid-list" >
    <a href=""><img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt=""></a>
    
    <div class="flex-div">
        <img src="${data.channelThumbnail}" alt="">
        <div class="vid-info">
            <a href="">${data.snippet.title}</a>
            <p>${data.snippet.channelTittle}</p>
            <p>15K Views &bull; 2 Days</p>
        </div>
    </div>
</div>
    `
}

// searchBtn.addEventListener('click', ()=>{
//     console.log('click',searchInput.value);
//     fetchVideos(searchInput.value,50);
// })

// function work(){
//     console.log('click',searchInput.value);
//     fetchVideos(searchInput.value,50);
// }

