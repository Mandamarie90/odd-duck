
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

products.push(new Product('Bag', './img/bag.jpg'));
products.push(new Product('Banana', 'img/banana.jpg'));
products.push(new Product('Bathroom', 'img/bathroom.jpg'));
products.push(new Product('Boots', 'img/boots.jpg'));
products.push(new Product('Breakfast', 'img/breakfast.jpg'));
products.push(new Product('Bubblegum', 'img/bubblegum.jpg'));
products.push(new Product('Chair', 'img/chair.jpg'));
products.push(new Product('Cthulhu', 'img/cthulhu.jpg'));
products.push(new Product('Dog Duck', 'img/dog-duck.jpg'));
products.push(new Product('Dragon', 'img/dragon.jpg'));
products.push(new Product('Pen', 'img/pen.jpg'));
products.push(new Product('Pet Sweep', 'img/pet-sweep.jpg'));
products.push(new Product('Scissors', 'img/scissors.jpg'));
products.push(new Product('Shark', 'img/shark.jpg'));
products.push(new Product('Tauntaun', 'img/tauntaun.jpg'));
products.push(new Product('Unicorn', 'img/unicorn.jpg'));
products.push(new Product('Water Can', 'img/water-can.jpg'));
products.push(new Product('Wine Glass', 'img/wine-glass.jpg'));
products.push(new Product('Sweep', 'img/sweep.png'));

preloadImages();

// Function to generate random product indices
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

// Function to display products
function displayProducts() {
  let productSection = document.getElementById('products');
  productSection.innerHTML = ''; // Clear previous products
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

// Inside your event listener
document.getElementById('products').addEventListener('click', function(event) {
  const clickedImg = event.target;
  if (clickedImg.tagName === 'IMG') {
    const productName = clickedImg.alt; // Get the alt attribute which contains the product name
    handleClick(productName);// Pass the index to handleClick function
  }
});

function handleClick(productName) {
  // Your existing code that uses the productName parameter
  // Find the product object based on its name
  const product = products.find(product => product.name === productName);
  if (product) {
    product.timesClicked++;
    currentRound++;
    if (currentRound < rounds) {
      displayProducts();
    } else {
      displayResults();
  }
}
}
// Pre-load images
function preloadImages() {
  products.forEach(product => {
    const img = new Image();
    img.src = product.imagePath;
  });
}

// Function to display results
function displayResults() {
  const resultSection = document.createElement('div');
  resultSection.classList.add('results');
  
  // Clear previous chart if any
  document.getElementById('myChart').innerHTML = '';

  // Sort products based on votes in descending order
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

