import Link from "next/link";
import ChristmasLights from "../components/christmasLights";
import Nav from "../components/nav";
import styles from '../styles/InfoPage.module.css'
import Image from 'next/image'
import giftImg from '../img/gift.png'
import santaSnowIng from '../img/santaSnow.png'
import snowmanImg from '../img/snowman.png'
import santaslideImg from '../img/santaSled.png'

const Info = () => {
    return (
        <div>
        <ChristmasLights/>
        <Nav />
        <div className={styles.infoWrapperLine}>
            <div className={styles.wrapperLine}>

                <div className={styles.informationLine}>
                    <Image src={santaSnowIng}/>
                    <div className={styles.description}>
                        <div className={styles.descriptionName}>
                            Обов'язково потрібно знати
                        </div>
                        <div className={styles.descriptionInfo}>
                            <nav>
                                <ul>
                                    <li>
                                        1. Упаковка подарунку 
                                        <br></br><span>-Упакуйте подарунок в щось новірчне і приємне</span>
                                    </li>
                                    <li>
                                        2. Зазначте Ім'я персони, кому ви даруєте
                                        <br></br><span>-важлило не вказувати ваше Ім'я,ітльки отримувача</span>
                                        <br></br><span>так як один з аспектів гри, відгадувати санту</span>
                                    </li>
                                
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                
                <div className={styles.informationLine}>
                    <Image src={giftImg}/>
                    <div className={styles.description}>
                        <div className={styles.descriptionName}>
                            Наші поради
                        </div>
                        <div className={styles.descriptionInfo}>
                        <nav>
                                <ul>
                                    <li>
                                        1. Написати лист всередину
                                        <br></br><span>-Це приємне доповнення до любого дарунку</span>
                                    </li>
                                    <li>
                                        2. Добавити деталей 
                                        <br></br><span>-Навіть до покупного подарунку, можна добавити щось
                                        <br></br>від себе, це приємно і дасть підсказку отримувачу
                                        </span>
                                    </li>
                                
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>

                <div className={styles.informationLine}>
                    <Image src={snowmanImg}/>
                    <div className={styles.description}>
                        <div className={styles.descriptionName}>
                            Фішки які можна використати
                        </div>
                        <div className={styles.descriptionInfo}>
                        <nav>
                                <ul>
                                    <li>
                                        1. Підсказки для отримувача
                                        <br></br><span>-Запарфумити, залишити помаду, чи знак про вас <br></br>
                                        у якості підсказки</span>
                                    </li>
                                    <li>
                                        2. Поділити бюджет на декілька дарунків
                                        <br></br><span>-Якщо ваш бюджет скажімо 400 грн на подарунок <br></br>
                                        інколи краще розділити і купити 2 дарунки для одного отримувача <br></br>
                                        на практиці оба варіанти приємні і все залежить звичайно від дарунка<br></br>
                                        подумайте над цим
                                        </span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <Image className={styles.wrapperLineFooterImg} src={santaslideImg}/>
        </div>
        </div>
    )
}

export default Info