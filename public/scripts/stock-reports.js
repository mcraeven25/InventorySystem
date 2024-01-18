    
let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let select = document.getElementById("model");
let model = document.getElementById("models").innerText;
let models = JSON.parse(model);
  let variant = document.getElementById("variants").innerText;
let variants = JSON.parse(variant);
let color = document.getElementById("colors").innerText;
let colours = JSON.parse(color);
let device = document.getElementById("devices").innerText;
let devices = JSON.parse(device);
let phone = document.getElementById("phones").innerText;
let phones = JSON.parse(phone);
let tables = document.getElementById("body")
let brandFilter = document.getElementById('brand-filter');
let tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')
let openModalsButtons = document.querySelectorAll('[data-modals-target]')
let closeModalsButtons = document.querySelectorAll('[data-closed-button]')
let overlay = document.getElementById('overlay')
  

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); 
});


tabs.forEach(tab => {
tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget)
    tabContents.forEach(tabContent => {
      tabContent.classList.remove('active')
    
    })
    tabs.forEach(tab => {
      tab.classList.remove('active')
    })
    target.classList.add('active')
    tab.classList.add('active')

  })
})  
       

document.getElementById("brand-filter").selectedIndex = -1;
document.getElementById("code").selectedIndex = -1;
document.getElementById("code2").selectedIndex = -1;
document.getElementById("code3").selectedIndex = -1;
    
function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");



  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 
  

    
  }
}

      
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

$(document).ready(function () {
  $("#code").select2();
  $("#code3").select2();
  $("#code2").select2();
});

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
      if(document.getElementById("form3").classList.contains("active")){
         document.getElementById("form3").classList.remove("active")
         document.getElementById("form3").classList.add("hide")
         document.getElementById("form2").classList.remove("active")
         document.getElementById("form2").classList.add("hide")
         document.getElementById("symbol4").classList.remove("active")
         document.getElementById("symbol4").classList.add("hide")
         document.getElementById("symbol1").classList.add("active")
         document.getElementById("symbol2").classList.add("active")
         document.getElementById("symbol3").classList.add("active")
         document.getElementById("symbol1").classList.remove("hide")
      }else if(document.getElementById("form2").classList.contains("active")){
         document.getElementById("form2").classList.remove("active")
         document.getElementById("form2").classList.add("hide")
         document.getElementById("symbol1").classList.remove("hide")
         document.getElementById("symbol1").classList.add("active")
      }

      }
      
 overlay.addEventListener('click', () => {
      const modalss = document.querySelectorAll('.modals.active')
        modalss.forEach(modals => {
        closeModals(modals)
       })
        })
        document.getElementById("symbol1").addEventListener("click", ()=>{
        document.getElementById("symbol1").classList.add("hide")
       if(document.getElementById("symbol1").classList.contains("active")){
        document.getElementById("symbol1").classList.add("hide")
        document.getElementById("symbol1").classList.remove("active")
       }
       document.getElementById("form2").classList.add("active")
       document.getElementById("form2").classList.remove("hide")
    })
       document.getElementById("symbol2").addEventListener("click", ()=>{
       document.getElementById("form2").classList.remove("active")
       document.getElementById("form2").classList.add("hide")
       document.getElementById("symbol1").classList.add("active")
       document.getElementById("symbol1").classList.remove("hide")
       
    })
      document.getElementById("symbol3").addEventListener("click", ()=>{
      document.getElementById("symbol2").classList.add("hide")
      document.getElementById("symbol3").classList.add("hide")
      document.getElementById("symbol2").classList.remove("active")
      document.getElementById("symbol3").classList.remove("active")
      document.getElementById("form3").classList.add("active")
      document.getElementById("form3").classList.remove("hide")
       if(!document.getElementById("symbol4").classList.contains("active")){
      document.getElementById("symbol4").classList.add("active")
      document.getElementById("symbol4").classList.remove("hide")
              
       }
      
    })
       document.getElementById("symbol4").addEventListener("click", ()=>{
       document.getElementById("form3").classList.remove("active")
       document.getElementById("form3").classList.add("hide")
       document.getElementById("symbol2").classList.add("active")
       document.getElementById("symbol3").classList.add("active")
       document.getElementById("symbol2").classList.remove("hide")
       document.getElementById("symbol3").classList.remove("hide")
    })
$('#brand-filter').val('defaultValue'); 
$('#brand-filter').change();
    ///table
         devices.sort((a, b) => a.brand > b.brand ? 1 : -1)

          $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

 for(device of devices){
  let deviceColor = device.colors
   for (color of deviceColor){
       let val = 0
     for(phone of phones){
       if(phone.brand == device.brand && phone.model == device.model && phone.variant == device.variant && phone.color == color){
      val +=1
     }
    }
        let row = `<tr> 
                    <td class="brand">${device.brand}</td>
                    <td class="model">${device.model}</td>
                    <td class="variant">${device.variant}</td>
                    <td class="color">${color}</td>
                    <td class="stock" >${val}</td>
                  </tr> `
      tables.innerHTML += row
   }
  
 }
  $('b[role="presentation"]').hide();
 let today= new Date()
 let opt = {
  margin: [.7,.2,.5,.2],
  image:        { type: 'jpeg', quality: 1},
  html2canvas:  {dpi: 300, letterRendering: true, width: 780},
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};

$("body").on("click", "#btnExport", function () {
  const table = document.getElementById("tableToPDF")
  
html2pdf().set(opt).from(table).save(`${date.js.month()} ${today.getDate()}, ${date.js.year()} Stock Report`)
  });
         


 

$('#brand-filter').on('change', function(){
    $('#body').html('');
  devices.sort((a,b) => a.model > b.model ? 1 : -1)
    for(device of devices){
    if($('#brand-filter').val()==device.brand){
        let deviceColor = device.colors
      for (color of deviceColor){
      let val = 0
          for(phone of phones){
          if(phone.brand == device.brand && phone.model == device.model 
          && phone.variant == device.variant && phone.color == color){
          val +=1
  }
}
      let row = `<tr> 
                <td class="brand">${device.brand}</td>
                <td class="model">${device.model}</td>
                <td class="variant">${device.variant}</td>
                <td class="color">${color}</td>
                <td class="stock">${val}</td>
              </tr> `
  $('#body').append(row)

}
   
    
}else if($('#brand-filter').val()=="All"){
      
let deviceColor = device.colors 
 for (color of deviceColor){
  let val = 0
  for(phone of phones){
    if(phone.brand == device.brand && phone.model == device.model
      && phone.variant == device.variant && phone.color == color){
    val +=1
  }
}
  let row = `<tr> 
            <td class="brand">${device.brand}</td>
            <td class="model">${device.model}</td>
            <td class="variant">${device.variant}</td>
            <td class="color">${color}</td>
            <td class="stock">${val}</td>
          </tr> `
            $('#body').append(row)
        }        
    }
  }
     
      });

$('#brand-filter').one('change', function(){
    
$('#brand-filter').prepend(`<option value="All">All</option>`)
  
  });
$(window).on('load', function () {
    $('#loading').hide();
}) 


for (phone of phones){
  let model = phone.model

}

function createChart (name,labels,data){
const myChart = new Chart(name, {
type: 'pie',
data: {
  labels: labels,
  datasets: [{
      label : 'Monthly Sales',
      data: data,
    backgroundColor: [
          "#FF6961",
          "#FF3D33",
          "#FFD68A",
          "#D60B00",
          "#FFB52E",
          "#FF033E",
          "#D40032",
          "#FF3161",
          "#FF9A8A",
          "#FF2400",

      ],
      borderColor: [
          
      ],
      borderWidth: 1
  }]
},
options: {
  scales: {
      y: {
          beginAtZero: true
      }
  },

  },
})
}





let brands = []
for(model of models){
  brands.push(model.brand)
}
let uniqueBrand = [...new Set(brands)]

for(brand of uniqueBrand){
  let modelarr = []
  let numbers = []
  for(let i = 0; i < models.length; i++){
    if(brand == models[i].brand){
      modelarr.push(models[i].model)
    }
  }
  for (let i = 0; i < modelarr.length; i++){
      let num = 0;
    for(let j = 0; j < phones.length; j++){
      if(modelarr[i] === phones[j].model){
        num+=1
          
      }
      
    }
      numbers.push(num) 
  }
  
  let chart = document.getElementById(brand).getContext('2d');
  
  createChart(brand,modelarr,numbers)
}
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
    runtimeSettings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_QR_CODE
    await scanner.updateRuntimeSettings(runtimeSettings);
        scanner.onUniqueRead = (txt, result) => {
              const imei = result.barcodeText;
                $('#code').append(
                $("<option selected='selected'></option>").val(imei).html(imei)
                );
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
                $('#code2').append(
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
document.getElementById("camera3").addEventListener('click', async function (e) {
    e.preventDefault()
      document.getElementById("close3").addEventListener('click', ()=>{
  scanner.hide()
})
    try {
    scanner = scanner || await Dynamsoft.DBR.BarcodeScanner.createInstance();
  
    await scanner.setUIElement(document.getElementById('div-ui-container3'))
    await scanner.updateRuntimeSettings("single");
    let runtimeSettings = await scanner.getRuntimeSettings();
    runtimeSettings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_QR_CODE
    await scanner.updateRuntimeSettings(runtimeSettings);
        scanner.onUniqueRead = (txt, result) => {
              const imei = result.barcodeText;
                $('#code3').append(
                $("<option selected='selected'></option>").val(imei).html(imei)
                );
              scanner.hide();
              document.getElementById("close3").click()
        };
        await scanner.show();
    } catch (ex) {
        alert(ex.message);
        throw ex;
    }
});



    