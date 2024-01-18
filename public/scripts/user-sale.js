 let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let searchBtn = document.querySelector(".bx-search");
      let sale = document.getElementById("sales").innerText;
      let sales = JSON.parse(sale);
      let tables = document.getElementById("body")
      let openModalsButtons = document.querySelectorAll('[data-modals-target]')
      let closeModalsButtons = document.querySelectorAll('[data-close-button]')
      let overlay = document.getElementById('overlay')
      let seller = document.getElementById("sellers").innerText;
      let sellers = JSON.parse(seller);
    
      $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
      
     document.getElementById("brand").selectedIndex = -1;

      closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); 
      });

(function () {
  'use strict'


  var forms = document.querySelectorAll('.needs-validation')


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
    
     

    
     function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
          closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    

        } else {
          closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 
          
        }
      }
   sales.sort((a, b) => a.date < b.date ? 1 : -1)
       
    for(let i=0; i<sales.length; i++){
      let date = new Date(sales[i].date)
      if(sales[i].sellerID == sellers.id){
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
    }
 $(window).on('load', function () {
    $('#loading').hide();
  }) 

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
  let uniqueModel = [...new Set(model)]


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
  

      
  



    document.getElementById("brand").selectedIndex = -1;
   
  
   $('#brand').on('change', function(){
      sales.sort((a, b) => a.date < b.date ? 1 : -1)
       $('#body').html('');
        for(let i=0; i<sales.length; i++){
          if($('#brand').val()==sales[i].brand){
            let date = new Date(sales[i].date)
            if(sales[i].sellerID == sellers.id){
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
    } else if($('#brand').val()=="All"){
     let date = new Date(sales[i].date)
     if(sales[i].sellerID == sellers.id){
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
}}
      });

      $('#brand').one('change', function(){
    
          $('#brand').prepend(` <option value="All">All</option>`)
            
            });





  
    
    





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
  