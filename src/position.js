
const localState = {
    positionQuantity: 0
};

const toggleVisibility = (elements = [], visibleStyle = 'inline-block') => {
    elements.forEach(element => {
        element.style.display = (element.style.display === 'none') ? visibleStyle : 'none'
    });
}

const createButton = (label, show = true) => {
    const button = document.createElement('button');
    button.innerText = label;
    button.style.display = 'inline-block';
    button.style.marginLeft = '0.5rem';
    button.style.cursor = 'pointer';

    if (!show) {
        button.style.display = 'none'
    }

    return button
}

const createQtyTextInput = (onchange, qty) => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = qty?.toString();
    input.style.marginLeft = '0.5rem';
    input.style.width = '3rem';
    input.style.display = 'none';

    return input;
}

const createQtyText = qty => {
    const span = document.createElement('span');
    span.style.marginLeft = '0.5rem';
    span.innerText = qty;

    return span;
}

const createQtyLabel = () => {
    const span = document.createElement('span');
    span.innerText = 'Quantity: ';

    return span;
}

const createQtyControl = qty => {
    const component = document.createElement('div');
    component.style.display = 'flex';
    
    component.appendChild(createQtyLabel());

    const qtyText = createQtyText(qty);
    const qtyInput = createQtyTextInput(() => {}, qty);
    const editButton = createButton('edit');
    const saveButton = createButton('save', false);

    editButton.addEventListener('click', () => {
        toggleVisibility([editButton, saveButton, qtyText, qtyInput])
        qtyInput.value = localState.positionQuantity;
    });

    saveButton.addEventListener('click', () => {
        toggleVisibility([editButton, saveButton, qtyText, qtyInput]);

    });

    qtyInput.addEventListener('input', () => {
        
        if (isNaN(qtyInput.value)) {
            qtyInput.value = localState.positionQuantity;
            return;
        }

        const newQty = !qtyInput.value ? 0 : qtyInput.value;

        localState.positionQuantity = newQty;
        qtyText.innerText = newQty;
    });

    component.appendChild(qtyText);
    component.appendChild(editButton);
    component.appendChild(qtyInput);
    component.appendChild(saveButton);

    return component;
}

export const createPosition = positionData => {

    console.log(`loading position: ${positionData.positionId}`);

    // initialise local state:
    localState.positionQuantity = positionData.quantity ?? 0

    const component = document.createElement('div');
    component.style.margin = '0.8rem';
    component.style.borderTop = '1px solid #336';
    component.style.paddingTop = '0.4rem';

    const positionId = document.createElement('p');
    positionId.innerText = `Position ID: ${positionData.positionId}`;
    component.appendChild(positionId);

    const insightId = document.createElement('p');
    insightId.innerText = `Insight ID: ${positionData.insightId}`;
    component.appendChild(insightId);

    const quantity = createQtyControl(positionData.quantity);
    component.appendChild(quantity);

    return component;
};