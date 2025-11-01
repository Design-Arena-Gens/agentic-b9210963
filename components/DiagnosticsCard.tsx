interface DiagnosticsCardProps {
  title: string;
  steps: string[];
  tools: string[];
}

export function DiagnosticsCard({ title, steps, tools }: DiagnosticsCardProps) {
  return (
    <article className="panel">
      <header className="panel-header">
        <h2 className="panel-title">{title}</h2>
        <span className="tag">Validation</span>
      </header>
      <div className="callout">
        <strong>Recommended tooling</strong>
        <ul className="stacked-list">
          {tools.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </div>
      <ol className="steps" style={{ marginTop: "1.5rem" }}>
        {steps.map((step) => (
          <li key={step}>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
