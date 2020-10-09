'use strict';

export default class PopUp{
    constructor(){
        this.popUp = document.querySelector('.popUp');
        this.popUpMessage = document.querySelector('.popUp__message');
        this.popUpRefresh = document.querySelector('.popUp__refresh-btn');
        this.popUpRefresh.addEventListener('click',()=>{
            this.onClick && this.onClick();
            this.hide();
        })
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }

    hide(){
        this.popUp.classList.add('popUp-hide');
    }

    showWithText(text){
        this.popUp.classList.remove('popUp-hide');
        this.popUpMessage.innerText = text;
    }
}