document.addEventListener('DOMContentLoaded', () => {
    let title = document.querySelector('.title');
    let music = document.querySelectorAll('.music');
    let progress = document.querySelector('#progress');
    let input = document.querySelector('#bar');
    let play = document.querySelector('#play');
    let prev = document.querySelector('#prev');
    let next = document.querySelector('#next');
    let aleaBtn = document.querySelector('#random');
    let repeatBtn = document.querySelector('#repeat');
    let timer = document.querySelector('#timer');
    let total = document.querySelector('#total')
    let mI = 0;
    let alea = false;
    let repeat = false;
    let interactingWithProgressBar = false;
    title.textContent = music[mI].dataset.name;

    window.addEventListener('load',()=>{
        total.textContent = formatTime(music[mI].duration);
        progress.setAttribute('max', music[mI].duration);
        input.setAttribute('max', music[mI].duration);
    })

    play.addEventListener('click', () => {
        if (music[mI].paused) {
            music[mI].play();
            play.innerHTML = '<iconify-icon icon="carbon:pause-filled" width="3em" height="3em"  style="color: white"></iconify-icon>';
        } else {
            music[mI].pause();
            play.innerHTML = '<iconify-icon icon="ion:play" width="3em" height="3em"  style="color: white"></iconify-icon>';
        }
        updateProgress();
    });

    prev.addEventListener('click', () => {
        if (music[mI].currentTime < 2 && mI > 0) {
            music[mI].pause();
            mI--;
            music[mI].play();
            title.textContent = music[mI].dataset.name;
        }
        music[mI].currentTime = 0;
        updateProgress();
    });

    next.addEventListener('click', () => {
        nextMusic();
    });

    input.addEventListener('change', () => {
        music[mI].currentTime = input.value;
        progress.value = input.value;
        interactingWithProgressBar = false;
    });

    input.addEventListener('input', () => {
        interactingWithProgressBar = true;
    });

    aleaBtn.addEventListener('click', () => {
        alea = !alea;
        aleaBtn.style.color = "ffffff";
        if (alea) {
            aleaBtn.style.opacity = "100%";
        } else {
            aleaBtn.style.opacity = "60%";
        }
    });

    repeatBtn.addEventListener('click', () => {
        repeat = !repeat;
        if (repeat) {
            repeatBtn.style.opacity = "100%";
        } else {
            repeatBtn.style.opacity = "50%";
        }
    });

    function nextMusic() {
        music[mI].currentTime = 0;
        music[mI].pause();
        if (alea && !repeat) {
            let rdm;
            do {
                rdm = Math.floor(Math.random() * music.length);
            } while (rdm === mI)
            mI = rdm
        } else if (!repeat) {
            if (mI < music.length - 1) {
                mI++;
            } else {
                mI = 0;
            }
        }
        music[mI].play();
        play.innerHTML = '<iconify-icon icon="carbon:pause-filled" width="3em" height="3em"  style="color: white"></iconify-icon>';
        title.textContent = music[mI].dataset.name;
        total.textContent = formatTime(music[mI].duration);
        updateProgress();
    }

    function updateProgress() {
        music[mI].addEventListener('timeupdate', () => {
            timer.textContent = formatTime(music[mI].currentTime);
            if (!interactingWithProgressBar) {
                progress.value = music[mI].currentTime;
                input.value = music[mI].currentTime;
            }
            if(music[mI].currentTime == music[mI].duration) {
                nextMusic();
            }
        });
    }
});

function formatTime(time){
    minutes = Math.floor(time / 60);
    seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}