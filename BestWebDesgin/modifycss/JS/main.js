var swiper = new Swiper(".bg-slides-thumbs", {
  loop: true,
  spaceBetween: 0,
  slidesPerView: 0,
  // freeMode: true,
  // watchSlidesProgress: true,
});
  var swiper2 = new Swiper(".bg-slider", {
    loop: true,
    spaceBetween: 0,
    thumbs: {
      swiper: swiper,
    },
  });

  // effect scroll ============================

  window.addEventListener("scroll", function(){
    const header = document.querySelector("header")
    header.classList.toggle("sticky", window.scrollY > 0);
  });
  // =======================================

  const menuBtn = document.querySelector(".nav-menu-btn");
  const closeBtn = document.querySelector(".nav-close-btn");
  const navigation = document.querySelector(".navigation");

  menuBtn.addEventListener("click", () => {
      navigation.classList.add("active")
  });

  closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active")
  });

  // Back to top =======================================
  //Get the button
  let mybutton = document.getElementById("btn-back-to-top");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }
  // When the user clicks on the button, scroll to the top of the document
  mybutton.addEventListener("click", backToTop);

  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // ======= Weather ===========
  (function(d, s, id) {
    if (d.getElementById(id)) {
        if (window.__TOMORROW__) {
            window.__TOMORROW__.renderWidget();
        }
        return;
    }
    const fjs = d.getElementsByTagName(s)[0];
    const js = d.createElement(s);
    js.id = id;
    js.src = "https://www.tomorrow.io/v1/widget/sdk/sdk.bundle.min.js";

    fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'tomorrow-sdk');

// =================== Widget Music =========================

    const music = document.querySelector(".music-container"),
    musicImg = music.querySelector(".music-img-area img"),
    musicName = music.querySelector(".song-details .music-name"),
    musicArtist = music.querySelector(".song-details .music-artist"),
    mainAudio = music.querySelector("#main-audio"),
    playpauseBtn = music.querySelector(".play-pause"),
    nextBtn = music.querySelector("#next"),
    prevBtn = music.querySelector("#prev"),
    progressArea = music.querySelector(".music-progress-area"),
    progressbar = music.querySelector(".music-progress-bar");

    // let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
    let musicIndex = 1 ;
    window.addEventListener("load", ()=>{
        loadMusic(musicIndex);
    })

    //  load music function

    function loadMusic(indexNumb){
        musicName.innerText = allMusic[indexNumb - 1].name;
        musicArtist.innerText = allMusic[indexNumb - 1].artist;
        musicImg.src = `img/music/${allMusic[indexNumb - 1].img}.png`;
        mainAudio.src = `img/songs/${allMusic[indexNumb - 1].src}.mp3`;
    }

    // play music function
    function playMusic(){
        music.classList.add("paused");
        playpauseBtn.querySelector("i").innerText = "pause";
        mainAudio.play();
    }

     // pause music function
    function pauseMusic(){
        music.classList.add("paused");
        playpauseBtn.querySelector("i").innerText = "play_arrow";
        mainAudio.pause();
    }

    // Next Music function
    function nextMusic(){
        musicIndex++;
        musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
        loadMusic(musicIndex);
        playMusic();
        // playingSong();
    }

    // Next Music function
    function prevMusic(){
        musicIndex--;
        musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
        loadMusic(musicIndex);
        playMusic();
        // playingSong();
    }

    // play or music buutton event
    playpauseBtn.addEventListener("click", ()=>{
        const isMusicPaused = music.classList.contains("paused");

        isMusicPaused ? pauseMusic() : playMusic();

    });

    // next music button event
    nextBtn.addEventListener("click", ()=>{
        nextMusic();
    });

    // prev music button event
    prevBtn.addEventListener("click", ()=>{
        prevMusic();
    });

    // Update progressbar
    mainAudio.addEventListener("timeupdate", (e)=>{
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        let progressWidth = (currentTime / duration) * 100;
        progressbar.style.width = `${progressWidth}%`;
    

    let musicCurrentTime = music.querySelector(".current-time"),
        musicDuration = music.querySelector(".max-duration");
        mainAudio.addEventListener("loadeddata", ()=>{

            // upđate song total duration
            let mainAdDuration = mainAudio.duration;
            let totalMin = Math.floor(mainAdDuration / 60);
            let totalSec = Math.floor(mainAdDuration % 60);
            if (totalSec < 10){
                totalSec = `0${totalSec}`;
            }

            musicDuration.innerText = `${totalMin}:${totalSec}`;

             });  

            //  update song current duration
            let currentMin = Math.floor(currentTime / 60);
            let currentSec = Math.floor(currentTime % 60);
            if (currentSec < 10){
                currentSec = `0${currentSec}`;
            }

            musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  
    });

    // update playing song current 
    progressArea.addEventListener("click", (e)=> {
        let progressWidth = progressArea.clientWidth;
        let clickOffsetX = e.offsetX;
        let songDuration = mainAudio.duration;

        mainAudio.currentTime = (clickOffsetX / progressWidth) * songDuration;
        playMusic();

    });

    // change loop, shudfle, repeat icon onclick
    const repeatBtn = music.querySelector("#repeat-plist");
            repeatBtn.addEventListener("click", () => {
            let getText = repeatBtn.innerText;
                switch (getText) {
                    case "repeat":
                        repeatBtn.innerText = "repeat_one";
                        repeatBtn.setAttribute("title", "song looped");
                        break;

                    case "repeat_one":
                        repeatBtn.innerText = "shuffle";
                        repeatBtn.setAttribute("title", "playback shuffled");
                        break;

                    case "shuffle":
                        repeatBtn.innerText = "repeat";
                        repeatBtn.setAttribute("title", "playlist looped");
                        break;
                }
    
    });

    // above we just chảng icon
    mainAudio.addEventListener("ended", () =>{
        let getText = repeatBtn.innerText;
        switch (getText) {
            case "repeat":
                nextMusic();
                break;
            case "repeat_one":
                mainAudio.currentTime = 0;
                loadMusic(musicIndex);
                playMusic();
                break;
            case "shuffle":
                let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
                do{
                    randIndex = Math.floor((Math.random() * allMusic.length) + 1);
                } while (musicIndex == randIndex);
                musicIndex = randIndex;
                loadMusic(musicIndex);
                playMusic();
                break;
            default:
                break;
        }
    });
// =================== End Music ============================


'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

// ========================== login ========================
const wrapper = document.querySelector('.wrapper');
const loginlink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btn-head');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', ()=> {
    wrapper.classList.add('active');
});

loginlink.addEventListener('click', ()=> {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', ()=> {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', ()=> {
    wrapper.classList.remove('active-popup');
});