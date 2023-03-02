import { useState } from "react";

export function useHandleForm(styles) {
    const [names, setNames] = useState("");
    const [lastNames, setLastNames] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [required, setRequired] = useState({});

    const selectStyleName = (inputRequired, styles) => {
        return !inputRequired ? styles.input : styles.inputRequired;
    };

    const styleNameForNamesInput = selectStyleName(required?.names, styles);
    const styleNameForLastNamesInput = selectStyleName(
        required?.lastNames,
        styles
    );
    const styleNameForEmailInput = selectStyleName(required?.email, styles);

    const validateData = (inputs) => {
        let allInputsValid = true;

        inputs.forEach((input) => {
            if (!input.value.length && input.name !== "phone") {
                setRequired((prevRequired) => ({
                    ...prevRequired,
                    [input.name]: true,
                }));
                allInputsValid = false;
            } else {
                required?.[input.name] &&
                    setRequired((prevRequired) => ({
                        ...prevRequired,
                        [input.name]: false,
                    }));
            }
        });

        return allInputsValid;
    };

    const sendData = async () => {
        const URL = "http://127.0.0.1:8000";
        let dataSendedCorrectly = true;

        const config = {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ names, lastNames, email, phone }),
        };

        try {
            const sendInformation = await fetch(URL, config);
            const response = await sendInformation.json();

            if (response?.error) dataSendedCorrectly = false;
        } catch (error) {
            console.log(error);
            dataSendedCorrectly = false;
        } finally {
            return dataSendedCorrectly;
        }
    };

    const handleSumbit = async (event, styles) => {
        event.preventDefault();

        const inputs = [
            { name: "names", value: names },
            { name: "lastNames", value: lastNames },
            { name: "email", value: email },
            { name: "phone", value: phone },
        ];

        const allInputsAreCorrect = validateData(inputs);
        console.log(allInputsAreCorrect);

        if (allInputsAreCorrect) {
            selectStyleName(required?.names, styles);
            selectStyleName(required?.lastNames, styles);
            selectStyleName(required?.email, styles);
            const response = await sendData();
            if (response) alert("Datos enviados correctamente");
        }
    };

    return {
        names,
        lastNames,
        email,
        phone,
        required,

        setNames,
        setLastNames,
        setEmail,
        setPhone,

        handleSumbit,

        styleNameForNamesInput,
        styleNameForLastNamesInput,
        styleNameForEmailInput,
    };
}
