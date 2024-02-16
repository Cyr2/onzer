let title = document.querySelector('.title');
let music = document.querySelectorAll('.music');
let progress = document.querySelector('#progress');
let input = document.querySelector('#bar');
let play = document.querySelector('#play');
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');
let mI = 0;

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
    if(mI < music.length - 1) {
        music[mI].currentTime = 0;
        music[mI].pause();
        mI++;
        music[mI].play();
        title.textContent = music[mI].dataset.name
        updateProgress()
    }
})

input.addEventListener('change', ()=>{
    music[mI].currentTime = input.value;
    progress.value = input.value;
})

function updateProgress() {
    progress.setAttribute('max', music[mI].duration);
    input.setAttribute('max', music[mI].duration);
    music[mI].addEventListener('timeupdate', () => {
        progress.value = music[mI].currentTime;
        input.value = music[mI].currentTime;
    });
}