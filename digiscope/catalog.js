'use strict';
const APP_VERSION='1.0.0';
const STORAGE_KEY='digiscope-v1-project';
const MODE_KEY='digiscope-v1-mode';
const SENSOR_CATALOG={
  ieq:{domain:'IEQ',layer:'Outcome',use:'Qualità ambientale rappresentativa',model:'AirGradient ONE I-9PSL',connect:'Wi‑Fi local-first',price:245.49,effort:'E1',minutes:10,recovery:95,decision:'Ventilazione, purificazione, comfort e correlazione energia–occupancy.'},
  outdoor:{domain:'IEQ',layer:'Context',use:'Riferimento aria esterna',model:'AirGradient Open Air O-1PST',connect:'Wi‑Fi local-first',price:240.16,effort:'E1',minutes:15,recovery:95,decision:'Distingue sorgenti indoor/outdoor e misura efficacia della ventilazione.'},
  sound:{domain:'IEQ',layer:'Outcome',use:'Comfort acustico campione',model:'Milesight WS302 EU868',connect:'LoRaWAN',price:63.44,effort:'E1',minutes:8,recovery:98,decision:'Individua aree rumorose senza registrare audio.'},
  light:{domain:'IEQ',layer:'Outcome',use:'Lux e attività',model:'Milesight WS202 EU868',connect:'LoRaWAN',price:53.68,effort:'E1',minutes:8,recovery:98,decision:'Task lighting, daylight e spegnimenti su spazi vuoti.'},
  room:{domain:'Space',layer:'Context',use:'Presenza statica sale',model:'Milesight VS370 EU868',connect:'LoRaWAN',price:119.56,effort:'E1',minutes:10,recovery:98,decision:'No-show, HVAC e illuminazione su presenza reale.'},
  desk:{domain:'Space',layer:'Context',use:'Campione occupancy desk',model:'Milesight VS341 EU868',connect:'LoRaWAN',price:87.84,effort:'E1',minutes:8,recovery:98,decision:'Desk sharing, cleaning e footprint.'},
  people:{domain:'Space',layer:'Context',use:'Conteggio flussi principali',model:'Milesight VS133-P ToF',connect:'PoE/Ethernet',price:816.06,effort:'E2',minutes:60,recovery:90,decision:'Picchi, densità e dimensionamento servizi. ToF only, no video retention.'},
  energy:{domain:'Energy',layer:'Source',use:'Choke point energia temporanei',model:'Shelly Pro 3EM 120A',connect:'Wi‑Fi/LAN/Modbus',price:161.98,effort:'E2',minutes:75,recovery:85,decision:'Base load, picchi, costo per ora occupata e saving verificato.'},
  vibration:{domain:'Maintenance',layer:'Source',use:'Asset rotanti critici',model:'Advantech WISE-2410-EB',connect:'LoRaWAN',price:498.13,effort:'E1',minutes:12,recovery:98,decision:'Firma vibrazionale, anomaly score e ispezione anticipata.'},
  dp:{domain:'Maintenance',layer:'Source',use:'Filtri / UTA critiche',model:'Synetica enLink Status-DP',connect:'LoRaWAN',price:317.34,effort:'E2',minutes:45,recovery:95,decision:'Sostituzione filtro su condizione e fan efficiency.'},
  leak:{domain:'Risk',layer:'Risk',use:'Punti acqua ad alto impatto',model:'Shelly Flood S Gen4',connect:'Wi‑Fi/Zigbee/BLE',price:19.48,effort:'E1',minutes:5,recovery:95,decision:'Leak-to-ticket, escalation e prevenzione danni.'},
  state:{domain:'Risk',layer:'Risk',use:'Porte, finestre e locali tecnici',model:'Milesight EM300-MCS',connect:'LoRaWAN',price:85.40,effort:'E1',minutes:8,recovery:98,decision:'HVAC con finestra aperta, accessi tecnici e stati semplici.'},
  waste:{domain:'Services',layer:'Risk',use:'Waste / cleaning campione',model:'Milesight EM400-TLD',connect:'LoRaWAN',price:123.22,effort:'E1',minutes:10,recovery:98,decision:'Raccolta e cleaning on demand senza computer vision.'},
  feedback:{domain:'IEQ',layer:'Outcome',use:'Feedback umano rapido',model:'Shelly BLU Button1',connect:'BLE',price:20.47,effort:'E1',minutes:5,recovery:95,decision:'Confronta comfort percepito e dato oggettivo.'},
  gateway:{domain:'Infrastructure',layer:'Platform',use:'Rete LoRaWAN privata',model:'RAKwireless RAK7268V2',connect:'Ethernet/Wi‑Fi setup',price:280.48,effort:'E1',minutes:30,recovery:100,decision:'Rende il Try indipendente dalla dashboard dei vendor.'},
  edge:{domain:'Infrastructure',layer:'Platform',use:'PhygiEdge local-first',model:'Seeed reComputer R1113-10',connect:'Ethernet/Wi‑Fi/RS485',price:267.18,effort:'E1',minutes:45,recovery:100,decision:'Buffer, adapter, regole e data lineage locale.'},
  router:{domain:'Infrastructure',layer:'Platform',use:'Backhaul autonomo',model:'Router industriale 4G/5G VPN',connect:'4G/5G',price:290,effort:'E1',minutes:25,recovery:100,decision:'Il Try parte senza dipendere dall’IT del cliente.'},
  ups:{domain:'Infrastructure',layer:'Platform',use:'Continuità edge e gateway',model:'UPS portatile / DIN',connect:'Power',price:350,effort:'E1',minutes:15,recovery:100,decision:'Store-and-forward durante micro-interruzioni.'}
};
const ASSET_TEMPLATES={
  'UTA / AHU':{life:20,sensors:['vibration','dp','energy'],maintenance:[['Controllo filtri e ΔP',3,'Tecnico HVAC',1.0],['Pulizia batterie/scambiatori',12,'Tecnico HVAC',2.0],['Controllo ventilatori e cuscinetti',6,'Tecnico meccanico',1.5],['Verifica regolazione e sicurezze',12,'Tecnico automazione',1.5]],revamp:[3500,18000],savingPct:[6,18]},
  'Pompa':{life:15,sensors:['vibration','energy'],maintenance:[['Controllo tenute e perdite',3,'Tecnico meccanico',.8],['Controllo vibrazioni e cuscinetti',6,'Tecnico meccanico',1.0],['Verifica assorbimenti',12,'Elettricista',.7]],revamp:[1500,8000],savingPct:[4,12]},
  'Ventilatore':{life:15,sensors:['vibration','energy'],maintenance:[['Pulizia e controllo girante',6,'Tecnico meccanico',1.0],['Controllo cinghie/cuscinetti',3,'Tecnico meccanico',.8],['Verifica assorbimenti',12,'Elettricista',.7]],revamp:[1200,7500],savingPct:[4,14]},
  'Gruppo frigo / pompa di calore':{life:18,sensors:['energy','vibration','state'],maintenance:[['Controllo circuito frigorifero',6,'Frigorista',2.0],['Controllo condensatore/evaporatore',6,'Frigorista',2.0],['Verifica assorbimenti e regolazione',12,'Tecnico energia',1.5]],revamp:[8000,65000],savingPct:[8,25]},
  'Quadro elettrico':{life:25,sensors:['energy','state'],maintenance:[['Serraggio e ispezione visiva',12,'Elettricista',1.5],['Termografia / verifica punti caldi',12,'Elettricista',1.5],['Test protezioni',24,'Elettricista',2.0]],revamp:[3000,25000],savingPct:[1,5]},
  'UPS':{life:12,sensors:['energy','state'],maintenance:[['Test batterie',6,'Tecnico UPS',1.0],['Pulizia e verifica ventilazione',12,'Tecnico UPS',1.0],['Test autonomia',12,'Tecnico UPS',1.5]],revamp:[2500,20000],savingPct:[2,8]},
  'Fan coil':{life:15,sensors:['state','room'],maintenance:[['Pulizia filtri',3,'Tecnico HVAC',.4],['Pulizia batteria e scarico condensa',12,'Tecnico HVAC',.8],['Verifica valvola e comando',12,'Tecnico HVAC',.6]],revamp:[400,2200],savingPct:[3,12]},
  'Altro':{life:15,sensors:['state'],maintenance:[['Ispezione generale',12,'Tecnico specializzato',1.0]],revamp:[1000,10000],savingPct:[2,10]}
};
