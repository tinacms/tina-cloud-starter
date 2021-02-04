export const Cta = ({ text }) => {
  return (
    <>
      <div className="buttonGroup">
        <button className="button">{text}</button>
      </div>
      <style jsx>{`
        .buttonGroup {
        }

        .button {
        }
      `}</style>
    </>
  );
};
