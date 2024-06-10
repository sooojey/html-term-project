const optionsPrices = {
    option1: 34000,
    option2: 49000
};

let selectedOptions = [];

function addOption() {
    const optionSelect = document.getElementById('option');
    const optionValue = optionSelect.value;

    if (optionValue) {
        const optionText = optionSelect.selectedOptions[0].text;
        const optionPrice = optionsPrices[optionValue];

        selectedOptions.push({ value: optionValue, text: optionText, price: optionPrice, quantity: 1 });
        renderSelectedOptions();

        optionSelect.value = '';
    }
}

function renderSelectedOptions() {
    const selectedOptionsContainer = document.getElementById('selected-options');
    selectedOptionsContainer.innerHTML = '';

    let totalAmount = 0;

    selectedOptions.forEach((option, index) => {
        totalAmount += option.price * option.quantity;

        const optionElement = document.createElement('div');
        optionElement.className = 'selected-option';
        optionElement.innerHTML = `
          ${option.text}
          <div class="quantity-controls">
              <button class="quantity-btn" onclick="updateOptionQuantity(${index}, -1)">-</button>
              <input type="text" value="${option.quantity}" readonly class="quantity-input">
              <button class="quantity-btn" onclick="updateOptionQuantity(${index}, 1)">+</button>
              <button class="remove-btn" onclick="removeOption(${index})">x</button>
          </div>
      `;

        selectedOptionsContainer.appendChild(optionElement);
    });

    document.getElementById('total-price').style.display = selectedOptions.length > 0 ? 'flex' : 'none';
    document.getElementById('total-amount').innerText = totalAmount.toLocaleString() + '원';
}

function updateOptionQuantity(index, change) {
    selectedOptions[index].quantity += change;
    if (selectedOptions[index].quantity < 1) {
        selectedOptions[index].quantity = 1;
    }
    renderSelectedOptions();
}

function removeOption(index) {
    selectedOptions.splice(index, 1);
    renderSelectedOptions();
}

let currentImageIndex = 0;
const images = ['images/hanla1.webp', 'images/hanla2.jpg', 'images/hanla3.webp'];

function changeImage(imageSrc) {
    const mainImage = document.querySelector('.main-image');
    mainImage.src = imageSrc;

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
    document.querySelector(`.thumbnail[src="${imageSrc}"]`).classList.add('active');
}

function autoSlide() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    changeImage(images[currentImageIndex]);
}

setInterval(autoSlide, 5000);

function toggleDescription() {
    const description = document.querySelector('.product-description');
    const button = document.querySelector('.toggle-button');

    if (description.style.display === 'none' || description.style.display === '') {
        description.style.display = 'block';
        button.textContent = '상품 설명 접기';
    } else {
        description.style.display = 'none';
        button.textContent = '상품 설명 펼치기';
    }
}

function showTab(tabId) {
    const descriptions = document.querySelectorAll('.product-description');
    descriptions.forEach(description => description.style.display = 'none');

    document.getElementById(tabId).style.display = 'block';

    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.tab-button[onclick="showTab('${tabId}')"]`).classList.add('active');
}
