"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

////////////////////////////////
// Pets
const sideBar = $("#sidebar");
const pets = $("#tbody");
const submitBtn = $("#submit-btn");
const healthyBtn = $("#healthy-btn");
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

////////////////////////////////////////////////////////////////
// breed

// danh sách thú cưng
let petArr = getFromStorage("petArr")
  ? JSON.parse(getFromStorage("petArr"))
  : [];

// tạo object app quản lí toàn bộ chương trình
let petsManagement = {
  start: function () {
    this.handler();
    this.renderPetsData(petArr);
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

  //   xử lí các sự kiện
  handler: function () {
    let _this = this;
    // ấn vào sidebar
    sideBar.addEventListener("click", function (e) {
      sideBar.classList.toggle("active");
    });
    // ấn vào submit
    submitBtn.addEventListener("click", function () {
      _this.validate();
    });
    typeInput.addEventListener("change", function (e) {
      _this.renderBreed();
    });
  },
  renderPetsData: function (petArr) {
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
    
    <td>${this.getChecked(element.vaccinated)}</td>
    <td>${this.getChecked(element.dewormed)}</td>
    <td>${this.getChecked(element.sterilized)}</td>
    <td>${this.getDate()}</td>
    <td><button type="button" class="btn btn-danger" onclick="petsManagement.deletePet(${
      element.id
    })">Delete</button>
    </td>`;
      pets.appendChild(row);
    });
  },
  validate: function () {
    // check dự liệu đã điền hết chưa
    let emptyCheck = false;
    if (
      idInput.value &&
      !this.check_exists(idInput.value) &&
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
      if (!idInput.value) {
        alert("Please input for id");
      } else if (this.check_exists(idInput.value) === true) {
        alert("ID must be unique!");
      } else if (!nameInput.value) {
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

      petArr.push(data);
      saveToStorage("petArr", JSON.stringify(petArr));
      this.clearInput();
      this.renderPetsData(petArr);
    }
  },
  clearInput: function () {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    typeInput.value = "Select Type";
    weightInput.value = "";
    lengthInput.value = "";
    colorInput.value = "#000000";
    breedInput.value = "Select Breed";
    vaccinatedInput.checked = false;
    dewormedInput.checked = false;
    sterilizedInput.checked = false;
  },

  // lấy kết quả checkbox
  getChecked: function (check) {
    return check
      ? '<i class="bi bi-check-circle-fill"></i>'
      : '<i class="bi bi-x-circle-fill"></i>';
  },

  // lấy ngày hiện tại

  getDate: function () {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    return `${day}/${month}/${year}`;
  },

  // check xem id đã tồn tại chưa
  check_exists: function (id) {
    if (petArr.length > 0) {
      let check = petArr.findIndex(function (pet) {
        return pet.id === String(id);
      });
      console.log();
      if (petArr[check] !== undefined) {
        return true;
      }
    } else return false;
  },

  // xóa pet
  deletePet: function (id) {
    let petId = petArr.findIndex((element) => Number(element.id) === id);
    if (confirm("Are you sure?")) {
      let remove = petArr.splice(petId, 1);
      saveToStorage("petArr", JSON.stringify(petArr));
      this.renderPetsData(petArr);
    }
  },

  // Show healthy pet table

  healthyPet: function () {
    let healthyCheck = true;
    healthyBtn.addEventListener("click", function () {
      if (healthyCheck) {
        // pet khỏe mạnh
        healthyPetArr = petArr.filter(function (element) {
          return element.vaccinated && element.dewormed && element.sterilized;
        });
        renderTableData(healthyPetArr);
        healthyBtn.textContent = "Show Healthy Pet";
        healthyCheck = false;
      } else {
        renderTableData(petArr);
        healthyBtn.textContent = "Show All Pet";
        healthyCheck = true;
      }
    });
  },
};

petsManagement.start();
