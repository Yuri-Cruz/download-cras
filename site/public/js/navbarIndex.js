function invisivel() {
    if (document.getElementById('check').checked) {
        document.getElementById('texto-item').style.display = 'flex'
        document.getElementById('texto-item2').style.display = 'flex'

    } else {
        document.getElementById('texto-item').style.display = 'none'
        document.getElementById('texto-item2').style.display = 'none'
    }
}

function clique() {
    document.getElementById("check").checked = false;
}