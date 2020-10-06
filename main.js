'use strict';

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
const popUp = document.querySelector('.popUp');
const popUpMessage = document.querySelector('.popUp__message');



let started = false;
let timer = undefined;

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
    started = true;
}

    // 게임 시작시 실행되는 함수1 settingGame : 이미지 요소 배치하기 / 스코어나타내기 / 
function settingGame(){
    // score = 0;
    field.innerHTML = '';
    addItem('IronMan',IronManCount,'./img/IronMan.png');
    addItem('Captain',heroCount,'./img/Captain.png');
    addItem('Hulk',heroCount,'./img/Hulk.png');
    addItem('SpiderMan',heroCount,'./img/SpiderMan.png');
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

    //게임 시작시 실행되는 함수4 startGameTimer : 타이머 실행하기 
function startGameTimer(){
    let remainingTime = gameDuration;
    updateTimerText(remainingTime);
    timer = setInterval(
        ()=>{
            if(remainingTime <= 0){
                clearInterval(timer);
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

// 게임 정지시 실행되는 함수들
function stopGame(){
    stopGameTimer();
    hideGameBtn();
    showPopUpWithText();
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
function showPopUpWithText(text){
    popUp.classList.remove('popUp-hide');
    popUpMessage.innerText = text;
}