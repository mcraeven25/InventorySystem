let sidebar = document.querySelector(".sidebar");
      let closeBtn = document.querySelector("#btn");
      let searchBtn = document.querySelector(".bx-search");
      let sale = document.getElementById("sales").innerText;
      let sales = JSON.parse(sale);
      let user = document.getElementById("user").innerText;
      let users = JSON.parse(user);
      let brandName = document.getElementById("brandNames").innerText;
      let brands = JSON.parse(brandName);
      let tables = document.getElementById("body")
      let openModalsButtons = document.querySelectorAll('[data-modals-target]')
      let closeModalsButtons = document.querySelectorAll('[data-close-button]')
      let overlay = document.getElementById('overlay')
      let ctx = document.getElementById('myChart').getContext('2d');
      let ctx1 = document.getElementById('myChart2').getContext('2d')
      let tabs = document.querySelectorAll('[data-tab-target]')
      const tabContents = document.querySelectorAll('[data-tab-content]')
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

    
     function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
          closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    

        } else {
          closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 
          
        }
      }
sales.sort((a, b) => a.date < b.date ? 1 : -1)
const brandObject = { }

      
for (nameBrand of brands) {
  let nameBrands = nameBrand.brand
  brandObject[nameBrands] = 0;
}
 $(window).on('load', function () {
    $('#loading').hide();
  }) 
 
       
for(let i=0; i<sales.length; i++){
  let date = new Date(sales[i].date)
  if(users.id == sales[i].sellerID){
  let row = `<tr>
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
   
      // monthly sales
    let janSales = 0;
    let febSales = 0;
    let marchSales = 0;
    let aprilSales = 0;
    let maySales = 0;
    let juneSales = 0;
    let julySales = 0;
    let augustSales = 0;
    let septSales = 0;
    let octSales = 0;
    let novSales = 0;
    let decSales = 0;

     let year = new Date()
     let currentYear  = year.getFullYear()
  

    for (let i = 0; i < sales.length; i++) {
        let date = new Date(sales[i].date);
     
       if(date.getFullYear() == currentYear && users.id == sales[i].sellerID ){
  
        switch(date.getMonth()+1 ){
          case 1:
            janSales = janSales + 1;
            break;
          case 2:
            febSales += 1
            break;
          case 3:
            marchSales += 1
            break;
          case 4:
            aprilSales += 1
            break;
          case 5:
            maySales += 1
            break;
          case 6:
            juneSales += 1
            break;
          case 7:
            julySales += 1
            break;
          case 8:
            augustSales += 1
            break;
          case 9:
            septSales += 1
            break;
          case 10:
            octSales += 1
            break;
          case 11:
            novSales += 1
            break;
          case 12:
            decSales += 1
            break;
        }
    }
  }
    let newData = [janSales,febSales,marchSales,aprilSales,maySales,juneSales,
    julySales,augustSales,septSales,octSales,novSales,decSales]
      
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June','July', 'August', 
        'September', 'October', 'November', 'December'],
        datasets: [{
            label : 'Monthly Sales',
            data: newData,
         backgroundColor: [
                "rgb(255, 255, 255)"
            ],
            borderColor: [
                
            ],
            borderWidth: 1
        }]
    },
      options: {
        scales: {
             y: {
            ticks: {
                 color: "white", 
         
                font: {
            size: 15, 
                   },
                  },
                beginAtZero: true, 
               grid: {
                 display: false,
                },
            },
            x: {
                grid: {
                 display: false,
                 },
                  ticks: {
                 color: "white", 
         
                font: {
            size: 15, 
                   },
                  }
            }
        },
           plugins: { 
      legend: {
                labels: {
                    color: "white",
                   font: {
                     size: 18 
                      }
                }
            },
    },
        },
      })
  for(nameOfBrand in brandObject) {
  const name = nameOfBrand
 
  for (sale of sales){
  const saleDate = new Date(sale.date)
  const currentDate = new Date()
  const zeroSale = new Date(saleDate.setHours(0, 0, 0, 0))
  const zeroCurrent = new Date (currentDate.setHours(0, 0, 0, 0))
  const saleMonth = zeroSale.getMonth()
  const currentMonth = zeroCurrent.getMonth()
  const saleYear = zeroSale.getYear()
  const currentYear = zeroCurrent.getYear()
  if(currentYear == saleYear && saleMonth == currentMonth && sale.sellerID === users.id.toString()){
   
     if(sale.brand === name){
      brandObject[nameOfBrand] +=1
    }
  }
}
}

 const myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        
        datasets: [{
            label : 'Monthly Sales',
            data: brandObject,
         backgroundColor: [
                "rgb(255, 255, 255)"
            ],
            borderColor: [
                
            ],
            borderWidth: 1
        }]
    },
      options: {
        scales: {
             y: {
            ticks: {
                 color: "white", 
         
                font: {
            size: 15, 
                   },
                  },
                beginAtZero: true, 
               grid: {
                 display: false,
                },
            },
            x: {
                grid: {
                 display: false,
                 },
                  ticks: {
                 color: "white", 
         
                font: {
            size: 15, 
                   },
                  }
            }
        },
           plugins: { 
      legend: {
                labels: {
                    color: "white",
                   font: {
                     size: 18 
                      }
                }
            },
    },
        },
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
      
    document.getElementById("brand").selectedIndex = -1;
   
  
   $('#brand').on('change', function(){
       $('#body').html('');
        for(let i=0; i<sales.length; i++){
          if($('#brand').val()==sales[i].brand){
            let date = new Date(sales[i].date)
      let options = `<tr>
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
      
    } else if($('#brand').val()=="All"){
     let date = new Date(sales[i].date)
     let options = `<tr>
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

        documnet.getElementById("code").selectedIndex = -1
