import React, { useState } from 'react';
import Container from '../../Components/Container/Container';
import { Link } from 'react-router-dom';
import s from './InfoPage.module.scss';
import {
  BsFillChatRightHeartFill,
  BsFillArrowThroughHeartFill,
} from 'react-icons/bs';

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
              Після того як ви попали на сторінку чату вам доступно безліч
              різноманітних питань які ви можете відправляти вашому
              співрозмовнику
            </p>
          </li>

          <li className={s.item}>
            <p className={s.text}>
              Питання будуть відображатись у верхньому вікні
            </p>
          </li>

          <li className={s.item}>
            <p className={s.text}>
              Для того щоб отримати перше запитання нажміть на {'   '}
              <BsFillChatRightHeartFill />
            </p>
          </li>

          <li className={s.item}>
            <p className={s.text}>
              Якщо питання вам не сподобалось чи ви не хочете його відправляти
              по любій іншій причині просто натисніть на туж кнопку і питання
              змінитьсяю
            </p>
          </li>

          <li className={s.item}>
            <p className={s.text}>
              Коли ви уже нарешті підібрали ідеальне питання нажміть на{' '}
              <BsFillArrowThroughHeartFill /> і обране запитання автоматично
              відправиться у чат
            </p>
          </li>

          <li className={s.item}>
            <p className={s.text}>
              Порядок видачі запитань завжди рандомний. Якщо з данної сторінки
              не виходити питання повторюватись не будуть.{' '}
            </p>
          </li>

          <li className={s.item}>
            <p className={s.text}>
              Якщо ви вийшли і заново зайшли можуть бути повтори
            </p>
          </li>
        </ul>
      </Container>
    </>
  );
}
