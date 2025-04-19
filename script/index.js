// Get The Time From Calculating Some Formula

function getTime(time) {
    const hour = parseInt(time / 3600);
    const waitMin = time % 3600;
    const min = parseInt(waitMin / 60);
    const sec = waitMin % 60;
    return `${hour} Hour ${min} Min ${sec} Sec`;
}

// Load The Data Button From Api

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((err) => console.log(err))
}

// Load Videos Category

const loadVideos = (input = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${input}`)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch((err) => console.log(err))
}

// Dynamically Search Anything By The Function

document.getElementById("input-field").addEventListener("keyup", (e) => {
    loadVideos(e.target.value);
});

// Load Category Based Videos Api

const loadCategoriesVideo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            activeBtnCategories();
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add('active')
            displayVideos(data.category);
        })
        .catch((err) => console.log(err))
}

// Adding Active Button Color

const activeBtnCategories = () => {
    const buttons = document.getElementsByClassName('btn-color');
    for (const btn of buttons) {
        btn.classList.remove('active');
    }
}

// Load Modal Details Here

const loadDetails = (video) => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${video}`)
        .then(res => res.json())
        .then(data => displayDetails(data.video))
        .catch((err) => console.log(err))
}

// Display The Data Button Here

const displayCategories = (categories) => {
    const btnCategory = document.getElementById("btnContainer");
    categories.forEach((item) => {
        const btnContainer = document.createElement("div");
        btnContainer.innerHTML = `
        <button id="btn-${item.category_id}" onclick="loadCategoriesVideo(${item.category_id})" class="btn btn-color btn-sm md:btn-xl">${item.category}</button>
        `;
        btnCategory.appendChild(btnContainer);
    })
}

// Display Videos Category Here

const displayVideos = (videos) => {
    const videosContainer = document.getElementById("videoContainer");
    videosContainer.innerHTML = "";
    if (videos.length === 0) {
        videosContainer.classList.remove('grid');
        videosContainer.innerHTML = `
        <div class="flex flex-col gap-4 md:gap-8 mt-10 md:mt-20 lg:mt-40 items-center justify-center">
            <img class="h-20 md:h-44" src="assets/Icon.png" />
            <h2 class="text-base md:text-2xl font-extrabold">No videos found in this Category</h2>
        </div>
        `;
        return;
    }
    else {
        videosContainer.classList.add('grid')
    }
    videos.forEach((video) => {
        const div = document.createElement("div");
        div.classList = "card card-compact relative shadow-xl";
        div.innerHTML = `
            <figure class="h-72 relative">
                <img
                src=${video.thumbnail} class="w-full h-full object-cover" alt="" />
                ${video.others.posted_date?.length === 0 ? "" : `<span class="absolute right-4 bottom-2 bg-black rounded text-white text-lg px-2">${getTime(video.others.posted_date)}</span>`}
            </figure>
            <div class="flex px-0 py-3 gap-4">
                <div>
                    <img class="w-12 h-12 rounded-full object-cover" src="${video.authors[0].profile_picture}" alt=""/>
                </div>
                <div class="space-y-1">
                    <h2 class="font-bold">${video.title}</h2>
                    <div class="flex gap-2 items-center">
                        <p class="text-gray-400 text-xs">${video.authors[0].profile_name}</p>
                        ${video.authors[0].verified === true ? `<img class="w-4" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png" alt=""/>` : ""}
                    </div>
                    <p class="text-gray-400 text-xs mb-5">${video.others.views} views</p>
                </div>
            </div>
            <div class="absolute right-4 bottom-3">
                <button onclick="loadDetails('${video.video_id}')" class="btn font-bold active">Details</button>
            </div>
        `;
        videosContainer.append(div);
    })
}

// Display Modal Details Here

const displayDetails = (video) => {
    const showModal = document.getElementById("showModalData");
    showModal.innerHTML = `
    <img src=${video.thumbnail} class="w-full rounded-lg h-full object-cover" alt="" />
    <div>
        <h2 class="text-lg font-bold mt-5">Video Description:</h2>
        <p class="text-gray-500">${video.description}</p>
    </div>
    `
    document.getElementById("modalData").click();
}

// Call The Function

loadCategories();
loadVideos()