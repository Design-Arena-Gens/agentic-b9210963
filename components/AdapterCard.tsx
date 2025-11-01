import type { ReactNode } from "react";

export type AdapterType = "NAT" | "Host-Only";

export interface AdapterConfig {
  id: string;
  adapter: string;
  type: AdapterType;
  purpose: string;
  interfaceName?: string;
  ip: string;
  subnet: string;
  gateway: string;
  dnsPrimary: string;
  dnsSecondary: string;
  notes?: ReactNode;
  checklist: string[];
}

export function AdapterCard({
  config
}: {
  config: AdapterConfig;
}) {
  return (
    <article className="panel">
      <header className="panel-header">
        <h2 className="panel-title">{config.adapter}</h2>
        <span className="tag">{config.type}</span>
      </header>
      <p>{config.purpose}</p>
      <div className="data-grid" style={{ marginTop: "1.5rem" }}>
        {config.interfaceName && (
          <div className="data-row">
            <span className="label">VirtualBox interface</span>
            <span className="value">{config.interfaceName}</span>
          </div>
        )}
        <div className="data-row">
          <span className="label">IP address</span>
          <span className="value">{config.ip}</span>
        </div>
        <div className="data-row">
          <span className="label">Subnet mask</span>
          <span className="value">{config.subnet}</span>
        </div>
        <div className="data-row">
          <span className="label">Default gateway</span>
          <span className="value">{config.gateway}</span>
        </div>
        <div className="data-row">
          <span className="label">Preferred DNS</span>
          <span className="value">{config.dnsPrimary}</span>
        </div>
        <div className="data-row">
          <span className="label">Alternate DNS</span>
          <span className="value">{config.dnsSecondary}</span>
        </div>
      </div>
      {config.notes && <div style={{ marginTop: "1.5rem" }}>{config.notes}</div>}
      <div className="callout" style={{ marginTop: "1.5rem" }}>
        <strong>Checklist</strong>
        <ul className="stacked-list" aria-label={`${config.adapter} checklist`}>
          {config.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
