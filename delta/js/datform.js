 // --- Referencias a elementos ---
    const tripTypeEl = document.querySelector('.trip-type');
    const tripOptionsEl = document.querySelector('.trip-options');
    const tripOptionItems = document.querySelectorAll('.trip-option');
    const modalTripText = document.querySelector('.d3h8k_trip_type_text');

    const dateLabelEl = document.querySelector('.date-label'); // span que muestra "Depart — Return"
    const passengerDisplay = document.querySelector('.passenger-display');
    const passengerPicker = document.querySelector('.passenger-picker');

    // botones y contadores para adultos y niños
    const adultIncrease = document.querySelector('.pass-adult-increase');
    const adultDecrease = document.querySelector('.pass-adult-decrease');
    const childIncrease = document.querySelector('.pass-child-increase');
    const childDecrease = document.querySelector('.pass-child-decrease');

    const adultCountEl = document.querySelector('.pass-count-adults');
    const childCountEl = document.querySelector('.pass-count-children');

    const passDone = document.querySelector('.passenger-done');
    const clearBtn = document.querySelector('.pp-clear');

    const modalPassengerText = document.querySelector('.v8c1x_passenger_text');
    const pillTextEl = document.querySelector('.passenger-label-text');

    // Estado interno
    let adults = 1;
    let children = 0;

    // Asegura que el dropdown esté en body (para posicionamiento correcto)
    function ensureAppendToBody(el) {
        if (!el) return;
        if (el.parentElement !== document.body) {
            document.body.appendChild(el);
        }
    }

    // Habilita o deshabilita todos los campos Return (inputs dentro de .q7f3s_return_wrapper)
    function setReturnDisabled(disabled) {
        const returnWrappers = document.querySelectorAll('.q7f3s_return_wrapper');
        returnWrappers.forEach(wrapper => {
            const input = wrapper.querySelector('.q7f3s_date_input');
            if (!input) return;
            if (disabled) {
                input.setAttribute('disabled', 'disabled');
                input.setAttribute('aria-disabled', 'true');
                // ajusta placeholder para indicar que no aplica
                input.value = '';
                input.placeholder = '—';
            } else {
                input.removeAttribute('disabled');
                input.removeAttribute('aria-disabled');
                input.placeholder = 'Return';
            }
        });

        // También actualizamos el texto visible en la cabecera ('Depart — Return' -> 'Depart')
        if (dateLabelEl) {
            if (disabled) {
                dateLabelEl.innerHTML = 'Depart <i class="fas fa-calendar"></i>';
            } else {
                dateLabelEl.innerHTML = 'Depart — Return <i class="fas fa-calendar"></i>';
            }
        }
    }

    // Posicionamiento (misma lógica previa)
    function positionDropdown(targetEl, dropdownEl) {
        const rect = targetEl.getBoundingClientRect();
        const top = rect.bottom + window.pageYOffset + 8;
        const dropdownWidth = dropdownEl.offsetWidth || parseInt(getComputedStyle(dropdownEl).minWidth) || rect.width;
        let left = rect.left + window.pageXOffset;
        const rightEdge = left + dropdownWidth;
        const viewportRight = window.pageXOffset + document.documentElement.clientWidth;
        if (rightEdge > viewportRight - 8) {
            left = Math.max(window.pageXOffset + 8, viewportRight - dropdownWidth - 8);
        }
        dropdownEl.style.top = top + 'px';
        dropdownEl.style.left = left + 'px';
        dropdownEl.style.minWidth = Math.max(rect.width, dropdownWidth) + 'px';
    }

    function toggleDropdown(targetEl, dropdownEl) {
        if (!dropdownEl || !targetEl) return;
        if (dropdownEl.style.display === 'none' || dropdownEl.style.display === '') {
            ensureAppendToBody(dropdownEl);
            dropdownEl.style.display = 'block';
            dropdownEl.style.opacity = '0';
            positionDropdown(targetEl, dropdownEl);
            dropdownEl.style.transform = 'translateY(-6px)';
            setTimeout(() => {
                dropdownEl.style.opacity = '1';
                dropdownEl.style.transform = 'translateY(0)';
            }, 5);
        } else {
            dropdownEl.style.display = 'none';
        }
    }

    // Trip toggle (si existe)
    if (tripTypeEl) {
        tripTypeEl.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(tripTypeEl, tripOptionsEl);
        });
    }

    // Seleccionar opción de viaje y manejar habilitado/deshabilitado del Return
    tripOptionItems.forEach(item => {
        item.addEventListener('click', (ev) => {
            const val = item.getAttribute('data-value');
            tripTypeEl.innerHTML = val + ' <i class="fas fa-chevron-down"></i>';
            if (modalTripText) modalTripText.textContent = val;
            tripOptionsEl.style.display = 'none';

            if (val === 'One Way') {
                setReturnDisabled(true);
            } else {
                setReturnDisabled(false);
            }
        });
    });

    // Mostrar picker al clicar en la pill
    if (passengerDisplay) {
        passengerDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown(passengerDisplay, passengerPicker);
        });
    }

    // Eventos adultos
    if (adultIncrease) adultIncrease.addEventListener('click', (e) => { e.stopPropagation(); adults++; updatePassengerUI(); });
    if (adultDecrease) adultDecrease.addEventListener('click', (e) => { e.stopPropagation(); if (adults > 1) adults--; updatePassengerUI(); });

    // Eventos niños
    if (childIncrease) childIncrease.addEventListener('click', (e) => { e.stopPropagation(); children++; updatePassengerUI(); });
    if (childDecrease) childDecrease.addEventListener('click', (e) => { e.stopPropagation(); if (children > 0) children--; updatePassengerUI(); });

    // Done y Clear
    if (passDone) passDone.addEventListener('click', (e) => { passengerPicker.style.display = 'none'; });
    if (clearBtn) clearBtn.addEventListener('click', (e) => { e.stopPropagation(); adults = 1; children = 0; updatePassengerUI(); });

    function updatePassengerUI() {
        if (adultCountEl) adultCountEl.textContent = adults;
        if (childCountEl) childCountEl.textContent = children;

        // Etiqueta del pill: pluralización simple
        let parts = [];
        parts.push(adults + (adults === 1 ? ' Adult' : ' Adults'));
        if (children > 0) parts.push(children + (children === 1 ? ' Child' : ' Children'));
        const label = parts.join(', ');
        if (pillTextEl) pillTextEl.textContent = label;
        if (modalPassengerText) modalPassengerText.textContent = label;
    }

    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (tripOptionsEl) tripOptionsEl.style.display = 'none';
        if (passengerPicker) passengerPicker.style.display = 'none';
    });

    // Evitar cierre por clic dentro
    if (tripOptionsEl) tripOptionsEl.addEventListener('click', (e) => e.stopPropagation());
    if (passengerPicker) passengerPicker.addEventListener('click', (e) => e.stopPropagation());

    // Cerrar/ocultar al hacer scroll o resize
    window.addEventListener('scroll', () => {
        if (tripOptionsEl) tripOptionsEl.style.display = 'none';
        if (passengerPicker) passengerPicker.style.display = 'none';
    }, { passive: true });
    window.addEventListener('resize', () => {
        if (tripOptionsEl) tripOptionsEl.style.display = 'none';
        if (passengerPicker) passengerPicker.style.display = 'none';
    });

    // Inicializar UI: asegurar Return habilitado por defecto (Round Trip inicial)
    setReturnDisabled(false);
    updatePassengerUI();

    function closeFlightBooking() {
        const overlay = document.getElementById('flightBookingOverlay');
        const modal = document.getElementById('flightBookingModal');
        if (overlay) overlay.style.display = 'none';
        if (modal) modal.style.display = 'none';
    }