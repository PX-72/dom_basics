const actions = Object.freeze({
    POSITIONS_UPDATED: 'positions_updated'
});

let contextState = {};

export const initialseContextState = (data = {}) => {
    contextState = JSON.parse(JSON.stringify(data?.context ?? {}));
};

export const getContextState = () => contextState = JSON.parse(JSON.stringify(contextState));

const subscribers = new Map();

const subscribe = (action, fn) => {
    if (!subscribers.has(action)) {
        subscribers.set(action, []);
    }

    subscribers.get(action).push(fn);
};

export const subscribeToPositionUpdates = callback => {
    subscribe(actions.POSITIONS_UPDATED, callback);
};

export const updatePositionQuantity = (positionId, newQuantity) => {
    const {portfolio: {positions}} = contextState;

    let updated = false;
    for (const position of positions) {
        if (position.positionId === positionId && position.quantity !== newQuantity) {
            position.quantity = newQuantity;
            updated = true;
            break;
        }
    }

    if (updated) {
        for (const fn of subscribers.get(actions.POSITIONS_UPDATED)) {
            const {portfolio: {positions}} = contextState;
            fn(JSON.parse(JSON.stringify(positions)));
        }
    }
    // const positionToUpdate = positions.find(p => p.id === positionId);

    // if (positionToUpdate == null) {
    //     console.warn(`No position found with id ${positionId}`);
    //     return;
    // }

    // positionToUpdate.quantity = newQuantity;
    // contextState.portfolio.positions = [...positions.filter(p => p.id !== positionId), positionToUpdate];
}