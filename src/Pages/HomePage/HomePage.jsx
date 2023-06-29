// import { Link } from 'react-router-dom';
import s from './HomePage.module.scss';
import { HeroCards } from '../../Components/HeroCards/HeroCards';
import { HomeText } from '../../Components/HomeText/HomeText';
// import UserList from '../../Components/UserList/UserList';
import Container from '../../Components/Container/Container';
import img1 from '../../images/main1.png';
import img2 from '../../images/main2.jpg';
import img3 from '../../images/main3.jpg';
import img4 from '../../images/main4.jpg';
import img5 from '../../images/main5.jpeg';
import img6 from '../../images/main6.jpeg';
import img7 from '../../images/main7.jpg';
import img8 from '../../images/main8.jpeg';
import img9 from '../../images/main9.png';

// import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { auth } from '../../firebase';
// import { useState } from 'react';

export default function HomePage() {
  // const navigate = useNavigate();
  // const [isAuth, setIsAuth] = useState(false);

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     if (user) {
  //       return setIsAuth(true);
  //     } else {
  //       return setIsAuth(false);
  //     }
  //   });
  // });

  return (
    <>
      <main className="main">
        <Container>
          {/* {isAuth && <UserList />} */}

          <section className="top">
            <HomeText />
          </section>

          <section className={s.hero}>
            <HeroCards
              title={'Звичайні запитання'}
              img={img1}
              path={'q1'}
              clas={''}
            />

            <HeroCards title={'Про хоббі'} img={img2} path={'q2'} clas={''} />

            <HeroCards
              title={'Тільки пошлі запитання до дівчат'}
              img={img3}
              path={'q3'}
              clas={'position__img'}
            />

            <HeroCards
              title={'Тільки пошлі запитання до хлопців'}
              img={img4}
              path={'q4'}
              clas={'position__img'}
            />

            <HeroCards
              title={'Про подорожі'}
              img={img5}
              path={'q5'}
              clas={'position__img'}
            />

            <HeroCards
              title={'Про особистість'}
              img={img6}
              path={'q6'}
              clas={'position__img'}
            />

            <HeroCards
              title={'Філософські запитання'}
              img={img7}
              path={'q7'}
              clas={'position__img'}
            />

            <HeroCards
              title={'Про мистетство'}
              img={img8}
              path={'q8'}
              clas={'position__img'}
            />

            <HeroCards
              title={'Усі категорії разом'}
              img={img9}
              path={'q9'}
              clas={'position__img'}
            />
          </section>
        </Container>
      </main>
    </>
  );
}
