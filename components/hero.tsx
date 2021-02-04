export const Hero = ({ heading, message }) => {
  return (
    <>
      <div className="hero">
        <h2 className="heading">{heading}</h2>
        <p className="message">{message}</p>
      </div>
      <style jsx>{`
        .hero {
          display: block;
        }

        .heading {
          font-size: 2rem;
          line-height: 1.4;
          margin-top: 0;
          margin-bottom: 1rem;
        }

        .message {
          font-size: 1.25rem;
          line-height: 1.6;
          margin-top: 0;
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  );
};
