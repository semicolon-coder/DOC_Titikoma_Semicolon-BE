function openSidebar() {
    document.querySelector('#sidebar').classList.toggle('-left-72')
}

function addition() {
    let number = document.getElementById('stock');
    number.value = parseInt(number.value) + 1;
}

function subtraction() {
    let number = document.getElementById('stock');
    number.value = parseInt(number.value) - 1;
}