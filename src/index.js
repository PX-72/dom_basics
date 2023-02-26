import { createContext } from './context.js';
import { getContext } from './api/api-service.js';
import { initialseContextState, getContextState } from './state/state-service.js';

const app = document.querySelector('#app');

const loader = document.createElement('p');
loader.innerText = 'Loading...';
app.appendChild(loader);

const init = async (simulatedDelay = 1_000) => {
    const contextData = await getContext(simulatedDelay);
    initialseContextState(contextData);
    loader.remove();

    const contextState = getContextState();

    const contextComponent = createContext(contextState);
    app.appendChild(contextComponent);
};

await init();
