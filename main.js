

const CountryForm = document.createElement('form');

const header = document.createElement('h2');
header.innerHTML = 'search countries';
CountryForm.appendChild(header);


const nameLabel = document.createElement('label');
nameLabel.innerHTML = 'Country Name:';
const nameInput = document.createElement('input');
nameInput.setAttribute('type', 'text');
nameInput.setAttribute('name', 'countryName');
nameInput.setAttribute('placeholder', 'Enter country name');

nameLabel.appendChild(nameInput);
CountryForm.appendChild(nameLabel);

const searchButton = document.createElement('button');
searchButton.setAttribute('type', 'button');
searchButton.innerHTML = 'Search';

const formContainer = document.createElement('div');
formContainer.setAttribute('class','formcContainer')
formContainer.appendChild(CountryForm);
formContainer.appendChild(searchButton);
document.body.appendChild(formContainer);

searchButton.addEventListener('click', async function () {
    if (nameInput.value!=='') {
    
    if (countries.length==0) {
        await getAllCountries();  
    }
    const countryName = nameInput.value;
    const countrySearch = searchNames(countryName);
    printCountries(countrySearch);     
} else{
    alert('please enter value')

} 
})



const allButton = document.createElement('button');
allButton.setAttribute('type', 'button');
allButton.innerHTML = 'all'
document.body.appendChild(allButton);

allButton.addEventListener('click', async function () {
    await getAllCountries();
    printCountries(countries);
})


let countries=[];

async function getAllCountries() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`)
        const data = await response.json();
        countries = data;
        console.log(countries);

    } catch (err) {
        console.error('Error fetching countries:', err);

    }

}

const countriesOutput = document.createElement('div');
countriesOutput.setAttribute('id', 'search-output-id');
document.body.appendChild(countriesOutput);

function searchNames(countryName) {
    const matchingCountries = countries.filter(country => {
        const commonName = country.name.common;
                return commonName.toLowerCase().match(countryName.toLowerCase());
            }); 
            return(matchingCountries);
}


function printCountries(countryList) {
const countryOutput= document.getElementById('search-output-id');
countriesOutput.innerHTML='';

countryList.forEach((country , i) => {
    const listOptionDiv= document.createElement('div');
    listOptionDiv.setAttribute('id',`list-id${i}`);
    listOptionDiv.innerHTML=country.name.common;
    countriesOutput.appendChild(listOptionDiv);
 
});
}

// async function showCountriesName(countryName) {
//     try {
        
//         const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
//         const data = await response.json();

//         data.forEach(country => {
//             output.innerHTML = country.name.common;
//             document.body.appendChild(output);
//         });
//     } catch (err) {
//         console.error('Error fetching country details:', err);

//     }


// }

