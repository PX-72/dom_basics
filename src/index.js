import { createContext } from './context.js';
import { getContext } from './api/apiService.js';
import { initialseContextState, getContextState } from './state/stateService.js';

const app = document.querySelector('#app');

const loader = document.createElement('p');
loader.innerText = 'LOADING...';
app.appendChild(loader);

const init = async (simulate_delay_ms = 1000) => {
    const contextData = await getContext(simulate_delay_ms);
    initialseContextState(contextData);
    loader.remove();

    const contextState = getContextState();

    const contextComponent = createContext(contextState);
    app.appendChild(contextComponent);
}

await init();