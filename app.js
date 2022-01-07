// Inputs
const bill = document.querySelector('#bill-input')
const custom = document.querySelector('#custom')
const people = document.querySelector('#people')

// Tip percentage options
const option5 = document.querySelector('#option5')
const option10 = document.querySelector('#option10')
const option15 = document.querySelector('#option15')
const option25 = document.querySelector('#option25')
const option50 = document.querySelector('#option50')


// Outputs
const tipAmount = document.querySelector('#tip-amount')
const total = document.querySelector('#tip-total')

// Button
const resetButton = document.querySelector('#reset-btn')

let tipPercentage = 0
let currentBill = 0
let currentPeople = 0
let currentTipAmountPP = 0
let currentTotalPP = 0

class CustomSelect {
    constructor(originalSelect){
        this.originalSelect = originalSelect
        this.customSelect = document.createElement('div')
        this.customSelect.classList.add('options-container')

        console.log(this.originalSelect.querySelectorAll('option'));

        this.originalSelect.querySelectorAll('option').forEach(optionElemenet => {
            const itemElement = document.createElement('div')
            
            itemElement.classList.add('option')
            itemElement.innerHTML = optionElemenet.innerHTML
            this.customSelect.appendChild(itemElement)

            if(optionElemenet.selected){
                this._select(itemElement)
            }

            itemElement.addEventListener('click', () => {
                if (
                    this.originalSelect.multiple
                    && itemElement.classList.contains('option-selected')){
                    this._deselect(itemElement)
                } else {
                    this._select(itemElement)
                }
            })
        })

        this.originalSelect.insertAdjacentElement("afterend", this.customSelect)
        this.originalSelect.style.display = "none"
    }
    
    _select(itemElement){
        const index = Array.from(this.customSelect.children).indexOf(itemElement)

        if(!this.originalSelect.multiple){
            this.customSelect.querySelectorAll('.option').forEach(el => {
                el.classList.remove('option-selected')
            })
        }

        this.originalSelect.querySelectorAll('option')[index].selected = true;
        itemElement.classList.add('option-selected')
    }

    _deselect(itemElement){
        const index = Array.from(this.customSelect.children).indexOf(itemElement)

        this.originalSelect.querySelectorAll('option')[index].selected = false;
        itemElement.classList.remove('option-selected')
    }
}

document.querySelectorAll('.custom-select').forEach(selectElement => {
    new CustomSelect(selectElement)
})

document.addEventListener('click', () => {
    document.querySelectorAll('.option').forEach(el => {
        if(el.classList.contains('option-selected')){
            tipPercentage = parseInt(el.innerHTML, 10);
            console.log(tipPercentage);
        }
    })
})

// Button available only when inputs values provided
document.addEventListener('keyup', () => {
    if(bill.value && people.value > 0){
        resetButton.style.opacity = '1';
    } else {
        resetButton.style.opacity = '0.25';
    }

    currentBill = bill.value
    currentPeople = people.value
})

document.addEventListener('click', () => {
    if(bill.value && people.value > 0){
        resetButton.style.opacity = '1';
    } else {
        resetButton.style.opacity = '0.25';
    }

    currentBill = bill.value
    currentPeople = people.value
})

// UPDATE PAGE OUTPUTS
document.addEventListener('click', () => {
        currentTipAmountPP = ((currentBill / 100) * tipPercentage) / currentPeople
        currentTotalPP = (currentBill / currentPeople) + currentTipAmountPP

        if(!currentTipAmountPP && !currentTotalPP){
            tipAmount.innerHTML = '$0.00'
            total.innerHTML = '$0.00'
        } else if(currentTipAmountPP == Infinity || currentTotalPP == Infinity){
            tipAmount.innerHTML = '$0.00'
            total.innerHTML = '$0.00'
        } else {
            tipAmount.innerHTML = `$${currentTipAmountPP.toFixed(2)}`
            total.innerHTML = `$${currentTotalPP.toFixed(2)}`
        }

        // if(currentBill && !currentPeople){
        //     people.style.border = '2px solid red'
        // } else if(!currentBill && currentPeople){
        //     bill.style.border = '2px solid red'
        // }
})

document.addEventListener('keyup', () => {
        currentTipAmountPP = ((currentBill / 100) * tipPercentage) / currentPeople
        currentTotalPP = (currentBill / currentPeople) + currentTipAmountPP

        if(!currentTipAmountPP && !currentTotalPP){
            tipAmount.innerHTML = '$0.00'
            total.innerHTML = '$0.00'
        } else if(currentTipAmountPP == Infinity || currentTotalPP == Infinity){
            tipAmount.innerHTML = '$0.00'
            total.innerHTML = '$0.00'
        } else {
            tipAmount.innerHTML = `$${currentTipAmountPP.toFixed(2)}`
            total.innerHTML = `$${currentTotalPP.toFixed(2)}`
        }

        // if(currentBill && !currentPeople){
        //     people.style.border = '2px solid red'
        // } else if(!currentBill && currentPeople){
        //     bill.style.border = '2px solid red'
        // }

        console.log(currentTipAmountPP);
        console.log(currentTotalPP);
})

// RESET BUTTON
resetButton.addEventListener('click', () => {
    tipAmount.innerHTML = '$0.00'
    total.innerHTML = '$0.00'

    bill.value = null
    people.value = null

    document.querySelectorAll('.option').forEach(e => {
        e.classList.remove('option-selected')
    })
})