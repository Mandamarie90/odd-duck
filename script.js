
class Product {
  constructor(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.timesShown = 0;
    this.timesClicked = 0;
  }
}

let products = [];
let rounds = 25;
let currentRound = 0;
let previousProductIndices = [];


// Function to retrieve products from local storage if available
function retrieveProductsFromLocalStorage() {
  const productsJSON = localStorage.getItem('products');
  if (productsJSON) {
    products = JSON.parse(productsJSON);
  } else {
    // If no products found in local storage, create new products
    createProducts();
  }
}

// Function to create new products if local storage is empty
function createProducts() {
  products.push(new Product('Bag', './Img/bag.jpg'));
  products.push(new Product('Banana', 'Img/banana.jpg'));
  products.push(new Product('Bathroom', 'Img/bathroom.jpg'));
  products.push(new Product('Boots', 'Img/boots.jpg'));
  products.push(new Product('Breakfast', 'img/breakfast.jpg'));
  products.push(new Product('Bubblegum', 'Img/bubblegum.jpg'));
  products.push(new Product('Chair', 'Img/chair.jpg'));
  products.push(new Product('Cthulhu', 'Img/cthulhu.jpg'));
  products.push(new Product('Dog Duck', 'Img/dog-duck.jpg'));
  products.push(new Product('Dragon', 'Img/dragon.jpg'));
  products.push(new Product('Pen', 'Img/pen.jpg'));
  products.push(new Product('Pet Sweep', 'Img/pet-sweep.jpg'));
  products.push(new Product('Scissors', 'Img/scissors.jpg'));
  products.push(new Product('Shark', 'Img/shark.jpg'));
  products.push(new Product('Tauntaun', 'Img/tauntaun.jpg'));
  products.push(new Product('Unicorn', 'Img/unicorn.jpg'));
  products.push(new Product('Water Can', 'Img/water-can.jpg'));
  products.push(new Product('Wine Glass', 'Img/wine-glass.jpg'));
  products.push(new Product('Sweep', 'Img/sweep.png'));
}


retrieveProductsFromLocalStorage();

preloadImages();


function generateRandomProducts() {
  let productIndex = [];
  while (productIndex.length < 3) {
    let randomIndex = Math.floor(Math.random() * products.length);
    if (!productIndex.includes(randomIndex) && !previousProductIndices.includes(randomIndex)) {
      productIndex.push(randomIndex);
    }
  }
  previousProductIndices = productIndex;
  return productIndex;
}


function displayProducts() {
  let productSection = document.getElementById('products');
  productSection.innerHTML = '';
  let randomProductIndices = generateRandomProducts();
  randomProductIndices.forEach(index => {
    const product = products[index];
    product.timesShown++;
    const image = document.createElement('img');
    image.src = product.imagePath;
    image.alt = product.name;
    productSection.appendChild(image);
  });
}


document.getElementById('products').addEventListener('click', function(event) {
  const clickedImg = event.target;
  if (clickedImg.tagName === 'IMG') {
    const productName = clickedImg.alt;
    handleClick(productName);
  }
});

function handleClick(productName) {
  const product = products.find(product => product.name === productName);
  if (product) {
    product.timesClicked++;
    currentRound++;
    if (currentRound < rounds) {
      displayProducts();
    } else {
      displayResults();
    }
    localStorage.setItem('products', JSON.stringify(products));
  }
}


function preloadImages() {
  products.forEach(product => {
    const img = new Image();
    img.src = product.imagePath;
  });
}


function displayResults() {
  const resultSection = document.createElement('div');
  resultSection.classList.add('results');

  document.getElementById('myChart').innerHTML = '';


  products.sort((a, b) => b.timesClicked - a.timesClicked);

  const labels = [];
  const viewsData = [];
  const votesData = [];
  const backgroundColors = [];
  const borderColors = [];

  products.forEach(product => {
    labels.push(product.name);
    viewsData.push(product.timesShown);
    votesData.push(product.timesClicked);
    backgroundColors.push('rgba(255, 99, 132, 0.2)');
    borderColors.push('rgba(255, 99, 132, 1)');
  });

  const ctx = document.getElementById('myChart').getContext('2d');
  const options = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Views',
        data: viewsData,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }, {
        label: 'Votes',
        data: votesData,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const myChart = new Chart(ctx, options);
}


displayProducts();


document.getElementById('viewResults').addEventListener('click', displayResults);

// Store products array into local storage as a formatted JSON string
localStorage.setItem('products', JSON.stringify(products));


