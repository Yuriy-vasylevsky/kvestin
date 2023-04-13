import React, { useState } from 'react';
import Container from '../../Components/Container/Container';
import { Link } from 'react-router-dom';
import s from './InfoPage.module.scss';
export default function InfoPage() {
  return (
    <>
      <Container>
        <h2 className="title">
          Виконайте декілька шагів для того щоб розпочати приватний чат{' '}
        </h2>

        <ul className={s.list}>
          <li className={s.item}>
            <p className={s.text}>
              Зареєструйтесь на{' '}
              <Link to="/login" className={s.link}>
                сайті
              </Link>{' '}
            </p>
          </li>

          <li className={s.item}>
            <p className={s.text}>
              Перейдіть на сторінку{' '}
              <Link to="/users" className={s.link}>
                Всі користувачі
              </Link>{' '}
              та виберіть з ким ви хочете розпочати чат
            </p>
          </li>

          <li className={s.item}>
            <p className={s.text}>Додайте цю людину собі в друзі</p>
          </li>
          <li className={s.item}>
            <p className={s.text}>
              Тепер у вашому{' '}
              <Link to="/profile" className={s.link}>
                профілі
              </Link>{' '}
              будуть відлбражатися усі друзі яких ви добавите
            </p>
          </li>

          <li className={s.item}>
            <p className={s.text}>
              Виберіть потрібного користувача і нажміть кнопку "Відкрити чат"
            </p>
          </li>
          <li className={s.item}>
            <p className={s.text}>
              Вас буде автоматично перенаправлено на сторінку "Звичайні питання"
              з уже відкритим обраним чатом
            </p>
          </li>
          <li className={s.item}>
            <p className={s.text}>Тепер ви можете розпочати спілкування</p>
          </li>
          <li className={s.item}>
            <p className={s.text}>
              Крім того ви можете міняти сторінки з питаннями. При цьому чат
              буде залишатись тей же самий.
            </p>
          </li>
          <li className={s.item}>
            <p className={s.text}>
              Щоб розпочати новий чат, перейдіть у свій профіль та виберіть
              нового користувача з яким ви хочете спілкуватись.
            </p>
          </li>
          <li className={s.item}>
            <p className={s.text}>
              Впрофілі завжди підсвічено з яким користувачем ви спілкуєтеся на
              данний момент
            </p>
          </li>
        </ul>

        <h2 className="title">Як користуватись питаннями</h2>

        <ul className={s.list}>
          <li className={s.item}>
            <p className={s.text}>
              З початку вам будуть доступні тільки звичайні питання
            </p>
          </li>
        </ul>
      </Container>
    </>
  );
}
