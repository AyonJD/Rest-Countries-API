//Getting data for desplaying all countries as default
const getDefault = () => {
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => showDefault(data))
}
getDefault();

//Common function====================================================>
//Common function for innerHTML---->
function commonForInnerHTML(data) {
    const cardParent = document.getElementById('card-parent');
    data.forEach(e => {
        const card = document.createElement('div');
        card.classList.add('card', 'col-xxl-2', 'col-lg-3', 'col-md-4', 'col-12','m-2');
        card.innerHTML = `
        <div class="row g-0 d-flex align-items-center">
            <div class="col-md-5">
                <img src="${e.flags.png}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-7">
                <div class="card-body">
                    <h5 class="card-title fs-6">${e.name.common}</h5><br>
                    <small class="card-text p-0">Population: ${e.population}</small><br>
                    <small class="card-text">Capital: ${e.capital}</small><br>
                    <small class="card-text">Region: ${e.region}</small>
                </div>
            </div>
        </div>
        `
        cardParent.appendChild(card);
    });
    hideLoading()
}
//Common function for Region fetch url------>
function commonForAPI(buttonId, i){
    buttonId.addEventListener('click', () => {
        displayLoading()
        const cardParent = document.getElementById('card-parent');
        cardParent.innerHTML = '';
        const errorDiv = document.getElementById('error');
        const url = `https://restcountries.com/v3.1/region/${valueArray[i]}`;
        // Showing error
        if (url == `https://restcountries.com/v3.1/region/australia` || url == `https://restcountries.com/v3.1/region/antarctica`) {
            errorDiv.classList.remove('d-none')
            hideLoading()
        } else {
            errorDiv.classList.add('d-none')
            fetch(url)
            .then(res => res.json())
            .then(data => updateByFilter(data))
        }
        
    })
}

//Showing all country as default
const showDefault = data => {
    commonForInnerHTML(data)
}
//Filtering Country by clicking region button
const allButton = Array.from(document.querySelectorAll('.btn'));
let valueArray = [];
allButton.forEach(e => {
    valueArray.push(e.value)
})
const africa = document.getElementById('africa');
const north = document.getElementById('north');
const south = document.getElementById('south');
const antarctica = document.getElementById('antarctica');
const asia = document.getElementById('asia');
const europe = document.getElementById('europe');
const australia = document.getElementById('australia');



//Africa
commonForAPI(africa, 0);
//North America
commonForAPI(north, 1);
//South America
commonForAPI(south, 2);
//antarctica
commonForAPI(antarctica, 3);
//asia
commonForAPI(asia, 4);
//europe
commonForAPI(europe, 5);
//australia
commonForAPI(australia, 6);
//Updating filtered data for Filtered region
const updateByFilter = data => {
    commonForInnerHTML(data);
}

//Loader adding ===========================================>
// selecting loading div
const loader = document.querySelector("#loading");
const loaderParent = document.querySelector("#loadingParent");

// showing loading
function displayLoading() {
    loader.classList.add("display");
    loaderParent.classList.add("loading-height");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
        loaderParent.classList.remove('loading-height')
    }, 5000);
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
    loaderParent.classList.remove("loading-height");
}
window.addEventListener('load', displayLoading())