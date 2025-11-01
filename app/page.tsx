"use client";

import { AdapterCard, type AdapterConfig } from "@/components/AdapterCard";
import { DiagnosticsCard } from "@/components/DiagnosticsCard";

const adapters: AdapterConfig[] = [
  {
    id: "adapter-1",
    adapter: "Adapter 1 · NAT",
    type: "NAT",
    purpose:
      "Provides outward-facing connectivity so the FinMark server can reach the internet for updates and telemetry. All addressing is delivered via VirtualBox DHCP; no manual edits are required.",
    ip: "Automatic (DHCP)",
    subnet: "Automatic (DHCP)",
    gateway: "Automatic (DHCP)",
    dnsPrimary: "Automatic (DHCP)",
    dnsSecondary: "Automatic (DHCP)",
    checklist: [
      "Enable the network adapter inside VirtualBox.",
      "Confirm Attached to: NAT in VirtualBox settings.",
      "Leave Adapter Type and Promiscuous Mode at defaults.",
      "Inside Windows, ensure IPv4 settings remain set to Obtain automatically."
    ],
    notes: (
      <p style={{ margin: 0, color: "rgba(255,255,255,0.75)" }}>
        VirtualBox NAT exposes its own private network (10.0.2.0/24). The VM will
        receive an address such as 10.0.2.15 with gateway 10.0.2.2. No routes are leaked
        back to the host or LAN.
      </p>
    )
  },
  {
    id: "adapter-2",
    adapter: "Adapter 2 · Host-Only",
    type: "Host-Only",
    interfaceName: "vboxnet0",
    purpose:
      "Pins the VM to the FinMark internal network so that services are reachable from analyst workstations while remaining segmented from the internet path.",
    ip: "192.168.100.10",
    subnet: "255.255.255.0",
    gateway: "192.168.100.1",
    dnsPrimary: "10.10.10.10",
    dnsSecondary: "8.8.8.8",
    checklist: [
      "Inside Windows, open the Host-Only adapter properties (rename to FinMark LAN for clarity).",
      "Set the IPv4 address, subnet mask, gateway, and DNS entries as shown.",
      "Confirm the VirtualBox Host-Only adapter on the host is configured at 192.168.100.1/24.",
      "Verify the Windows firewall allows management ports from 192.168.100.0/24."
    ],
    notes: (
      <p style={{ margin: 0, color: "rgba(255,255,255,0.75)" }}>
        The gateway 192.168.100.1 typically maps to the host OS. Use it to expose shared
        folders or to provide routing into the wider FinMark LAN. DNS primary points to
        the internal resolver, while Google DNS remains as a fallback.
      </p>
    )
  }
];

const quickStartSteps = [
  "Shut down the FinMark VM and open VirtualBox Manager.",
  "Edit the VM → Network: ensure Adapter 1 is enabled and attached to NAT.",
  "Enable Adapter 2, attach to Host-only Adapter, and select vboxnet0.",
  "Boot into Windows, open Network Connections, and rename adapters for clarity.",
  "Configure IPv4 for the Host-only adapter using the static values defined here.",
  "Validate routing by pinging 192.168.100.1 (host) and 10.10.10.10 (DNS)."
];

export default function Page() {
  return (
    <div className="section-grid">
      <section className="panel" style={{ gridColumn: "1 / -1" }}>
        <header className="panel-header">
          <h2 className="panel-title">Deployment Checklist</h2>
          <span className="tag">Setup</span>
        </header>
        <ol className="steps">
          {quickStartSteps.map((step) => (
            <li key={step}>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {adapters.map((adapter) => (
        <AdapterCard key={adapter.id} config={adapter} />
      ))}

      <DiagnosticsCard
        title="Post-configuration validation"
        tools={["Windows PowerShell", "VirtualBox Manager", "host-only DHCP server"]}
        steps={[
          "Run `ipconfig /all` and confirm both adapters show the expected addressing.",
          "Execute `Test-NetConnection -ComputerName 10.10.10.10 -Port 53` to validate internal DNS reachability.",
          "Confirm outbound internet access by reaching https://aka.ms/winver via a browser or `Invoke-WebRequest`.",
          "From a host workstation, ping 192.168.100.10 to ensure the host-only link is live.",
          "Document the configuration snapshot in the FinMark change log."
        ]}
      />

      <section className="panel">
        <header className="panel-header">
          <h2 className="panel-title">Troubleshooting signals</h2>
          <span className="tag">Support</span>
        </header>
        <div className="stacked-list">
          <div>
            <strong>NAT adapter offline?</strong>
            <p style={{ margin: "0.25rem 0 0" }}>
              Restart the VirtualBox NAT service and verify no VPN is hijacking the host
              routing. The VM should retain DHCP lease within 60 seconds.
            </p>
          </div>
          <div>
            <strong>Host-only adapter lacks connectivity?</strong>
            <p style={{ margin: "0.25rem 0 0" }}>
              Ensure the host-only network in VirtualBox is in the 192.168.100.0/24 range
              and that no DHCP server is conflicting with the static assignment.
            </p>
          </div>
          <div>
            <strong>Split DNS resolution delays?</strong>
            <p style={{ margin: "0.25rem 0 0" }}>
              Confirm the internal resolver at 10.10.10.10 answers queries quickly; adjust
              Windows DNS client order if external traffic overwhelms fallback.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
