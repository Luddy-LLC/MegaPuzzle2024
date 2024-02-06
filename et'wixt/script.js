
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

window.onload = () => {
    document.querySelector('body').style.opacity = 1;
    document.getElementsByClassName('clouds')[0].src = '/map/assets/fast_clouds_pixleated.webp';
    document.getElementsByClassName('clouds')[0].style.opacity = 0;
    document.getElementsByClassName('region-map')[0].style.height = "100%";
}

window.transitionToPage = function(href) {
    document.getElementById('clouds').style.opacity = 1;
    document.getElementById('clouds').src = '/map/assets/clouds_pixleated_reverse_fast.webp';
    setTimeout(function() {
        document.querySelector('body').style.opacity = 0;
        setTimeout(function() { 
            window.location.href = href
        }, 500)
    }, 1000) // timeout within timeout!!!!!!   
}