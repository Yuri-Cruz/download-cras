var tabela = document.querySelector('tbody');

tabela.addEventListener('click',(e)=> {
    var teste = e.target.parentNode.querySelectorAll('td')
    sessionStorage.hostName = teste[0].innerText;
    console.log(teste[0].innerText);
    window.location.href = '../dashPrincipal.html'
})