function cad(){
    document.querySelector('#cad').classList.remove('none')
    document.querySelector('#cad').classList.add('cad')
}
function fechacad(){
    document.querySelector('#cad').classList.remove('cad')
    document.querySelector('#cad').classList.add('none')
    document.querySelector('.logininput').value=""
    document.querySelector('.logininput1').value=""
    document.querySelector('.logininput2').value=""
    document.querySelector('.logininput3').value=""
    document.querySelector('.logininput4').value=""
}
function log(){
    document.querySelector('#cad').classList.remove('cad')
    document.querySelector('#cad').classList.add('none')
    document.querySelector('#log').classList.remove('none')
    document.querySelector('#log').classList.add('login')
}
function fechalog(){
    document.querySelector('#log').classList.remove('login')
    document.querySelector('#log').classList.add('none')
    document.querySelector('.logininput').value=""
    document.querySelector('.logininput1').value=""
    document.querySelector('.logininput2').value=""
    document.querySelector('.logininput3').value=""
    document.querySelector('.logininput4').value=""
}