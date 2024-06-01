const optionsPrices = {
  option1: 34000,
  option2: 49000
};

let selectedOptions = [];

function addOption() {
  const optionSelect = document.getElementById('option');
  const optionValue = optionSelect.value;

  if (optionValue) {
      const optionText = optionSelect.selectedOptions[0].text; // 옵션 텍스트 가져오기
      const optionPrice = optionsPrices[optionValue]; // 옵션 가격 가져오기

      // 선택된 옵션 목록에 추가
      selectedOptions.push({ value: optionValue, text: optionText, price: optionPrice, quantity: 1 });
      renderSelectedOptions();

      // 옵션 선택 초기화
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
              <button class="quantity-btn gray-btn" onclick="updateOptionQuantity(${index}, -1)">-</button>
              <input type="text" value="${option.quantity}" readonly class="quantity-input">
              <button class="quantity-btn gray-btn" onclick="updateOptionQuantity(${index}, 1)">+</button>
              <button class="remove-btn" onclick="removeOption(${index})">x</button>
          </div>
      `;

      selectedOptionsContainer.appendChild(optionElement);
  });

  // 총 금액 업데이트
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

  // 썸네일 활성화 표시
  const thumbnails = document.querySelectorAll('.thumbnail');
  thumbnails.forEach(thumbnail => thumbnail.classList.remove('active'));
  document.querySelector(`.thumbnail[src="${imageSrc}"]`).classList.add('active');
}

function autoSlide() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  changeImage(images[currentImageIndex]);
}

// 5초마다 자동 슬라이드
setInterval(autoSlide, 5000);