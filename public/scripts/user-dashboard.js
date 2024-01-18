  let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let searchBtn = document.querySelector(".bx-search");
      let sale = document.getElementById("sales").innerText;
      let sales = JSON.parse(sale);
      let user = document.getElementById("users").innerText;
      let users = JSON.parse(user);
       let openModalsButtons = document.querySelectorAll('[data-modals-target]')
      let closeModalsButtons = document.querySelectorAll('[data-close-button]')
      let overlay = document.getElementById('overlay');
      let monthly = document.getElementById("monthly").value;
      let employee = document.getElementById("user").innerText;
       let target = document.getElementById("target").innerText;
 
       
      closeBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        menuBtnChange(); 
      });
  
document.getElementById("code").selectedIndex = -1;
    
      function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
          closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
        } else {
          closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 
        }
      }
  console.log(employee)

      for(let i = 0; i <sales.length; i++){
        const saleDate = new Date(sales[i].date)
        const currentDate = new Date()
        const zeroSale = new Date(saleDate.setHours(0, 0, 0, 0))
        const zeroCurrent = new Date (currentDate.setHours(0, 0, 0, 0))
        const saleMonth = zeroSale.getMonth()
        const currentMonth = zeroCurrent.getMonth()
        const saleYear = zeroSale.getYear()
        const currentYear = zeroCurrent.getYear()
      
        if(currentYear == saleYear && saleMonth == currentMonth  && sales[i].sellerID == employee){
          
          let val = document.getElementById("monthly").value;
          parsed = parseInt(val)
          parsed += 1
          document.getElementById("monthly").value = parsed;
       }
      }

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

 $("#code").select2();
