import { createContext } from './context.js'
import { data } from './data/index.js';

const app = document.querySelector('#app');

const loader = document.createElement('p');
loader.innerText = 'LOADING...';
app.appendChild(loader);

const init = () => {
    loader.remove();
    const context = createContext(data.context);
    app.appendChild(context);
}

console.log('loading APP');

setTimeout(init, 100);
