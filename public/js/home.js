function login(){
    window.alert("Por favor, faça login primeiro!");
}

function fav(){
    document.querySelector('#favoritos').classList.remove('none')
    document.querySelector('#favoritos').classList.add('favoritostb')
}
function out(){
    document.querySelector('#favoritos').classList.remove('favoritostb')
    document.querySelector('#favoritos').classList.add('none')
}