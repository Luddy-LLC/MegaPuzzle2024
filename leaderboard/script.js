const mall = document.getElementById("mallory-miller");
onscroll = e => {
    mall.style.backgroundPositionY = `${-window.scrollY/5}px`;
}

// const tbody = document.getElementById("tbody");

// data = data.substring(2, data.length-2);
// let newData = data.split("},{");
// for(let i=0; i<newData.length; ++i){
//     let newNewData = newData[i].substring(5);
//     let newNewNewData = newNewData.split(",Num:");

//     let tr = document.createElement("tr");
//     let name = document.createElement("td");
//     let score = document.createElement("td");

//     name.innerText = newNewNewData[0];
//     score.innerText = newNewNewData[1];

//     tr.appendChild(name);
//     tr.appendChild(score);

//     tbody.appendChild(tr);
// }
