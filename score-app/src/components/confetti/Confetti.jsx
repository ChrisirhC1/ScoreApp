// Confetti.js
import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import './confetti.css';

const Confetti = ({ showEasterEgg }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isVisible, setIsVisible] = useState(showEasterEgg); // Suivi de la visibilité des confettis

    useEffect(() => {
        if (showEasterEgg) {
            setIsExiting(false); // Réinitialise l'état de sortie
            setIsVisible(true);  // Confetti doit être visible
        } else {
            // Commence l'animation de sortie
            setIsExiting(true);
            // Attends la fin de l'animation avant de masquer les confettis
            setTimeout(() => {
                setIsVisible(false); // Cache après l'animation
            }, 1000); // Le délai doit correspondre à la durée de l'animation de sortie
        }
    }, [showEasterEgg]);

    return (
        isVisible && (
            <ReactConfetti
                width={window.innerWidth}
                height={window.innerHeight}
                numberOfPieces={200}
                gravity={0.2}
                className={"confetti " + (isExiting ? "exit" : "enter")}
            />
        )
    );
};

export default Confetti;
