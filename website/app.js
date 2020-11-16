/* Global Variables */

// Personal API Key for OpenWeatherMap API
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = 'd3b2ae034ed030bd2e98660ceb8113c3';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+ 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

/* Function called by event listener */
function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feel = document.getElementById('feelings').value;
    getTemp(baseURL, zipCode, key)

    .then(function (data){
        console.log(data)
        // Add data to POST request
        postData('/add', {temp: data.main.temp, date: newDate, content: feel } )
        // Function which updates UI
        .then(function() {
            updateUI()
        })
    })
}


/* Function to GET Web API Data*/
const getTemp = async (baseURL, zip, key) =>{ 
    const response = await fetch(baseURL + zip + ',us' + '&APPID=' + key)
    try {
    // Transform into JSON
    const data = await response.json();
    return data
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
   }
  };
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    console.log(data);

    const postRequest = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },

    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

    try {
        const newData = await postRequest.json();
        console.log(newData);
        return newData;
      
    }catch(error) {
    console.log("error", error);
    }
};
/* Function to GET Project Data */
const updateUI = async () => {
    const request = await fetch('/all')
    
    try{
        const allData = await request.json()
        let valNum =allData.temperature;
        valNum = parseFloat(valNum); 
        console.log(valNum);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = Math.floor(valNum-273.15)
        document.getElementById('content').innerHTML = allData.content;
        
    }catch(error){
        alert("not found", error)
    }
}
      
 
