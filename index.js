//

let titel = document.getElementById("titel");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let search_proudact = document.getElementById("search_proudact");
let search_category = document.getElementById("search_category");
let mood = "creat";
let trmp;

function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = "";
  }
}
//save localstorge
var proudactcontienr;
if (localStorage.getItem("proudact") == null) {
  proudactcontienr = [];
} else {
  proudactcontienr = JSON.parse(localStorage.getItem("proudact"));
  display();
}
//process date
submit.onclick = function () {
  //creat prodact
  let newpro = {
    titel: titel.value,
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.value,
    count: count.value,
    category: category.value,
    total: total.innerHTML,
  };

  if (mood === "creat") {
    if (newpro.count > 1) {
      //start count
      for (i = 0; i < newpro.count; i++) {
        proudactcontienr.push(newpro);
      }
    } else {
      proudactcontienr.push(newpro);
    }
    //start mood update
  } else {
    proudactcontienr[trmp] = newpro;
    mood = "creat";
    submit.innerHTML = "creat";
    count.style.display = "block";
  }

  localStorage.setItem("proudact", JSON.stringify(proudactcontienr));
  clear();
  display();
};
//clear input after
clear = function () {
  let input_value = document.getElementsByClassName("inputs");

  for (i = 0; i < input_value.length; i++) {
    input_value[i].value = "";
  }

  total.innerHTML = "";
};
//display date in table
function display() {
  var oc = "";

  for (var i = 0; i < proudactcontienr.length; i++) {
    oc += `
<tr>
<td>${i}</td>
<td>${proudactcontienr[i].titel}</td>
<td>${proudactcontienr[i].price}</td>
<td>${proudactcontienr[i].taxes}</td>
<td>${proudactcontienr[i].ads}</td>
<td>${proudactcontienr[i].discount}</td>
<td>${proudactcontienr[i].total}</td>
<td>${proudactcontienr[i].category}</td>
<td> <i onclick="update(${i})" class="fa-solid fa-square-pen " id="btn_update"></i></td>
<td> <i onclick="delet(${i})" class="fa-solid fa-trash-can delet "></i></td>
</tr>

`;
  }
  document.getElementById("tablebody").innerHTML = oc;

  let deleall = document.getElementById("btn_delet");

  if (proudactcontienr.length > 0) {
    deleall.innerHTML = `<button onclick="delet_all()" id="deletmerg">delet All(${proudactcontienr.length})</button>`;
  } else {
    deleall.innerHTML = "";
  }
}
// delet all
function delet_all() {
  localStorage.clear();
  proudactcontienr.splice(0);
  display();
}
//delet iteam
function delet(i) {
  proudactcontienr.splice(i, 1);
  localStorage.setItem("proudact", JSON.stringify(proudactcontienr));
  display();
}
//update iteam
function update(i) {
  titel.value = proudactcontienr[i].titel;
  price.value = proudactcontienr[i].price;
  taxes.value = proudactcontienr[i].taxes;
  ads.value = proudactcontienr[i].ads;
  discount.value = proudactcontienr[i].discount;
  gettotal();
  category.value = proudactcontienr[i].category;
  count.style.display = "none";
  submit.innerHTML = "update";
  mood = "update";
  trmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
//search
let searchmood = "titel";
function getsearchmood(id) {
  let search = document.getElementById("search");

  if (id === search_proudact) {
    searchmood = "titel";
  } else {
    searchmood = "category";
  }
  search.focus();
}
//search by Date
function search_date(value) {
  var oc = "";
  if (searchmood == "titel") {
    for (let i = 0; i < proudactcontienr.length; i++) {
      if (proudactcontienr[i].titel.includes(value)) {
        oc += `
  <tr>
  <td>${i}</td>
  <td>${proudactcontienr[i].titel}</td>
  <td>${proudactcontienr[i].price}</td>
  <td>${proudactcontienr[i].taxes}</td>
  <td>${proudactcontienr[i].ads}</td>
  <td>${proudactcontienr[i].discount}</td>
  <td>${proudactcontienr[i].total}</td>
  <td>${proudactcontienr[i].category}</td>
  <td> <i onclick="update(${i})" class="fa-solid fa-square-pen " id="btn_update"></i></td>
  <td> <i onclick="delet(${i})" class="fa-solid fa-trash-can delet "></i></td>
  </tr>
  
  `;
      }
    }
  } else {
    for (let i = 0; i < proudactcontienr.length; i++) {
      if (proudactcontienr[i].category.includes(value)) {
        oc += `
        <tr>
        <td>${i}</td>
        <td>${proudactcontienr[i].titel}</td>
        <td>${proudactcontienr[i].price}</td>
        <td>${proudactcontienr[i].taxes}</td>
        <td>${proudactcontienr[i].ads}</td>
        <td>${proudactcontienr[i].discount}</td>
        <td>${proudactcontienr[i].total}</td>
        <td>${proudactcontienr[i].category}</td>
        <td> <i onclick="update(${i})" class="fa-solid fa-square-pen " id="btn_update"></i></td>
        <td> <i onclick="delet(${i})" class="fa-solid fa-trash-can delet "></i></td>
        </tr>
        
        `;
      }
    }
  }
  document.getElementById("tablebody").innerHTML = oc;
}
