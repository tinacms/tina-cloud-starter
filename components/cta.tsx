export const Cta = ({
  text,
  link,
  message = "Hello World",
}: {
  text?: string;
  link?: string;
  message?: string;
}) => {
  return (
    <>
      <a
        href={link}
        onClick={() => {
          !link && alert(message);
        }}
        className="button"
      >
        {text}
      </a>
      <style jsx>{`
        .button {
          border: none;
          outline: none;
          text-decoration: none;
          color: white;
          border-radius: 2rem;
          background: var(--orange);
          font-size: 1em;
          padding: 0.75rem 1.5rem;
          cursor: pointer;
          transition: all 150ms ease-out;
          display: inline-block;
          margin: 0.25rem 0;
        }

        .button:hover,
        .button:focus {
          background: var(--orange-light);
          box-shadow: 0 0 0 2px var(--orange-light);
        }
      `}</style>
    </>
  );
};
