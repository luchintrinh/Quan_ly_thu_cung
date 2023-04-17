"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

////////////////////////////////
// Pets
const sideBar = $("#sidebar");
const pets = $("#tbody");
const idInput = $("#input-id");
const nameInput = $("#input-name");
const typeInput = $("#input-type");
const breedInput = $("#input-breed");
const vaccinated = $("#input-vaccinated");
const dewormed = $("#input-dewormed");
const sterilized = $("#input-sterilized");
const btnFind = $("#find-btn");

// danh sách thú cưng
const petArr = getFromStorage("petArr")
  ? JSON.parse(getFromStorage("petArr"))
  : [];

let search = {
  start: function () {
    this.handler();
    this.renderPets(petArr);
    this.renderBreed();
  },
  handler: function () {
    let _this = this;
    sideBar.addEventListener("click", function () {
      sideBar.classList.toggle("active");
    });
    // Ấn nút tìm kiếm
    btnFind.addEventListener("click", function () {
      let petArrFilter = petArr;
      if (idInput.value) {
        petArrFilter = petArrFilter.filter((pet) =>
          pet.id.includes(idInput.value)
        );
      }
      if (nameInput.value) {
        petArrFilter = petArrFilter.filter((pet) =>
          pet.name.includes(nameInput.value)
        );
      }
      if (typeInput.value !== "Select Type" && petArrFilter.length > 0) {
        petArrFilter = petArrFilter.filter(
          (pet) => pet.type === typeInput.value
        );
      }
      if (breedInput.value !== "Select Breed" && petArrFilter.length > 0) {
        petArrFilter = petArrFilter.filter(
          (pet) => pet.breed === breedInput.value
        );
      }

      if (vaccinated.checked) {
        petArrFilter = petArrFilter.filter((pet) => pet.vaccinated === true);
      }
      if (dewormed.checked) {
        petArrFilter = petArrFilter.filter((pet) => pet.dewormed === true);
      }

      if (sterilized.checked) {
        petArrFilter = petArrFilter.filter((pet) => pet.sterilized === true);
      }
      _this.renderPets(petArrFilter);
    });
  },

  renderBreed: function () {
    let options = $("#input-breed");
    options.innerHTML = "";
    let macdinh = document.createElement("option");
    macdinh.innerHTML = "Select Breed";
    options.appendChild(macdinh);
    const breedArr = getFromStorage("BreedArr")
      ? JSON.parse(getFromStorage("BreedArr"))
      : [];
    breedArr.forEach(function (el) {
      let option = document.createElement("option");
      option.innerHTML = `
            ${el.name}
        `;
      options.appendChild(option);
    });
  },

  renderPets: function (petArr) {
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
    `;
      pets.appendChild(row);
    });
  },
};

search.start();
