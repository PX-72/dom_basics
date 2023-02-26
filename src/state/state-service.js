const ACTIONS = Object.freeze({
    POSITIONS_UPDATED: 'positions_updated'
});

let contextState = {};

export const initialseContextState = (data = {}) => {
    contextState = structuredClone(data?.context ?? {});
};

export const getContextState = () => structuredClone(contextState);

const subscribers = new Map();

const subscribe = (action, subscriber) => {
    if (!subscribers.has(action)) {
        subscribers.set(action, []);
    }
    
    subscribers.get(action).push(subscriber);
};

export const subscribeToPositionUpdates = callback => {
    subscribe(ACTIONS.POSITIONS_UPDATED, callback);
};

export const updatePositionQuantity = (positionId, newQuantity) => {
    const { portfolio: { positions } } = contextState;

    for (const position of positions) {
        if (position.positionId === positionId) {
            if (position.quantity !== newQuantity) {
                position.quantity = newQuantity;
                
                for (const subscriber of subscribers.get(ACTIONS.POSITIONS_UPDATED)) {
                    const { portfolio: { positions } } = contextState;
                    subscriber(structuredClone(positions));
                }
            }

            break;
        }
    }

    // const positionToUpdate = positions.find(p => p.id === positionId);

    // if (positionToUpdate == null) {
    //     console.warn(`No position found with id ${positionId}`);
    //     return;
    // }

    // positionToUpdate.quantity = newQuantity;
    // contextState.portfolio.positions = [...positions.filter(p => p.id !== positionId), positionToUpdate];
};
