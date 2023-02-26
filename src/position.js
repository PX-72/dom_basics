import { updatePositionQuantity } from './state/state-service.js';

const toggleVisibility = (elements = [], visibleStyle = 'inline-block') => {
    elements.forEach(element => {
        element.style.display = element.style.display === 'none' ? visibleStyle : 'none';
    });
};

const createButton = (label, show = true) => {
    const button = document.createElement('button');
    button.innerText = label;
    button.style.marginLeft = '0.5rem';
    button.style.cursor = 'pointer';
    button.style.display = show ? 'inline-block' : 'none';

    return button;
};

const createQtyTextInput = (qty = '') => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = qty;
    input.style.marginLeft = '0.5rem';
    input.style.width = '3rem';
    input.style.display = 'none';

    return input;
};

const createQtyText = qty => {
    const span = document.createElement('span');
    span.style.marginLeft = '0.5rem';
    span.innerText = qty;

    return span;
};

const createQtyLabel = () => {
    const span = document.createElement('span');
    span.innerText = 'Quantity: ';

    return span;
};

const createQtyControl = (positionId, qty) => {
    const component = document.createElement('div');
    component.style.display = 'flex';
    
    component.appendChild(createQtyLabel());

    const qtyText = createQtyText(qty);
    const qtyInput = createQtyTextInput(qty);
    const editButton = createButton('edit');
    const saveButton = createButton('save', false);

    editButton.addEventListener('click', () => {
        toggleVisibility([editButton, saveButton, qtyText, qtyInput]);
        qtyInput.value = qtyText.innerText;
    });

    saveButton.addEventListener('click', () => {
        toggleVisibility([editButton, saveButton, qtyText, qtyInput]);
        updatePositionQuantity(positionId, Number(qtyInput.value));
    });

    qtyInput.addEventListener('input', () => {
        if (!Number.isFinite(Number(qtyInput.value))) {
            qtyInput.value = qtyText.innerText;
            return;
        }

        qtyText.innerText = qtyInput.value || '0';
    });

    component.appendChild(qtyText);
    component.appendChild(editButton);
    component.appendChild(qtyInput);
    component.appendChild(saveButton);

    return component;
};

export const createPosition = positionData => {
    console.log(`loading position: ${positionData.positionId}`);

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

    const quantity = createQtyControl(positionData.positionId, positionData.quantity);
    component.appendChild(quantity);

    return component;
};
