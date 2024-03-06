const mall = document.getElementById("mallory-miller");


onscroll = e => {
    mall.style.backgroundPositionY = `${-window.scrollY/5}px`;
}