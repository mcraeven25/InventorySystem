let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");
let ctx = document.getElementById('myChart').getContext('2d');
let sale = document.getElementById("sales").innerText;
let sales = JSON.parse(sale);
let model = document.getElementById("models").innerText;
let models = JSON.parse(model);
let tabs = document.querySelectorAll('[data-tab-target]')
const tabContents = document.querySelectorAll('[data-tab-content]')



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
    if(date.getFullYear() == currentYear){
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
type: 'line',
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
            "rgb(255, 255, 255)"
        ],
        borderWidth: 1,
        
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
              beginAtZero: true,
            
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
    for(let j = 0; j < sales.length; j++){
      let date = new Date(sales[j].date);
      let today = new Date()
      if(modelarr[i] == sales[j].model && today.getMonth() == date.getMonth() && today.getFullYear() == date.getFullYear()){
        num+=1
          
      }
      
    }
  numbers.push(num) 
  }
  
  let chart = document.getElementById(brand).getContext('2d');
  
  createChart(brand,modelarr,numbers)
}
  
$(window).on('load', function () {
    $('#loading').hide();
  }) 
     