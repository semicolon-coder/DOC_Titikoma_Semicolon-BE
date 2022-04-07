function openSidebar() {
    document.querySelector('#sidebar').classList.toggle('-left-72')
}

const stockInput = document.getElementById('stock');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');

minusButton.addEventListener('click', event => {
    event.preventDefault();
    const currentValue = Number(stockInput.value) || 0;
    if(currentValue !== 0) {
        stockInput.value = currentValue - 1;
    }
});

plusButton.addEventListener('click', event => {
    event.preventDefault();
    const currentValue = Number(stockInput.value) || 0;
    stockInput.value = currentValue + 1;
});
