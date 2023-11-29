// Function to fetch data from the API
function getGeoData() {
    // Coordinates for New York

    //  const address = "Chicago, IL, USA";
    const searchElement = document.getElementById('searchbar').value;
    // const searchValue = searchElement.value;

        const url=`https://geocode.maps.co/search?q=${searchElement}`;

    return fetch(url)
        .then(response => {
         
            return response.json();
        })
        .then(data => {

            if(data.length==0){
                alert("Invalid city name");
                document.getElementById('searchbar').value=""
                return;
            }

            console.log(data);
            const lat = data[0].lat;
            const lon = data[0].lon;

            webdata(lat, lon);

           
            return data.results;
        })
        .catch(error => {
         
            console.error('Error:', error); 
        });
}

function webdata(lat, lon){
    const todayurl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&date=today`;
    const tomorrowurl = `https://api.sunrisesunset.io/json?lat=${lat}&lng=${lon}&date=tomorrow`;

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const today = new Date();
    //date for today
    const dayOfWeek = daysOfWeek[today.getDay()];
    const month = months[today.getMonth()];
    const day = today.getDate();
    const year = today.getFullYear();
  
    const formattedDate = `${dayOfWeek}, ${month} ${day}, ${year}`;
    console.log(formattedDate);
    
    // date for tomorrow

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dayOfWeek1 = daysOfWeek[tomorrow.getDay()];
    const month1 = months[tomorrow.getMonth()];
    const day1 = tomorrow.getDate();
    const year1 = tomorrow.getFullYear();

    const formattedDate1 = `${dayOfWeek1}, ${month1} ${day1}, ${year1}`;
    console.log(formattedDate1);
  
    fetch(todayurl)
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        // Update your dashboard with the sunrise/sunset data
        document.querySelector('#Today').innerHTML = formattedDate;
        document.querySelector('#tdsrtime').innerHTML = data.results.sunrise;
        document.querySelector('#tddawn').innerHTML = data.results.dawn;
        document.querySelector('#tdsstime').innerHTML = data.results.sunset;
        document.querySelector('#tddusk').innerHTML = data.results.dusk;
        document.querySelector('#tdsolarnoon').innerHTML = data.results.solar_noon;
        document.querySelector('#tddaylength').innerHTML = data.results.day_length;
        document.querySelector('#tdtimezone').innerHTML = data.results.timezone;

    })
    .catch(error => {
        console.error('Error:', error);
        // Handle errors and display a message to the user
        alert('Error fetching sunrise/sunset data. Please try again.');
    });

    fetch(tomorrowurl)
    .then(response => response.json())
    .then(data => {
        console.log(data.results);

        document.querySelector('#Tomorrow').innerHTML = formattedDate1;
        document.querySelector('#tmrsrtime').innerHTML = data.results.sunrise;
        document.querySelector('#tmrdawn').innerHTML = data.results.dawn;
        document.querySelector('#tmrsstime').innerHTML = data.results.sunset;
        document.querySelector('#tmrdusk').innerHTML = data.results.dusk;
        document.querySelector('#tmrsolarnoon').innerHTML = data.results.solar_noon;
        document.querySelector('#tmrdaylength').innerHTML = data.results.day_length;
        document.querySelector('#tmrtimezone').innerHTML = data.results.timezone;

    })  
    .catch(error => {
        console.error('Error:', error);
        // Handle errors and display a message to the user
        alert('Error fetching sunrise/sunset data. Please try again.');
    });

}