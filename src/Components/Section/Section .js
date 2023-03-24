// import './Section.css';

export default function Section({ children, title, className }) {
  return (
    <section className={className}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
