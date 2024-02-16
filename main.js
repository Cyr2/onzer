let title = document.querySelector('.title');
let music = document.querySelectorAll('.music');
let progress = document.querySelector('#progress');
let input = document.querySelector('#bar');
let play = document.querySelector('#play');
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');
let aleaBtn = document.querySelector('#random');
let repeatBtn = document.querySelector('#repeat');
let mI = 0;
let alea = false;
let repeat = false;
let interactingWithProgressBar = false;

window.addEventListener("load", () => {
    title.textContent = music[mI].dataset.name
    updateProgress()
});

play.addEventListener('click', ()=>{
    if(music[mI].paused){
        music[mI].play();
        play.innerHTML = '<iconify-icon icon="carbon:pause-filled" width="3em" height="3em"  style="color: white"></iconify-icon>';
    }else{
        music[mI].pause();
        play.innerHTML = '<iconify-icon icon="ion:play" width="3em" height="3em"  style="color: white"></iconify-icon>';
    }
})

prev.addEventListener('click', ()=>{
    if(music[mI].currentTime < 2 && mI > 0) {
        music[mI].pause();
        mI--;
        music[mI].play();
        title.textContent = music[mI].dataset.name
    }
    music[mI].currentTime = 0;
    updateProgress()
})

next.addEventListener('click', ()=>{
    nextMusic();
})

input.addEventListener('change', ()=>{
    music[mI].currentTime = input.value;
    progress.value = input.value;
    interactingWithProgressBar = false;
})

input.addEventListener('input', () => {
    interactingWithProgressBar = true;
});

aleaBtn.addEventListener('click',()=>{
    alea = !alea;
    aleaBtn.style.color = "ffffff"
    if(alea) {
        aleaBtn.style.opacity = "100%"
    } else {
        aleaBtn.style.opacity = "60%"
    }
})
repeatBtn.addEventListener('click',()=>{
    repeat = !repeat;
    if(repeat) {
        repeatBtn.style.opacity = "100%"
    } else {
        repeatBtn.style.opacity = "50%"
    }
})

function nextMusic(){
    music[mI].currentTime = 0;
    music[mI].pause();
    if(alea && !repeat) {
       mI = Math.floor(Math.random() * music.length);
    } else if(!repeat) {
        if(mI < music.length - 1) {
            mI++;
        } else {
            mI = 0;
        }
    }
    music[mI].play();
    title.textContent = music[mI].dataset.name
    updateProgress()
}

function updateProgress() {
    progress.setAttribute('max', music[mI].duration);
    input.setAttribute('max', music[mI].duration);
    music[mI].addEventListener('timeupdate', () => {
        if(!interactingWithProgressBar) {
            progress.value = music[mI].currentTime;
            input.value = music[mI].currentTime;
        }
    });
}