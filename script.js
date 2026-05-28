let percentage = 5;
const amountInput = document.getElementById('amount-input');
const peopleInput = document.getElementById('number-of-people');
const percentageOption = document.querySelectorAll('[data-tip]');
const customInput = document.getElementById('custom-tip');
const resetBtn = document.getElementById('reset-btn');

amountInput.addEventListener('input', handleCalculation);
peopleInput.addEventListener('input', handleCalculation);
resetBtn.addEventListener('click', resetCalculator);

customInput.addEventListener('input', () => {
    percentage = customInput.value === "" ? 5 : Number(customInput.value);

    percentageOption.forEach(btn => {
        btn.classList.remove('active-option');
    });

    handleCalculation();
});

percentageOption.forEach(button => {
    button.addEventListener('click', () => {
        percentage = Number(button.dataset.tip);

        percentageOption.forEach(btn => {
            btn.classList.remove('active-option');
        });

        button.classList.add('active-option');
        customInput.value = "";
        handleCalculation();
        updateResetState();
    })
})

function calculateTip() {
    const bill = Number(amountInput.value);
    const people = Number(peopleInput.value);
    const errorMessage = document.getElementById('error-message');

    if (!people || people <= 0) {
        errorMessage.classList.remove('hidden');
        peopleInput.classList.add('input-error');
        return {
            tipPerPerson: 0,
            totalPerPerson: 0
        };
    };

    errorMessage.classList.add('hidden');
    peopleInput.classList.remove('input-error');

    const tipTotal = (percentage / 100) * bill;
    const tipPerPerson = tipTotal / people;
    const totalPerPerson = (bill + tipTotal) / people;

    return {
        tipPerPerson,
        totalPerPerson
    };
}

function handleCalculation() {
    const result = calculateTip();
    updateDisplay(result);
    updateResetState();
}

function updateDisplay({ tipPerPerson, totalPerPerson }) {
    const tipAmountDisplay = document.getElementById('tip-amount');
    const totalAmountDisplay = document.getElementById('total-amount');

    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

function updateResetState() {
    const isDirty =
        amountInput.value !== "" ||
        Number(peopleInput.value) !== 1 ||
        customInput.value !== "" ||
        percentage !== 5;

    resetBtn.disabled = !isDirty;
}

function resetCalculator() {
    percentage = 5;
    amountInput.value = "";
    peopleInput.value = 1;
    customInput.value = "";
    percentageOption.forEach(btn => {
        btn.classList.remove('active-option');
    });
    percentageOption[0].classList.add('active-option');
    peopleInput.classList.remove('input-error');
    document.getElementById('error-message').classList.add('hidden');
    handleCalculation();
    updateResetState();
}

updateResetState();