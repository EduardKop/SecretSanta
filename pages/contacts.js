import Link from "next/link";
import ChristmasLights from "../components/christmasLights";
import Nav from "../components/nav";
import styles from '../styles/ContactPage.module.css'

const Contacts = () => {
    return (
        <div>
        <ChristmasLights />
        <Nav />
            <div className={styles.contactWrap}>
                <span>Виникли запитання ? Звертайся в телеграм </span>
                <a rel="shortcut icon noopener noreferrer" target="_blank" href={'https://t.me/Eduard_Kop'}> 📱 {'t.me/Eduard_Kop'}</a>
            </div>
        </div>
    )
}

export default Contacts