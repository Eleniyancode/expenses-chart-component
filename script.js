'use strict';

const barCharts = [...document.querySelectorAll('.bar')];
const amountEls = [...document.querySelectorAll('.amount')];
const bars = [...document.querySelectorAll('.bar')]

console.log(barCharts);
console.log(amountEls);

const formatcur = function(value, locale, currency) {
        return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency
    }).format(value)  
}

fetch('data.json')
.then(response => response.json())
.then(data =>{
    console.log(data);
    barCharts.forEach((bar, i) => {
    const height = Math.round(3 * data[i].amount)
    console.log(height);
    bar.style.height = `${height}px`
    amountEls[i].textContent = `${formatcur(Number(data[i].amount), 'en-US', 'USD')}`;
    
    
    bar.addEventListener('mouseover', () => {
        amountEls[i].style.display = 'block';
    })
    
    bar.addEventListener('mouseout', () => {
        amountEls[i].style.display = 'none';
    })
    
    bars.forEach((b) => {
        bar.addEventListener('click', () => {
        amountEls[i].style.display = 'block';
        console.log('clicked');
    })
    })
    
})
})
.catch(error => {
    console.log('Error loading JSON', error)
});