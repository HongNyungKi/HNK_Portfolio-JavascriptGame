'use strict';
import PopUp from './PopUp.js';

const gameBtn = document.querySelector('.header__btn');
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();
const heroWidth = 80;
const heroHeight = 115;
const IronManCount = 5;
const heroCount = 3;
const gameTimer = document.querySelector('.header__timer');
const gameScore = document.querySelector('.header__score');
const gameDuration = 5;
const IronManSound = new Audio('./sound/IronMan_pull.mp3');
const heroSound = new Audio('./sound/hero_pull.mp3');
const gameWinSound = new Audio('./sound/game_win.mp3');
const bg = new Audio('./sound/bg.mp3');
const alert = new Audio('./sound/alert.wav');

let started = false;
let timer = undefined;
let score = 0;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(()=>{
    startGame();
    showGameBtn();
})

//게임이 시작되었다면, 중지
//게임이 시작되지 않았다면, 시작 
gameBtn.addEventListener('click',()=>{
    if(!started){
        startGame();
    }else if(started){
        stopGame();
    }
})

//게임 시작시 실행되는 함수들
function startGame(){
    settingGame();
    showStopBtn();
    showTimeAndScore();
    startGameTimer();
    playSound(bg);
    started = true;
}

    // 게임 시작시 실행되는 함수1 settingGame : 이미지 요소 배치하기 / 스코어나타내기 / 
function settingGame(){
    score = 0;
    field.innerHTML = '';
    addItem('IronMan',IronManCount,'./img/IronMan.png');
    addItem('hero',heroCount,'./img/Captain.png');
    addItem('hero',heroCount,'./img/Hulk.png');
    addItem('hero',heroCount,'./img/SpiderMan.png');
    gameScore.innerText = IronManCount;
}
function addItem(className,count,imgPath){
    const x1 = 0;
    const x2 = fieldRect.width - heroWidth;
    const y1 = 0;
    const y2 = fieldRect.height - heroHeight;
    for(let i = 0; i < count; i++){
        const item = document.createElement('img');
        item.setAttribute('class',className);
        item.setAttribute('src',imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1,x2);
        const y = randomNumber(y1,y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}
function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

    // 게임 시작시 실행되는 함수2 showStopBtn : 정지버튼 보여주기
function showStopBtn(){
    const icon = document.querySelector('.fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

    //게임 시작시 실행되는 함수3 showTimeAndScore : 스코어와 타이머 보여주기
function showTimeAndScore(){
    gameScore.style.visibility = 'visible';
    gameTimer.style.visibility = 'visible';
}

    //게임 시작시 실행되는 함수4 startGameTimer : 타이머 실행하기 + 팝업창 보여지기  + 게임 버튼 숨기기
function startGameTimer(){
    let remainingTime = gameDuration;
    updateTimerText(remainingTime);
    timer = setInterval(
        ()=>{
            if(remainingTime <= 0){
                clearInterval(timer);
                gameFinishBanner.showWithText('YOU LOSE...');
                hideGameBtn();
                playSound(heroSound);
                stopSound(bg);
                return ;
            }
            updateTimerText(--remainingTime)
        },1000
    )
}

function updateTimerText(time){
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    gameTimer.innerText = `${minutes}:${seconds}`;
}
    //게임 시작시 실행되는 함수5 playSound : 소리 추가하기(나중에 삽입)

// 게임 정지시 실행되는 함수들
function stopGame(){
    stopGameTimer();
    hideGameBtn();
    gameFinishBanner.showWithText('REPLAY?');
    stopSound(bg);
    playSound(alert);
    started = false;
}

    //게임 정지시 실행되는 함수1 stopGameTimer : 타이머 멈추기
function stopGameTimer(){
    clearInterval(timer);
}

    //게임 정지시 실행되는 함수2 hideGameBtn : 게임 버튼을 안보이게 하기
function hideGameBtn(){
    gameBtn.style.visibility = 'hidden';
}

    //게임 정지시 실행되는 함수3 showPopUpWithText : 텍스트를 삽입한 팝업창을 나타나게 하기
    //모듈화

    //리플레시 버튼 클릭시 실행되는 함수들
    //모듈화

    //리플레시 버튼 클릭시 실행되는 함수1 hidePopUp : 팝업창을 사라지게 하기
    // 모듈화

    //리플레시 버튼 클릭 시 실행되는 함수2 showGameBtn : 게임 버튼을 보이게 하기
function showGameBtn(){
    gameBtn.style.visibility = 'visible';
}

//이미지를 클릭시 실행되는 함수들
field.addEventListener('click',onFieldClick)

function onFieldClick(e){
    if(!started){
        return ;
    }
    const target = event.target;
    if(target.matches('.IronMan')){
        target.remove();
        score++;
        playSound(IronManSound);
        updateScore();
        if(score === IronManCount){
            finishGame(true);
            stopSound(bg);
        }
    } else if(target.matches('.hero')){
        stopGameTimer();
        finishGame(false);
    }
}

    //이미지 클릭시 실행되는 함수3 playSound : 이미지 클릭시 각각 다르게 소리가 나게 한다. 
    function playSound(sound){
        sound.currentTime = 0;
        sound.play();
    }
    function stopSound(sound){
        sound.pause();
    }

    //이미지 클릭시 실행되는 함수2 updateScore : 아이언맨 클릭시 스코어가 줄어듭니다.
function updateScore(){
    gameScore.innerText = IronManCount - score
}

    //이미지 클릭시 실행되는 함수3 finishGame : 아이언맨 이외의 이미지 클릭시 게임 종료 세팅하기
function finishGame(win){
    started = false;
    if(win){
       playSound(gameWinSound);
    }else{
        playSound(heroSound);
        stopSound(bg);
    }
    hideGameBtn();
    gameFinishBanner.showWithText(win? 'YOU WIN!' : 'YOU LOSE...');
    stopGameTimer();
}