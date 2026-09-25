let latitude = null
let longitude = null

function capturarLocalizacao() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sucesso, erro);
    } else {
        alert("Seu navegador não suporta geolocalização")
    }

}

function sucesso(posicao) {

    latitude = posicao.coords.latitude;
    longitude = posicao.coords.longitude;

    document.getElementById("localizacao").innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
  document.getElementById("mensagem").innerHTML = "";
}

function erro(error) {

    if (error.code === error.PERMISSION_DENIED) {
        document.getElementById("mensagem").innerHTML = "Permissão negada! A localização é necessária para registrar a ocorrência.";
        document.getElementById("mensagem").style.color = "red";
    } else {
        document.getElementById("mensagem").innerHTML = "Erro ao pegar a localização";
        document.getElementById("mensagem").style.color = "red";
    }
}

function validar() {

    let titulo = document.getElementById("titulo").value
    let descricao = document.getElementById("descricao").value
    let erros = ""

    if (titulo.trim().length < 5) {
        erros = erros + "O título precisa ter no mínimo 5 caracteres<br>"
    }

    if (descricao.trim() == "") {
        erros = erros + "A descrição não pode ficar vazia<br>"
    }

    if (latitude == null || longitude == null) {
      erros = erros + "Capture a localização antes de salvar<br>"
    }

    if (erros != "") {
        document.getElementById("mensagem").innerHTML = erros
        document.getElementById("mensagem").style.color = "red"
        return false
    }

    return true
}

function salvar() {

    if (validar() == false) {
        return
    }

    let ocorrencia = {
        id: Date.now(),
        titulo: document.getElementById("titulo").value,
        descricao: document.getElementById("descricao").value,
        lat: latitude,
        long: longitude,
        dataHora: new Date().toLocaleString()
    }

    let historico = JSON.parse(localStorage.getItem('ocorrencias')) || []

    historico.push(ocorrencia)

    let arrayAtualizado = historico
    localStorage.setItem('ocorrencias', JSON.stringify(arrayAtualizado))

    document.getElementById("mensagem").innerHTML = "Ocorrência salva com sucesso!"
    document.getElementById("mensagem").style.color = "green"

    document.getElementById("titulo").value = ""
    document.getElementById("descricao").value = ""

    mostrarOcorrencias()
}

function mostrarOcorrencias() {

    let ocorrencias = JSON.parse(localStorage.getItem('ocorrencias')) || []

    document.getElementById("lista").innerHTML = ""

    if (ocorrencias.length == 0) {
        document.getElementById("lista").innerHTML = "Nenhuma ocorrência salva"
    }

    for (let i = 0; i < ocorrencias.length; i++) {
        document.getElementById("lista").innerHTML += "<p><b>" + ocorrencias[i].titulo + "</b><br>" + ocorrencias[i].descricao + "<br>Latitude: " + ocorrencias[i].lat + " | Longitude: " + ocorrencias[i].long + "<br>" + ocorrencias[i].dataHora + "</p>"
    }

}

mostrarOcorrencias()
