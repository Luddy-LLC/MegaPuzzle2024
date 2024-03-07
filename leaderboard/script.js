const mall = document.getElementById("mallory-miller");
onscroll = e => {
    mall.style.backgroundPositionY = `${-window.scrollY/5}px`;
}

const update = document.getElementById("update");
update.innerText = "Last updated: "+date; 

const tbody = document.getElementById("tbody");

data = data.substring(2, data.length-2);
let newData = data.split("},{");
for(let i=0; i<newData.length; ++i){
    let newNewData = newData[i].substring(5);
    let newNewNewData = newNewData.split(",Num:");

    let tc = document.createElement("div");
    tc.classList.add("text-container");

    let name = document.createElement("div");
    let score = document.createElement("div");
    name.classList.add("td");
    score.classList.add("td");

    name.innerText = newNewNewData[0];
    score.innerText = newNewNewData[1];

    tc.appendChild(name);
    tc.appendChild(score);

    tbody.appendChild(tc);
}
