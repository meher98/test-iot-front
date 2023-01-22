// Appelée au chargement de la page
function startConnect() {
  // Initialise une nouvelle connexion de client Paho
  clientID = "clientID-" + parseInt(Math.random() * 100);

  // Initialise une nouvelle connexion de client Paho
  client = new Paho.MQTT.Client("test.mosquitto.org", Number(8080), clientID);

  // Définit les gestionnaires de rappel
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // Connecte le client, si réussi, appeler la fonction onConnect
  client.connect({
    onSuccess: onConnect,
  });
}

// Appelée lorsque le client se connecte
function onConnect() {
  // S'abonne au sujet demandé
  client.subscribe("Temp");
}

// Appelée lorsque le client perd sa connexion
function onConnectionLost(responseObject) {
  document.getElementById("temp").innerHTML += "ERROR: Connection lost";
  if (responseObject.errorCode !== 0) {
    document.getElementById("temp").innerHTML +=
      "ERROR: " + +responseObject.errorMessage;
  }
}

// Appelée lorsqu'un message arrive
function onMessageArrived(message) {
  thermoHeight = ((parseInt(message.payloadString) + 15) * 100) / 75;
  document.getElementById("temp-fill").style.height = thermoHeight + "%";
  document.getElementById("temp-fill").className =
    parseInt(message.payloadString) > 15
      ? "thermometer-fill hot"
      : "thermometer-fill cold";
  document.getElementById("temp").innerHTML = message.payloadString + "°C";
  document.getElementById("temp").className =
    parseInt(message.payloadString) > 15 ? "hot" : "cold";
}
