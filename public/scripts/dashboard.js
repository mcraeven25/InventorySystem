let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let brand = document.getElementById("brand").innerText
let brands = JSON.parse(brand);
let sale = document.getElementById("sales").innerText;
let sales = JSON.parse(sale);
let stock = document.getElementById("stocks").innerText;
let stocks = JSON.parse(stock);
let ctx = document.getElementById('myChart').getContext('2d');
let ctx1 = document.getElementById('myChart2').getContext('2d');
let ctx2 = document.getElementById('myChart3').getContext('2d');

      

$(window).on('load', function () {
  $('#loading').hide();
}) 

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); 
});

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu"); 
  }
}
   

const brandNames = { }
const currentStocks = {}
const monthlySale = {}

for (brand of brands) {
  let brandname = brand.brand
  brandNames[brandname] = 0;
  currentStocks[brandname] = 0;
  monthlySale[brandname] = 0;
}

for(stock of stocks){
 currentStocks[stock.brand] +=1;
}

for(brand in brandNames) {
  const name = brand
  for (sale of sales){
  const saleDate = new Date(sale.date)
  const currentDate = new Date()
  const zeroSale = new Date(saleDate.setHours(0, 0, 0, 0))
  const zeroCurrent = new Date (currentDate.setHours(0, 0, 0, 0))
  const saleMonth = zeroSale.getMonth()
  const currentMonth = zeroCurrent.getMonth()
  const saleYear = zeroSale.getYear()
  const currentYear = zeroCurrent.getYear()
  
  if(saleDate.setHours(0, 0, 0, 0) == currentDate.setHours(0, 0, 0, 0)){
    if(sale.brand === name){
      brandNames[brand] +=1
    }
}
  if(currentYear == saleYear && saleMonth == currentMonth){
     if(sale.brand === name){
      monthlySale[brand] +=1
    }
  }
}
}

const myChart2 = new Chart(ctx1, {
    type: 'bar',
    data: {
        
        datasets: [{
            label : 'Monthly Sales for Each Brand',
            data: monthlySale,
         backgroundColor: [
                "rgb(255,255,255)"
            ],
            borderColor: [
                
            ],
            borderWidth: 1
        }],
     
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

const myChart3 = new Chart(ctx2, {
    type: 'bar',
    data: {
        
        datasets: [{
            label : 'Stocks For Each Brand',
            data: currentStocks,
         backgroundColor: [
                "rgb(255,255,255)"
            ],
            borderColor: [
                
            ],
            borderWidth: 1
        }],
        color:"white"
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
  

const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        
        datasets: [{
            label : 'Daily Sales for Each Brand',
            data: brandNames,
         backgroundColor: [
                "rgb(255,255,255)"
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
    
   

for(sale of sales){
  const saleDate = new Date(sale.date)
  const currentDate = new Date()
  let dailySale = document.getElementById('daily').value
  let saleAmount = parseInt(dailySale)
  if(saleDate.setHours(0, 0, 0, 0) == currentDate.setHours(0, 0, 0, 0)){
    saleAmount +=1
    document.getElementById('daily').value = saleAmount
  }
}

for(sale of sales){
  const saleDate = new Date(sale.date)
  const currentDate = new Date()
  const zeroSale = new Date(saleDate.setHours(0, 0, 0, 0))
  const zeroCurrent = new Date (currentDate.setHours(0, 0, 0, 0))
  const saleMonth = zeroSale.getMonth()
  const currentMonth = zeroCurrent.getMonth()
  const saleYear = zeroSale.getYear()
  const currentYear = zeroCurrent.getYear()
  let monthlySale = document.getElementById('monthlySales').value
  let monthSalesAmount = parseInt(monthlySale)
  if(currentYear == saleYear && saleMonth == currentMonth){
    monthSalesAmount +=1
    document.getElementById('monthlySales').value = monthSalesAmount
    
  }
}