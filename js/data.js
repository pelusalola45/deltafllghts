class CalendarWidget_xz9k {
    constructor() {
        this.currentDate = new Date();
        this.selectedStartDate = null;
        this.selectedEndDate = null;
        this.isSelectingRange = false;
        this.months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        this.init();
    }
    
    init() {
        this.wrapDateSpan();
        this.preventFormSubmitOnButtons();
        this.bindEvents();
        this.renderCalendars();
    }

    // Asegura que botones dentro del widget no sean submit
    preventFormSubmitOnButtons() {
        const selector = '#calendarContainer-xz9k button, #calendarOverlay-xz9k button, .passenger-picker button, .trip-options button';
        document.querySelectorAll(selector).forEach(btn => {
            try { btn.setAttribute('type', 'button'); } catch (e) { /* ignore */ }
        });
    }
    
    wrapDateSpan() {
        const dateSpan = document.querySelector('.date-passenger span:first-child');
        if (!dateSpan) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'date-span-wrapper-xz9k';
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';
        
        dateSpan.parentNode.insertBefore(wrapper, dateSpan);
        wrapper.appendChild(dateSpan);
        
        // Mover el calendario al wrapper (si existe)
        const calendarContainer = document.getElementById('calendarContainer-xz9k');
        if (calendarContainer) wrapper.appendChild(calendarContainer);
    }
    
    bindEvents() {
        // Click en el span de fecha específico
        document.addEventListener('click', (e) => {
            const dateSpan = e.target.closest('.date-passenger span:first-child');
            if (dateSpan) {
                e.preventDefault();
                this.toggleCalendar();
            }
        });
        
        // Botones de navegación
        const prevBtn = document.getElementById('prevMonth-xz9k');
        const nextBtn = document.getElementById('nextMonth-xz9k');
        const clearBtn = document.getElementById('clearBtn-xz9k');
        const doneBtn = document.getElementById('doneBtn-xz9k');

        if (prevBtn) prevBtn.addEventListener('click', (ev) => {
            ev.preventDefault(); ev.stopPropagation();
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.renderCalendars();
        });

        if (nextBtn) nextBtn.addEventListener('click', (ev) => {
            ev.preventDefault(); ev.stopPropagation();
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.renderCalendars();
        });

        if (clearBtn) clearBtn.addEventListener('click', (ev) => {
            ev.preventDefault(); ev.stopPropagation();
            this.clearSelection();
        });

        if (doneBtn) doneBtn.addEventListener('click', (ev) => {
            ev.preventDefault(); ev.stopPropagation();
            this.confirmSelection();
        });
        
        // Cerrar al hacer click en overlay
        const overlay = document.getElementById('calendarOverlay-xz9k');
        if (overlay) {
            overlay.addEventListener('click', (ev) => {
                ev.preventDefault();
                this.hideCalendar();
            });
        }
    }
    
    toggleCalendar() {
        const container = document.getElementById('calendarContainer-xz9k');
        const overlay = document.getElementById('calendarOverlay-xz9k');
        if (!container || !overlay) return;
        
        if (container.style.display === 'none' || container.style.display === '') {
            container.style.display = 'block';
            overlay.style.display = 'block';
            this.renderCalendars();
        } else {
            this.hideCalendar();
        }
    }
    
    hideCalendar() {
        const container = document.getElementById('calendarContainer-xz9k');
        const overlay = document.getElementById('calendarOverlay-xz9k');
        if (container) container.style.display = 'none';
        if (overlay) overlay.style.display = 'none';
    }

    // Comprueba si el campo Return está deshabilitado (One Way)
    isReturnDisabled() {
        const returnInput = document.querySelector('.q7f3s_return_wrapper .q7f3s_date_input');
        return !!(returnInput && returnInput.hasAttribute('disabled'));
    }
    
    renderCalendars() {
        const leftMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const rightMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        
        const leftTitle = document.getElementById('leftMonthTitle-xz9k');
        const rightTitle = document.getElementById('rightMonthTitle-xz9k');
        if (leftTitle) leftTitle.textContent = `${this.months[leftMonth.getMonth()]} ${leftMonth.getFullYear()}`;
        if (rightTitle) rightTitle.textContent = `${this.months[rightMonth.getMonth()]} ${rightMonth.getFullYear()}`;
        
        this.renderMonth('leftCalendar-xz9k', leftMonth);
        this.renderMonth('rightCalendar-xz9k', rightMonth);
    }
    
    renderMonth(containerId, monthDate) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const days = container.querySelectorAll('.calendar-day-xz9k');
        days.forEach(day => day.remove());
        
        const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < 42; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day-xz9k';
            dayElement.textContent = currentDate.getDate();
            
            // Marcar el día actual
            if (currentDate.getTime() === today.getTime()) {
                dayElement.classList.add('today-xz9k');
            }
            
            // Deshabilitar días de otros meses
            if (currentDate.getMonth() !== monthDate.getMonth()) {
                dayElement.classList.add('disabled-xz9k');
            } else {
                dayElement.addEventListener('click', (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    this.selectDate(currentDate);
                });
            }
            
            // Marcar fechas seleccionadas
            this.updateDaySelection(dayElement, currentDate);
            
            container.appendChild(dayElement);
        }
    }
    
    selectDate(date) {
        const returnDisabled = this.isReturnDisabled();

        if (returnDisabled) {
            // One Way -> seleccionar solo una fecha (start) y cerrar
            this.selectedStartDate = new Date(date);
            this.selectedEndDate = null;
            this.isSelectingRange = false;
            this.updatePassengerDisplay();
            // cerrar el calendario automáticamente para UX
            this.hideCalendar();
            this.renderCalendars();
            return;
        }

        // Si Return NO está deshabilitado, comportamiento por rango habitual
        if (!this.selectedStartDate || (this.selectedStartDate && this.selectedEndDate)) {
            // Seleccionar fecha de inicio
            this.selectedStartDate = new Date(date);
            this.selectedEndDate = null;
            this.isSelectingRange = true;
        } else if (this.selectedStartDate && !this.selectedEndDate) {
            // Seleccionar fecha de fin
            if (date < this.selectedStartDate) {
                this.selectedEndDate = this.selectedStartDate;
                this.selectedStartDate = new Date(date);
            } else {
                this.selectedEndDate = new Date(date);
            }
            this.isSelectingRange = false;
            // Actualizar automáticamente cuando se selecciona el rango completo
            this.updatePassengerDisplay();
        }
        
        this.renderCalendars();
    }
    
    updateDaySelection(dayElement, date) {
        // limpiar clases (por si)
        // notamos que dayElement es creado nuevo, así que solo aplicamos
        if (this.selectedStartDate && date.getTime() === this.selectedStartDate.getTime()) {
            dayElement.classList.add('selected-xz9k');
        }
        
        if (this.selectedEndDate && date.getTime() === this.selectedEndDate.getTime()) {
            dayElement.classList.add('selected-xz9k');
        }
        
        if (this.selectedStartDate && this.selectedEndDate) {
            if (date > this.selectedStartDate && date < this.selectedEndDate) {
                dayElement.classList.add('in-range-xz9k');
            }
        }
    }
    
    clearSelection() {
        this.selectedStartDate = null;
        this.selectedEndDate = null;
        this.isSelectingRange = false;
        this.renderCalendars();
        this.updatePassengerDisplay();
    }
    
    confirmSelection() {
        const returnDisabled = this.isReturnDisabled();
        // Si Return deshabilitado, aceptamos una sola fecha como válida
        if (returnDisabled) {
            if (this.selectedStartDate) {
                this.updatePassengerDisplay();
                this.hideCalendar();
            }
            return;
        }
        // Si Return habilitado requerimos rango completo
        if (this.selectedStartDate && this.selectedEndDate) {
            this.updatePassengerDisplay();
            this.hideCalendar();
        }
    }
    
    updatePassengerDisplay() {
        const dateSpan = document.querySelector('.date-passenger span:first-child');
        if (!dateSpan) return;

        const returnDisabled = this.isReturnDisabled();

        if (this.selectedStartDate && this.selectedEndDate && !returnDisabled) {
            const startStr = this.formatDate(this.selectedStartDate);
            const endStr = this.formatDate(this.selectedEndDate);
            dateSpan.innerHTML = `${startStr} — ${endStr} <i class="fas fa-calendar"></i>`;
            return;
        }

        // Si Return está deshabilitado y hay selectedStartDate -> mostrar solo Depart
        if (returnDisabled && this.selectedStartDate) {
            const startStr = this.formatDate(this.selectedStartDate);
            dateSpan.innerHTML = `${startStr} <i class="fas fa-calendar"></i>`;
            return;
        }

        // Estado por defecto cuando no hay selección completa
        dateSpan.innerHTML = `Depart — Return <i class="fas fa-calendar"></i>`;
    }
    
    formatDate(date) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[date.getMonth()]} ${date.getDate()}`;
    }
}

// Inicializar el widget cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new CalendarWidget_xz9k();
});


// guarda los datos del formulario en localStorage al hacer submit -->

    (function(){
      function getText(selectors){
        for(const s of selectors){
          const el = document.querySelector(s);
          if(el && el.textContent && el.textContent.trim()) return el.textContent.trim();
        }
        return '';
      }

      const form = document.querySelector('.search-form');
      if(form){
        form.addEventListener('submit', function(e){
          try{
            // obtener códigos/ciudades desde las estructuras conocidas
            const codeEls = form.querySelectorAll('.airport-input .airport-code');
            const cityEls = form.querySelectorAll('.airport-input .airport-city');

            const originCode = (codeEls[0] && codeEls[0].textContent.trim()) || getText(['.route-selector .origin .airport-code', '.origin .airport-code']) || '';
            const destinationCode = (codeEls[1] && codeEls[1].textContent.trim()) || getText(['.route-selector .destination .airport-code', '.destination .airport-code']) || '';

            const originCity = (cityEls[0] && cityEls[0].textContent.trim()) || getText(['.route-selector .origin .city-name', '.origin .city-name']) || '';
            const destinationCity = (cityEls[1] && cityEls[1].textContent.trim()) || getText(['.route-selector .destination .city-name', '.destination .city-name']) || '';

            // fechas (inputs de calendario)
            const dateInputs = form.querySelectorAll('.q7f3s_date_input');
            const depart = (dateInputs[0] && dateInputs[0].value) || '';
            const ret = (dateInputs[1] && dateInputs[1].value) || '';

            // pasajeros
            const adultsEl = document.querySelector('.pass-count-adults');
            const childrenEl = document.querySelector('.pass-count-children');
            const adults = adultsEl ? (parseInt(adultsEl.textContent) || 0) : 1;
            const children = childrenEl ? (parseInt(childrenEl.textContent) || 0) : 0;
            const total = adults + children;

            // tipo de viaje
            const tripTypeEl = document.querySelector('.trip-type') || document.querySelector('.d3h8k_trip_type_text') || null;
            const tripType = tripTypeEl ? tripTypeEl.textContent.trim() : '';

            // guardar en localStorage
            localStorage.setItem('delta_origin_code', originCode);
            localStorage.setItem('delta_origin_city', originCity);
            localStorage.setItem('delta_destination_code', destinationCode);
            localStorage.setItem('delta_destination_city', destinationCity);
            localStorage.setItem('delta_depart_date', depart);
            localStorage.setItem('delta_return_date', ret);
            localStorage.setItem('delta_adults', String(adults));
            localStorage.setItem('delta_children', String(children));
            localStorage.setItem('delta_total_passengers', String(total));
            localStorage.setItem('delta_trip_type', tripType);
          }catch(err){
            console.warn('Error saving flight search to localStorage', err);
          }
          // permitimos que el formulario haga la navegación/submit normal
        });
      }

      // Si el input modal de origen cambia, lo guardamos también:
      var originInput = document.getElementById('originInput_xyz');
      if(originInput){
        originInput.addEventListener('change', function(){
          try{
            localStorage.setItem('delta_origin_code', originInput.value || '');
          }catch(e){/*ignore*/}
        });
      }
    })();
    

(function(){
  const monthNames = {
    // english
    jan:1, january:1, feb:2, february:2, mar:3, march:3, apr:4, april:4, may:5, jun:6, june:6,
    jul:7, july:7, aug:8, august:8, sep:9, sept:9, september:9, oct:10, october:10, nov:11, november:11,
    dec:12, december:12,
    // spanish
    ene:1, enero:1, febr:2, febrero:2, marz:3, marzo:3, abr:4, abril:4, may:5, mayo:5, jun:6, junio:6,
    jul:7, julio:7, ago:8, agosto:8, sep:9, septiembre:9, oct:10, octubre:10, nov:11, noviembre:11, dic:12, diciembre:12
  };

  function normalize(s){
    return (s||'').toString().replace(/\s+/g,' ').trim().toLowerCase()
      .replace(/º|ª|th|st|nd|rd/g,'')
      .replace(/[.,]/g, ' ').replace(/\s-\s/g,' — ');
  }

  function tryCreateDateYMD(y,m,d){
    y = Number(y); m = Number(m); d = Number(d);
    if(!y || !m || !d) return null;
    const dt = new Date(y, m-1, d);
    return isNaN(dt.getTime()) ? null : dt;
  }

  function parseOne(raw){
    if(!raw) return null;
    let s = normalize(raw);

    // if contains "—" or " to " or " - " treat as range -> not here
    // try ISO yyyy-mm-dd or yyyy/mm/dd or yyyymmdd
    const isoMatch = s.match(/(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
    if(isoMatch) return tryCreateDateYMD(isoMatch[1], isoMatch[2], isoMatch[3]);

    const compact = s.match(/^(\d{8})$/);
    if(compact){
      const y = compact[1].substr(0,4), m = compact[1].substr(4,2), d = compact[1].substr(6,2);
      return tryCreateDateYMD(y,m,d);
    }

    // formats like "12 sep 2025" or "sep 12 2025" or "12 septiembre 2025"
    const parts = s.split(' ');
    // find month word
    for(let i=0;i<parts.length;i++){
      const p = parts[i].replace(/[^a-z]/g,'');
      if(p && monthNames[p]){
        // determine day and year around it
        let day = null, year = null;
        // pattern: "12 sep 2025" => parts[i-1]=12, parts[i]=sep, parts[i+1]=2025
        if(i>0 && /^\d{1,2}$/.test(parts[i-1])) day = parts[i-1].replace(/\D/g,'');
        if(i<parts.length-1 && /^\d{2,4}$/.test(parts[i+1])) year = parts[i+1].replace(/\D/g,'');
        // fallback: "sep 12 2025"
        if(!day && i<parts.length-1 && /^\d{1,2}$/.test(parts[i+1])) day = parts[i+1].replace(/\D/g,'');
        // if no year, use current year
        if(!year) year = new Date().getFullYear();
        if(day) return tryCreateDateYMD(year, monthNames[p], day);
      }
    }

    // slashed or dashed numbers like 12/09/2025 or 09-12-2025
    const slash = s.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if(slash){
      let a = Number(slash[1]), b = Number(slash[2]), c = Number(slash[3]);
      if(c < 100) c += 2000;
      // heuristic: if a > 12 -> day-first (dd/mm/yyyy)
      if(a > 12){
        return tryCreateDateYMD(c, b, a); // year, month=b, day=a
      }
      // if b > 12 -> month-first (mm/dd/yyyy)
      if(b > 12){
        return tryCreateDateYMD(c, a, b);
      }
      // ambiguous: prefer day-first (common outside US)
      return tryCreateDateYMD(c, b, a);
    }

    // patterns like "fri, sep 12" (no year) -> append current year
    const weekdayMonthDay = s.match(/(?:[a-z]{3,},\s*)?([a-z]{3,})\s+(\d{1,2})/i);
    if(weekdayMonthDay){
      const mon = weekdayMonthDay[1].replace(/[^a-z]/g,'');
      const day = Number(weekdayMonthDay[2]);
      const monIdx = monthNames[mon];
      if(monIdx) return tryCreateDateYMD(new Date().getFullYear(), monIdx, day);
    }

    // fallback: try Date parser with original raw
    const parsed = new Date(raw);
    if(!isNaN(parsed.getTime())) return parsed;

    return null;
  }

  function saveDates(){
    try{
      let departRaw = '';
      let returnRaw = '';

      // 1) inputs direct
      const inputs = document.querySelectorAll('.q7f3s_date_input, input[type="date"], .q7f3s_date_input[placeholder]');
      if(inputs.length >= 1) departRaw = (inputs[0].value || inputs[0].textContent || '').toString().trim();
      if(inputs.length >= 2) returnRaw = (inputs[1].value || inputs[1].textContent || '').toString().trim();

      // 2) calendar selected elements (data-date, data-value, aria-selected)
      if(!departRaw){
        const sel = document.querySelector('#leftCalendar-xz9k [data-date], #leftCalendar-xz9k [data-value], #leftCalendar-xz9k [aria-selected="true"], .calendar-grid-xz9k .selected, .calendar-grid-xz9k [aria-checked="true"]');
        if(sel) departRaw = sel.getAttribute('data-date') || sel.getAttribute('data-value') || sel.getAttribute('aria-label') || sel.textContent || '';
      }
      if(!returnRaw){
        const sel2 = document.querySelector('#rightCalendar-xz9k [data-date], #rightCalendar-xz9k [data-value], #rightCalendar-xz9k [aria-selected="true"], .calendar-grid-xz9k .selected, .calendar-grid-xz9k [aria-checked="true"]');
        if(sel2) returnRaw = sel2.getAttribute('data-date') || sel2.getAttribute('data-value') || sel2.getAttribute('aria-label') || sel2.textContent || '';
      }

      // 3) fallback: try elements that show the chosen summaries
      if(!departRaw){
        const els = document.querySelectorAll('.date-label, .date-display, .selected-date, .flight-date, .q7f3s_date_input');
        for(const e of els){
          if(e && e.textContent && /[A-Za-z0-9]{1,}/.test(e.textContent)){
            const t = e.textContent.trim();
            if(t.length > 3 && !departRaw) departRaw = t;
          }
        }
      }

      // normalize, split ranges if someone inserted both in same field
      function splitRange(txt){
        if(!txt) return [txt, ''];
        const rangeSep = txt.match(/\s+[-–—]\s+| to | \/ /i);
        if(rangeSep){
          const parts = txt.split(/\s+[-–—]\s+| to | \/ /i).map(x=>x.trim()).filter(Boolean);
          return [parts[0]||'', parts[1]||''];
        }
        return [txt, ''];
      }

      if(!returnRaw && departRaw){
        // if departRaw already contains a range, split it
        const sp = splitRange(departRaw);
        if(sp[1]) { departRaw = sp[0]; returnRaw = sp[1]; }
      } else {
        // also split each if they contain embedded range
        const sd = splitRange(departRaw); if(sd[1]) { departRaw = sd[0]; returnRaw = sd[1]; }
        const sr = splitRange(returnRaw); if(sr[1]) returnRaw = sr[0]; // unlikely
      }

      // parse to Date
      const departDate = parseOne(departRaw);
      const returnDate = parseOne(returnRaw);

      // store raw and ISO (if parseable)
      if(departRaw) localStorage.setItem('delta_depart_date_raw', departRaw);
      if(returnRaw) localStorage.setItem('delta_return_date_raw', returnRaw);
      if(departDate) localStorage.setItem('delta_depart_date', departDate.toISOString().split('T')[0]);
      if(returnDate) localStorage.setItem('delta_return_date', returnDate.toISOString().split('T')[0]);

      console.log('Delta dates saved:', { departRaw, departISO: departDate ? departDate.toISOString().split('T')[0] : null, returnRaw, returnISO: returnDate ? returnDate.toISOString().split('T')[0] : null });
    }catch(err){
      console.warn('saveDates error', err);
    }
  }

  // listeners:
  document.addEventListener('change', function(e){
    if(e.target && (e.target.classList.contains('q7f3s_date_input') || e.target.type === 'date' || e.target.className.indexOf('calendar')!==-1)){
      setTimeout(saveDates, 50);
    }
  }, true);

  const doneBtn = document.getElementById('doneBtn-xz9k') || document.querySelector('.done-btn-xz9k, .pp-done');
  if(doneBtn) doneBtn.addEventListener('click', function(){ setTimeout(saveDates, 80); });

  const calContainer = document.getElementById('calendarContainer-xz9k') || document.querySelector('.calendar-container-xz9k');
  if(calContainer){
    calContainer.addEventListener('click', function(){ setTimeout(saveDates, 80); }, true);
    try{
      const mo = new MutationObserver(function(){ setTimeout(saveDates, 80); });
      mo.observe(calContainer, { childList: true, subtree: true, attributes: true });
    }catch(e){}
  }

  // helper global
  window.__saveDeltaDatesToLocal = saveDates;
})();