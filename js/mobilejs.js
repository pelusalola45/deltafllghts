 // Add interactive functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Trip type management
            const tripTypeSelector = document.querySelector('.w2q4t_trip_type_selector');
            const tripTypeText = document.querySelector('.d3h8k_trip_type_text');
            const returnWrapper = document.querySelector('.q7f3s_return_wrapper');
            
            const tripTypes = ['Round Trip', 'One Way', 'Multi-City'];
            let currentTripTypeIndex = 0;
            
            tripTypeSelector.addEventListener('click', function() {
                currentTripTypeIndex = (currentTripTypeIndex + 1) % tripTypes.length;
                tripTypeText.textContent = tripTypes[currentTripTypeIndex];
                
                // Show/hide return input based on trip type
                if (tripTypes[currentTripTypeIndex] === 'One Way') {
                    returnWrapper.classList.add('hidden');
                } else {
                    returnWrapper.classList.remove('hidden');
                }
            });

            // Tab navigation
            const tabItems = document.querySelectorAll('.y8u5e_tab_item');
            tabItems.forEach(tab => {
                tab.addEventListener('click', function() {
                    tabItems.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });

            // Checkbox functionality
            const checkboxes = document.querySelectorAll('.h1w9q_checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('click', function() {
                    if (this.style.backgroundColor === 'rgb(229, 62, 62)') {
                        this.style.backgroundColor = 'transparent';
                        this.innerHTML = '';
                    } else {
                        this.style.backgroundColor = '#e53e3e';
                        this.innerHTML = '<i class="fas fa-check" style="color: white; font-size: 12px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></i>';
                    }
                });
            });

            // Dropdown arrows rotation
            const dropdownSelectors = document.querySelectorAll('.i9o6e_passenger_selector, .x7k5n_advanced_search');
            dropdownSelectors.forEach(selector => {
                selector.addEventListener('click', function() {
                    const arrow = this.querySelector('.l5b9x_dropdown_arrow, .m2q6w_advanced_arrow');
                    if (arrow) {
                        const isRotated = arrow.style.transform === 'rotate(180deg)';
                        arrow.style.transform = isRotated ? 'rotate(0deg)' : 'rotate(180deg)';
                    }
                });
            });

            // Date inputs click simulation
            const dateInputs = document.querySelectorAll('.q7f3s_date_input');
            dateInputs.forEach(input => {
                input.addEventListener('click', function() {
                    // Simulate date picker (placeholder functionality)
                    if (this.placeholder === 'Depart') {
                        this.value = 'Today';
                    } else if (this.placeholder === 'Return') {
                        this.value = 'Tomorrow';
                    }
                });
            });

            // Search button click effect
            const searchButton = document.querySelector('.u1n7v_search_button');
            searchButton.addEventListener('click', function() {
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
            });
        });

       const airports = [
    { code: 'ABI', city: 'Abilene', state: 'TX' },
                                { code: 'ABQ', city: 'Albuquerque', state: 'NM' },
                                { code: 'ABR', city: 'Aberdeen', state: 'SD' },
                                { code: 'ABY', city: 'Albany', state: 'GA' },
                                { code: 'ACK', city: 'Nantucket', state: 'MA' },
                                { code: 'ACT', city: 'Waco', state: 'TX' },
                                { code: 'ACV', city: 'Eureka', state: 'CA' },
                                { code: 'ACY', city: 'Atlantic City', state: 'NJ' },
                                { code: 'ADK', city: 'Adak Island', state: 'AK' },
                                { code: 'ADQ', city: 'Kodiak', state: 'AK' },
                                { code: 'AEX', city: 'Alexandria', state: 'LA' },
                                { code: 'AGS', city: 'Augusta', state: 'GA' },
                                { code: 'AKN', city: 'King Salmon', state: 'AK' },
                                { code: 'ALB', city: 'Albany', state: 'NY' },
                                { code: 'ALO', city: 'Waterloo', state: 'IA' },
                                { code: 'AMA', city: 'Amarillo', state: 'TX' },
                                { code: 'ANC', city: 'Anchorage', state: 'AK' },
                                { code: 'APN', city: 'Alpena', state: 'MI' },
                                { code: 'ART', city: 'Watertown', state: 'NY' },
                                { code: 'ASE', city: 'Aspen', state: 'CO' },
                                { code: 'ATL', city: 'Atlanta', state: 'GA' },
                                { code: 'ATW', city: 'Appleton', state: 'WI' },
                                { code: 'AUS', city: 'Austin', state: 'TX' },
                                { code: 'AVL', city: 'Asheville', state: 'NC' },
                                { code: 'AVP', city: 'Scranton', state: 'PA' },
                                { code: 'AZO', city: 'Kalamazoo', state: 'MI' },
                                { code: 'BDL', city: 'Hartford', state: 'CT' },
                                { code: 'BET', city: 'Bethel', state: 'AK' },
                                { code: 'BFL', city: 'Bakersfield', state: 'CA' },
                                { code: 'BGM', city: 'Binghamton', state: 'NY' },
                                { code: 'BGR', city: 'Bangor', state: 'ME' },
                                { code: 'BHM', city: 'Birmingham', state: 'AL' },
                                { code: 'BIL', city: 'Billings', state: 'MT' },
                                { code: 'BIS', city: 'Bismarck', state: 'ND' },
                                { code: 'BJI', city: 'Bemidji', state: 'MN' },
                                { code: 'BLI', city: 'Bellingham', state: 'WA' },
                                { code: 'BMI', city: 'Bloomington', state: 'IL' },
                                { code: 'BNA', city: 'Nashville', state: 'TN' },
                                { code: 'BOI', city: 'Boise', state: 'ID' },
                                { code: 'BOS', city: 'Boston', state: 'MA' },
                                { code: 'BPT', city: 'Beaumont', state: 'TX' },
                                { code: 'BQK', city: 'Brunswick', state: 'GA' },
                                { code: 'BQN', city: 'Aguadilla', state: 'PR' }, // Excluido (PR no es estado)
                                { code: 'BRD', city: 'Brainerd', state: 'MN' },
                                { code: 'BRO', city: 'Brownsville', state: 'TX' },
                                { code: 'BRW', city: 'Barrow', state: 'AK' },
                                { code: 'BTM', city: 'Butte', state: 'MT' },
                                { code: 'BTR', city: 'Baton Rouge', state: 'LA' },
                                { code: 'BTV', city: 'Burlington', state: 'VT' },
                                { code: 'BUF', city: 'Buffalo', state: 'NY' },
                                { code: 'BUR', city: 'Burbank', state: 'CA' },
                                { code: 'BWI', city: 'Baltimore', state: 'MD' },
                                { code: 'BZN', city: 'Bozeman', state: 'MT' },
                                { code: 'CAE', city: 'Columbia', state: 'SC' },
                                { code: 'CAK', city: 'Akron', state: 'OH' },
                                { code: 'CDC', city: 'Cedar City', state: 'UT' },
                                { code: 'CDV', city: 'Cordova', state: 'AK' },
                                { code: 'CEC', city: 'Crescent City', state: 'CA' },
                                { code: 'CHA', city: 'Chattanooga', state: 'TN' },
                                { code: 'CHO', city: 'Charlottesville', state: 'VA' },
                                { code: 'CHS', city: 'Charleston', state: 'SC' },
                                { code: 'CID', city: 'Cedar Rapids', state: 'IA' },
                                { code: 'CIU', city: 'Sault Ste. Marie', state: 'MI' },
                                { code: 'CKB', city: 'Clarksburg', state: 'WV' },
                                { code: 'CLE', city: 'Cleveland', state: 'OH' },
                                { code: 'CLL', city: 'College Station', state: 'TX' },
                                { code: 'CLT', city: 'Charlotte', state: 'NC' },
                                { code: 'CMH', city: 'Columbus', state: 'OH' },
                                { code: 'CMI', city: 'Champaign', state: 'IL' },
                                { code: 'CMX', city: 'Hancock', state: 'MI' },
                                { code: 'CNY', city: 'Moab', state: 'UT' },
                                { code: 'COD', city: 'Cody', state: 'WY' },
                                { code: 'COS', city: 'Colorado Springs', state: 'CO' },
                                { code: 'COU', city: 'Columbia', state: 'MO' },
                                { code: 'CPR', city: 'Casper', state: 'WY' },
                                { code: 'CRP', city: 'Corpus Christi', state: 'TX' },
                                { code: 'CRW', city: 'Charleston', state: 'WV' },
                                { code: 'CSG', city: 'Columbus', state: 'GA' },
                                { code: 'CVG', city: 'Cincinnati', state: 'OH' },
                                { code: 'CWA', city: 'Wausau', state: 'WI' },
                                { code: 'DAB', city: 'Daytona Beach', state: 'FL' },
                                { code: 'DAL', city: 'Dallas', state: 'TX' },
                                { code: 'DAY', city: 'Dayton', state: 'OH' },
                                { code: 'DBQ', city: 'Dubuque', state: 'IA' },
                                { code: 'DCA', city: 'Washington', state: 'DC' },
                                { code: 'DEN', city: 'Denver', state: 'CO' },
                                { code: 'DFW', city: 'Dallas', state: 'TX' },
                                { code: 'DHN', city: 'Dothan', state: 'AL' },
                                { code: 'DIK', city: 'Dickinson', state: 'ND' },
                                { code: 'DLG', city: 'Dillingham', state: 'AK' },
                                { code: 'DLH', city: 'Duluth', state: 'MN' },
                                { code: 'DRO', city: 'Durango', state: 'CO' },
                                { code: 'DSM', city: 'Des Moines', state: 'IA' },
                                { code: 'DTW', city: 'Detroit', state: 'MI' },
                                { code: 'DUT', city: 'Dutch Harbor', state: 'AK' },
                                { code: 'EAU', city: 'Eau Claire', state: 'WI' },
                                { code: 'ECP', city: 'Panama City', state: 'FL' },
                                { code: 'EGE', city: 'Eagle', state: 'CO' },
                                { code: 'EKO', city: 'Elko', state: 'NV' },
                                { code: 'ELD', city: 'El Dorado', state: 'AR' },
                                { code: 'ELM', city: 'Elmira', state: 'NY' },
                                { code: 'ELP', city: 'El Paso', state: 'TX' },
                                { code: 'ERI', city: 'Erie', state: 'PA' },
                                { code: 'ESC', city: 'Escanaba', state: 'MI' },
                                { code: 'EUG', city: 'Eugene', state: 'OR' },
                                { code: 'EVV', city: 'Evansville', state: 'IN' },
                                { code: 'EWN', city: 'New Bern', state: 'NC' },
                                { code: 'EWR', city: 'Newark', state: 'NJ' },
                                { code: 'EYW', city: 'Key West', state: 'FL' },
                                { code: 'FAI', city: 'Fairbanks', state: 'AK' },
                                { code: 'FAR', city: 'Fargo', state: 'ND' },
                                { code: 'FAT', city: 'Fresno', state: 'CA' },
                                { code: 'FAY', city: 'Fayetteville', state: 'NC' },
                                { code: 'FCA', city: 'Kalispell', state: 'MT' },
                                { code: 'FLG', city: 'Flagstaff', state: 'AZ' },
                                { code: 'FLL', city: 'Fort Lauderdale', state: 'FL' },
                                { code: 'FLO', city: 'Florence', state: 'SC' },
                                { code: 'FNT', city: 'Flint', state: 'MI' },
                                { code: 'FSD', city: 'Sioux Falls', state: 'SD' },
                                { code: 'FSM', city: 'Fort Smith', state: 'AR' },
                                { code: 'FWA', city: 'Fort Wayne', state: 'IN' },
                                { code: 'GCC', city: 'Gillette', state: 'WY' },
                                { code: 'GCK', city: 'Garden City', state: 'KS' },
                                { code: 'GEG', city: 'Spokane', state: 'WA' },
                                { code: 'GFK', city: 'Grand Forks', state: 'ND' },
                                { code: 'GGG', city: 'Longview', state: 'TX' },
                                { code: 'GJT', city: 'Grand Junction', state: 'CO' },
                                { code: 'GNV', city: 'Gainesville', state: 'FL' },
                                { code: 'GPT', city: 'Gulfport', state: 'MS' },
                                { code: 'GRB', city: 'Green Bay', state: 'WI' },
                                { code: 'GRI', city: 'Grand Island', state: 'NE' },
                                { code: 'GRK', city: 'Killeen', state: 'TX' },
                                { code: 'GRR', city: 'Grand Rapids', state: 'MI' },
                                { code: 'GSO', city: 'Greensboro', state: 'NC' },
                                { code: 'GSP', city: 'Greenville', state: 'SC' },
                                { code: 'GST', city: 'Gustavus', state: 'AK' },
                                { code: 'GTF', city: 'Great Falls', state: 'MT' },
                                { code: 'GTR', city: 'Columbus', state: 'MS' },
                                { code: 'GUC', city: 'Gunnison', state: 'CO' },
                                { code: 'HDN', city: 'Hayden', state: 'CO' },
                                { code: 'HIB', city: 'Hibbing', state: 'MN' },
                                { code: 'HLN', city: 'Helena', state: 'MT' },
                                { code: 'HNL', city: 'Honolulu', state: 'HI' },
                                { code: 'HOB', city: 'Hobbs', state: 'NM' },
                                { code: 'HOU', city: 'Houston', state: 'TX' },
                                { code: 'HPN', city: 'White Plains', state: 'NY' },
                                { code: 'HRL', city: 'Harlingen', state: 'TX' },
                                { code: 'HSV', city: 'Huntsville', state: 'AL' },
                                { code: 'HTS', city: 'Huntington', state: 'WV' },
                                { code: 'HVN', city: 'New Haven', state: 'CT' },
                                { code: 'HXD', city: 'Hilton Head', state: 'SC' },
                                { code: 'HYA', city: 'Hyannis', state: 'MA' },
                                { code: 'IAD', city: 'Washington', state: 'VA' },
                                { code: 'IAH', city: 'Houston', state: 'TX' },
                                { code: 'ICT', city: 'Wichita', state: 'KS' },
                                { code: 'IDA', city: 'Idaho Falls', state: 'ID' },
                                { code: 'ILG', city: 'Wilmington', state: 'DE' },
                                { code: 'ILM', city: 'Wilmington', state: 'NC' },
                                { code: 'IMT', city: 'Iron Mountain', state: 'MI' },
                                { code: 'IND', city: 'Indianapolis', state: 'IN' },
                                { code: 'INL', city: 'International Falls', state: 'MN' },
                                { code: 'ISN', city: 'Williston', state: 'ND' },
                                { code: 'ISP', city: 'Islip', state: 'NY' },
                                { code: 'ITH', city: 'Ithaca', state: 'NY' },
                                { code: 'ITO', city: 'Hilo', state: 'HI' },
                                { code: 'IYK', city: 'Inyokern', state: 'CA' },
                                { code: 'JAC', city: 'Jackson', state: 'WY' },
                                { code: 'JAN', city: 'Jackson', state: 'MS' },
                                { code: 'JAX', city: 'Jacksonville', state: 'FL' },
                                { code: 'JFK', city: 'New York', state: 'NY' },
                                { code: 'JLN', city: 'Joplin', state: 'MO' },
                                { code: 'JMS', city: 'Jamestown', state: 'ND' },
                                { code: 'JNU', city: 'Juneau', state: 'AK' },
                                { code: 'KOA', city: 'Kailua-Kona', state: 'HI' },
                                { code: 'KTN', city: 'Ketchikan', state: 'AK' },
                                { code: 'LAN', city: 'Lansing', state: 'MI' },
                                { code: 'LAR', city: 'Laramie', state: 'WY' },
                                { code: 'LAS', city: 'Las Vegas', state: 'NV' },
                                { code: 'LAW', city: 'Lawton', state: 'OK' },
                                { code: 'LAX', city: 'Los Angeles', state: 'CA' },
                                { code: 'LBB', city: 'Lubbock', state: 'TX' },
                                { code: 'LBE', city: 'Latrobe', state: 'PA' },
                                { code: 'LBF', city: 'North Platte', state: 'NE' },
                                { code: 'LBL', city: 'Liberal', state: 'KS' },
                                { code: 'LCH', city: 'Lake Charles', state: 'LA' },
                                { code: 'LEX', city: 'Lexington', state: 'KY' },
                                { code: 'LFT', city: 'Lafayette', state: 'LA' },
                                { code: 'LGA', city: 'New York', state: 'NY' },
                                { code: 'LGB', city: 'Long Beach', state: 'CA' },
                                { code: 'LIH', city: 'Lihue', state: 'HI' },
                                { code: 'LIT', city: 'Little Rock', state: 'AR' },
                                { code: 'LNK', city: 'Lincoln', state: 'NE' },
                                { code: 'LNS', city: 'Lancaster', state: 'PA' },
                                { code: 'LRD', city: 'Laredo', state: 'TX' },
                                { code: 'LSE', city: 'La Crosse', state: 'WI' },
                                { code: 'LWS', city: 'Lewiston', state: 'ID' },
                                { code: 'LYH', city: 'Lynchburg', state: 'VA' },
                                { code: 'MAF', city: 'Midland', state: 'TX' },
                                { code: 'MBS', city: 'Saginaw', state: 'MI' },
                                { code: 'MCE', city: 'Merced', state: 'CA' },
                                { code: 'MCI', city: 'Kansas City', state: 'MO' },
                                { code: 'MCN', city: 'Macon', state: 'GA' },
                                { code: 'MCO', city: 'Orlando', state: 'FL' },
                                { code: 'MDT', city: 'Harrisburg', state: 'PA' },
                                { code: 'MDW', city: 'Chicago', state: 'IL' },
                                { code: 'MEI', city: 'Meridian', state: 'MS' },
                                { code: 'MEM', city: 'Memphis', state: 'TN' },
                                { code: 'MFE', city: 'McAllen', state: 'TX' },
                                { code: 'MFR', city: 'Medford', state: 'OR' },
                                { code: 'MGM', city: 'Montgomery', state: 'AL' },
                                { code: 'MGW', city: 'Morgantown', state: 'WV' },
                                { code: 'MHK', city: 'Manhattan', state: 'KS' },
                                { code: 'MHT', city: 'Manchester', state: 'NH' },
                                { code: 'MIA', city: 'Miami', state: 'FL' },
                                { code: 'MKE', city: 'Milwaukee', state: 'WI' },
                                { code: 'MKG', city: 'Muskegon', state: 'MI' },
                                { code: 'MLB', city: 'Melbourne', state: 'FL' },
                                { code: 'MLI', city: 'Moline', state: 'IL' },
                                { code: 'MLU', city: 'Monroe', state: 'LA' },
                                { code: 'MMH', city: 'Mammoth Lakes', state: 'CA' },
                                { code: 'MOB', city: 'Mobile', state: 'AL' },
                                { code: 'MOD', city: 'Modesto', state: 'CA' },
                                { code: 'MOT', city: 'Minot', state: 'ND' },
                                { code: 'MQT', city: 'Marquette', state: 'MI' },
                                { code: 'MRY', city: 'Monterey', state: 'CA' },
                                { code: 'MSL', city: 'Muscle Shoals', state: 'AL' },
                                { code: 'MSN', city: 'Madison', state: 'WI' },
                                { code: 'MSO', city: 'Missoula', state: 'MT' },
                                { code: 'MSP', city: 'Minneapolis', state: 'MN' },
                                { code: 'MSY', city: 'New Orleans', state: 'LA' },
                                { code: 'MTJ', city: 'Montrose', state: 'CO' },
                                { code: 'MVY', city: 'Martha\'s Vineyard', state: 'MA' },
                                { code: 'MYR', city: 'Myrtle Beach', state: 'SC' },
                                { code: 'OAJ', city: 'Jacksonville', state: 'NC' },
                                { code: 'OAK', city: 'Oakland', state: 'CA' },
                                { code: 'OGG', city: 'Kahului', state: 'HI' },
                                { code: 'OKC', city: 'Oklahoma City', state: 'OK' },
                                { code: 'OMA', city: 'Omaha', state: 'NE' },
                                { code: 'OME', city: 'Nome', state: 'AK' },
                                { code: 'ONT', city: 'Ontario', state: 'CA' },
                                { code: 'ORD', city: 'Chicago', state: 'IL' },
                                { code: 'ORF', city: 'Norfolk', state: 'VA' },
                                { code: 'ORH', city: 'Worcester', state: 'MA' },
                                { code: 'OTH', city: 'North Bend', state: 'OR' },
                                { code: 'OTZ', city: 'Kotzebue', state: 'AK' },
                                { code: 'OXR', city: 'Oxnard', state: 'CA' },
                                { code: 'PAE', city: 'Everett', state: 'WA' },
                                { code: 'PAH', city: 'Paducah', state: 'KY' },
                                { code: 'PBG', city: 'Plattsburgh', state: 'NY' },
                                { code: 'PBI', city: 'West Palm Beach', state: 'FL' },
                                { code: 'PDK', city: 'Atlanta', state: 'GA' }, // DeKalb-Peachtree (comercial)
                                { code: 'PDT', city: 'Pendleton', state: 'OR' },
                                { code: 'PDX', city: 'Portland', state: 'OR' },
                                { code: 'PFN', city: 'Panama City', state: 'FL' },
                                { code: 'PHF', city: 'Newport News', state: 'VA' },
                                { code: 'PHL', city: 'Philadelphia', state: 'PA' },
                                { code: 'PHX', city: 'Phoenix', state: 'AZ' },
                                { code: 'PIA', city: 'Peoria', state: 'IL' },
                                { code: 'PIB', city: 'Hattiesburg', state: 'MS' },
                                { code: 'PIE', city: 'St. Petersburg', state: 'FL' },
                                { code: 'PIH', city: 'Pocatello', state: 'ID' },
                                { code: 'PIR', city: 'Pierre', state: 'SD' },
                                { code: 'PIT', city: 'Pittsburgh', state: 'PA' },
                                { code: 'PLN', city: 'Pellston', state: 'MI' },
                                { code: 'PNS', city: 'Pensacola', state: 'FL' },
                                { code: 'PPG', city: 'Pago Pago', state: 'AS' }, // Excluido (Samoa Americana no es estado)
                                { code: 'PSC', city: 'Pasco', state: 'WA' },
                                { code: 'PSE', city: 'Ponce', state: 'PR' }, // Excluido (PR)
                                { code: 'PSG', city: 'Petersburg', state: 'AK' },
                                { code: 'PSM', city: 'Portsmouth', state: 'NH' },
                                { code: 'PSP', city: 'Palm Springs', state: 'CA' },
                                { code: 'PUB', city: 'Pueblo', state: 'CO' },
                                { code: 'PVD', city: 'Providence', state: 'RI' },
                                { code: 'PWM', city: 'Portland', state: 'ME' },
                                { code: 'RAP', city: 'Rapid City', state: 'SD' },
                                { code: 'RDD', city: 'Redding', state: 'CA' },
                                { code: 'RDM', city: 'Redmond', state: 'OR' },
                                { code: 'RDU', city: 'Raleigh', state: 'NC' },
                                { code: 'RFD', city: 'Rockford', state: 'IL' },
                                { code: 'RHI', city: 'Rhinelander', state: 'WI' },
                                { code: 'RIC', city: 'Richmond', state: 'VA' },
                                { code: 'RKS', city: 'Rock Springs', state: 'WY' },
                                { code: 'RNO', city: 'Reno', state: 'NV' },
                                { code: 'ROA', city: 'Roanoke', state: 'VA' },
                                { code: 'ROC', city: 'Rochester', state: 'NY' },
                                { code: 'ROW', city: 'Roswell', state: 'NM' },
                                { code: 'RST', city: 'Rochester', state: 'MN' },
                                { code: 'RSW', city: 'Fort Myers', state: 'FL' },
                                { code: 'SAF', city: 'Santa Fe', state: 'NM' },
                                { code: 'SAN', city: 'San Diego', state: 'CA' },
                                { code: 'SAT', city: 'San Antonio', state: 'TX' },
                                { code: 'SAV', city: 'Savannah', state: 'GA' },
                                { code: 'SBA', city: 'Santa Barbara', state: 'CA' },
                                { code: 'SBN', city: 'South Bend', state: 'IN' },
                                { code: 'SBP', city: 'San Luis Obispo', state: 'CA' },
                                { code: 'SCC', city: 'Deadhorse', state: 'AK' },
                                { code: 'SCE', city: 'State College', state: 'PA' },
                                { code: 'SDF', city: 'Louisville', state: 'KY' },
                                { code: 'SEA', city: 'Seattle', state: 'WA' },
                                { code: 'SFB', city: 'Orlando', state: 'FL' },
                                { code: 'SFO', city: 'San Francisco', state: 'CA' },
                                { code: 'SGF', city: 'Springfield', state: 'MO' },
                                { code: 'SGU', city: 'St. George', state: 'UT' },
                                { code: 'SHV', city: 'Shreveport', state: 'LA' },
                                { code: 'SIT', city: 'Sitka', state: 'AK' },
                                { code: 'SJC', city: 'San Jose', state: 'CA' },
                                { code: 'SJT', city: 'San Angelo', state: 'TX' },
                                { code: 'SJU', city: 'San Juan', state: 'PR' }, // Excluido (PR)
                                { code: 'SLC', city: 'Salt Lake City', state: 'UT' },
                                { code: 'SLE', city: 'Salem', state: 'OR' },
                                { code: 'SMF', city: 'Sacramento', state: 'CA' },
                                { code: 'SMX', city: 'Santa Maria', state: 'CA' },
                                { code: 'SNA', city: 'Santa Ana', state: 'CA' },
                                { code: 'SPI', city: 'Springfield', state: 'IL' },
                                { code: 'SPS', city: 'Wichita Falls', state: 'TX' },
                                { code: 'SRQ', city: 'Sarasota', state: 'FL' },
                                { code: 'STC', city: 'St. Cloud', state: 'MN' },
                                { code: 'STL', city: 'St. Louis', state: 'MO' },
                                { code: 'STT', city: 'Charlotte Amalie', state: 'VI' }, // Excluido (Islas Vírgenes)
                                { code: 'STX', city: 'Christiansted', state: 'VI' }, // Excluido (Islas Vírgenes)
                                { code: 'SUN', city: 'Hailey', state: 'ID' },
                                { code: 'SUX', city: 'Sioux City', state: 'IA' },
                                { code: 'SWF', city: 'Newburgh', state: 'NY' },
                                { code: 'SYR', city: 'Syracuse', state: 'NY' },
                                { code: 'TBN', city: 'Fort Leonard Wood', state: 'MO' },
                                { code: 'TCL', city: 'Tuscaloosa', state: 'AL' },
                                { code: 'TEX', city: 'Telluride', state: 'CO' },
                                { code: 'TLH', city: 'Tallahassee', state: 'FL' },
                                { code: 'TOL', city: 'Toledo', state: 'OH' },
                                { code: 'TPA', city: 'Tampa', state: 'FL' },
                                { code: 'TRI', city: 'Bristol', state: 'TN' },
                                { code: 'TTN', city: 'Trenton', state: 'NJ' },
                                { code: 'TUL', city: 'Tulsa', state: 'OK' },
                                { code: 'TUP', city: 'Tupelo', state: 'MS' },
                                { code: 'TUS', city: 'Tucson', state: 'AZ' },
                                { code: 'TVC', city: 'Traverse City', state: 'MI' },
                                { code: 'TWF', city: 'Twin Falls', state: 'ID' },
                                { code: 'TXK', city: 'Texarkana', state: 'AR' },
                                { code: 'TYR', city: 'Tyler', state: 'TX' },
                                { code: 'TYS', city: 'Knoxville', state: 'TN' },
                                { code: 'VEL', city: 'Vernal', state: 'UT' },
                                { code: 'VLD', city: 'Valdosta', state: 'GA' },
                                { code: 'VPS', city: 'Destin', state: 'FL' },
                                { code: 'WRG', city: 'Wrangell', state: 'AK' },
                                { code: 'WYS', city: 'West Yellowstone', state: 'MT' },
                                { code: 'XNA', city: 'Fayetteville', state: 'AR' },
                                { code: 'YAK', city: 'Yakutat', state: 'AK' },
                                { code: 'YUM', city: 'Yuma', state: 'AZ' },
                                { code: 'EIS', city: 'Road Town', state: 'VG' },
                                { code: 'TOV', city: 'West End', state: 'VG' }, 
                                { code: 'PPG', city: 'Pago Pago', state: 'AS' },
                                { code: 'FGI', city: 'Fagali\'i', state: 'AS' },
                                { code: 'GUM', city: 'Hagåtña', state: 'GU' },
                                { code: 'UAM', city: 'Yigo', state: 'GU' },
                                { code: 'STT', city: 'Charlotte Amalie', state: 'VI' },
                                { code: 'STX', city: 'Christiansted', state: 'VI' },
                                { code: 'SPB', city: 'Charlotte Amalie', state: 'VI' },
                                { code: 'VIJ', city: 'Spanish Town', state: 'VI' },
                                { code: 'SJU', city: 'San Juan', state: 'PR' },
                                { code: 'BQN', city: 'Aguadilla', state: 'PR' },
                                { code: 'PSE', city: 'Ponce', state: 'PR' },
                                { code: 'MAZ', city: 'Mayagüez', state: 'PR' },
                                { code: 'VQS', city: 'Vieques', state: 'PR' },
                                { code: 'CPX', city: 'Culebra', state: 'PR' }
];

let currentSelectionType = null;
const modal = document.getElementById('airport_search_modal');
const searchInput = document.getElementById('airport_search_input');
const suggestionsBox = document.getElementById('airport_suggestions');

// Abrir buscador al hacer clic en From / To
document.querySelectorAll('.c8v4b_destination_label').forEach(label => {
    label.addEventListener('click', () => {
        currentSelectionType = label.dataset.type;
        modal.style.display = 'flex';
        searchInput.value = '';
        suggestionsBox.innerHTML = '';
        searchInput.focus();
    });
});

// Filtrar resultados
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsBox.innerHTML = '';

    if (!query) return;

    const filtered = airports.filter(a =>
        a.city.toLowerCase().includes(query) ||
        a.code.toLowerCase().includes(query) ||
        a.state.toLowerCase().includes(query)
    );

    filtered.forEach(a => {
        const div = document.createElement('div');
        div.textContent = `${a.city}, ${a.state} (${a.code})`;
        div.addEventListener('click', () => {
            document.querySelector(`.c8v4b_destination_label[data-type="${currentSelectionType}"]`).textContent =
                `${a.city} (${a.code})`;
            modal.style.display = 'none';
        });
        suggestionsBox.appendChild(div);
    });
});

// Cerrar modal al hacer clic fuera
modal.addEventListener('click', e => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const passengerSelector = document.querySelector('.i9o6e_passenger_selector');
    const passengerText = document.querySelector('.v8c1x_passenger_text');

    const dropdown = document.createElement('div');
    dropdown.classList.add('passenger_dropdown');
    dropdown.style.position = 'absolute';
    dropdown.style.background = '#fff';
    dropdown.style.border = '1px solid #ccc';
    dropdown.style.borderRadius = '6px';
    dropdown.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
    dropdown.style.padding = '5px 0';
    dropdown.style.display = 'none';
    dropdown.style.zIndex = '1000';

    // Heredar fuente, pero color fijo negro
    const computedStyle = window.getComputedStyle(passengerText);
    dropdown.style.fontFamily = computedStyle.fontFamily;
    dropdown.style.fontSize = computedStyle.fontSize;
    dropdown.style.fontWeight = computedStyle.fontWeight;
    dropdown.style.color = '#000';

    for (let i = 1; i <= 9; i++) {
        const option = document.createElement('div');
        option.textContent = i + (i === 1 ? ' Passenger' : ' Passengers');

        // Fuente heredada, color negro fijo
        option.style.fontFamily = computedStyle.fontFamily;
        option.style.fontSize = computedStyle.fontSize;
        option.style.fontWeight = computedStyle.fontWeight;
        option.style.color = '#000';

        option.style.padding = '8px 12px';
        option.style.cursor = 'pointer';

        option.addEventListener('mouseover', () => {
            option.style.background = '#f0f0f0';
        });
        option.addEventListener('mouseout', () => {
            option.style.background = '';
        });
        option.addEventListener('click', () => {
            passengerText.textContent = option.textContent;
            dropdown.style.display = 'none';
        });
        dropdown.appendChild(option);
    }

    document.body.appendChild(dropdown);

    passengerSelector.addEventListener('click', () => {
        const rect = passengerSelector.getBoundingClientRect();
        dropdown.style.top = rect.bottom + window.scrollY + 'px';
        dropdown.style.left = rect.left + window.scrollX + 'px';
        dropdown.style.width = rect.width + 'px';
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', (e) => {
        if (!passengerSelector.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
  // Botón (usa tu id actual)
  const searchButton = document.getElementById('u1n7v_search_button') ||
                       document.querySelector('.u1n7v_search_button') ||
                       document.querySelector('button.u1n7v_search_button');

  if (!searchButton) {
    console.error('No se encontró el botón de búsqueda (id u1n7v_search_button).');
    return;
  }

  // Labels origen/destino (tus data-type)
  const fromLabel = document.querySelector('[data-type="from"]');
  const toLabel = document.querySelector('[data-type="to"]');
  const passengerText = document.querySelector('.v8c1x_passenger_text');

  // Buscar input depart: por id, placeholder o clase
  const departInput = document.getElementById('depart_date') ||
                      document.querySelector('input[placeholder="Depart"]') ||
                      document.querySelector('.q7f3s_date_wrapper input[type="date"]') ||
                      document.querySelector('.q7f3s_date_input');

  // Buscar input return: por id, placeholder, wrapper o segundo input date disponible
  const returnInput = document.getElementById('return_date') ||
                      document.querySelector('input[placeholder="Return"]') ||
                      document.querySelector('.q7f3s_return_wrapper input[type="date"]') ||
                      (function(){
                        const all = document.querySelectorAll('input[type="date"], .q7f3s_date_input');
                        return all.length > 1 ? all[1] : null;
                      })();

  searchButton.addEventListener('click', function (e) {
    e.preventDefault();

    // Validación básica: chequear existencia de elementos
    const missing = [];
    if (!fromLabel) missing.push('Origen (data-type="from")');
    if (!toLabel) missing.push('Destino (data-type="to")');
    if (!departInput) missing.push('Fecha Depart');
    if (!passengerText) missing.push('Pasajeros');

    if (missing.length) {
      alert('Faltan campos en la página: ' + missing.join(', ') + '. Revisa la consola para más detalles.');
      console.warn('Elementos faltantes:', { fromLabel, toLabel, departInput, returnInput, passengerText });
      return;
    }

    // Leer valores de forma segura
    const from = fromLabel.textContent.trim();
    const to = toLabel.textContent.trim();
    const departDate = departInput && departInput.value ? departInput.value.trim() : '';
    const returnDate = returnInput && returnInput.value ? returnInput.value.trim() : '';
    const passengers = passengerText.textContent.trim();

    // Validaciones finales
    if (!from || from === 'Your Origin' || !to || to === 'Your Destination') {
      alert('Selecciona origen y destino.');
      return;
    }
    if (!departDate) {
      alert('Selecciona la fecha de salida (Depart).');
      return;
    }
    if (!passengers) {
      alert('Selecciona el número de pasajeros.');
      return;
    }

    // URLs — cámbialas por las reales
    const soloIdaUrl = 'one-way-results.html';
    const idaVueltaUrl = 'round-trip-results.html';

    // Redirigir según haya o no fecha de regreso
    const targetUrl = returnDate ? idaVueltaUrl : soloIdaUrl;
    window.location.href = targetUrl;
  });
});


// mobilejs.js
(function(){
  // Helpers
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  function set(k,v){ try{ localStorage.setItem(k, v); }catch(e){console.warn('ls set err',e);} }
  function getText(el){ return el ? (el.textContent || el.value || '').trim() : ''; }
  function toISO(dateInputVal){
    // Si es input[type=date] ya viene YYYY-MM-DD
    if(!dateInputVal) return '';
    return dateInputVal;
  }

  // Selectores importantes en tu HTML móvil
  const originLabel = document.querySelector('.c8v4b_destination_label[data-type="from"]');
  const destLabel   = document.querySelector('.c8v4b_destination_label[data-type="to"]');
  const dateInputs  = document.querySelectorAll('.q7f3s_date_input'); // [0]=depart, [1]=return si existe
  const tripTypeEl  = document.querySelector('.d3h8k_trip_type_text');
  const paxEl       = document.querySelector('.v8c1x_passenger_text');
  const swapBtn     = document.querySelector('.j6n1m_swap_button');
  const searchBtn   = document.querySelector('.u1n7v_search_button');

  function syncAllToLocalStorage(){
  // ORIGIN
  const originText = getText(originLabel);
  let originCode = originText;
  const matchOrigin = originText.match(/\(([A-Z]{3})\)$/); // busca (BOG)
  if (matchOrigin) originCode = matchOrigin[1];
  if(originCode) {
    set('delta_origin_code', originCode);
  }

  // DEST
  const destText = getText(destLabel);
  let destCode = destText;
  const matchDest = destText.match(/\(([A-Z]{3})\)$/);
  if (matchDest) destCode = matchDest[1];
  if(destCode) {
    set('delta_destination_code', destCode);
  }

  // FECHAS
  const departVal = dateInputs[0] ? dateInputs[0].value : '';
  const returnVal = dateInputs[1] ? dateInputs[1].value : '';
  if(departVal) {
    set('delta_depart_date', toISO(departVal));
  }
  if(returnVal) {
    set('delta_return_date', toISO(returnVal));
  }

  // TRIP TYPE
  const tripTypeText = getText(tripTypeEl);
  if(tripTypeText) set('delta_trip_type', tripTypeText);

  // PASSENGERS
  const paxText = getText(paxEl);
  if(paxText){
    const m = paxText.match(/(\d+)/);
    const n = m ? m[1] : '';
    if(n) set('delta_total_passengers', n);
  }

  set('delta_last_sync', new Date().toISOString());
  window.dispatchEvent(new CustomEvent('delta_localstorage_synced'));
}


  // Escuchar cambios interactivos (clicks, cambios en inputs, etc.)
  function attachListeners(){
    if(originLabel) originLabel.addEventListener('click', syncAllToLocalStorage); // si abres modal y eliges, asegúrate de llamar syncAllToLocalStorage al seleccionar
    if(destLabel) destLabel.addEventListener('click', syncAllToLocalStorage);
    if(swapBtn) swapBtn.addEventListener('click', function(){
      // intercambiar visualmente y guardarlo
      const o = getText(originLabel); const d = getText(destLabel);
      if(originLabel && destLabel){
        originLabel.textContent = d || originLabel.textContent;
        destLabel.textContent = o || destLabel.textContent;
      }
      syncAllToLocalStorage();
    });
    if(dateInputs && dateInputs.length){
      dateInputs.forEach(inp => inp.addEventListener('change', syncAllToLocalStorage));
    }
    if(paxEl) paxEl.addEventListener('click', syncAllToLocalStorage); // si abres selector, al confirmar llama a sync
    if(tripTypeEl) tripTypeEl.addEventListener('click', syncAllToLocalStorage);
    if(searchBtn) searchBtn.addEventListener('click', syncAllToLocalStorage);
    // si tienes un modal de búsqueda de aeropuertos, cada vez que se elija un resultado Llamar syncAllToLocalStorage
    const airportSuggestions = document.getElementById('airport_suggestions');
    if(airportSuggestions){
      airportSuggestions.addEventListener('click', function(e){
        // suponiendo que al hacer click en una sugerencia actualizas .c8v4b_destination_label
        setTimeout(syncAllToLocalStorage, 50);
      });
    }
  }

  // Inicializar: sincronizar al cargar
  document.addEventListener('DOMContentLoaded', function(){
    attachListeners();
    // una inicial para que si la página móvil se abre con valores por defecto los ponga en localStorage
    syncAllToLocalStorage();
    // opcional: sincronizar periódicamente (cada 5s) mientras el usuario está en la página
    // const tid = setInterval(syncAllToLocalStorage, 5000);
    // window.addEventListener('beforeunload', ()=> clearInterval(tid));
  });
})();
