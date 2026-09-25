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
