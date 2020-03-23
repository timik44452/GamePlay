var signInOverlay;

window.onmousedown = function(event){
    if(event.target == this.signInOverlay){
        this.closeSignIn();
    }
}

function showSignIn(){
    if(signInOverlay){
        signInOverlay.style.display = 'block';
    }else{
        getTemplate('signin_form.html', () => {
            document.body.innerHTML += getHTML();
            signInOverlay = document.getElementById('overlay');
        });
    }
    
}

function closeSignIn(){
    if(signInOverlay){
        signInOverlay.style.display = 'none';
    }
}