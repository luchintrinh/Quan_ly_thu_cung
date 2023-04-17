"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const sideBar = $("#sidebar");
const inputBreed = $("#input-breed");
const inputType = $("#input-type");
const submitButton = $("#submit-btn");
const BreedBody = $("#tbody");

// mảng lưu trữ loại thức ăn.
let breedArr = getFromStorage("BreedArr")
  ? JSON.parse(getFromStorage("BreedArr"))
  : [];

let Breed = {
  start: function () {
    this.handler();
    this.renderBreedTable(breedArr);
  },
  handler: function () {
    let _this = this;
    sideBar.addEventListener("click", function () {
      sideBar.classList.toggle("active");
    });
    submitButton.addEventListener("click", function () {
      _this.validate();
    });
  },
  validate: function () {
    let check = inputBreed.value && inputType.value != "Select Type";
    if (!check) {
      if (!inputBreed.value) {
        alert("Please inset this field");
      } else if (inputType.value === "Select Type") {
        alert("Please select this field");
      }
    } else {
      let data = {
        name: inputBreed.value,
        type: inputType.value,
      };
      breedArr.push(data);
      console.log(breedArr);
      saveToStorage("BreedArr", JSON.stringify(breedArr));
      this.renderBreedTable(breedArr);
    }
  },
  renderBreedTable: function (arr) {
    BreedBody.innerHTML = "";
    breedArr.forEach(function (data, index) {
      let row = document.createElement("tr");
      row.innerHTML = `
                <th scope="col">${index + 1}</th>
                <th scope="col">${data.name}</th>
                <th scope="col">${data.type}</th>
                <th scope="col"><button class="btn btn-danger" onclick=Breed.deleteBreed(${index})>Delete</button></th>
      `;
      BreedBody.appendChild(row);
    });
  },
  deleteBreed: function (index) {
    if (confirm("Are you sure?")) {
      let remove = breedArr.splice(index, 1);
      saveToStorage("petArr", JSON.stringify(breedArr));
      this.renderBreedTable(breedArr);
    }
  },
};

Breed.start();
