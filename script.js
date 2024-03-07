class Product {
  constructor(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.timesShown = 0;
    this.timesClicked = 0;
  }
}

const products = [
  new Product('Bag', './Img/bag.jpg'),
  new Product('Banana', 'Img/banana.jpg'),
  new Product('Bathroom', 'Img/bathroom.jpg'),
  new Product('Boots', 'Img/boots.jpg'),
  new Product('Breakfast', 'Img/breakfast.jpg'),
  new Product('Bubblegum', 'Img/bubblegum.jpg'),
  new Product('Chair', 'Img/chair.jpg'),
  new Product('Cthulhu', 'Img/cthulhu.jpg'),
  new Product('Dog Duck', 'Img/dog-duck.jpg'),
  new Product('Dragon', 'Img/dragon.jpg'),
  new Product('Pen', 'Img/pen.jpg'),
  new Product('Pet Sweep', 'Img/pet-sweep.jpg'),
  new Product('Scissors', 'Img/scissors.jpg'),
  new Product('Shark', 'Img/shark.jpg'),
  new Product('Tauntaun', 'Img/tauntaun.jpg'),
  new Product('Unicorn', 'Img/unicorn.jpg'),
  new Product('Water Can', 'Img/water-can.jpg'),
  new Product('Wine Glass', 'Img/wine-glass.jpg'),
  new Product('Sweep', 'Img/sweep.png')
];

const rounds = 25;
let currentRound = 0;
let previousProductIndices = [];

function retrieveProductsFromLocalStorage() {
  const productsJSON = localStorage.getItem('products');
  if (!productsJSON) {
    localStorage.setItem('products', JSON.stringify(products));
  }
}

function generateRandomProducts() {
  const productIndex = [];
  while (productIndex.length < 3) {
    const randomIndex = Math.floor(Math.random() * products.length);
    if (!productIndex.includes(randomIndex) && !previousProductIndices.includes(randomIndex)) {
      productIndex.push(randomIndex);
    }
  }
  previousProductIndices = productIndex;
  return productIndex;
}

function displayProducts() {
  const productSection = document.getElementById('products');
  productSection.innerHTML = '';
  const randomProductIndices = generateRandomProducts();
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

  new Chart(ctx, options);

  displayProducts();
}

document.getElementById('viewResults').addEventListener('click', displayResults);

retrieveProductsFromLocalStorage();
preloadImages();
displayProducts();




