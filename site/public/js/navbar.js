function teste() {
    apagaGrafico();
    menu()
    setTimeout(() => {
        plotaGrafico(dataCpuGlobal, dataRamGlobal)
    }, 100);
}

function menu() {

    if (!document.getElementById('check').checked) {
        document.getElementById('check').click();
        document.getElementById('check').checked = false;
        document.getElementById('navbar').style.transition = "all .1s";
        document.getElementById('navbar').style.width = '20%';
        document.getElementById('ulIcon').style.display = 'none';
        document.getElementById('ulTexto').style.display = 'flex';
        document.getElementById('icone').style.display = 'none';
        document.getElementById('logoGrande').style.display = 'flex';
        document.getElementById('main').style = `width: 80%; height: fit-content; flex-direction: column;`;
        document.getElementById('gauge1').style = `width: 80%; height: 80%;`;
        document.getElementById('gauge2').style = `width: 80%; height: 80%;`;
        document.getElementById('background-gauge1').style = `width: 100%; height: 300px;`;
        document.getElementById('background-gauge2').style = `width: 100%; height: 300px;`;
        document.getElementById('ds').style = `width: 80%; color: #ffffffad`;
        document.getElementById('trueMain').style = `margin-left: 215px`;



    } else {
        document.getElementById('check').checked = true;
        document.getElementById('navbar').style.transition = "all .1s";
        document.getElementById('navbar').style.width = '5%';
        document.getElementById('ulIcon').style.display = 'flex';
        document.getElementById('ulTexto').style.display = 'none';
        document.getElementById('icone').style.display = 'flex';
        document.getElementById('logoGrande').style.display = 'none';
        document.getElementById('main').style = `width: 95%;`;
        document.getElementById('gauge1').style = `width: 85%; height: 80%;`;
        document.getElementById('gauge2').style = `width: 85%; height: 80%;`;
        document.getElementById('background-gauge1').style = `width: 81%; height: 500px;`;
        document.getElementById('background-gauge2').style = `width: 81%; height: 500px;`;
        document.getElementById('ds').style = `width: 69%`;
        document.getElementById('trueMain').style = `margin-left: 68px`;


    }
};

function menu2() {

    if (!document.getElementById('check').checked) {
        document.getElementById('check').click();
        document.getElementById('check').checked = false;
        document.getElementById('navbar').style.transition = "all .1s";
        document.getElementById('navbar').style.width = '20%';
        document.getElementById('ulIcon').style.display = 'none';
        document.getElementById('ulTexto').style.display = 'flex';
        document.getElementById('icone').style.display = 'none';
        document.getElementById('logoGrande').style.display = 'flex';
        document.getElementById('configuracoes').style = 'width: 90%;';
        document.getElementById('container-config').style = `align-items: flex-end;`;


    } else {
        document.getElementById('check').checked = true;
        document.getElementById('navbar').style.transition = "all .1s";
        document.getElementById('navbar').style.width = '5%';
        document.getElementById('ulIcon').style.display = 'flex';
        document.getElementById('ulTexto').style.display = 'none';
        document.getElementById('icone').style.display = 'flex';
        document.getElementById('logoGrande').style.display = 'none';
        document.getElementById('configuracoes').style = 'width: 100%;';
        document.getElementById('container-config').style = `align-items: center;`;

    }
};

function menu3() {

    if (!document.getElementById('check').checked) {
        document.getElementById('check').click();
        document.getElementById('check').checked = false;
        document.getElementById('navbar').style.transition = "all .1s";
        document.getElementById('navbar').style.width = '20%';
        document.getElementById('ulIcon').style.display = 'none';
        document.getElementById('ulTexto').style.display = 'flex';
        document.getElementById('icone').style.display = 'none';
        document.getElementById('logoGrande').style.display = 'flex';
        document.getElementById('boxMapa').style = 'width: 93%;';
        document.getElementById('boxMapa').style = 'justify-content: flex-end;';
        document.getElementById('boxLista').style = `width: 90%; justify-content: flex-end;`;


    } else {
        document.getElementById('check').checked = true;
        document.getElementById('navbar').style.transition = "all .1s";
        document.getElementById('navbar').style.width = '5%';
        document.getElementById('ulIcon').style.display = 'flex';
        document.getElementById('ulTexto').style.display = 'none';
        document.getElementById('icone').style.display = 'flex';
        document.getElementById('logoGrande').style.display = 'none';
        document.getElementById('boxMapa').style = 'width: 90%;';
        document.getElementById('boxMapa').style = 'justify-content: center;';
        document.getElementById('boxLista').style = `width: 90%; justfy-content: center;`;
    }
};

function apagaGrafico() {
    container.innerHTML = ""
}

function sair() {
    sessionStorage.hostName = "";
    sessionStorage.cnpj = "";
    window.location.href = "Login.html";
}

function sairDash() {
    sessionStorage.hostName = "";
    sessionStorage.cnpj = "";
    window.location.href = "dashGeral.html";
}