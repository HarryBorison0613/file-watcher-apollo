import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { SetPath } from '../actions/FileAction';
import Section from './Section';


const Input = ({ SetPath, id, label, type, value, submit, }) => {

    const [input, setInput] = useState("");
    const [position, setPosition] = useState({});

    useEffect(() => {
        if (navigator?.geolocation) {
            navigator.geolocation.getCurrentPosition((location) => {
                if (location) {
                    setPosition({latitude: location.coords.latitude, longitude: location.coords.longitude});
                } 
            });
        }
    }, []);

    const onChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        SetPath({path: input, location: position});
    }

    return (
        <Section className="input">
            <form onSubmit={handleSubmit}>
                <label htmlFor={id}>
                    {label}
                </label>
                <input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    required
                />
                <input type="submit" value={submit} />
            </form>
        </Section>
    );
};

export default connect(null, { SetPath })(Input);