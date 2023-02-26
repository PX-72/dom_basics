import { createPositionList } from './position-list.js';
import { subscribeToPositionUpdates } from './state/state-service.js';

let sumPartDomRef = {};

const sumPositionQty = (positions = []) => positions.reduce((sum, position) => sum + position.quantity, 0);

subscribeToPositionUpdates((positions = []) => {
    sumPartDomRef.innerText = sumPositionQty(positions);
});

export const createPortfolio = portfolioData => {
    console.log('loading portfolio');

    const component = document.createElement('div');

    const code = document.createElement('p');
    code.innerText = `Portfolio code: ${portfolioData.code}`;

    const ccy = document.createElement('p');
    ccy.innerText = `Portfolio CCY: ${portfolioData.currency}`;

    component.appendChild(code);
    component.appendChild(ccy);

    const positionQtySum = document.createElement('p');
    positionQtySum.innerText = `Position qty total: `;

    const sumPart = document.createElement('span');
    sumPart.style.fontWeight = 'bold';
    sumPart.style.color = 'red';
    sumPart.innerText = sumPositionQty(portfolioData.positions);
    sumPartDomRef = sumPart;
    positionQtySum.appendChild(sumPart);

    component.appendChild(positionQtySum);

    const positionList = createPositionList(portfolioData.positions);
    component.appendChild(positionList);

    return component;
};
