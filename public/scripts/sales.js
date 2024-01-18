let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let sale = document.getElementById("sales").innerText;
let user = document.getElementById("user").innerText;
let filter = document.getElementById("filter").innerText;
let brands = document.getElementById("branding").innerText;
let sales = JSON.parse(sale);
let tables = document.getElementById("body")
let openModalsButtons = document.querySelectorAll('[data-modals-target]')
let closeModalsButtons = document.querySelectorAll('[data-close-button]')
let overlay = document.getElementById('overlay')
const month = date.js.month()
const year = date.js.year()

document.getElementById("brand").selectedIndex = -1;

closeBtn.addEventListener("click", () => {
sidebar.classList.toggle("open");
menuBtnChange(); 
});

(function () {
'use strict'

    let forms = document.querySelectorAll('.needs-validation')

    Array.prototype.slice.call(forms)
    .forEach(function (form) {
    form.addEventListener('submit', function (event) {
    if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
    }

    form.classList.add('was-validated')
    }, false)
    })
})()

let today= new Date()




function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");


    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 

    }
}


sales.sort((a, b) => a.date < b.date ? 1 : -1)

$("#search").on("keyup", function() {
  var value = $(this).val().toLowerCase();
  $("#body tr").filter(function() {
    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
  });
});

let opt = {
  margin: [.5,.2,.6,.1],
  image:        { type: 'jpeg', quality: 1},
  html2canvas:  {dpi: 300, letterRendering: true, width: 820},
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};
let optSale = {
  margin: [.2,.2,1,.2],
  image:        { type: 'jpeg', quality: 1},
  html2canvas:  {dpi: 300, letterRendering: true, width: 950},
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};


if(filter === "Daily"){
  for(let i=0; i<sales.length; i++){
    const saleDate = new Date(sales[i].date)
    const currentDate = new Date()
    if(saleDate.setHours(0, 0, 0, 0) == currentDate.setHours(0, 0, 0, 0)){
    let date = new Date(sales[i].date)
    let row = `<tr onclick="window.location='sales/${sales[i].imei}'">
              <td class="imei">${sales[i].imei}</td>
              <td class="brand">${sales[i].brand}</td>
              <td class="model">${sales[i].model}</td>
              <td class="variant">${sales[i].variant}</td>
              <td class="firstName">${sales[i].firstName}</td>
              <td class="lastName">${sales[i].lastName}</td>
              <td class="number">${sales[i].number}</td>
              <td class="address">${sales[i].address}</td>
              <td class="date">${date.getMonth()+1} / ${date.getDate()}  / ${date.getFullYear()}</td>
              
            </tr> `
    tables.innerHTML += row
    $('#remove').remove();
    $('#brand').prepend(` <option value="All" id="remove">All</option>`)      
  }
}
  $("body").on("click", "#btnExport", function () {
    const table = document.getElementById("tablePdf")
    html2pdf().set(opt).from(table).save(`${month} ${date.getDate()}, ${year} Sales`)
  });
} else if(filter === "Brand") {
  for(let i=0; i <sales.length; i++){
    const saleDate = new Date(sales[i].date)
    const currentDate = new Date()
    if(sales[i].brand == brands && saleDate.setHours(0, 0, 0, 0) == currentDate.setHours(0, 0, 0, 0)){
      let date = new Date(sales[i].date)
      let row = `<tr onclick="window.location='sales/${sales[i].imei}'">
            <td class="imei">${sales[i].imei}</td>
            <td class="brand">${sales[i].brand}</td>
            <td class="model">${sales[i].model}</td>
            <td class="variant">${sales[i].variant}</td>
            <td class="firstName">${sales[i].firstName}</td>
            <td class="lastName">${sales[i].lastName}</td>
            <td class="number">${sales[i].number}</td>
            <td class="address">${sales[i].address}</td>
            <td class="date">${date.getMonth()+1} / ${date.getDate()}  / ${date.getFullYear()}</td>
            
          </tr> `
      tables.innerHTML += row
      $('#remove').remove();
      $('#brand').prepend(` <option value="All" id="remove">All</option>`)
    } 
}
  $("body").on("click", "#btnExport", function () {
    const table = document.getElementById("tablePdf")
    html2pdf().set(opt).from(table).save(`${brands} ${month} ${today.getDate()}, ${year} Sales`)
  });
  }else if(filter === "Monthly"){
  for(let i=0; i<sales.length; i++){
    const saleDate = new Date(sales[i].date)
    const currentDate = new Date()
    const zeroSale = new Date(saleDate.setHours(0, 0, 0, 0))
    const zeroCurrent = new Date (currentDate.setHours(0, 0, 0, 0))
    const saleMonth = zeroSale.getMonth()
    const currentMonth = zeroCurrent.getMonth()
    const saleYear = zeroSale.getYear()
    const currentYear = zeroCurrent.getYear()
    if(currentYear == saleYear && saleMonth == currentMonth){
      let date = new Date(sales[i].date)
      let row = `<tr onclick="window.location='sales/${sales[i].imei}'">
                  <td class="imei">${sales[i].imei}</td>
                  <td class="brand">${sales[i].brand}</td>
                  <td class="model">${sales[i].model}</td>
                  <td class="variant">${sales[i].variant}</td>
                  <td class="firstName">${sales[i].firstName}</td>
                  <td class="lastName">${sales[i].lastName}</td>
                  <td class="number">${sales[i].number}</td>
                  <td class="address">${sales[i].address}</td>
                  <td class="date">${date.getMonth()+1} / ${date.getDate()}  / ${date.getFullYear()}</td>
                  
                </tr> `
      tables.innerHTML += row
      $('#remove').remove();
        $('#brand').prepend(` <option value="All" id="remove">All</option>`)
    }
}


$("body").on("click", "#btnExport", function () {
  const table = document.getElementById("tablePdf")
  html2pdf().set(opt).from(table).save(`${month} ${year} Sales`)
});
} else {
    for(let i=0; i <sales.length; i++){
    let date = new Date(sales[i].date)
    let row = `<tr onclick="window.location='sales/${sales[i].imei}'">
              <td class="imei">${sales[i].imei}</td>
              <td class="brand">${sales[i].brand}</td>
              <td class="model">${sales[i].model}</td>
              <td class="variant">${sales[i].variant}</td>
              <td class="firstName">${sales[i].firstName}</td>
              <td class="lastName">${sales[i].lastName}</td>
              <td class="number">${sales[i].number}</td>
              <td class="address">${sales[i].address}</td>
              <td class="date">${date.getMonth()+1} / ${date.getDate()}  / ${date.getFullYear()}</td>
              
            </tr> `
    tables.innerHTML += row
}
$("body").on("click", "#btnExport", function () {
  const table = document.getElementById("tablePdf")

  html2pdf().set(optSale).from(table).save(`Sales`)
});
}

var date = new Date();
date. setDate(date. getDate() - 13);
console. log(date);

//filters
let brand = []
let model = []

for (sale of sales) {
  brand.push(sale.brand)
}
for (sale of sales) {
  model.push(sale.model)
}


let uniqueBrand = [...new Set(brand)]

uniqueBrand.sort((a, b) => a > b ? 1 : -1)

for(uniqueItem of uniqueBrand) {
  $('<option/>')
  .val(uniqueItem)
  .text(`${uniqueItem}`)
  .appendTo('#brand')

}

let maxLength = 11;
$(document).ready(function(){
  $('#number').on('keydown keyup change', function(){
  let char = $(this).val();
  let charLength = $(this).val().length;
  if(charLength > maxLength){
    $(this).val(char.substring(0, maxLength));

   }
  });
});

$(document).ready(function () {
  $("#code").select2();
});





document.getElementById("code").selectedIndex = -1;

document.getElementById("brand").selectedIndex = -1;


$('#brand').on('change', function(){
  $('#body').html('');
  $('#head').remove();
    for(let i=0; i<sales.length; i++){
    if($('#brand').val()==sales[i].brand){
      let date = new Date(sales[i].date)
      let options = `<tr onclick="window.location='sales/${sales[i].imei}'">
                <td class="imei">${sales[i].imei}</td>
                <td class="brand">${sales[i].brand}</td>
                <td class="model">${sales[i].model}</td>
                <td class="variant">${sales[i].variant}</td>
                <td class="firstName">${sales[i].firstName}</td>
                <td class="lastName">${sales[i].lastName}</td>
                <td class="number">${sales[i].number}</td>
                <td class="address">${sales[i].address}</td>
                <td class="date">${date.getMonth()+1} / ${date.getDate()}  / ${date.getFullYear()}</td>
              </tr> `
    $('#body').append(options)


}else if($('#brand').val()=="All"){
    let date = new Date(sales[i].date)
    let options = `<tr onclick="window.location='sales/${sales[i].imei}'">
          <td class="imei">${sales[i].imei}</td>
          <td class="brand">${sales[i].brand}</td>
          <td class="model">${sales[i].model}</td>
          <td class="variant">${sales[i].variant}</td>
          <td class="firstName">${sales[i].firstName}</td>
          <td class="lastName">${sales[i].lastName}</td>
          <td class="number">${sales[i].number}</td>
          <td class="address">${sales[i].address}</td>
          <td class="date">${date.getMonth()+1} / ${date.getDate()}  / ${date.getFullYear()}</td>
        </tr> `
     $('#body').append(options)
}
}

});

$('#brand').one('change', function(){
  $('#remove').remove();
  $('#brand').prepend(`<option value="All">All</option>`)
 });


$(window).on('load', function () {
  $('#loading').hide();
}) 










// modals
openModalsButtons.forEach(button => {
  button.addEventListener('click', () => {
  const modals = document.querySelector(button.dataset.modalsTarget)
  openModals(modals)
  })
})

closeModalsButtons.forEach(button => {
  button.addEventListener('click', () => {
  const modals = button.closest('.modals')
  closeModals(modals)
  })
})

function openModals(modals) {
  if (modals == null) return
  modals.classList.add('activate')
  overlay.classList.add('activate')
}

function closeModals(modals) {
  if (modals == null) return
  modals.classList.remove('activate')
  overlay.classList.remove('activate')
}

overlay.addEventListener('click', () => {
  const modalss = document.querySelectorAll('.modals.activate')
    modalss.forEach(modals => {
      closeModals(modals)
    })
})


  
let scanner = null;
Dynamsoft.DBR.BarcodeReader.license = 'DLS2eyJoYW5kc2hha2VDb2RlIjoiMTAxMTQ0NDc5LVRYbFhaV0pRY205cSIsIm9yZ2FuaXphdGlvbklEIjoiMTAxMTQ0NDc5In0';

document.getElementById("camera").addEventListener('click', async function (e) {
  e.preventDefault()
  document.getElementById("close").addEventListener('click', ()=>{
    scanner.hide()
  })
try {
scanner = scanner || await Dynamsoft.DBR.BarcodeScanner.createInstance();

  await scanner.setUIElement(document.getElementById('div-ui-container'))
  await scanner.updateRuntimeSettings("single");
  let runtimeSettings = await scanner.getRuntimeSettings();
  runtimeSettings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_CODE_128
  await scanner.updateRuntimeSettings(runtimeSettings);
    scanner.onUniqueRead = (txt, result) => {
          const imei = result.barcodeText;
          document.getElementById("imei").value = imei
          scanner.hide();
          document.getElementById("close").click()
    };
    await scanner.show();
  } catch (ex) {
    alert(ex.message);
    throw ex;
  }
});
document.getElementById("camera2").addEventListener('click', async function (e) {
  e.preventDefault()
  document.getElementById("close2").addEventListener('click', ()=>{
  scanner.hide()
})
try {
  scanner = scanner || await Dynamsoft.DBR.BarcodeScanner.createInstance();

  await scanner.setUIElement(document.getElementById('div-ui-container2'))
  await scanner.updateRuntimeSettings("single");
  let runtimeSettings = await scanner.getRuntimeSettings();
  runtimeSettings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_QR_CODE
  await scanner.updateRuntimeSettings(runtimeSettings);
    scanner.onUniqueRead = (txt, result) => {
          const imei = result.barcodeText;
            $('#code').append(
            $("<option selected='selected'></option>").val(imei).html(imei)
            );
          scanner.hide();
          document.getElementById("close2").click()
    };
    await scanner.show();
  } catch (ex) {
    alert(ex.message);
    throw ex;
  }
});
     
   
    