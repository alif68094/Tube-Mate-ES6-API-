function blogOnClick() {
    window.location.href = 'blog.html';
}


const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const datum = await res.json();
    const data = datum.data;


    const tabContainer = document.getElementById("tab-container");


    data.forEach((datum) => {
        const div = document.createElement("div");

        div.innerHTML = `
            
            <a onclick="handleLoadCategory('${datum.category_id}')" class="tab bg-gray-300 rounded mr-1">${datum.category}</a>
            
            `;

        tabContainer.appendChild(div);
    });
};
handleCategory();





const handleLoadCategory = async (categoryId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const datum = await response.json();
    const data = datum.data;


    if (data.length == 0) {

        const cardContainer = document.getElementById("card-container");


        cardContainer.innerHTML = "";
        const div = document.createElement("div");

        div.innerHTML = `
        <img src="icon.png">
        <h1 class="font-bold text-lg">
            Oops!! Sorry, There is no content here
        </h1>
        
        `

        cardContainer.appendChild(div);

    }
    else {


        const cardContainer = document.getElementById("card-container");

        cardContainer.innerHTML = "";




        data?.forEach((datum) => {
            const div = document.createElement("div");
            div.innerHTML = `
              <div class="card bg-base-100 shadow-xl">
    
                <div class="h-[150px]">
                    <img class="w-full h-full" src=${datum?.thumbnail}/>
                </div>

                <div class="absolute ">
                    <p class="relative top-[120px] left-36 text-white bg-black p-[2px] rounded text-xs ">
                        ${timeConverter(datum?.others?.posted_date)}
                    </p>
                </div>
    
                <div class="card-body">
                    <div class="flex gap-3">
                    <img class="w-[40px] h-[40px] rounded-[50%]" src="${datum?.authors[0]?.profile_picture}">
                    <h2 class="text-base font-bold">${datum?.title}</h2>
                </div>
    
                <div class="flex gap-4">
                      <h6 class="text-gray-400">${datum?.authors[0]?.profile_name}</h6>
                      <span>${datum?.authors[0]?.verified ? "<img src=check.svg>" : ""}</span> 
                </div>
                    <h3 class="text-gray-400">${datum?.others?.views} Views</h3>
              </div>
            </div>
              
              `;

            cardContainer.appendChild(div);





        });
    };
}



handleLoadCategory("1000");

function timeConverter(num){

    if(num > 0){
        const hours = Math.floor(num / 60);  
    const minutes = num % 60;
    return hours + " " + "hours" + " " + minutes + " " + "minutes" + " " + "ago" ;
    }
    else{
        return "";
    }
    
}