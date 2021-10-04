const breed = document.getElementById("breed");

// main function - allows us to get the data
async function start() {
  const response = await fetch("https://dog.ceo/api/breeds/list/all");
  const data = await response.json();

  createBreedList(data.message);
}
start();

// function to get options of breeds
const createBreedList = (information) => {
  breed.innerHTML = `<select>
    <option>Choose your breed</option>
    ${Object.keys(information).map((info) => {
      return `<option>${info}</option>`;
    })}
  </select>`;
};

start();
