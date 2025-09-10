document.addEventListener('DOMContentLoaded', function () {
  function isValidDateObj(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  function daysInMonth(year, monthZeroBased){
    return new Date(year, monthZeroBased + 1, 0).getDate();
  }

  // intenta parsear varias formas comunes: ISO yyyy-mm-dd, mm/dd/yyyy, dd/mm/yyyy, y Date(...) directo
  function parseDateFlexible(s) {
    if(!s) return null;
    s = s.trim();

    // 1) Direct Date parser (handles many formats, e.g. "Sep 12 2025", "2025-09-12T00:00:00")
    let d = new Date(s);
    if (isValidDateObj(d)) return d;

    // 2) ISO yyyy-mm-dd (con o sin hora)
    const isoMatch = s.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
    if (isoMatch) {
      const y = parseInt(isoMatch[1], 10);
      const m = parseInt(isoMatch[2], 10);
      const day = parseInt(isoMatch[3], 10);
      if (m >= 1 && m <= 12 && day >= 1 && day <= daysInMonth(y, m - 1)) {
        return new Date(y, m - 1, day);
      }
    }

    // 3) slashed formats like dd/mm/yyyy or mm/dd/yyyy
    const slashMatch = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (slashMatch) {
      let a = parseInt(slashMatch[1], 10);
      let b = parseInt(slashMatch[2], 10);
      let c = parseInt(slashMatch[3], 10);
      if (c < 100) c += 2000; // '25' => 2025

      // Si a > 12 entonces es muy probable que sea día (dd/mm/yyyy)
      if (a > 12 && b >= 1 && b <= 12) {
        if (a >= 1 && a <= daysInMonth(c, b - 1)) return new Date(c, b - 1, a);
      }

      // Si b > 12 entonces es mm/dd/yyyy (incompatible con dd/mm)
      if (b > 12 && a >= 1 && a <= 12) {
        if (b >= 1 && b <= daysInMonth(c, a - 1)) return new Date(c, a - 1, b);
      }

      // Ambos <=12: ambigüedad; asumimos mm/dd/yyyy si el sitio es estilo US,
      // pero como el UI original usaba "Fri, Sep 12" (en inglés) probamos mm/dd primero.
      // También intentamos dd/mm si mm/dd nos da inválido.
      let tryMmDd = new Date(c, a - 1, b);
      if (isValidDateObj(tryMmDd) && (tryMmDd.getMonth() === (a - 1))) return tryMmDd;

      let tryDdMm = new Date(c, b - 1, a);
      if (isValidDateObj(tryDdMm) && (tryDdMm.getMonth() === (b - 1))) return tryDdMm;
    }

    // No pudimos parsear
    return null;
  }

  function formatForDisplay(dateObj) {
    if(!isValidDateObj(dateObj)) return '';
    // Mantener formato tipo "Fri, Sep 12"
    return dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  try {
    const departRaw = localStorage.getItem('delta_depart_date') || '';
    const returnRaw = localStorage.getItem('delta_return_date') || '';

    const departDate = parseDateFlexible(departRaw);
    const returnDate = parseDateFlexible(returnRaw);

    const dateEl = document.querySelector('.datetime-info .flight-date');
    if (dateEl) {
      if (departDate && returnDate) {
        dateEl.textContent = formatForDisplay(departDate) + ' — ' + formatForDisplay(returnDate);
        dateEl.title = (departRaw || '') + (returnRaw ? ' — ' + returnRaw : '');
      } else if (departDate) {
        dateEl.textContent = formatForDisplay(departDate);
        dateEl.title = departRaw;
      } else if (returnDate) {
        dateEl.textContent = formatForDisplay(returnDate);
        dateEl.title = returnRaw;
      } else {
        // Si no hay fechas parseables, mantenemos el contenido original o lo reemplazamos por vacío
        // dateEl.textContent = ''; // opcional si quieres borrar el texto original
        console.warn('No se encontraron fechas parseables en localStorage (delta_depart_date / delta_return_date). Valores:', departRaw, returnRaw);
      }
    } else {
      console.warn('Selector .datetime-info .flight-date no encontrado en el DOM.');
    }
  } catch (err) {
    console.warn('Error mostrando fechas desde localStorage:', err);
  }
});

document.addEventListener('DOMContentLoaded', function(){
  function isValidDateObj(d){ return d instanceof Date && !isNaN(d.getTime()); }

  function parsePossiblyISOorRaw(s){
    if(!s) return null;
    s = s.trim();
    // ISO yyyy-mm-dd
    const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(iso){
      const d = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
      if(isValidDateObj(d)) return d;
    }
    // fallback try Date parser
    const d2 = new Date(s);
    if(isValidDateObj(d2)) return d2;
    // try to extract dd/mm/yyyy or mm/dd/yyyy
    const m = s.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if(m){
      let a = parseInt(m[1],10), b = parseInt(m[2],10), c = parseInt(m[3],10);
      if(c < 100) c += 2000;
      // attempt mm/dd
      let try1 = new Date(c, a - 1, b);
      if(isValidDateObj(try1)) return try1;
      let try2 = new Date(c, b - 1, a);
      if(isValidDateObj(try2)) return try2;
    }
    return null;
  }

  function formatDisplay(d){
    // ejemplo: "Fri, Sep 12"
    try{
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }catch(e){
      return d.toDateString();
    }
  }

  try{
    // Primero preferimos la versión ISO guardada; si no, intentamos raw
    let departVal = localStorage.getItem('delta_depart_date') || localStorage.getItem('delta_depart_date_raw') || '';
    let returnVal = localStorage.getItem('delta_return_date') || localStorage.getItem('delta_return_date_raw') || '';

    const departDate = parsePossiblyISOorRaw(departVal);
    const returnDate = parsePossiblyISOorRaw(returnVal);

    const dateEl = document.querySelector('.datetime-info .flight-date');
    const timeEl = document.querySelector('.datetime-info .flight-time');

    if(dateEl){
      if(departDate && returnDate){
        dateEl.textContent = formatDisplay(departDate) + ' — ' + formatDisplay(returnDate);
        dateEl.title = (departVal || '') + (returnVal ? ' — ' + returnVal : '');
      } else if(departDate){
        dateEl.textContent = formatDisplay(departDate);
        dateEl.title = departVal;
      } else if(returnDate){
        dateEl.textContent = formatDisplay(returnDate);
        dateEl.title = returnVal;
      } else if(departVal){
        dateEl.textContent = departVal;
        dateEl.title = departVal;
      } else {
        // no hay fechas guardadas: mantener texto existente
        // console.warn('No dates found in localStorage');
      }
    }

    // Opcional: si también se guardan horas, mostrarlas (busca keys delta_depart_time/delta_return_time)
    const departTime = localStorage.getItem('delta_depart_time') || '';
    const returnTime = localStorage.getItem('delta_return_time') || '';
    if(timeEl){
      if(departTime && returnTime){
        timeEl.textContent = departTime + ' - ' + returnTime;
      } else if(departTime){
        timeEl.textContent = departTime;
      } // si no existen, dejamos el texto original (por ejemplo "1:35am - 6:31am")
    }

  }catch(err){
    console.warn('Error showing stored dates:', err);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Helper para formatear fechas tipo "Fri, Sep 12"
  function formatDisplayDate(d) {
    try {
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) {
      return d.toDateString();
    }
  }

  function parseFlexible(raw) {
    if (!raw) return null;
    raw = raw.trim();
    // ISO yyyy-mm-dd
    const iso = raw.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/);
    if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    // try built-in Date
    const d = new Date(raw);
    if (!isNaN(d)) return d;
    // try dd/mm or mm/dd styles
    const m = raw.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (m) {
      let a = Number(m[1]), b = Number(m[2]), c = Number(m[3]); if (c < 100) c += 2000;
      // heuristics: if a>12 -> day-first
      if (a > 12) return new Date(c, b - 1, a);
      if (b > 12) return new Date(c, a - 1, b);
      // ambiguous -> try day-first then month-first
      let r = new Date(c, b - 1, a); if (!isNaN(r)) return r;
      r = new Date(c, a - 1, b); if (!isNaN(r)) return r;
    }
    // range like "Sep 12 - Sep 18" -> take left part
    const rng = raw.split(/\s+(?:-|–|—|to)\s+/i);
    if (rng && rng[0]) return parseFlexible(rng[0]);
    return null;
  }

  try {
    // 1) RUTA: prefer codes, fallback to city names
    const originCode = (localStorage.getItem('delta_origin_code') || '').trim();
    const destCode   = (localStorage.getItem('delta_destination_code') || '').trim();
    const originCity = (localStorage.getItem('delta_origin_city') || '').trim();
    const destCity   = (localStorage.getItem('delta_destination_city') || '').trim();

    const routeEls = document.querySelectorAll('.route-info .airport-code');
    if (routeEls && routeEls.length >= 2) {
      if (originCode) routeEls[0].textContent = originCode;
      else if (originCity) routeEls[0].textContent = originCity;
      if (destCode) routeEls[1].textContent = destCode;
      else if (destCity) routeEls[1].textContent = destCity;
    } else {
      // fallback: search first two airport-code in document
      const allCodes = document.querySelectorAll('.airport-code');
      if (allCodes.length >= 2) {
        if (originCode) allCodes[0].textContent = originCode;
        else if (originCity) allCodes[0].textContent = originCity;
        if (destCode) allCodes[1].textContent = destCode;
        else if (destCity) allCodes[1].textContent = destCity;
      }
    }

    // set title on route-info for clarity
    const routeInfoContainer = document.querySelector('.route-info');
    if (routeInfoContainer) {
      const o = originCode || originCity || '';
      const d = destCode || destCity || '';
      if (o && d) routeInfoContainer.title = o + ' → ' + d;
    }

    // 2) FECHAS: prefer ISO keys, fallback to raw
    const departISO = (localStorage.getItem('delta_depart_date') || '').trim();
    const returnISO = (localStorage.getItem('delta_return_date') || '').trim();
    const departRaw = (localStorage.getItem('delta_depart_date_raw') || '').trim();
    const returnRaw = (localStorage.getItem('delta_return_date_raw') || '').trim();

    // if departISO present, parse it; otherwise parse raw
    const departParsed = parseFlexible(departISO || departRaw);
    const returnParsed = parseFlexible(returnISO || returnRaw);

    const dateEl = document.querySelector('.datetime-info .flight-date');
    if (dateEl) {
      if (departParsed && returnParsed) {
        dateEl.textContent = formatDisplayDate(departParsed) + ' — ' + formatDisplayDate(returnParsed);
        const titleParts = [(departISO || departRaw), (returnISO || returnRaw)].filter(Boolean);
        if (titleParts.length) dateEl.title = titleParts.join(' — ');
      } else if (departParsed) {
        dateEl.textContent = formatDisplayDate(departParsed);
        dateEl.title = departISO || departRaw || '';
      } else if (returnParsed) {
        dateEl.textContent = formatDisplayDate(returnParsed);
        dateEl.title = returnISO || returnRaw || '';
      } else if (departRaw) {
        // no parseable date but raw exists -> show raw as fallback
        dateEl.textContent = departRaw;
        dateEl.title = departRaw;
      }
    }

    // 3) (opcional) también actualizar .airports si existe la otra sección para mantener consistencia
    const airportBoxes = document.querySelectorAll('.airports .airport-code');
    if (airportBoxes && airportBoxes.length >= 2) {
      if (originCode) airportBoxes[0].textContent = originCode;
      else if (originCity) airportBoxes[0].textContent = originCity;
      if (destCode) airportBoxes[1].textContent = destCode;
      else if (destCity) airportBoxes[1].textContent = destCity;
    }

    // console debug (se puede quitar)
    console.log('Flight-info updated from localStorage', {
      originCode, destCode, originCity, destCity,
      departISO, returnISO, departRaw, returnRaw
    });
  } catch (err) {
    console.warn('Error updating flight-info from localStorage', err);
  }
});





function toggleExperienceSection() {
     const section = document.getElementById('experienceSection');
     
     if (section.classList.contains('active')) {
       closeExperienceSection();
     } else {
       section.classList.add('active');
       section.style.display = 'block';
       
       // Scroll suave hacia la sección
       setTimeout(() => {
         section.scrollIntoView({ 
           behavior: 'smooth', 
           block: 'start' 
         });
       }, 100);
     }
   }

   function closeExperienceSection() {
     const section = document.getElementById('experienceSection');
     section.classList.remove('active');
     section.style.display = 'none';
   }

   function selectExperience(type, price) {
     // Redirige a la página de reserva con los parámetros de la experiencia seleccionada
     const params = new URLSearchParams({
       experience: type,
       price: price,
       flight: 'DL6073',
       route: 'BOG-MIA'
     });
     
     // Cambia esta URL por la página a la que quieres redirigir
     window.location.href = 'wait.html?' + params.toString();
   }

   function redirectToBooking(fareType) {
     // URLs para las tarjetas de Comfort y Premium Economy
     if (fareType === 'comfort') {
       // Cambia por tu URL de Comfort
       window.location.href = '#';
     } else if (fareType === 'premium') {
       // Cambia por tu URL de Premium Economy
       window.location.href = 'waitone.html';
     }
   }

   // Agregar el click handler al pseudo-elemento en móviles
   document.addEventListener('DOMContentLoaded', function() {
     if (window.innerWidth <= 768) {
       const flightCard = document.querySelector('.flight-info-card');
       flightCard.addEventListener('click', function(e) {
         // Si el click es en la parte inferior (donde está el ::after)
         const rect = flightCard.getBoundingClientRect();
         if (e.clientY > rect.bottom - 60) { // Aproximadamente donde está el ::after
           toggleExperienceSection();
         }
       });
     }
   });

   // Inicialmente ocultar la sección de experiencias
   document.addEventListener('DOMContentLoaded', function() {
     const section = document.getElementById('experienceSection');
     if (window.innerWidth <= 768) {
       section.style.display = 'none';
     }
   });



 (function(){
   try{
     const origin = localStorage.getItem('delta_origin_code');
     const dest = localStorage.getItem('delta_destination_code');
     const depart = localStorage.getItem('delta_depart_date');
     const ret = localStorage.getItem('delta_return_date');
     const total = localStorage.getItem('delta_total_passengers');
     const adults = localStorage.getItem('delta_adults');
     const children = localStorage.getItem('delta_children');
     const tripType = localStorage.getItem('delta_trip_type');

     // Actualizar códigos de aeropuerto en la sección de airports
     const airportCodes = document.querySelectorAll('.airports .airport-code');
     if(airportCodes.length >= 2){
       if(origin) airportCodes[0].textContent = origin;
       if(dest) airportCodes[1].textContent = dest;
     } else {
       // fallback: reemplaza los primeros .airport-code globales si existen
       const allCodes = document.querySelectorAll('.airport-code');
       if(allCodes[0] && origin) allCodes[0].textContent = origin;
       if(allCodes[1] && dest) allCodes[1].textContent = dest;
     }

     // Mostrar fechas: reemplazar texto de departure-time / arrival-time por las fechas guardadas si existen
     const depEl = document.querySelector('.departure-time');
     const arrEl = document.querySelector('.arrival-time');
     if(depEl && depart) depEl.textContent = depart;
     if(arrEl && ret) arrEl.textContent = ret;

     // Añadir número de pasajeros al texto trip-type
     const tripTypeEls = document.querySelectorAll('.trip-type');
     tripTypeEls.forEach(function(el){
       const base = (tripType && tripType.trim()) || (el.textContent && el.textContent.trim()) || '';
       if(total){
         el.textContent = base + ' · ' + total + (total === '1' ? ' Passenger' : ' Passengers');
       } else {
         el.textContent = base;
       }
     });

     // Opcional: enriquecer el title del código de vuelo con la ruta/fechas/pax
     const flightCode = document.querySelector('.flight-code');
     if(flightCode){
       const parts = [];
       if(origin && dest) parts.push(origin + '→' + dest);
       if(depart) parts.push('Depart: ' + depart);
       if(ret) parts.push('Return: ' + ret);
       if(total) parts.push(total + ' pax');
       if(parts.length) flightCode.title = parts.join(' | ');
     }
   }catch(err){
     console.warn('Error leyendo datos de búsqueda desde localStorage', err);
   }
 })();

 (function(){
  const COUNT = 9;
  const randInt = (min,max)=>Math.floor(Math.random()*(max-min+1))+min;
  const pad = n => String(n).padStart(2,'0');
  const addMinutes = (d,mins)=> new Date(d.getTime()+mins*60000);
  const formatTime = d => {
    let h = d.getHours(), m = d.getMinutes();
    const ampm = h >= 12 ? 'pm' : 'am';
    h = h % 12; if(h === 0) h = 12;
    return h + ':' + pad(m) + ampm;
  };
  const randomDuration = ()=> randInt(90,170);
  const randomLightPrice = ()=> (Math.random() < 0.5 ? 75 : 95);

  // generar las secciones
  function generateSections(){
    const container = document.getElementById('flightsContainer');
    if(!container) return;
    const base = container.querySelector('section.flight-details-section');
    if(!base) return;

    const allExisting = Array.from(container.querySelectorAll('section.flight-details-section'));
    allExisting.slice(1).forEach(n => n.remove());

    for(let i=0;i<COUNT;i++){
      let target;
      if(i===0) {
        target = base;
      } else {
        target = base.cloneNode(true);
        container.appendChild(target);
      }
      target.dataset.generatedIndex = i;

      const depHour = randInt(4,20);
      const depMin = [0,15,30,45][randInt(0,3)];
      const dep = new Date(); dep.setHours(depHour, depMin, 0, 0);
      const dur = randomDuration();
      const arr = addMinutes(dep, dur);

      target.querySelector('.departure-time').textContent = formatTime(dep);
      target.querySelector('.arrival-time').textContent = formatTime(arr);
      target.querySelector('.duration').textContent = Math.floor(dur/60) + 'h ' + (dur%60) + 'm';

      target.querySelector('.fare-card.light .price').textContent = '$' + randomLightPrice();
    }
  }

  // aplicar template de experience-section a cada sección
  function applyTemplateToGenerated(){
    const template = document.getElementById('experienceSection');
    if(!template) {
      console.warn('Template #experienceSection no encontrado.');
      return;
    }

    const sections = Array.from(document.querySelectorAll('#flightsContainer section.flight-details-section'));
    sections.forEach((section, index) => {
      const existingExp = section.querySelector('.experience-section');
      if(existingExp) existingExp.remove();

      const clone = template.cloneNode(true);
      clone.removeAttribute('id');
      clone.dataset.originIndex = index;
      clone.style.display = 'none';
      clone.classList.remove('active');

      const nodesWithId = clone.querySelectorAll('[id]');
      nodesWithId.forEach(n => {
        const oldId = n.getAttribute('id');
        const newId = oldId + '-g' + index;
        n.setAttribute('id', newId);
        const label = clone.querySelector('label[for="'+oldId+'"]');
        if(label) label.setAttribute('for', newId);
      });

      const localPriceText = section.querySelector('.fare-card.light .price')?.textContent?.trim();
      const pv = clone.querySelector('.price-value');
      if(pv && localPriceText) pv.textContent = localPriceText;

      clone.querySelectorAll('[onclick]').forEach(n => n.removeAttribute('onclick'));
      section.appendChild(clone);

      // botón close
      const closeBtn = clone.querySelector('.experience-header .close-button');
      if(closeBtn){
        closeBtn.addEventListener('click', (ev) => {
          ev.preventDefault(); ev.stopPropagation();
          clone.style.display = 'none';
          clone.classList.remove('active');
        });
      }

      // botón Select (light)
      const selectBtn = clone.querySelector('.experience-card.light-card .select-button');
      if(selectBtn){
        selectBtn.addEventListener('click', (ev) => {
          ev.preventDefault(); ev.stopPropagation();
          const priceStr = clone.querySelector('.price-value')?.textContent || section.querySelector('.fare-card.light .price')?.textContent || '$0';
          const priceNum = Number((priceStr||'').replace(/[^\d.]/g,'') || 0);
          if(typeof window.selectExperience === 'function'){
            window.selectExperience('light', priceNum);
          } else {
            console.log('selectExperience not defined, selected', priceNum);
          }
        });
      }

      // comfort/premium
      const comfort = section.querySelector('.fare-card.comfort');
      if(comfort){
        comfort.addEventListener('click', (ev)=>{
          ev.preventDefault(); ev.stopPropagation();
          if(typeof window.redirectToBooking === 'function'){
            window.redirectToBooking('comfort');
          } else console.log('redirectToBooking("comfort") not defined');
        });
      }
      const premium = section.querySelector('.fare-card.premium');
      if(premium){
        premium.addEventListener('click', (ev)=>{
          ev.preventDefault(); ev.stopPropagation();
          if(typeof window.redirectToBooking === 'function'){
            window.redirectToBooking('premium');
          } else console.log('redirectToBooking("premium") not defined');
        });
      }
    });
  }

  // delegación global para abrir el clone correcto
  function setupDelegatedOpener(){
      const container = document.getElementById('flightsContainer');
      if(!container) return;

      if(container._fixHandler) {
        container.removeEventListener('click', container._fixHandler, true);
      }

      const handler = function(e){
        let section;
        let isMobile = window.matchMedia("(max-width: 768px)").matches;

        if(isMobile){
          // En móvil: detectar clic en el pseudo-elemento ::after
          const card = e.target.closest('.flight-info-card');
          if(!card) return;
          
          // Verificar si el clic fue en el área del botón (últimos 50px de la tarjeta)
          const rect = card.getBoundingClientRect();
          const clickY = e.clientY - rect.top;
          const buttonArea = rect.height - 50; // Los últimos 50px son el botón
          
          if(clickY < buttonArea) return; // No fue un clic en el botón
          
          section = card.closest('section.flight-details-section');
        } else {
          // En desktop: clic solo en la tarjeta Light
          const lightCard = e.target.closest('.fare-card.light');
          if(!lightCard) return;
          section = lightCard.closest('section.flight-details-section');
        }

        const idx = section?.dataset.generatedIndex;
        if(idx == null) return;

        let clone = section.querySelector('.experience-section[data-origin-index="'+idx+'"]');
        if(!clone) clone = section.querySelector('.experience-section');
        if(!clone) return;

        // Cerrar todos los demás
        document.querySelectorAll('#flightsContainer .experience-section').forEach(c=>{
          c.style.display = 'none';
          c.classList.remove('active');
        });

        // Abrir este
        clone.style.display = 'block';
        clone.classList.add('active');
        
        // Asegurar que esté visible y bien posicionado
        clone.style.position = 'relative';
        clone.style.width = '100%';
        clone.style.boxSizing = 'border-box';
        clone.style.zIndex = '10000';
        
        // Desplazar para que sea completamente visible
        setTimeout(() => {
          clone.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 50);
      };

      container.addEventListener('click', handler, true);
      container._fixHandler = handler;
    }

    function adjustExperienceSectionSpacing() {
      if (window.matchMedia("(max-width: 768px)").matches) {
        document.querySelectorAll('.experience-section').forEach(section => {
          const content = section.querySelector('.experience-content');
          if (content) {
            content.style.padding = '20px 16px';
            content.style.maxHeight = 'none';
          }
        });
      }
    }

    function init(){
      generateSections();
      applyTemplateToGenerated();
      setupDelegatedOpener();
      adjustExperienceSectionSpacing();
      
      // Reajustar cuando cambie el tamaño de la ventana
      window.addEventListener('resize', adjustExperienceSectionSpacing);
    }
     window.rebuildGeneratedExperiences = function(){
      generateSections();
      applyTemplateToGenerated();
      setupDelegatedOpener();
      adjustExperienceSectionSpacing();
    };

    // Inicializar
    if(document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }


  // stubs
  window.selectExperience = window.selectExperience || function(type, price){
    console.log('selectExperience called', {type, price});
    alert('Selected ' + type + ' — $' + price);
  };
  window.redirectToBooking = window.redirectToBooking || function(kind){
    console.log('redirectToBooking called', kind);
    alert('Redirect to booking: ' + kind);
  };
  window.closeExperienceSection = window.closeExperienceSection || function(){
    document.querySelectorAll('#flightsContainer section.flight-details-section .experience-section').forEach(es=>{
      es.style.display = 'none'; es.classList.remove('active');
    });
  };

  // init
  function init(){
    generateSections();
    applyTemplateToGenerated();
    setupDelegatedOpener();
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.rebuildGeneratedExperiences = function(){
    generateSections();
    applyTemplateToGenerated();
    setupDelegatedOpener();
  };
})();


    document.addEventListener('DOMContentLoaded', function () {
  function isValidDateObj(d) {
    return d instanceof Date && !isNaN(d.getTime());
  }

  function daysInMonth(year, monthZeroBased){
    return new Date(year, monthZeroBased + 1, 0).getDate();
  }

  // intenta parsear varias formas comunes: ISO yyyy-mm-dd, mm/dd/yyyy, dd/mm/yyyy, y Date(...) directo
  function parseDateFlexible(s) {
    if(!s) return null;
    s = s.trim();

    // 1) Direct Date parser (handles many formats, e.g. "Sep 12 2025", "2025-09-12T00:00:00")
    let d = new Date(s);
    if (isValidDateObj(d)) return d;

    // 2) ISO yyyy-mm-dd (con o sin hora)
    const isoMatch = s.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})/);
    if (isoMatch) {
      const y = parseInt(isoMatch[1], 10);
      const m = parseInt(isoMatch[2], 10);
      const day = parseInt(isoMatch[3], 10);
      if (m >= 1 && m <= 12 && day >= 1 && day <= daysInMonth(y, m - 1)) {
        return new Date(y, m - 1, day);
      }
    }

    // 3) slashed formats like dd/mm/yyyy or mm/dd/yyyy
    const slashMatch = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (slashMatch) {
      let a = parseInt(slashMatch[1], 10);
      let b = parseInt(slashMatch[2], 10);
      let c = parseInt(slashMatch[3], 10);
      if (c < 100) c += 2000; // '25' => 2025

      // Si a > 12 entonces es muy probable que sea día (dd/mm/yyyy)
      if (a > 12 && b >= 1 && b <= 12) {
        if (a >= 1 && a <= daysInMonth(c, b - 1)) return new Date(c, b - 1, a);
      }

      // Si b > 12 entonces es mm/dd/yyyy (incompatible con dd/mm)
      if (b > 12 && a >= 1 && a <= 12) {
        if (b >= 1 && b <= daysInMonth(c, a - 1)) return new Date(c, a - 1, b);
      }

      // Ambos <=12: ambigüedad; asumimos mm/dd/yyyy si el sitio es estilo US,
      // pero como el UI original usaba "Fri, Sep 12" (en inglés) probamos mm/dd primero.
      // También intentamos dd/mm si mm/dd nos da inválido.
      let tryMmDd = new Date(c, a - 1, b);
      if (isValidDateObj(tryMmDd) && (tryMmDd.getMonth() === (a - 1))) return tryMmDd;

      let tryDdMm = new Date(c, b - 1, a);
      if (isValidDateObj(tryDdMm) && (tryDdMm.getMonth() === (b - 1))) return tryDdMm;
    }

    // No pudimos parsear
    return null;
  }

  function formatForDisplay(dateObj) {
    if(!isValidDateObj(dateObj)) return '';
    // Mantener formato tipo "Fri, Sep 12"
    return dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }

  try {
    const departRaw = localStorage.getItem('delta_depart_date') || '';
    const returnRaw = localStorage.getItem('delta_return_date') || '';

    const departDate = parseDateFlexible(departRaw);
    const returnDate = parseDateFlexible(returnRaw);

    const dateEl = document.querySelector('.datetime-info .flight-date');
    if (dateEl) {
      if (departDate && returnDate) {
        dateEl.textContent = formatForDisplay(departDate) + ' — ' + formatForDisplay(returnDate);
        dateEl.title = (departRaw || '') + (returnRaw ? ' — ' + returnRaw : '');
      } else if (departDate) {
        dateEl.textContent = formatForDisplay(departDate);
        dateEl.title = departRaw;
      } else if (returnDate) {
        dateEl.textContent = formatForDisplay(returnDate);
        dateEl.title = returnRaw;
      } else {
        // Si no hay fechas parseables, mantenemos el contenido original o lo reemplazamos por vacío
        // dateEl.textContent = ''; // opcional si quieres borrar el texto original
        console.warn('No se encontraron fechas parseables en localStorage (delta_depart_date / delta_return_date). Valores:', departRaw, returnRaw);
      }
    } else {
      console.warn('Selector .datetime-info .flight-date no encontrado en el DOM.');
    }
  } catch (err) {
    console.warn('Error mostrando fechas desde localStorage:', err);
  }
});

document.addEventListener('DOMContentLoaded', function(){
  function isValidDateObj(d){ return d instanceof Date && !isNaN(d.getTime()); }

  function parsePossiblyISOorRaw(s){
    if(!s) return null;
    s = s.trim();
    // ISO yyyy-mm-dd
    const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(iso){
      const d = new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
      if(isValidDateObj(d)) return d;
    }
    // fallback try Date parser
    const d2 = new Date(s);
    if(isValidDateObj(d2)) return d2;
    // try to extract dd/mm/yyyy or mm/dd/yyyy
    const m = s.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if(m){
      let a = parseInt(m[1],10), b = parseInt(m[2],10), c = parseInt(m[3],10);
      if(c < 100) c += 2000;
      // attempt mm/dd
      let try1 = new Date(c, a - 1, b);
      if(isValidDateObj(try1)) return try1;
      let try2 = new Date(c, b - 1, a);
      if(isValidDateObj(try2)) return try2;
    }
    return null;
  }

  function formatDisplay(d){
    // ejemplo: "Fri, Sep 12"
    try{
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }catch(e){
      return d.toDateString();
    }
  }

  try{
    // Primero preferimos la versión ISO guardada; si no, intentamos raw
    let departVal = localStorage.getItem('delta_depart_date') || localStorage.getItem('delta_depart_date_raw') || '';
    let returnVal = localStorage.getItem('delta_return_date') || localStorage.getItem('delta_return_date_raw') || '';

    const departDate = parsePossiblyISOorRaw(departVal);
    const returnDate = parsePossiblyISOorRaw(returnVal);

    const dateEl = document.querySelector('.datetime-info .flight-date');
    const timeEl = document.querySelector('.datetime-info .flight-time');

    if(dateEl){
      if(departDate && returnDate){
        dateEl.textContent = formatDisplay(departDate) + ' — ' + formatDisplay(returnDate);
        dateEl.title = (departVal || '') + (returnVal ? ' — ' + returnVal : '');
      } else if(departDate){
        dateEl.textContent = formatDisplay(departDate);
        dateEl.title = departVal;
      } else if(returnDate){
        dateEl.textContent = formatDisplay(returnDate);
        dateEl.title = returnVal;
      } else if(departVal){
        dateEl.textContent = departVal;
        dateEl.title = departVal;
      } else {
        // no hay fechas guardadas: mantener texto existente
        // console.warn('No dates found in localStorage');
      }
    }

    // Opcional: si también se guardan horas, mostrarlas (busca keys delta_depart_time/delta_return_time)
    const departTime = localStorage.getItem('delta_depart_time') || '';
    const returnTime = localStorage.getItem('delta_return_time') || '';
    if(timeEl){
      if(departTime && returnTime){
        timeEl.textContent = departTime + ' - ' + returnTime;
      } else if(departTime){
        timeEl.textContent = departTime;
      } // si no existen, dejamos el texto original (por ejemplo "1:35am - 6:31am")
    }

  }catch(err){
    console.warn('Error showing stored dates:', err);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  // Helper para formatear fechas tipo "Fri, Sep 12"
  function formatDisplayDate(d) {
    try {
      return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) {
      return d.toDateString();
    }
  }

  function parseFlexible(raw) {
    if (!raw) return null;
    raw = raw.trim();
    // ISO yyyy-mm-dd
    const iso = raw.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/);
    if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    // try built-in Date
    const d = new Date(raw);
    if (!isNaN(d)) return d;
    // try dd/mm or mm/dd styles
    const m = raw.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (m) {
      let a = Number(m[1]), b = Number(m[2]), c = Number(m[3]); if (c < 100) c += 2000;
      // heuristics: if a>12 -> day-first
      if (a > 12) return new Date(c, b - 1, a);
      if (b > 12) return new Date(c, a - 1, b);
      // ambiguous -> try day-first then month-first
      let r = new Date(c, b - 1, a); if (!isNaN(r)) return r;
      r = new Date(c, a - 1, b); if (!isNaN(r)) return r;
    }
    // range like "Sep 12 - Sep 18" -> take left part
    const rng = raw.split(/\s+(?:-|–|—|to)\s+/i);
    if (rng && rng[0]) return parseFlexible(rng[0]);
    return null;
  }

  try {
    // 1) RUTA: prefer codes, fallback to city names
    const originCode = (localStorage.getItem('delta_origin_code') || '').trim();
    const destCode   = (localStorage.getItem('delta_destination_code') || '').trim();
    const originCity = (localStorage.getItem('delta_origin_city') || '').trim();
    const destCity   = (localStorage.getItem('delta_destination_city') || '').trim();

    const routeEls = document.querySelectorAll('.route-info .airport-code');
    if (routeEls && routeEls.length >= 2) {
      if (originCode) routeEls[0].textContent = originCode;
      else if (originCity) routeEls[0].textContent = originCity;
      if (destCode) routeEls[1].textContent = destCode;
      else if (destCity) routeEls[1].textContent = destCity;
    } else {
      // fallback: search first two airport-code in document
      const allCodes = document.querySelectorAll('.airport-code');
      if (allCodes.length >= 2) {
        if (originCode) allCodes[0].textContent = originCode;
        else if (originCity) allCodes[0].textContent = originCity;
        if (destCode) allCodes[1].textContent = destCode;
        else if (destCity) allCodes[1].textContent = destCity;
      }
    }

    // set title on route-info for clarity
    const routeInfoContainer = document.querySelector('.route-info');
    if (routeInfoContainer) {
      const o = originCode || originCity || '';
      const d = destCode || destCity || '';
      if (o && d) routeInfoContainer.title = o + ' → ' + d;
    }

    // 2) FECHAS: prefer ISO keys, fallback to raw
    const departISO = (localStorage.getItem('delta_depart_date') || '').trim();
    const returnISO = (localStorage.getItem('delta_return_date') || '').trim();
    const departRaw = (localStorage.getItem('delta_depart_date_raw') || '').trim();
    const returnRaw = (localStorage.getItem('delta_return_date_raw') || '').trim();

    // if departISO present, parse it; otherwise parse raw
    const departParsed = parseFlexible(departISO || departRaw);
    const returnParsed = parseFlexible(returnISO || returnRaw);

    const dateEl = document.querySelector('.datetime-info .flight-date');
    if (dateEl) {
      if (departParsed && returnParsed) {
        dateEl.textContent = formatDisplayDate(departParsed) + ' — ' + formatDisplayDate(returnParsed);
        const titleParts = [(departISO || departRaw), (returnISO || returnRaw)].filter(Boolean);
        if (titleParts.length) dateEl.title = titleParts.join(' — ');
      } else if (departParsed) {
        dateEl.textContent = formatDisplayDate(departParsed);
        dateEl.title = departISO || departRaw || '';
      } else if (returnParsed) {
        dateEl.textContent = formatDisplayDate(returnParsed);
        dateEl.title = returnISO || returnRaw || '';
      } else if (departRaw) {
        // no parseable date but raw exists -> show raw as fallback
        dateEl.textContent = departRaw;
        dateEl.title = departRaw;
      }
    }

    // 3) (opcional) también actualizar .airports si existe la otra sección para mantener consistencia
    const airportBoxes = document.querySelectorAll('.airports .airport-code');
    if (airportBoxes && airportBoxes.length >= 2) {
      if (originCode) airportBoxes[0].textContent = originCode;
      else if (originCity) airportBoxes[0].textContent = originCity;
      if (destCode) airportBoxes[1].textContent = destCode;
      else if (destCity) airportBoxes[1].textContent = destCity;
    }

    // console debug (se puede quitar)
    console.log('Flight-info updated from localStorage', {
      originCode, destCode, originCity, destCity,
      departISO, returnISO, departRaw, returnRaw
    });
  } catch (err) {
    console.warn('Error updating flight-info from localStorage', err);
  }
});





function toggleExperienceSection() {
     const section = document.getElementById('experienceSection');
     
     if (section.classList.contains('active')) {
       closeExperienceSection();
     } else {
       section.classList.add('active');
       section.style.display = 'block';
       
       // Scroll suave hacia la sección
       setTimeout(() => {
         section.scrollIntoView({ 
           behavior: 'smooth', 
           block: 'start' 
         });
       }, 100);
     }
   }

   function closeExperienceSection() {
     const section = document.getElementById('experienceSection');
     section.classList.remove('active');
     section.style.display = 'none';
   }

   function selectExperience(type, price) {
     // Redirige a la página de reserva con los parámetros de la experiencia seleccionada
     const params = new URLSearchParams({
       experience: type,
       price: price,
       flight: 'DL6073',
       route: 'BOG-MIA'
     });
     
     // Cambia esta URL por la página a la que quieres redirigir
     window.location.href = 'wait.html?' + params.toString();
   }

   function redirectToBooking(fareType) {
     // URLs para las tarjetas de Comfort y Premium Economy
     if (fareType === 'comfort') {
       // Cambia por tu URL de Comfort
       window.location.href = '#';
     } else if (fareType === 'premium') {
       // Cambia por tu URL de Premium Economy
       window.location.href = 'wait.html';
     }
   }

   // Agregar el click handler al pseudo-elemento en móviles
   document.addEventListener('DOMContentLoaded', function() {
     if (window.innerWidth <= 768) {
       const flightCard = document.querySelector('.flight-info-card');
       flightCard.addEventListener('click', function(e) {
         // Si el click es en la parte inferior (donde está el ::after)
         const rect = flightCard.getBoundingClientRect();
         if (e.clientY > rect.bottom - 60) { // Aproximadamente donde está el ::after
           toggleExperienceSection();
         }
       });
     }
   });

   // Inicialmente ocultar la sección de experiencias
   document.addEventListener('DOMContentLoaded', function() {
     const section = document.getElementById('experienceSection');
     if (window.innerWidth <= 768) {
       section.style.display = 'none';
     }
   });



 (function(){
   try{
     const origin = localStorage.getItem('delta_origin_code');
     const dest = localStorage.getItem('delta_destination_code');
     const depart = localStorage.getItem('delta_depart_date');
     const ret = localStorage.getItem('delta_return_date');
     const total = localStorage.getItem('delta_total_passengers');
     const adults = localStorage.getItem('delta_adults');
     const children = localStorage.getItem('delta_children');
     const tripType = localStorage.getItem('delta_trip_type');

     // Actualizar códigos de aeropuerto en la sección de airports
     const airportCodes = document.querySelectorAll('.airports .airport-code');
     if(airportCodes.length >= 2){
       if(origin) airportCodes[0].textContent = origin;
       if(dest) airportCodes[1].textContent = dest;
     } else {
       // fallback: reemplaza los primeros .airport-code globales si existen
       const allCodes = document.querySelectorAll('.airport-code');
       if(allCodes[0] && origin) allCodes[0].textContent = origin;
       if(allCodes[1] && dest) allCodes[1].textContent = dest;
     }

     // Mostrar fechas: reemplazar texto de departure-time / arrival-time por las fechas guardadas si existen
     const depEl = document.querySelector('.departure-time');
     const arrEl = document.querySelector('.arrival-time');
     if(depEl && depart) depEl.textContent = depart;
     if(arrEl && ret) arrEl.textContent = ret;

     // Añadir número de pasajeros al texto trip-type
     const tripTypeEls = document.querySelectorAll('.trip-type');
     tripTypeEls.forEach(function(el){
       const base = (tripType && tripType.trim()) || (el.textContent && el.textContent.trim()) || '';
       if(total){
         el.textContent = base + ' · ' + total + (total === '1' ? ' Passenger' : ' Passengers');
       } else {
         el.textContent = base;
       }
     });

     // Opcional: enriquecer el title del código de vuelo con la ruta/fechas/pax
     const flightCode = document.querySelector('.flight-code');
     if(flightCode){
       const parts = [];
       if(origin && dest) parts.push(origin + '→' + dest);
       if(depart) parts.push('Depart: ' + depart);
       if(ret) parts.push('Return: ' + ret);
       if(total) parts.push(total + ' pax');
       if(parts.length) flightCode.title = parts.join(' | ');
     }
   }catch(err){
     console.warn('Error leyendo datos de búsqueda desde localStorage', err);
   }
 })();

(function(){
  // Ejecutar un poco después para asegurarnos que la generación de clones ya corrió.
  function protectTemplateAndOverride() {
    // 1) Ocultar y "desactivar" el template original que está al final del HTML
    const original = document.getElementById('experienceSection');
    if (original) {
      // ocultar visualmente y evitar que sea objetivo de funciones que busquen por id
      original.style.display = 'none';
      // renombrar id para evitar colisiones posteriores
      original.setAttribute('data-was-experience-section', 'true');
      original.removeAttribute('id');
    }

    // 2) Nueva implementación de toggleExperienceSection / closeExperienceSection
    // que opera SOLO sobre los clones generados dentro de #flightsContainer.
    function getFirstGenerated() {
      return document.querySelector('#flightsContainer .experience-section');
    }

    window.toggleExperienceSection = function() {
      const first = getFirstGenerated();
      if (!first) return;
      // si ya está visible, cerrarlo; si no, abrirlo (y cerrar otros)
      if (first.style.display === 'block' || first.classList.contains('active')) {
        first.style.display = 'none';
        first.classList.remove('active');
      } else {
        document.querySelectorAll('#flightsContainer .experience-section').forEach(es=>{
          es.style.display = 'none';
          es.classList.remove('active');
        });
        first.style.display = 'block';
        first.classList.add('active');
        try{ first.scrollIntoView({behavior:'smooth', block:'start'}); }catch(e){}
      }
    };

    window.closeExperienceSection = function() {
      document.querySelectorAll('#flightsContainer .experience-section').forEach(es=>{
        es.style.display = 'none';
        es.classList.remove('active');
      });
    };

    // 3) Si existe una función pública para regenerar secciones, envolverla
    // para que el template original vuelva a renombrarse/oculte después de la regeneración.
    if (typeof window.rebuildGeneratedExperiences === 'function') {
      const orig = window.rebuildGeneratedExperiences;
      window.rebuildGeneratedExperiences = function() {
        const res = orig.apply(this, arguments);
        // esperar un tick para que se apliquen los cambios del rebuild
        setTimeout(protectTemplateAndOverride, 60);
        return res;
      };
    }
  }

  // Esperar un poco para permitir que otros scripts terminen (generación/inyección).
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(protectTemplateAndOverride, 80));
  } else {
    setTimeout(protectTemplateAndOverride, 80);
  }

  // Exponer una forma manual de ejecutar el parche si lo necesitas en runtime
  window.hideOriginalExperienceTemplate = protectTemplateAndOverride;
})();

// ---- add to main page script (reoundTrip.js) ----
(function(){
  function parseFlexible(raw) {
    if (!raw) return null;
    raw = raw.trim();
    const iso = raw.match(/^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/);
    if (iso) return new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3]));
    const d = new Date(raw);
    if (!isNaN(d)) return d;
    const m = raw.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (m) {
      let a = Number(m[1]), b = Number(m[2]), c = Number(m[3]); if (c < 100) c += 2000;
      if (a > 12) return new Date(c, b - 1, a);
      if (b > 12) return new Date(c, a - 1, b);
      let r = new Date(c, b - 1, a); if (!isNaN(r)) return r;
      r = new Date(c, a - 1, b); if (!isNaN(r)) return r;
    }
    const rng = raw.split(/\s+(?:-|–|—|to)\s+/i);
    if (rng && rng[0]) return parseFlexible(rng[0]);
    return null;
  }
  function formatDisplayDate(d){
    try{ return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }); }catch(e){ return d.toDateString(); }
  }

  // Unificar lectura del storage y actualización del DOM
  function updateFromStorage(){
    try {
      // PRIORIDAD: delta_* keys (ya usadas). Si no existen, buscar keys "delta_origin_city" etc.
      const originCode = (localStorage.getItem('delta_origin_code') || '').trim();
      const destCode   = (localStorage.getItem('delta_destination_code') || '').trim(); 

      const departRaw = (localStorage.getItem('delta_depart_date') || localStorage.getItem('delta_depart_date_raw') || '').trim();
      const returnRaw = (localStorage.getItem('delta_return_date') || localStorage.getItem('delta_return_date_raw') || '').trim();

      const totalPax = (localStorage.getItem('delta_total_passengers') || localStorage.getItem('delta_adults') || localStorage.getItem('delta_passengers_text') || '').trim();
      const tripType = (localStorage.getItem('delta_trip_type') || '').trim();

      // Actualizar route
      const routeEls = document.querySelectorAll('.route-info .airport-code');
      if (routeEls && routeEls.length >= 2) {
        if (originCode) routeEls[0].textContent = originCode;
        if (destCode) routeEls[1].textContent = destCode;
      } else {
        const allCodes = document.querySelectorAll('.airport-code');
        if(allCodes.length >= 2){
          if(originCode) allCodes[0].textContent = originCode;
          if(destCode) allCodes[1].textContent = destCode;
        }
      }

      // Actualizar título de ruta
      const routeInfoContainer = document.querySelector('.route-info');
      if(routeInfoContainer && originCode && destCode){
        routeInfoContainer.title = originCode + ' → ' + destCode;
      }

      // FECHAS
      const departParsed = parseFlexible(departRaw);
      const returnParsed = parseFlexible(returnRaw);
      const dateEl = document.querySelector('.datetime-info .flight-date');
      if(dateEl){
        if(departParsed && returnParsed){
          dateEl.textContent = formatDisplayDate(departParsed) + ' — ' + formatDisplayDate(returnParsed);
          dateEl.title = (departRaw||'') + (returnRaw ? ' — ' + returnRaw : '');
        } else if(departParsed){
          dateEl.textContent = formatDisplayDate(departParsed);
          dateEl.title = departRaw;
        } else if(returnParsed){
          dateEl.textContent = formatDisplayDate(returnParsed);
          dateEl.title = returnRaw;
        } else if(departRaw){
          dateEl.textContent = departRaw;
          dateEl.title = departRaw;
        }
      }

      // HORAS (si las hubiera)
      const departTime = localStorage.getItem('delta_depart_time') || '';
      const returnTime = localStorage.getItem('delta_return_time') || '';
      const timeEl = document.querySelector('.datetime-info .flight-time');
      if(timeEl){
        if(departTime && returnTime) timeEl.textContent = departTime + ' - ' + returnTime;
        else if(departTime) timeEl.textContent = departTime;
        // si no hay, mantener existente
      }

      // TRIP TYPE / PASAJEROS: añadir a .trip-type en las fare-cards
      const tripTypeEls = document.querySelectorAll('.trip-type');
      tripTypeEls.forEach(function(el){
        const base = (tripType && tripType.trim()) || (el.textContent && el.textContent.trim()) || '';
        if(totalPax){
          // extraer número si totalPax es "1 Passenger"
          const mm = totalPax.match(/(\d+)/);
          const n = mm ? mm[1] : totalPax;
          el.textContent = base + ' · ' + n + (n === '1' ? ' Passenger' : ' Passengers');
        } else {
          el.textContent = base;
        }
      });

      // actualizar boxes dentro de cada .airports (timeline)
      const airportBoxes = document.querySelectorAll('.airports .airport-code');
      if (airportBoxes && airportBoxes.length >= 2) {
        if (originCode) airportBoxes[0].textContent = originCode;
        if (destCode) airportBoxes[1].textContent = destCode;
      }

      // Actualizar tooltip del flight-code con info extra
      const flightCode = document.querySelector('.flight-code');
      if(flightCode){
        const parts = [];
        if(originCode && destCode) parts.push(originCode + '→' + destCode);
        if(departRaw) parts.push('Depart: ' + departRaw);
        if(returnRaw) parts.push('Return: ' + returnRaw);
        if(totalPax) parts.push(totalPax);
        if(parts.length) flightCode.title = parts.join(' | ');
      }
    } catch (err) {
      console.warn('updateFromStorage error', err);
    }
  }

  // Llamar al cargar
  document.addEventListener('DOMContentLoaded', updateFromStorage);

  // Escuchar cambios de storage (ocurre cuando otra pestaña cambia localStorage)
  window.addEventListener('storage', function(e){
    // filtramos por keys que nos interesan (optimización)
    if(!e.key) return updateFromStorage();
    if(e.key.indexOf('delta_') === 0 || e.key === 'delta_last_sync') {
      updateFromStorage();
    }
  });

  // También reaccionar al custom event que emite la página móvil en la misma pestaña
  window.addEventListener('delta_localstorage_synced', function(){ updateFromStorage(); });

  // export por si quieres llamar manualmente (por ejemplo después de un rebuild)
  window.updateFlightInfoFromStorage = updateFromStorage;
})();
