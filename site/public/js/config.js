var usuarioJs;
var cliente;
var parametro;


fetch(`/usuario/${sessionStorage.email}`, {
    method: 'GET',
}).then(function(response) {
    return response.json();
}).then(user => {
    console.log(user);
    email.value = user.email
    nome.value = user.nome

    usuarioJs = user;
});

fetch(`/cliente/${sessionStorage.cnpj}`, {
    method: 'GET',
}).then(function(response) {
    return response.json();
}).then(user => {
    console.log(user);
    empresa.value = user.nomeEmpresa
    cnpj.value = user.cnpj
    telComercial.value = user.telefoneComercial
    cel.value = user.telefoneCelular


    cliente = user;
    fetch(`/endereco/${user.fkCep}`, {
        method: 'GET',
    }).then(function(response) {
        return response.json();
    }).then(res => {
        console.log(res);
        endereco.value = res.logradouro + "," + user.numero + " " + user.complemento + " " + res.bairro + " " + res.cidade + "-" + res.estado + " " + res.cep;
    })
});

fetch(`/parametro/${sessionStorage.cnpj}`, {
    method: 'GET',
}).then(function(response) {
    return response.json();
}).then(user => {
    console.log(user);
    cpu.value = user.cpu
    ram.value = user.ram
    disco.value = user.discos

    parametro = user
});