const DEFAULT_STATE={
  schemaVersion:'1.0',
  meta:{projectId:'DS-2026-SAL13-001',name:'Via Salandra 13 · Whole-Building Try',customerMode:'customer-zero',stage:'pre-assessment',owner:'Team Phygispace',createdAt:'2026-07-15T08:00:00Z',updatedAt:new Date().toISOString()},
  building:{buildingId:'ITA-RM-SAL13',name:'Via Salandra 13',address:'Via Salandra 13, Roma',type:'Office / Business Center',scope:'whole-building',floors:5,sqm:5000,desks:450,meetingRooms:16,highDensitySpaces:6,hvacZones:5,entrances:2,energyLoads:5,existingEnergyPoints:1,rotatingAssets:12,ahu:4,waterRiskPoints:10,statePoints:8,wasteAreas:4,openingHours:'08:00–20:00 · lun–ven',annualElectricityEur:180000,annualWaterEur:18000,annualMaintenanceEur:145000,sourceStatus:'assumption'},
  constraints:{profile:'standard',durationWeeks:6,maxInstallDays:2,targetRecovery:85,industrialCostCap:6000,clientIT:false,permanentWorks:false,freeTry:true},
  survey:{documents:{floorplans:false,electrical:false,hvac:false,assetRegister:false,manuals:false,maintenanceHistory:false,bills:false,meterCurves:true,contracts:false},network:{lorawanSurvey:false,cellularSurvey:false,poe:false,powerPoints:false},authorizations:{photo:false,electrical:false,hvac:false,privacy:false},notes:''},
  systems:[
    {id:'SYS-001',type:'Energy interval data',availability:'yes',vendor:'Distributore / portal',protocol:'CSV',reusable:true,evidence:'Da confermare accesso'},
    {id:'SYS-002',type:'BMS / supervisor',availability:'unknown',vendor:'',protocol:'',reusable:false,evidence:''},
    {id:'SYS-003',type:'Access control',availability:'yes',vendor:'',protocol:'Export/API da verificare',reusable:true,evidence:''},
    {id:'SYS-004',type:'Booking rooms/desks',availability:'partial',vendor:'',protocol:'CSV/API',reusable:true,evidence:''},
    {id:'SYS-005',type:'CMMS / ticketing',availability:'no',vendor:'',protocol:'',reusable:false,evidence:''}
  ],
  zones:[
    {id:'Z-001',floor:'GF',name:'Reception / ingresso',type:'Reception',hvac:'HVAC-01',capacity:30,highDensity:true,priority:'high'},
    {id:'Z-002',floor:'F1',name:'Open space Est',type:'Open space',hvac:'HVAC-02',capacity:90,highDensity:false,priority:'high'},
    {id:'Z-003',floor:'F1',name:'Meeting cluster',type:'Meeting rooms',hvac:'HVAC-02',capacity:42,highDensity:true,priority:'high'},
    {id:'Z-004',floor:'F2',name:'Open space Ovest',type:'Open space',hvac:'HVAC-03',capacity:85,highDensity:false,priority:'medium'},
    {id:'Z-005',floor:'F3',name:'Private offices',type:'Private offices',hvac:'HVAC-04',capacity:70,highDensity:false,priority:'medium'},
    {id:'Z-006',floor:'F4',name:'Event / training',type:'High density',hvac:'HVAC-05',capacity:120,highDensity:true,priority:'critical'},
    {id:'Z-007',floor:'B1',name:'Locali tecnici',type:'Technical',hvac:'Central plant',capacity:5,highDensity:false,priority:'critical'}
  ],
  assets:[
    {id:'A-001',name:'UTA-01',category:'UTA / AHU',floor:'Roof',room:'Technical',manufacturer:'',model:'',serial:'',year:null,criticality:5,central:true,photo:null,labelText:'',identityConfidence:0,manual:{match:'pending',confidence:0,url:'',source:'',version:'',support:'unknown',parts:'unknown',endSupport:'',evidence:'none'},lifecycle:{referenceLife:20,condition:70,performanceGap:null,risk:null,rul:''},maintenance:[],notes:''},
    {id:'A-002',name:'UTA-02',category:'UTA / AHU',floor:'Roof',room:'Technical',manufacturer:'',model:'',serial:'',year:null,criticality:5,central:true,photo:null,labelText:'',identityConfidence:0,manual:{match:'pending',confidence:0,url:'',source:'',version:'',support:'unknown',parts:'unknown',endSupport:'',evidence:'none'},lifecycle:{referenceLife:20,condition:70,performanceGap:null,risk:null,rul:''},maintenance:[],notes:''},
    {id:'A-003',name:'Pompa primaria 01',category:'Pompa',floor:'B1',room:'Centrale HVAC',manufacturer:'',model:'',serial:'',year:null,criticality:4,central:true,photo:null,labelText:'',identityConfidence:0,manual:{match:'pending',confidence:0,url:'',source:'',version:'',support:'unknown',parts:'unknown',endSupport:'',evidence:'none'},lifecycle:{referenceLife:15,condition:75,performanceGap:null,risk:null,rul:''},maintenance:[],notes:''},
    {id:'A-004',name:'Quadro generale',category:'Quadro elettrico',floor:'B1',room:'Electrical',manufacturer:'',model:'',serial:'',year:null,criticality:5,central:true,photo:null,labelText:'',identityConfidence:0,manual:{match:'pending',confidence:0,url:'',source:'',version:'',support:'unknown',parts:'unknown',endSupport:'',evidence:'none'},lifecycle:{referenceLife:25,condition:80,performanceGap:null,risk:null,rul:''},maintenance:[],notes:''},
    {id:'A-005',name:'UPS servizi critici',category:'UPS',floor:'B1',room:'Electrical',manufacturer:'',model:'',serial:'',year:null,criticality:4,central:true,photo:null,labelText:'',identityConfidence:0,manual:{match:'pending',confidence:0,url:'',source:'',version:'',support:'unknown',parts:'unknown',endSupport:'',evidence:'none'},lifecycle:{referenceLife:12,condition:70,performanceGap:null,risk:null,rul:''},maintenance:[],notes:''}
  ],
  sensorOverrides:{},
  sensorFilter:'all',
  economics:{internalRateSurvey:55,internalRateIoT:65,internalRateAnalyst:75,internalRatePM:70,electricianRate:75,hvacRate:75,logistics:600,connectivity:180,consumables:300,commercialMarkup:1.45},
  offers:{tryDurationMonths:2,platformMonthly:8000,maintenanceMargin:1.25,escoMinCapex:25000},
  ui:{view:'dashboard',mode:'internal'}
};
let state;
let deferredInstallPrompt=null;
let activeAssetId=null;
let activeAssetTab='identity';
