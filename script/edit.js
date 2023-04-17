"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sideBar = $("#sidebar");
const pets = $("#tbody");
const options = pets.children;
const EditBar = $("#container-form");
const btnSubmit = $("#submit-btn");
const idInput = $("#input-id");
const nameInput = $("#input-name");
const ageInput = $("#input-age");
const typeInput = $("#input-type");
const weightInput = $("#input-weight");
const lengthInput = $("#input-length");
const colorInput = $("#input-color-1");
const breedInput = $("#input-breed");
const vaccinatedInput = $("#input-vaccinated");
const dewormedInput = $("#input-dewormed");
const sterilizedInput = $("#input-sterilized");

// Danh sách thú cưng
const petArr = getFromStorage("petArr")
  ? JSON.parse(getFromStorage("petArr"))
  : [];

let editPets = {
  start: function () {
    this.handler();
    this.renderPets();
  },
  handler: function () {
    const _this = this;
    sideBar.addEventListener("click", function () {
      sideBar.classList.toggle("active");
    });
    typeInput.addEventListener("change", function (e) {
      _this.renderBreed();
    });
    btnSubmit.addEventListener("click", function () {
      _this.validate();
    });
  },
  validate: function () {
    // check dự liệu đã điền hết chưa
    let emptyCheck = false;
    if (
      nameInput.value &&
      ageInput.value &&
      typeInput.value !== "Select Type" &&
      weightInput.value &&
      lengthInput.value &&
      colorInput.value &&
      breedInput.value !== "Select Breed"
    ) {
      emptyCheck = true;
    }

    //các điều kiện validate
    if (emptyCheck === false) {
      if (!nameInput.value) {
        alert("Please input for name");
      } else if (!ageInput.value) {
        alert("Please input for age");
      } else if (ageInput.value < 1 && ageInput.value > 15) {
        alert("Age must be between 1 and 15!");
      } else if (typeInput.value === "Select Type") {
        alert("Please select type");
      } else if (!weightInput.value) {
        alert("Please input for weight");
      } else if (weightInput.value < 1 && weightInput.value > 15) {
        alert("Weight must be between 1 and 15!");
      } else if (!lengthInput.value) {
        alert("Please input for Length");
      } else if (lengthInput.value < 1 && lengthInput.value > 100) {
        alert("Weight must be between 1 and 100!");
      } else if (breedInput.value === "Select Breed") {
        alert("Please select Breed");
      }
    } else {
      const data = {
        id: idInput.value,
        name: nameInput.value,
        age: Number(ageInput.value),
        type: typeInput.value,
        weight: weightInput.value,
        length: lengthInput.value,
        color: colorInput.value,
        breed: breedInput.value,
        vaccinated: vaccinatedInput.checked,
        dewormed: dewormedInput.checked,
        sterilized: sterilizedInput.checked,
        date: this.getDate(),
      };
      let index = petArr.findIndex(function (el) {
        return el.id === idInput.value;
      });
      petArr.splice(index, 1, data);
      saveToStorage("petArr", JSON.stringify(petArr));
      this.renderPets();
      EditBar.classList.add("hide");
    }
  },

  getDate: function () {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    return `${day}/${month}/${year}`;
  },

  renderBreed: function () {
    let options = $("#input-breed");
    options.innerHTML = "";
    let macdinh = document.createElement("option");
    macdinh.innerHTML = "Select Breed";
    options.appendChild(macdinh);
    const breedArr = JSON.parse(getFromStorage("BreedArr"));
    breedArr
      .filter((el) => el.type === String(typeInput.value))
      .forEach(function (el) {
        let option = document.createElement("option");
        option.innerHTML = `
            ${el.name}
        `;
        options.appendChild(option);
      });
  },

  renderPets: function () {
    pets.innerHTML = "";

    petArr.forEach((element) => {
      const row = document.createElement("tr");
      row.innerHTML = `
    <th scope="row">${element.id}</th>
    <td>${element.name}</td>
    <td>${element.age}</td>
    <td>${element.type}</td>
    <td>${element.weight} kg</td>
    <td>${element.length} cm</td>
    <td>${element.breed}</td>
    <td>
        <i class="bi bi-square-fill" style="color: ${element.color}"></i>
    </td>
    
    <td>${element.vaccinated}</td>
    <td>${element.dewormed}</td>
    <td>${element.sterilized}</td>
    <td>${element.date}</td>
    <td><button type="button" class="btn btn-warning" onclick=editPets.updatePets(${element.id})>Edit</button>
    </td>`;
      pets.appendChild(row);
    });
  },
  updatePets: function (id) {
    const _this = this;
    console.log("heello");
    EditBar.classList.remove("hide");
    console.log(petArr.filter((el) => el.id === String(id)));
    petArr
      .filter((el) => el.id === String(id))
      .forEach(function (el) {
        idInput.value = el.id;
        nameInput.value = el.name;
        ageInput.value = el.age;
        typeInput.value = el.type;
        _this.renderBreed();
        weightInput.value = el.weight;
        lengthInput.value = el.length;
        colorInput.value = el.color;
        breedInput.value = el.breed;
        vaccinatedInput.value = el.vaccinated;
        dewormedInput.value = el.dewormed;
        sterilizedInput.value = el.sterilized;
      });
  },
};
editPets.start();
