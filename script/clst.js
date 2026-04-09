const btnFill = document.getElementById("btnFill"),
    pumpSpeed = document.getElementsByName('pump-speed-select'),
    errorMessage = document.getElementById('error-message'),
    btnReset = document.getElementById("btnReset");

let fuelPrice = document.getElementById("fuel-price"),
    moneyPaid = document.getElementById("money-paid"),
    fuelPumped = document.getElementById("fuel-pumped"),
    money = 0.0,
    liters = 0.0,
    interval2 = 0.2391,
    pump_speed = 90;







btnFill.addEventListener("mousedown",fillTank)
btnFill.addEventListener("touchstart",fillTank)
btnReset.addEventListener("click",resetPump)

//Resets value 
function resetPump(){
    money = 0.0;
    liters = 0.0;
    moneyPaid.textContent = `R ${money}.00`;
    fuelPumped.textContent = `${liters}.00 L`;
}

pumpSpeed.forEach(function(element){
    element.addEventListener('change', () => {
        pump_speed = element.value
    })
})
function fillTank(){
    let timer = setInterval(fillAnime,pump_speed);
    btnFill.addEventListener("mouseup",() => {
        clearInterval(timer);
    });
    btnFill.addEventListener("touchend", () => {
        clearInterval(timer);
    })
    function fillAnime(){
        money += interval2;
        liters += 0.01;
        moneyPaid.textContent = `R ${money.toFixed(2)}`;
        fuelPumped.textContent = `${liters.toFixed(2)} L`;
    }
}


//Cookie Banner pop up


const cookieContainer = document.createElement("div")
const cookieTimer = setTimeout(() => {
    cookieContainer.classList.add('cookie-container')
    cookieContainer.innerHTML = `
        <span class="message">We use cookies that are strictly necessary for this website to function as well as for advertising purposes. Please refer to our <a href="">Cookie Policy</a>🍪</span>
        <span class="instruction">Do you consent to us using cookies on your device</span>
        <div class="cookiebtn-container">
            <button class="btnRejectCookies">Reject All</button>
            <button class="btnAcceptCookies">Accept</button>
        </div>
    `
}, 8000);

if(localStorage.getItem('adCookie') == 'ws2s125'){
    clearTimeout(cookieTimer);
}

//CookieHandler
btnAcceptCookies.addEventListener("click", setCookie)
btnRejectCookies.addEventListener('click', setCookie)

function setCookie() {
    localStorage.setItem('adCookie','ws2s125');
    document.body.removeChild(cookieContainer);
}


//Maps Stuff
const calculateDistance = async () => {
    //Post request to server
}
document.getElementById('btnSearch').addEventListener('click', calculateDistance);

const h_fuelPrice = document.getElementById('fuelPrice');
const h_fuelType = document.getElementById('fuelType');

const fuelPricing = {
    petrolType:['Un 93','Un 95', 'LRP 93', 'LRP 95'],
    petrolPrice:[22.71, 23.11, 22.71, 22.32],

    dieselType:['ppm50', 'ppm500', 'ppm50','ppm500'],
    dieselPrice:[20.63, 19.70, 19.87, 19.59]
}
console.log("Index of Unleaded 95 is "+fuelPricing.petrolType.indexOf('Un 95'));
function h_priceDisplay(){
    let petrolDisplayed = true;
    let index = 0;

    const timer2 = setInterval(() => {
        try{
            if(petrolDisplayed){
                displayPetrol();
                index++;
            }else{
                displayDiesel();
                index++;
            }
        }catch(err){
            console.log(err);
            clearInterval(timer2);
        }
        
    },10000)

    function displayPetrol(){
        h_fuelType.textContent = `⛽${fuelPricing.petrolType[index]}`;
        h_fuelPrice.textContent = `R ${fuelPricing.petrolPrice[index]}`
        if(index == 3){
            petrolDisplayed = false;
            index = -1;
        }
    }
    function displayDiesel(){
        h_fuelType.textContent = `⛽${fuelPricing.dieselType[index]}`;
        h_fuelPrice.textContent = `R ${fuelPricing.dieselPrice[index]}`;
        if(index == 3){
            petrolDisplayed = true;
            index = -1;
        }
        
    }
}
h_priceDisplay();
let fuelType_index = 0;
let petrol = true;
const pumpFuelType = document.querySelector('.fuel-type-pumpDisplay');
pumpFuelType.addEventListener('click',changeFuelType);
function changeFuelType(){
   
    if(petrol){
        resetPump();
        pumpFuelType.textContent = fuelPricing.petrolType[fuelType_index];
        fuelPrice.textContent = `R ${fuelPricing.petrolPrice[fuelType_index]}`;
        fuelType_index += 1;
        if(fuelType_index >= 4){
            petrol = false;
            fuelType_index = 0;
        };
    }else{
        resetPump();
        pumpFuelType.textContent = fuelPricing.dieselType[fuelType_index];
        fuelPrice.textContent = `R ${fuelPricing.dieselPrice[fuelType_index]}`;
        fuelType_index += 1;
        if(fuelType_index >= 4){
            petrol = true;
            fuelType_index = 0;
        };
    }
    interval2 = (fuelPrice.textContent.slice(2,7)/100);
    console.log("Interval2 = "+interval2);
    console.log(fuelType_index);
    
}



const vConsFac = {
    aveSpeed:0,//****
    aveConsumption:0,//****
    engine_type:3,//****
    engine_diaplacement:1.6,//****
    transmission:'automatic',//****
    v_type:'Hatchback',
    v_age:2,
    v_milage:87000,
    fuel_capacity:0,//****
    trip_distance:0,//****
    tirePressure:'normal',
    AC:'OFF',
    fuelType:'Un 93',//****
    oil_level:'high',
    terrain:'flat',//****
    road_surface:'tarmac',//****
    towing:0,
    totalC:0.00,
    totalM:0.00,//****
    sportsCar:{
        sportsMode:false,
    },
    truck:{
        loadWeight:300,
    }
}




//Gathering Info before executed when the Calculate Button is activated
function setUserInfo(){
    vConsFac.aveSpeed = document.getElementById('average-speed').value;
    vConsFac.aveConsumption = document.getElementById('fuelPer100').value;
    vConsFac.fuel_capacity = document.getElementById('fuel-capacity').value;
    vConsFac.trip_distance = document.getElementById('trip-distance').value;
    vConsFac.towing = document.getElementById('tow-weight').value;
    
    if(document.querySelector('.selected-vehicle-type').innerHTML == 'Vehicle Type'){document.querySelector('.selected-vehicle-type').innerHTML = 'Hatchback'};
    if(vConsFac.engine_type == 'Engine'){vConsFac.engine_type == 'Turbocharged'};
    if(document.querySelector('.selected-transmition').innerHTML == 'Transmition'){document.querySelector('.selected-transmition').innerHTML = 'Automatic'};
    if(document.querySelector('.selected-fuel-type').innerHTML == 'Fuel Type'){document.querySelector('.selected-fuel-type').innerHTML = 'Un 95'};
    if(vConsFac.AC == 'AirCon'){vConsFac.AC == 'OFF'};

    vConsFac.transmission = document.querySelector('.selected-transmition').innerHTML;
    vConsFac.road_surface = document.querySelector('.selected-road-type').innerHTML;
    vConsFac.terrain = document.querySelector('.selected-terrain-type').innerHTML;
    vConsFac.v_type = document.querySelector('.selected-vehicle-type').innerHTML;
    vConsFac.fuelType = document.querySelector('.selected-fuel-type').innerHTML;

    
}

//testingInfo Function should be removed in production
function testingInfo(){
    console.log('The info below is from the object consumption factors');
    console.log(`${vConsFac.aveSpeed}, ${vConsFac.aveConsumption}, ${vConsFac.fuel_capacity}, ${vConsFac.trip_distance}, ${vConsFac.transmission}, ${vConsFac.road_surface}, ${vConsFac.terrain}, ${vConsFac.v_type}, ${vConsFac.fuelType}`);
}

const btnCalculate = document.getElementById('btnCalculate');
btnCalculate.addEventListener('click', () => {
    console.log('event Clicked, getting user info...');
    setUserInfo();
    errorHandler(testingInfo,tripCost);
})

function conditionalConsumption(currentPrice){
    //Relies on the Condition provided(v_type, airCon, RoadType, Terrain, Ave speed, towing);
    let gramsPerKm,fuelPerkm,totalConsumption,fuelCost;
    if(vConsFac.v_type == 'Bike'){gramsPerKm = 25.722+(276/vConsFac.aveSpeed)+(-0.254)*vConsFac.aveSpeed+0.00311*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Sedan' || vConsFac.v_type == 'Hatchback'){gramsPerKm = 54.7+(496/vConsFac.aveSpeed)+(-0.542)*vConsFac.aveSpeed+0.0042*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Utility' || vConsFac.v_type == 'Minibus' || vConsFac.v_type == 'Van'){gramsPerKm = 146.27+(-0.0000106/vConsFac.aveSpeed)+(-2.596)*vConsFac.aveSpeed+0.01984*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Semi-Truck'){gramsPerKm = 152.96+(604.156/vConsFac.aveSpeed)+(-2.295)*vConsFac.aveSpeed+0.0238*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Bus'){gramsPerKm = 281.735+(4186.178/vConsFac.aveSpeed)+(-3.457)*vConsFac.aveSpeed+0.0216*Math.pow(vConsFac.aveSpeed,2)};
    if(vConsFac.v_type == 'Big Truck'){gramsPerKm = 332.603+(1680.879/vConsFac.aveSpeed)+(-4.676)*vConsFac.aveSpeed+0.0311*Math.pow(vConsFac.aveSpeed,2)}; 
    fuelPerkm = (gramsPerKm/748.9); 
    console.log("gramsPerKm "+gramsPerKm);
    totalConsumption = (vConsFac.trip_distance*fuelPerkm);
    console.log('totalConsumption: '+totalConsumption);

    //Below are the ranges of the manufacture estimates
    document.getElementById('conditional-fuel-remaining').innerHTML = `${cRemaining(totalConsumption)} L`;
    document.getElementById('conditional-fuel-range').innerHTML = `${(cRemaining(totalConsumption)/fuelPerkm).toFixed(2)} km`;
    document.getElementById('conditional-fuel-used').innerHTML = `${totalConsumption.toFixed(2)} L`;

    

    fuelCost = totalConsumption*currentPrice;
    console.log(fuelPerkm);
    console.log('Trip cost = R',fuelCost.toFixed(2));
    vConsFac.totalC = fuelCost;
    return fuelCost.toFixed(2);
    
}
function mRemaining(total){
    let r;
    r = vConsFac.fuel_capacity - total;
    if(r <= 0){
        return 0
    }else{
        return r.toFixed(2);
    }
}
function cRemaining(total){
    let r;
    r = vConsFac.fuel_capacity - total;
    if(r <= 0){
        return 0
    }else{
        return r.toFixed(2);
    }
}
let a3ba = document.getElementById('per-periode');

document.querySelector('.m-estimates').addEventListener('click', () => {
    console.log('the estimates grid container clicked');
    if(a3ba.innerHTML == 'Weekly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalM*7).toFixed(2)}`;
    }else if(a3ba.innerHTML == 'Monthly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalM*30).toFixed(2)}`;
    }else if(a3ba.innerHTML == 'Yearly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalM*365).toFixed(2)}`;
    }
})
document.querySelector('.c-estimates').addEventListener('click', () => {
    console.log('the estimates grid container clicked');
    if(a3ba.innerHTML == 'Weekly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalC*7).toFixed(2)}`;
    }else if(a3ba.innerHTML == 'Monthly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalC*30).toFixed(2)}`;
    }else if(a3ba.innerHTML == 'Yearly'){
        document.getElementById('price-calculated').innerHTML = `R ${(vConsFac.totalC*365).toFixed(2)}`;
    }
})

function manufactureEstimates(currentPrice){
    //Calculate the range, remaining and Trip Cost
    //Rely purely out of what manufacture says on the fuel economy
    let fuelPerkm,totalConsumption,fuelCost;
    fuelPerkm = vConsFac.aveConsumption/100;
    totalConsumption = (vConsFac.trip_distance*fuelPerkm);
    
    //Below are the ranges of the manufacture estimates
    document.getElementById('manufacture-fuel-remaining').innerHTML = `${mRemaining(totalConsumption)} L`;
    document.getElementById('manufacture-fuel-range').innerHTML = `${(mRemaining(totalConsumption)/fuelPerkm).toFixed(2)} km`;
    document.getElementById('manufacture-fuel-used').innerHTML = `${totalConsumption.toFixed(2)} L`;

    //Price Calculated, wether weekly monthly or yearly estimates
 
    fuelCost = totalConsumption*currentPrice;
    console.log(fuelPerkm);
    console.log('Trip cost = R',fuelCost.toFixed(2));
    vConsFac.totalM = fuelCost;
    return fuelCost.toFixed(2);
}
//Calculate the trip Cost
function tripCost(){
    let commonPrice;

    if(fuelPricing.petrolType.indexOf(vConsFac.fuelType) > -1){
        commonPrice = fuelPricing.petrolPrice[fuelPricing.petrolType.indexOf(vConsFac.fuelType)];
        console.log('If statement true commonPrice = '+commonPrice);
    }else{
        commonPrice = fuelPricing.dieselPrice[fuelPricing.dieselType.indexOf(vConsFac.fuelType)];
        console.log('If statement false commonPrice = '+commonPrice);
    }
    document.getElementById('manufacture-trip-cost').innerHTML = `R ${manufactureEstimates(commonPrice)}`;
    document.getElementById('conditional-trip-cost').innerHTML = `R ${conditionalConsumption(commonPrice)}`;
}


function errorHandler(callback,callback2){
    let errorFree = true;
    if(vConsFac.aveSpeed && 275 && vConsFac.v_type == 'Van' || vConsFac.v_type == 'Minibus' ||  vConsFac.v_type == 'Semi-Truck' || vConsFac.v_type == 'Big Truck'){
        console.error(`${vConsFac.v_type} cannot go ${vConsFac.aveSpeed} km/h`);
        errorFree = false;
    }
    if(vConsFac.aveSpeed > 530 || vConsFac.aveSpeed <= 0 || isNaN(vConsFac.aveSpeed)){
        errorFree = false;
        errorMessage.textContent = '*Enter correct Average Speed';
    }
    if(vConsFac.aveConsumption > 55 || vConsFac.aveConsumption <= 0 || isNaN(vConsFac.aveConsumption)){
        errorFree = false;
        errorMessage.textContent = '*Enter correct Average Consupmtion per 100 km';
    }
    if(vConsFac.fuel_capacity > 230 || vConsFac.fuel_capacity <= 0 || isNaN(vConsFac.fuel_capacity)){
        errorFree = false;
        errorMessage.textContent = '*Enter correct fuel capacity';
    }
    if(isNaN(vConsFac.towing)){
        errorMessage.textContent = '*Enter correct towing weight';
        errorFree = false;
    }
    if(isNaN(vConsFac.trip_distance) || vConsFac.trip_distance == '' || vConsFac.trip_distance <= 0){
        errorMessage.textContent = '*Enter correct trip distance';
        errorFree = false;
    }
    
    if(errorFree){
        errorMessage.textContent = '';
        callback();
        callback2();
    }
}


const gConsFac = {
    age:2,
    frequency:20,
    type:'conventional',
    voltage:200,
    serviceHours:920,
    load:500,
    fuel_type:'diesel',
    load_factor:20, //In percentages(The percentage of the generator's capacity beign used)
    hoursRunning:30,
    fuel_capacity:200
}

const craftConsFac = {
    type:'accessna 200',age:8,aveConsumption:60,
    aveSpeed:80,alt:20,fuel_capacity:800,weight:500, trip_distance:0
}

const boatConsFac = {
    type:'skeejet',
    waves:'heavy',
    trip_distance:20,
    aveConsumption:20,
    fuel_capacity:500,
    sail:false,
    age:5,
    no_engine:2
}




