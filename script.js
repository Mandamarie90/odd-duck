// script.js
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

// Initial setup
// Add products to the products array
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

// Function to generate random product indices
function generateRandomProducts() {
  let productIndex = [];
  while (productIndex.length < 3) {
    let randomIndex = Math.floor(Math.random() * products.length);
    if (!productIndex.includes(randomIndex)) {
      productIndex.push(randomIndex);
    }
  }
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
    const index = Array.from(clickedImg.parentNode.children).indexOf(clickedImg);
    handleClick(index); // Pass the index to handleClick function
  }
});

// Define your handleClick function to accept the index parameter
function handleClick(index) {
  // Your existing code that uses the index parameter
  products[index].timesClicked++;
  currentRound++;
  if (currentRound < rounds) {
    displayProducts();
  } else {
    displayResults();
  }
}



// Function to display results
function displayResults() {
  const resultSection = document.createElement('div');
  resultSection.classList.add('results');
  products.forEach(product => {
    const result = document.createElement('p');
    result.textContent = `${product.name} had ${product.timesClicked} votes, and was seen ${product.timesShown} times.`;
    resultSection.appendChild(result);
  });
  document.body.appendChild(resultSection);
}

// Start displaying products
displayProducts();

// Event listener for viewing results
document.getElementById('viewResults').addEventListener('click', displayResults);




