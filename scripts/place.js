function updateFooter() {
  const currentYearElement = document.getElementById("currentyear");
  const today = new Date();
  const currentYear = today.getFullYear();
  currentYearElement.textContent = currentYear;

  const lastModifiedElement = document.getElementById("lastmodified");
  const lastModifiedDate = document.lastModified;
  lastModifiedElement.textContent = lastModifiedDate;
}

var temperature = 28;
var windSpeed = 12;

function calculateWindChill(temp, wind) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(wind, 0.16) +
    0.3965 * temp * Math.pow(wind, 0.16)
  );
}

function showWindChill() {
  var windChillPlace = document.getElementById("windchill");

  if (temperature <= 10 && windSpeed > 4.8) {
    var result = calculateWindChill(temperature, windSpeed);

    windChillPlace.textContent = Math.round(result) + "°C";
  } else {
    windChillPlace.textContent = "N/A";
  }
}

window.addEventListener("load", function() {
  updateFooter();
  showWindChill();
});
