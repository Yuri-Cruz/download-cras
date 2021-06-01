var teste;

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        var form = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }

        fetch(`/maquina/addCordenadas/${getParameter('hostname')}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        }).then(function (response) {
            return response.json();
        }).then((res) => {
            console.log(res);
        });
    }, (error) => {
        console.log(error);
    })
} else {
    alert('nao foi');
}

function getParameter(theParameter) {
    var params = window.location.search.substr(1).split('&');

    for (var i = 0; i < params.length; i++) {
        var p = params[i].split('=');
        if (p[0] == theParameter) {
            return decodeURIComponent(p[1]);
        }
    }
}