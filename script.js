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
    enterButton.style.background = "#FFD700";
    enterButton.style.color = "#000";
    enterButton.style.borderColor = "#FFD700";
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
// ===========================
// Scroll Animation
// ===========================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.2
});

sections.forEach((section)=>{
    section.classList.add("hidden");
    observer.observe(section);
});
// ===========================
// Active Navigation
// ===========================

const sectionsNav = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sectionsNav.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        if(window.scrollY >= sectionTop){
            current = section.getAttribute("id");
        }

    });

    navItems.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){
            link.classList.add("active");
        }

    });

});
// ===========================
// Falling Flower Petals
// ===========================

const flowerContainer = document.getElementById("flower-container");

function createFlower() {

    const flower = document.createElement("div");

    flower.classList.add("flower");

    flower.innerHTML = "🌸";

    flower.style.left = Math.random() * 100 + "vw";

    flower.style.fontSize = (18 + Math.random() * 18) + "px";

    flower.style.animationDuration = (6 + Math.random() * 5) + "s";

    flowerContainer.appendChild(flower);

    setTimeout(() => {
        flower.remove();
    }, 11000);

}

setInterval(createFlower, 800);
// ===========================
// Floating Hearts
// ===========================

const heartContainer = document.getElementById("heart-container");

function createHeart() {

    const heart = document.createElement("div");

    heart.classList.add("floating-heart");

    heart.innerHTML = "💖";

    heart.style.left = Math.random() * 100 + "%";

    heart.style.fontSize = (15 + Math.random() * 20) + "px";

    heart.style.animationDuration = (6 + Math.random() * 4) + "s";

    heartContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);

}
setInterval(createHeart, 500);

// ===========================
// Scratch Card
// ===========================

const canvas = document.getElementById("scratchCanvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        ctx.globalCompositeOperation = "source-over";

        // Gold scratch layer
        ctx.fillStyle = "#2c0ec1";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 24px Poppins";
        ctx.textAlign = "center";
        ctx.fillText("Scratch Here ✨", canvas.width / 2, canvas.height / 2);
    }

    resizeCanvas();
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    window.addEventListener("resize", resizeCanvas);

    let scratching = false;

    function scratch(x, y) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, 55, 0, Math.PI * 2);
        ctx.fill();
    }

    // Desktop
    canvas.addEventListener("mousedown", () => scratching = true);

    canvas.addEventListener("mouseup", () => scratching = false);

    canvas.addEventListener("mousemove", (e) => {
        if (!scratching) return;

        const rect = canvas.getBoundingClientRect();

        scratch(
            e.clientX - rect.left,
            e.clientY - rect.top
        );
    });

    // Mobile
    canvas.addEventListener("touchstart", () => scratching = true);

    canvas.addEventListener("touchend", () => scratching = false);

    canvas.addEventListener("touchmove", (e) => {

        e.preventDefault();

        if (!scratching) return;

        const rect = canvas.getBoundingClientRect();

        const touch = e.touches[0];

        scratch(
            touch.clientX - rect.left,
            touch.clientY - rect.top
        );

    }, { passive: false });

}