import styles from "./styles.module.css";
import { useHandleForm } from "../hooks/useHandleForm";

export function Form() {
    const {
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
    } = useHandleForm(styles);

    const RequiredText = () => (
        <p className={styles.requiredMessage}>Requerido</p>
    );

    return (
        <form
            className={styles.form}
            onSubmit={(event) => handleSumbit(event, styles)}
        >
            <p>Por favor, llena el formulario con tus datos</p>

            <section className={styles.firstSection}>
                <section className={styles.secondSection}>
                    <div className={styles.separator}>
                        <input
                            className={styleNameForNamesInput}
                            type="text"
                            placeholder="Nombres *"
                            value={names}
                            onChange={(event) => setNames(event.target.value)}
                        />
                        {required?.names && <RequiredText />}
                    </div>
                    <div className={styles.separator}>
                        <input
                            className={styleNameForLastNamesInput}
                            type="text"
                            placeholder="Apellidos *"
                            value={lastNames}
                            onChange={(event) =>
                                setLastNames(event.target.value)
                            }
                        />
                        {required?.lastNames && <RequiredText />}
                    </div>
                </section>

                <section className={styles.secondSection}>
                    <div className={styles.separator}>
                        <input
                            className={styleNameForEmailInput}
                            type="email"
                            placeholder="Correo electrónico *"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        {required?.email && <RequiredText />}
                    </div>
                    <div className={styles.separator}>
                        <input
                            className={styles.input}
                            type="number"
                            placeholder="Teléfono"
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                        />
                    </div>
                </section>

                <section>
                    <button type="submit" className={styles.button}>
                        Siguiente
                    </button>
                </section>
            </section>
        </form>
    );
}
