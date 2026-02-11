export interface Project {
  slug: string
  name: string
  description: string
  longDescription: string
  tags: string[]
  status: "active" | "completed"
  highlights: string[]
  tools: string[]
  github?: string
}

export const projects: Project[] = [
  {
    slug: "wpa3-analysis",
    name: "WPA3 Analysis",
    description: "Research and security analysis of WPA3 protocol vulnerabilities and attack vectors.",
    longDescription: `This project focuses on in-depth security research of the WPA3 (Wi-Fi Protected Access 3) protocol, which was designed to replace WPA2 and address its known vulnerabilities. Despite being marketed as a major security improvement, WPA3 introduced its own set of potential weaknesses that are worth investigating.

The research covers the Simultaneous Authentication of Equals (SAE) handshake mechanism, also known as Dragonfly, which replaces the traditional 4-way handshake used in WPA2. The analysis examines known attack vectors including Dragonblood vulnerabilities — a set of side-channel and downgrade attacks discovered by Mathy Vanhoef and Eyal Ronen in 2019.

Key areas of investigation include timing-based side-channel attacks against the SAE handshake, cache-based side-channel attacks, transition mode downgrade attacks (where a network supports both WPA2 and WPA3), and denial-of-service vectors targeting the computationally expensive SAE handshake. The project also explores how different vendor implementations handle these edge cases and whether patches have effectively mitigated the original Dragonblood findings.

The research is conducted in a controlled lab environment using dedicated wireless hardware, custom scripts, and tools like hostapd, wpa_supplicant, and Wireshark for traffic capture and protocol analysis.`,
    tags: ["Security", "Wireless", "Research"],
    status: "active",
    highlights: [
      "Analysis of SAE (Dragonfly) handshake security properties",
      "Investigation of Dragonblood side-channel and downgrade attacks",
      "Testing transition mode vulnerabilities in mixed WPA2/WPA3 environments",
      "Evaluation of DoS resilience of SAE handshake implementations",
      "Comparison of vendor-specific WPA3 implementations and patch effectiveness",
      "Lab environment setup with dedicated wireless hardware for controlled testing"
    ],
    tools: ["Wireshark", "hostapd", "wpa_supplicant", "Python", "Aircrack-ng", "Linux"]
  },
  {
    slug: "ai-intracranial-pressure",
    name: "AI Intracranial Pressure Model",
    description: "Hackathon project — AI model for processing and predicting intracranial pressure data.",
    longDescription: `This project was developed during a hackathon focused on applying artificial intelligence to healthcare challenges. The goal was to build a machine learning model capable of processing and predicting intracranial pressure (ICP) data from patient monitoring systems.

Intracranial pressure monitoring is critical in neurology and neurosurgery — elevated ICP can indicate life-threatening conditions such as traumatic brain injury, hydrocephalus, or intracranial hemorrhage. Traditional monitoring requires invasive procedures and continuous manual observation by medical staff. The idea behind this project was to explore whether AI can assist in early detection of dangerous pressure trends.

The model was trained on time-series ICP data and uses signal processing techniques to clean and normalize the raw sensor readings. Feature engineering was applied to extract meaningful patterns from the pressure waveforms, including mean pressure values, pulse amplitude, and trend indicators over sliding time windows.

The prediction pipeline uses a combination of data preprocessing, feature extraction, and a machine learning model to forecast short-term ICP trends. This could potentially help medical professionals identify dangerous pressure elevations before they become critical, giving them more time to intervene.

The project demonstrated the feasibility of using AI for ICP trend prediction and received positive feedback from the hackathon judges for its practical healthcare application.`,
    tags: ["AI", "Healthcare", "Hackathon"],
    status: "completed",
    highlights: [
      "Built end-to-end ML pipeline for time-series medical data",
      "Implemented signal processing for raw ICP sensor data cleaning",
      "Feature engineering from pressure waveforms (mean, amplitude, trends)",
      "Short-term ICP trend prediction for early warning system",
      "Presented and received positive feedback from hackathon judges",
      "Explored real-world application of AI in neurology and patient monitoring"
    ],
    tools: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "R"]
  },
  {
    slug: "network-monitoring-lab",
    name: "Network Monitoring Lab",
    description: "Full monitoring stack on Proxmox — Zabbix, Graylog, Wazuh, LibreNMS, and Flowmon integrated together.",
    longDescription: `This project involved designing and deploying a comprehensive network monitoring and security operations lab environment running on Proxmox virtualization. The goal was to create a realistic, fully integrated monitoring stack that mirrors what enterprise environments use for infrastructure visibility and threat detection.

The lab runs on Proxmox VE as the hypervisor, hosting multiple virtual machines — each dedicated to a specific monitoring tool. The architecture was designed to simulate a small enterprise network with various monitored endpoints, network devices, and security sensors.

Zabbix serves as the primary infrastructure monitoring solution, tracking system metrics like CPU, memory, disk usage, and network interface statistics across all VMs and simulated network devices. Custom templates and triggers were configured to generate alerts for anomalous conditions.

Graylog acts as the centralized log management platform, collecting and indexing syslog data, application logs, and security events from all systems in the lab. Log parsing pipelines and dashboards were built to provide quick visibility into system health and security events.

Wazuh provides host-based intrusion detection (HIDS), file integrity monitoring, and security compliance checking. It monitors system calls, file changes, and authentication events, correlating them with threat intelligence feeds to identify potential security incidents.

LibreNMS handles network device monitoring via SNMP, providing detailed visibility into network interface utilization, errors, and device health. It complements Zabbix by focusing specifically on network layer metrics.

Flowmon was integrated for network flow analysis (NetFlow/sFlow), enabling traffic pattern analysis and anomaly detection at the network level. This provides visibility into communication patterns that traditional monitoring tools might miss.

All tools are integrated to work together — alerts from one system can trigger investigations in another, creating a cohesive monitoring and incident response workflow.`,
    tags: ["Proxmox", "Zabbix", "Graylog", "Wazuh", "LibreNMS", "Flowmon"],
    status: "completed",
    highlights: [
      "Deployed full virtualized lab on Proxmox VE with multiple integrated VMs",
      "Configured Zabbix for infrastructure monitoring with custom templates and alerts",
      "Built centralized log management with Graylog including parsing pipelines",
      "Implemented host-based intrusion detection and file integrity monitoring with Wazuh",
      "Set up SNMP-based network monitoring with LibreNMS for device health tracking",
      "Integrated Flowmon for NetFlow analysis and network traffic anomaly detection",
      "Created cross-tool incident response workflow for cohesive security operations"
    ],
    tools: ["Proxmox VE", "Zabbix", "Graylog", "Wazuh", "LibreNMS", "Flowmon", "Linux", "SNMP", "Syslog"]
  }
]
