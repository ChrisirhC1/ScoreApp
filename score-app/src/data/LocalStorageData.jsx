export const getScores = () => {
    try {
        return JSON.parse(localStorage.getItem('scores')) || {};
    } catch (error) {
        console.error('Error getting item from localStorage', error);
        return null;
    }
};

export const setScores = (scores) => {
    try {
        localStorage.setItem('scores', JSON.stringify(scores));
    } catch (error) {
        console.error('Error setting item in localStorage', error);
    }
};

export const updateScores = (name, value) => {
    try {
        const scores = JSON.parse(localStorage.getItem('scores')) || {};
        scores[name] = value;
        localStorage.setItem('scores', JSON.stringify(scores));
    } catch (error) {
        console.error('Error updating item in localStorage', error);
    }
};

export const updateName = (name, newName) => {
    try {
        const scores = JSON.parse(localStorage.getItem('scores')) || {};
        if (scores[name] !== undefined) {
            scores[newName] = scores[name];
            delete scores[name];
            localStorage.setItem('scores', JSON.stringify(scores));
        }
    } catch (error) {
        console.error('Error updating item in localStorage', error);
    }
};

export const deleteLocalStorage = () => {
    try {
        localStorage.removeItem('scores');
    } catch (error) {
        console.error('Error deleting item from localStorage', error);
    }
};

export default { getScores, setScores, updateScores, updateName, deleteLocalStorage };