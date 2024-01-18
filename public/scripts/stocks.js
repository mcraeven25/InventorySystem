let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let select = document.getElementById("model");
     
      let model = document.getElementById("models").innerText;
      let models = JSON.parse(model);
       let variant = document.getElementById("variants").innerText;
      let variants = JSON.parse(variant);
      let color = document.getElementById("colors").innerText;
      let colours = JSON.parse(color);
      let price = document.getElementById("prices").innerText;
      let prices = JSON.parse(price);
      let phone = document.getElementById("phones").innerText;
      let phones = JSON.parse(phone);
      let tables = document.getElementById("body")
      let openModalsButtons = document.querySelectorAll('[data-modals-target]')
      let closeModalsButtons = document.querySelectorAll('[data-closed-button]')
      let overlay = document.getElementById('overlay')
      let brandFilter = document.getElementById('brand-filter');
       

closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); 
      });

         
document.getElementById("code").selectedIndex = -1;
document.getElementById("code2").selectedIndex = -1;
document.getElementById("code3").selectedIndex = -1;

let input = document.getElementById("imei")
  

$(window).on('load', function () {
    $('#loading').hide();
  }) 
    
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
  
     
    ///table
        phones.sort((a, b) => a.brand > b.brand ? 1 : -1)

          $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

          for(let i=0; i < phones.length; i++){
      let row = `<tr > 
                   <td class="code">${phones[i].code}</td>
                   
                    <td class="brand">${phones[i].brand}</td>
                    <td class="model">${phones[i].model}</td>
                    <td class="variant">${phones[i].variant}</td>
                    <td class="color">${phones[i].color}</td>
                    <td class="price">${phones[i].price}</td>
                  </tr> `
      tables.innerHTML += row
      
    }
      

  $('#brand-filter').on('change', function(){
       $('#body').html('');
      phones.sort((a, b) => a.model > b.model ? 1 : -1)
        for(let i=0; i<phones.length; i++){
          if($('#brand-filter').val()==phones[i].brand){
      let options = `<tr > 
                     <td class="code">${phones[i].code}</td>
                    <td class="brand">${phones[i].brand}</td>
                    <td class="model">${phones[i].model}</td>
                    <td class="variant">${phones[i].variant}</td>
                    <td class="color">${phones[i].color}</td>
                    <td class="price">${phones[i].price}</td>
                  </tr> `
     $('#body').append(options)
    
    
    }else if($('#brand-filter').val()=="All"){
        phones.sort((a, b) => a.brand > b.brand ? 1 : -1)
      let options = `<tr>
                     <td class="code">${phones[i].code}</td>
                    <td class="brand">${phones[i].brand}</td>
                    <td class="model">${phones[i].model}</td>
                    <td class="variant">${phones[i].variant}</td>
                    <td class="color">${phones[i].color}</td>
                    <td class="price">${phones[i].price}</td>
                  </tr> `
     $('#body').append(options)
     
    }
  }
     
      });

  $('#brand-filter').one('change', function(){
    
          $('#brand-filter').prepend(`<option value="All">All</option>`)
            
            });


    let brand = []
   
    for (device of phones) {
        brand.push(device.brand)
    }
 let uniqueItems = [...new Set(brand)]
     for(uniqueItem of uniqueItems) {
    $('<option/>')
  .val(uniqueItem)
  .text(`${uniqueItem}`)
  .appendTo('#brand-filter')
      
    }
     document.getElementById("brand-filter").selectedIndex = -1;



     for (phone of phones){
       let model = phone.model
     
     }

   

    

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
                  document.getElementById("imei").value += imei
                  scanner.hide();
                  document.getElementById("close").click()
            };
            await scanner.show();
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    });


  
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