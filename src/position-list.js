import { createPosition } from './position.js';

export const createPositionList = positionListData => {
    console.log('loading position list');

    const component = document.createElement('div');

    const header = document.createElement('h4');
    header.innerText = 'Positions:';
    component.appendChild(header);

    positionListData.forEach(position => component.appendChild(createPosition(position)));

    return component;
};
