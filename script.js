let display = document.getElementById('display');
let history = document.getElementById('history');
let expression = '';

function addToDisplay(value) {
    if (display.value === 'Error') {
        clearAll();
    }

    // Handle special cases
    switch(value) {
        case 'π':
            display.value += Math.PI;
            expression += Math.PI;
            break;
        case 'e':
            display.value += Math.E;
            expression += Math.E;
            break;
        case '√':
            display.value += '√(';
            expression += 'sqrt(';
            break;
        default:
            display.value += value;
            expression += value;
    }
}

function clearAll() {
    display.value = '';
    expression = '';
    history.textContent = '';
}

function backspace() {
    if (display.value === 'Error') {
        clearAll();
        return;
    }
    
    display.value = display.value.slice(0, -1);
    expression = expression.slice(0, -1);
}

function calculate() {
    try {
        // Store the current expression in history
        history.textContent = display.value;

        // Convert trigonometric function inputs from degrees to radians
        let evalExpression = expression
            .replace(/sin\(/g, 'sin(' + Math.PI / 180 + '*')
            .replace(/cos\(/g, 'cos(' + Math.PI / 180 + '*')
            .replace(/tan\(/g, 'tan(' + Math.PI / 180 + '*');

        // Evaluate the expression
        let result = math.evaluate(evalExpression);

        // Format the result
        if (Math.abs(result) < 1e-10) result = 0;
        result = parseFloat(result.toPrecision(10));

        // Update display and expression
        display.value = result;
        expression = result.toString();
    } catch (error) {
        display.value = 'Error';
        expression = '';
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers and operators
    if (/[\d\+\-\*\/\(\)\.]/.test(key)) {
        addToDisplay(key);
    }
    // Enter or = for calculation
    else if (key === 'Enter' || key === '=') {
        calculate();
    }
    // Backspace
    else if (key === 'Backspace') {
        backspace();
    }
    // Escape for clear
    else if (key === 'Escape') {
        clearAll();
    }
    // Prevent default behavior for calculator keys
    if (key !== 'F5' && key !== 'F12') {
        event.preventDefault();
    }
});

// Initialize
clearAll();