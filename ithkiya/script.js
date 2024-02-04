const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('body').style.opacity = 1;
    document.getElementsByClassName('clouds')[0].style.opacity = 0;
    document.getElementsByClassName('region-map')[0].style.height = "100%";
    document.getElementsByClassName('cloud-background')[0].style.height = "100%";
}) 