export const Cta = (data) => {
  const { __typename, text } = data;

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
