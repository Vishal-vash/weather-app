console.log("Client side javascript is loaded !!");

const searchWeather = (e) => {
    e.preventDefault(); 
    document.querySelector('#forecast').innerHTML = "Loading";

    fetch(`/weather?address=${e.target.search.value}`).then((response) => {
      response.json().then((data) => {
        if (data.error) {
            document.querySelector('#forecast').innerHTML = data.error;
            document.querySelector('#location').textContent = "";
            return;
        }

        document.querySelector('#forecast').innerHTML = data.forecast;
        document.querySelector('#location').textContent = data.location;
      });
    });
}
