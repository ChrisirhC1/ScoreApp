// /C:/Users/chris/Documents/Projets/ScoreApp/ScoreApp/score-app/src/data/LocalStorageData.jsx

export const getScores = () => {
    try {
        
        return;
    } catch (error) {
        console.error('Error getting item from localStorage', error);
        return null;
    }
};

export const setScores = (name, value) => {
    try {
        return;
    } catch (error) {
        console.error('Error setting item in localStorage', error);
    }
};

export const updateScores = (name, value) => {
    try {
        
        return

    } catch (error) {
        console.error('Error updating item in localStorage', error);
    }
};

export const updatename = (name, newName) => {
    try {
        return
    } catch (error) {
        console.error('Error deleting item from localStorage', error);
    }
};

export const deletelcoalStorage = () => {
    try {
        
        return

    } catch (error) {
        console.error('Error deleting item from localStorage', error);
    }
};


export default { getScores, setScores, updateScores, updatename, deletelcoalStorage };