import React from 'react';
import { Sentry } from 'react-activity';
import './LoadingScreen.scss'

function LoadingScreen() {

    return (<div className="LoadingContainer">
            <Sentry color="#727981" size={20} speed={0.7} animating={true} />
        </div>);

}

export default LoadingScreen;