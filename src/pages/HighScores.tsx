import React, { FC, useEffect, useState } from 'react';
import { ScoresList, ScoreLI } from '../styled/HighScores';
import { StyledTitle } from '../styled/Random';

const HighScores: FC = () => {
    // display those scores
    const [highScores, setHighScores] = useState([]);

    //use the fetch API to call getHighScores function
    useEffect(() => {
        loadHighScores();
    }, []);

    const loadHighScores = async () => {
        try {
            const res = await fetch('/.netlify/functions/getHighScores');
            const scores = await res.json();
            // @ts-ignore
            setHighScores(scores);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <StyledTitle>High Scores</StyledTitle>
            <ScoresList>
                {highScores.map((score, index) => (
                    <ScoreLI key={score.id}>
                        {index + 1}. {score.fields.name} - {score.fields.score}
                    </ScoreLI>
                ))}
            </ScoresList>
        </div>
    );
}

export default HighScores;