function applyFonts() {
  let allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    el.style.fontFamily = "'Cairo', 'Poppins', sans-serif";
  });
}
window.onload = applyFonts;

// variables
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

// get total
function gettotal() {
  if (price.value != '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = 'rgba(14, 8, 99, 1)';
  } else {
    total.innerHTML = '';
    total.style.background = '#222';
  }
}

let datapro;
if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

// submit button
submit.onclick = function () {
  let newpro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  }

  if(title.value !=''&& price.value !=''&& category.value !=''&&newpro.count <300 ){if(mood ==='create'){
    if (newpro.count > 1){
      for (let i = 0; i < newpro.count; i++) {
        datapro.push(newpro);

      }
    } else {
      datapro.push(newpro);
    }
      clearData();
  
  }else{
    datapro[tmp]=newpro;
    mood ='create'
    submit.innerHTML='create'
    count.style.display='block'}

  }







// localstorege
    localStorage.setItem('product', JSON.stringify(datapro));
  
    showdata();
  }

// clear inputs
function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// read data
function showdata() {

  gettotal()
  let table = '';
  for (let i = 0; i < datapro.length; i++) {
    table += `
    <tr>
      <td>${i + 1}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button onclick="updatedata(${i})" id="update">update</button></td>
      <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>
    `;
  }

  document.getElementById('tbody').innerHTML = table;

  let btndelete = document.getElementById('deleteall');
  if (datapro.length > 0) {
    btndelete.innerHTML = `
      <button onclick="deleteall()">delete all (${datapro.length})</button>
    `;
  } else {
    btndelete.innerHTML = '';
  }
}
showdata();

// delete one
function deletedata(i) {
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}

// delete all
function deleteall() {
  localStorage.clear();
  datapro.splice(0);
  showdata();
}
  
function updatedata(i){
title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value = datapro[i].taxes;
ads.value = datapro[i].ads;
discount.value = datapro[i].discount;
gettotal()
count.style.display='none';
category.value = datapro[i].category;
submit.innerHTML='update';

mood = 'update';
tmp = i;
scroll({
  top:0,
  behavior:"smooth",
})
}

// search
let searchmood = 'title';

function getSearchMood(id)
{
  let search = document.getElementById('search');
if(id =='searchtitle'){
  searchmood = 'title';
}else{
 searchmood = 'category';
}
search.placeholder ='search By ' +searchmood;
  search.focus()
  search.value = '';
  showdata()
  }

function searchdata(value)
{
let table = ''; 
for(let i = 0; i<datapro.length;i++){ 
if(searchmood == 'title')
{


{
if(datapro[i].title.includes(value.toLowerCase())){
  table += `
    <tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button onclick="updatedata(${i})" id="update">update</button></td>
      <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>
    `;
}
} 
}else{

{
if(datapro[i].category.includes(value.tolowerCase())){
  table += `
    <tr>
      <td>${i}</td>
      <td>${datapro[i].title}</td>
      <td>${datapro[i].price}</td>
      <td>${datapro[i].taxes}</td>
      <td>${datapro[i].ads}</td>
      <td>${datapro[i].discount}</td>
      <td>${datapro[i].total}</td>
      <td>${datapro[i].category}</td>
      <td><button onclick="updatedata(${i})" id="update">update</button></td>
      <td><button onclick="deletedata(${i})" id="delete">delete</button></td>
    </tr>
    `;
}
} 
}
}
document.getElementById('tbody').innerHTML = table ;  
}

