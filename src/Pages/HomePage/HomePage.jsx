// import { Link } from 'react-router-dom';
import s from './HomePage.module.scss';
import { HeroCards } from '../../Components/HeroCards/HeroCards';
import { HomeText } from '../../Components/HomeText/HomeText';
import UserList from '../../Components/UserList/UserList';
import Container from '../../Components/Container/Container';
import img1 from '../../images/main1.png';
import img2 from '../../images/main2.png';
import img3 from '../../images/main3.jpg';
import img4 from '../../images/main4.jpg';
// import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { auth } from '../../firebase';
import { useState } from 'react';

export default function HomePage() {
  // const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return setIsAuth(true);
      } else {
        return setIsAuth(false);
      }
    });
  });

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
              title={'Обычние вопросы'}
              img={img1}
              path={'q1'}
              clas={''}
            />

            {/* <HeroCards
              title={'Вопросы с перчинкой'}
              img={img2}
              path={'q2'}
              clas={''}
            />

            <HeroCards
              title={'Пошлые вопросы к девушкам'}
              img={img3}
              path={'q3'}
              clas={'position__img'}
            />

            <HeroCards
              title={'Пошлые вопросы к парням'}
              img={img4}
              path={'q4'}
              clas={'position__img'}
            /> */}
          </section>
        </Container>
      </main>
    </>
  );
}
