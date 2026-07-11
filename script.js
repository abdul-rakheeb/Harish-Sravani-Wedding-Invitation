const weddingDate = new Date("November 26, 2026 09:30:00").getTime();

setInterval(function(){
    const now = new Date().getTime();
    const distance = weddingDate - now;
    const days = Math.floor(distance/(1000*60*60*24));
    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
    const seconds = Math.floor((distance%(1000*60))/1000);

    document.getElementById("days").innerHTML=days;
    document.getElementById("hours").innerHTML=hours;
    document.getElementById("minutes").innerHTML=minutes;
    document.getElementById("seconds").innerHTML=seconds;
},1000);

const enterButton = document.getElementById("enter-btn");
const music = document.getElementById("bgMusic");

enterButton.addEventListener("click", function () {

    const welcome = document.getElementById("welcome-screen");

    // Disable the button so it can't be tapped twice
    enterButton.disabled = true;

    // Give immediate feedback
    enterButton.innerHTML = "Opening...";

    // Start fade-out
    welcome.style.opacity = "0";

    // Hide after the fade animation
    setTimeout(function () {
        welcome.style.display = "none";
    }, 500);

    // Try to play music
    music.play().catch(function () {
        console.log("Music playback was blocked.");
    });

});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle){
    menuToggle.addEventListener("click",function(){
        navLinks.classList.toggle("active");
    });
}
const musicButton = document.getElementById("music-btn");
musicButton.addEventListener("click", function(){

    if(music.paused){

        music.play().catch(() => {});

        musicButton.innerHTML="🔊";

    }else{

        music.pause();

        musicButton.innerHTML="🔇";

    }

});
// ===========================
// Gallery Lightbox
// ===========================

const galleryImages = document.querySelectorAll(".gallery-container img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");

galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
});

