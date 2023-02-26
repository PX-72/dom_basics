import { createPortfolio } from './portfolio.js';

export const createContext = contextData => {
    console.log('loading index');

    const component = document.createElement('div');

    const contextId = document.createElement('p');
    contextId.innerText = `Context ID: ${contextData.id}`;

    const definition = document.createElement('p');
    definition.innerText = `Definition: ${contextData.definition}`;

    const riskdefault = document.createElement('p');
    riskdefault.innerText = `Risk Default: ${contextData.isRiskDefault}`;

    component.appendChild(contextId);
    component.appendChild(definition);
    component.appendChild(riskdefault);
    
    const portfolio = createPortfolio(contextData.portfolio);
    component.appendChild(portfolio);

    return component;
};
