(function () {
  const form = document.querySelector('.search-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const airportInputs = document.querySelectorAll('.airport-input');
    const tripTypeEl = document.querySelector('.trip-type');
    const dateLabelEl = document.querySelector('.date-label');

    let invalid = false;

    // Lista de valores no válidos por defecto
    const invalidValues = ["to", "from", "your destination", "your origin", "select airport"];

    // Validar aeropuertos
    airportInputs.forEach(el => {
      const code = el.querySelector('.airport-code')?.textContent.trim().toLowerCase();
      const city = el.querySelector('.airport-city')?.textContent.trim().toLowerCase();

      if (!code || !city || invalidValues.includes(code) || invalidValues.includes(city)) {
        el.style.outline = '2px solid red';
        invalid = true;
      } else {
        el.style.outline = '';
      }
    });

    // Validar tipo de viaje
    const tripType = tripTypeEl?.textContent.trim();
    if (!tripType) {
      tripTypeEl.style.outline = '2px solid red';
      invalid = true;
    } else {
      tripTypeEl.style.outline = '';
    }

    // Validar fechas
    const dateLabel = dateLabelEl?.textContent.trim();
    if (!dateLabel || dateLabel.toLowerCase().includes('depart')) {
      dateLabelEl.style.outline = '2px solid red';
      invalid = true;
    } else {
      dateLabelEl.style.outline = '';
    }

    if (invalid) {
      alert('Por favor completa los campos marcados antes de continuar.');
      return;
    }

    // Guardar en localStorage
    const originCode = airportInputs[0].querySelector('.airport-code').textContent.trim();
    const originCity = airportInputs[0].querySelector('.airport-city').textContent.trim();
    const destinationCode = airportInputs[1].querySelector('.airport-code').textContent.trim();
    const destinationCity = airportInputs[1].querySelector('.airport-city').textContent.trim();

    localStorage.setItem('flightData', JSON.stringify({
      originCode,
      originCity,
      destinationCode,
      destinationCity,
      tripType,
      dateLabel
    }));

    // Redirigir según el tipo de viaje
    if (tripType.toLowerCase().includes('one way')) {
      window.location.href = 'one-way-results.html';
    } else if (tripType.toLowerCase().includes('round trip')) {
      window.location.href = 'round-trip-results.html';
    } else {
      window.location.href = 'round-trip-results.html';
    }
  });
})();