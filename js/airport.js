     
                        // Base de datos de aeropuertos de USA
                        const usAirports_xyz = [
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

                        let currentInputType_xyz = null;

                        // Función para abrir el modal
                        function openFlightSearchModal(inputType) {
                            currentInputType_xyz = inputType;
                            
                            // Encontrar el div clickeado
                            const airportInputs = document.querySelectorAll('.airport-input');
                            const clickedDiv = inputType === 'origin' ? airportInputs[0] : airportInputs[1];
                            
                            // Mostrar el overlay de fondo
                            const overlay = document.getElementById('backgroundOverlay_xyz');
                            overlay.style.display = 'block';
                            setTimeout(() => overlay.classList.add('active'), 10);
                            
                            // Posicionar el modal debajo del div clickeado
                            const modal = document.getElementById('flightSearchModal_xyz');
                            const rect = clickedDiv.getBoundingClientRect();
                            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                            
                            // Hacer que el div padre sea relative si no lo es
                            if (getComputedStyle(clickedDiv.parentElement).position === 'static') {
                                clickedDiv.parentElement.style.position = 'relative';
                            }
                            
                            // Posicionar el modal
                            modal.style.position = 'absolute';
                            modal.style.top = (rect.bottom + scrollTop - clickedDiv.parentElement.getBoundingClientRect().top - scrollTop) + 'px';
                            modal.style.left = (rect.left - clickedDiv.parentElement.getBoundingClientRect().left) + 'px';
                            modal.style.width = Math.max(rect.width, 400) + 'px';
                            modal.style.display = 'block';
                            
                            // Agregar el modal al contenedor padre del div clickeado
                            clickedDiv.parentElement.appendChild(modal);
                            
                            // Activar animación del modal
                            setTimeout(() => modal.classList.add('active'), 10);
                            
                            document.getElementById('originInput_xyz').focus();
                        }

                       // Función para cerrar el modal
                        function closeFlightSearchModal() {
                            const modal = document.getElementById('flightSearchModal_xyz');
                            const overlay = document.getElementById('backgroundOverlay_xyz');
                            
                            if (modal && overlay) {
                                // Animar cierre
                                modal.classList.remove('active');
                                overlay.classList.remove('active');
                                
                                // Ocultar después de la animación
                                setTimeout(() => {
                                    modal.style.display = 'none';
                                    overlay.style.display = 'none';
                                }, 300);
                                
                                // Limpiar el input y sugerencias
                                const originInput = document.getElementById('originInput_xyz');
                                const suggestions = document.getElementById('originSuggestions_xyz');
                                const clearBtn = document.querySelector('.clear-input-btn-xyz');
                                
                                if (originInput) originInput.value = '';
                                if (suggestions) {
                                    suggestions.style.display = 'none';
                                    suggestions.innerHTML = '';
                                }
                                if (clearBtn) clearBtn.style.display = 'none';
                                
                                // Resetear el tipo de input actual
                                currentInputType_xyz = null;
                            }
                        }
                        // Función para limpiar el input
                        function clearOriginInput() {
                            document.getElementById('originInput_xyz').value = '';
                            document.getElementById('originSuggestions_xyz').style.display = 'none';
                            document.getElementById('originSuggestions_xyz').innerHTML = '';
                            document.querySelector('.clear-input-btn-xyz').style.display = 'none';
                            document.getElementById('originInput_xyz').focus();
                        }

                        // Función para filtrar aeropuertos
                        function filterAirports(query) {
                            if (!query || query.length < 1) return [];
                            
                            const searchTerm = query.toLowerCase();
                            return usAirports_xyz.filter(airport => 
                                airport.code.toLowerCase().includes(searchTerm) ||
                                airport.city.toLowerCase().includes(searchTerm) ||
                                airport.state.toLowerCase().includes(searchTerm)
                            ).slice(0, 8);
                        }

                        // Función para mostrar sugerencias
                        function showSuggestions(airports) {
                            const container = document.getElementById('originSuggestions_xyz');
                            
                            if (airports.length === 0) {
                                container.style.display = 'none';
                                return;
                            }
                            
                            container.innerHTML = '';
                            
                            airports.forEach(airport => {
                                const item = document.createElement('div');
                                item.className = 'suggestion-item-xyz';
                                item.innerHTML = `
                                    <span class="suggestion-code-xyz">${airport.code}</span>
                                    <span class="suggestion-city-xyz">${airport.city}, ${airport.state}</span>
                                `;
                                
                                item.onclick = () => selectAirport(airport);
                                container.appendChild(item);
                            });
                            
                            container.style.display = 'block';
                        }

                    function selectAirport(airport) {
                        // Obtener todos los divs con clase airport-input
                        const airportInputs = document.querySelectorAll('.airport-input');
                        
                        if (currentInputType_xyz === 'origin') {
                            // Actualizar el primer div (origen)
                            const originDiv = airportInputs[0];
                            if (originDiv) {
                                const codeDiv = originDiv.querySelector('.airport-code');
                                const cityDiv = originDiv.querySelector('.airport-city');
                                
                                if (codeDiv) codeDiv.textContent = airport.code;
                                if (cityDiv) cityDiv.textContent = `${airport.city}, ${airport.state}`;
                            }
                        } else if (currentInputType_xyz === 'destination') {
                            // Actualizar el segundo div (destino)
                            const destinationDiv = airportInputs[1];
                            if (destinationDiv) {
                                const codeDiv = destinationDiv.querySelector('.airport-code');
                                const cityDiv = destinationDiv.querySelector('.airport-city');
                                
                                if (codeDiv) codeDiv.textContent = airport.code;
                                if (cityDiv) cityDiv.textContent = `${airport.city}, ${airport.state}`;
                            }
                        }
                        
                        // Cerrar el modal inmediatamente después de seleccionar
                        closeFlightSearchModal();
                    }
                        // Event listeners
                        document.addEventListener('DOMContentLoaded', function() {
                            // Agregar event listeners a los divs de aeropuerto
                            const airportInputs = document.querySelectorAll('.airport-input');
                            airportInputs.forEach((input, index) => {
                                input.addEventListener('click', function() {
                                    const inputType = index === 0 ? 'origin' : 'destination';
                                    openFlightSearchModal(inputType);
                                });
                            });
                            
                            // Input de búsqueda
                            const searchInput = document.getElementById('originInput_xyz');
                            const clearBtn = document.querySelector('.clear-input-btn-xyz');
                            
                            searchInput.addEventListener('input', function() {
                                const query = this.value.trim();
                                
                                if (query.length > 0) {
                                    clearBtn.style.display = 'flex';
                                    const filteredAirports = filterAirports(query);
                                    showSuggestions(filteredAirports);
                                } else {
                                    clearBtn.style.display = 'none';
                                    document.getElementById('originSuggestions_xyz').style.display = 'none';
                                }
                            });
                            
                            // Cerrar modal con Escape
                            document.addEventListener('keydown', function(e) {
                                if (e.key === 'Escape') {
                                    closeFlightSearchModal();
                                }
                            });
                            
                            // Cerrar modal al hacer clic fuera
                            document.addEventListener('click', function(e) {
                                const modal = document.getElementById('flightSearchModal_xyz');
                                const overlay = document.getElementById('backgroundOverlay_xyz');
                                const airportInputs = document.querySelectorAll('.airport-input');
                                
                                // Verificar si el clic fue en el overlay o fuera del modal y de los divs de aeropuerto
                                if (e.target === overlay || (!modal.contains(e.target) && !Array.from(airportInputs).some(input => input.contains(e.target)))) {
                                    closeFlightSearchModal();
                                }
                            });
                        });