  let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let searchBtn = document.querySelector(".bx-search");
      let sale = document.getElementById("returned").innerText;
      let brands = document.getElementById("branding").innerText;
      let returned = JSON.parse(sale);
      let tables = document.getElementById("body")
      let openModalsButtons = document.querySelectorAll('[data-modals-target]')
      let closeModalsButtons = document.querySelectorAll('[data-close-button]')
      let overlay = document.getElementById('overlay')
    
    returned.sort((a, b) => a.returnedDate < b.returnedDate ? 1 : -1)
    
    
      closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); 
      });

 let opt = {
  margin: [.2,1,1,1],
  image:        { type: 'jpeg', quality: 1},
  html2canvas:  {dpi: 300, letterRendering: true, width: 1200},
  jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
};



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
  



  
   $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  
      for(let i=0; i <returned.length; i++){
        let date = new Date(returned[i].date)
        let dateReturn = new Date(returned[i].returnedDate)
        
        if(returned[i].action == "For Repair"){
        let row = `<tr class="repair">
                    <td class="imei" onclick="window.location='returned/${returned[i].imei}'">${returned[i].imei}</td>
                     <td class="imei">None</td>
                    <td class="brand">${returned[i].brand}</td>
                    <td class="model">${returned[i].model}</td>
                    <td class="date">${date.getMonth()+1} / ${date.getDate()}  / ${date.getFullYear()}</td>
                    <td class="returned-date">${dateReturn.getMonth()+1} / ${dateReturn.getDate()}  / ${dateReturn.getFullYear()}</td>
                    <td class="reason">${returned[i].reason}</td>
                    <td class="action">${returned[i].action}</td>
                    <td> 
                      <form action="/returned?_method=PUT" method="POST" id="${returned[i].imei}" class="unset ">
                        <input type="number" value="${returned[i].imei}" name="imei" style="display:none"/>
                      <select name="status" id="status" class="form-select unset-select" required onchange="changeHandler(${returned[i].imei})">
                         <option value="${returned[i].status}">${returned[i].status}</option>
                        <option value="Pending">Pending</option>
                          <option value="On Process">On Process</option>
                          <option value="For Pick Up">For Pick Up</option>
                          <option value="Completed">Completed</option>
                      </select>
                      </form>
                      </td>
                    <td class="firstName">${returned[i].firstName}</td>
                    <td class="lastName">${returned[i].lastName}</td>
                    <td class="number">${returned[i].number}</td>
                    </tr> `
      tables.innerHTML += row


  } else if(returned[i].action == "Replacement"){
        let row = `<tr>
                    <td class="imei" class="imei" onclick="window.location='returned/${returned[i].imei}'">${returned[i].imei}</td>
                    <td class="imei">${returned[i].replace}</td>
                    <td class="brand">${returned[i].brand}</td>
                    <td class="model">${returned[i].model}</td>
                    <td class="date">${date.getMonth()+1} / ${date.getDate()}  / ${date.getFullYear()}</td>
                    <td class="returned-date">${dateReturn.getMonth()+1} / ${dateReturn.getDate()}  / ${dateReturn.getFullYear()}</td>
                    <td class="reason">${returned[i].reason}</td>
                    <td class="action">${returned[i].action}</td>
                 
                      <td class="completed">Completed</td>
                     
                    <td class="firstName">${returned[i].firstName}</td>
                    <td class="lastName">${returned[i].lastName}</td>
                    <td class="number">${returned[i].number}</td>
                    </tr> `
      tables.innerHTML += row


  }
  
    
      
    }
const  changeHandler = (imei) => {
      let form = document.getElementById(imei)
      form.submit()
}
  //filters
 


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
      

      
  $(window).on('load', function () {
    $('#loading').hide();
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
                  document.getElementById("repairImei").value += imei
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
        runtimeSettings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_CODE_128
        await scanner.updateRuntimeSettings(runtimeSettings);
            scanner.onUniqueRead = (txt, result) => {
                  const imei = result.barcodeText;
                  document.getElementById("imei").value += imei
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
        runtimeSettings.barcodeFormatIds = Dynamsoft.DBR.EnumBarcodeFormat.BF_CODE_128
        await scanner.updateRuntimeSettings(runtimeSettings);
            scanner.onUniqueRead = (txt, result) => {
                  const imei = result.barcodeText;
                  document.getElementById("replacementImei").value += imei
                  scanner.hide();
                  document.getElementById("close3").click()
            };
            await scanner.show();
        } catch (ex) {
            alert(ex.message);
            throw ex;
        }
    });
   