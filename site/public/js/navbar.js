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
        document.getElementById('main').style = `width: 95%; height: 100vh; flex-direction: column;`;
        document.getElementById('boxCima').style = `border-radius: 15px; width: 86%; height: 37%; flex-direction: row; justify-content: space-around; background:rgb(49, 49, 49)`;
        document.getElementById('boxGraph').style = `width: 91%; height: 83%; display: flex; justify-content: center;`;
        document.getElementById('gauge1').style = `width: 100%; height: 100%;`;
        document.getElementById('gauge2').style = `width: 100%; height: 100%;`;
        document.getElementById('background-gauge1').style = `width: 34.5%; height: 86%;`;
        document.getElementById('background-gauge2').style = `width: 34.5%; height: 86%;`;
        document.getElementById('background-grafico').style = `width: 86%; height: 57%; background:rgb(49, 49, 49)`;
        document.getElementById('logo').style = `display:block; height: 140px`;
        document.getElementById('ds').style = `width: 82%; background:rgb(49, 49, 49); color: #ffffffad`;
        document.getElementById('trueMain').style = `margin-left: 270px`;



    } else {
        document.getElementById('check').checked = true;
        document.getElementById('navbar').style.transition = "all .1s";
        document.getElementById('navbar').style.width = '5%';
        document.getElementById('ulIcon').style.display = 'flex';
        document.getElementById('ulTexto').style.display = 'none';
        document.getElementById('icone').style.display = 'flex';
        document.getElementById('logoGrande').style.display = 'none';
        document.getElementById('main').style = `width: 95%; height: 100vh; flex-direction: row; justify-content: space-evenly;`;
        document.getElementById('boxCima').style = `width: 30%; height: 90%; flex-direction: column; justify-content: space-around;`;
        document.getElementById('boxGraph').style = ` width: 90%; height: 80%;`;
        document.getElementById('gauge1').style = `width: 85%; height: 80%;`;
        document.getElementById('gauge2').style = `width: 85%; height: 80%;`;
        document.getElementById('background-gauge1').style = `width: 100%; height: 45%; align-items: center; justify-content: center`;
        document.getElementById('background-gauge2').style = `width: 100%; height: 45%; align-items: center; justify-content: center`;
        document.getElementById('background-grafico').style = `width: 64%; height: 85%; `;
        document.getElementById('logo').style = `display:none;`;
        document.getElementById('ds').style = `width: 90%`;
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