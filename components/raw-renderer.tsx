export const RawRenderer = ({ data }) => {
  return (
    <>
      <details className="wrapper">
        <summary className="summary">Raw JSON</summary>
        <pre className="code">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </details>
      <style jsx>{`
        .wrapper {
          display: block;
          border: 1px solid var(--mint);
          border-radius: 0.5rem;
          background: rgba(180, 244, 224, 0.3);
          font-size: 0.75rem;
        }

        .code {
          padding: 0 1rem 1rem 1rem;
        }

        .summary {
          display: inline-block;
          cursor: pointer;
          display: block;
          font-weight: bold;
          padding: 1rem;
          outline: none;
          user-select: none;
        }

        .summary:hover {
          color: var(--orange);
        }

        .summary::-webkit-details-marker {
          display: none;
        }
      `}</style>
    </>
  );
};
