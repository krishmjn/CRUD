const hel = async () => {
  
    console.log("Fetching countries");
    const response = await fetch("https://restcountries.com/v3.1/all");
    console.log("Fetched complete");
    const data = await response.json();
    console.log(data); // Log the JSON data to the console
}
hel();

