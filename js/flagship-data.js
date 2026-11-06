/**
 * Curated Flagship Projects & 21st.dev Component Data
 */
const FLAGSHIP_PROJECTS = [
  {
    "id": "capstone-cross-domain",
    "isFeatured": true,
    "title": "Asynchronous Order Mutation & Webhook Failure",
    "subtitle": "Cross-Domain Empirical Simulation & Forensic Systems Post-Mortem",
    "domain": "Master Capstone Architecture",
    "category": "Cross-Domain Forensic Post-Mortem",
    "filterCat": "automations",
    "loomDuration": "10–12 min defense",
    "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    "desc": "Empirical autopsy investigating a race condition between customer address updates and 3PL warehouse wave picking. Codified two-phase commit state locks, Amazon-standard dead-letter queue buffering, and automated carrier package intercepts.",
    "tags": [
      "Shopify Flow",
      "ShipBob 3PL WMS",
      "Carrier APIs",
      "Two-Phase Commit",
      "DLQ Buffering"
    ],
    "dossierUrl": "capstone/MasterDossier-Capstone-AsynchronousOrderMutation.md",
    "pdfUrl": "capstone/CaseStudy-AsynchronousOrderMutationAndWebhookFailure-Analysis.pdf",
    "specName": "CaseStudy - AsynchronousOrderMutationAndWebhookFailure - Analysis.md"
  },
  {
    "id": "d1-order-lifecycle",
    "isFeatured": false,
    "title": "Order State Machine & Point-of-No-Return (PONR) Protocol",
    "subtitle": "Parent Specification — Fulfillment Holds & Downstream 3PL Synchronization",
    "domain": "Order Lifecycle",
    "category": "Standard Operating Procedure (SOP)",
    "filterCat": "logistics",
    "loomDuration": "8–10 min defense",
    "image": "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    "desc": "Establishes the zero-tolerance 'Freeze First' fulfillment hold mandate to eliminate race conditions between customer support updates and asynchronous 15-minute 3PL polling scripts, enforcing CASS-certified address validations.",
    "tags": [
      "Shopify Flow",
      "ShipBob WMS",
      "PONR Locks",
      "State Machines"
    ],
    "dossierUrl": "domain-1-order-lifecycle/MasterDossier-Domain1-OrderStateMachineAndPONR.md",
    "pdfUrl": "domain-1-order-lifecycle/SOP-OrderExceptionMutationProtocol-Parent.pdf",
    "specName": "SOP - OrderExceptionMutationProtocol - Parent.md"
  },
  {
    "id": "d2-routing-spec",
    "isFeatured": false,
    "title": "Bi-Coastal Multi-Node Routing Engine & Freight Optimization",
    "subtitle": "Allentown (PA) & Reno (NV) Freight Cost Minimization",
    "domain": "Routing & Logistics",
    "category": "Systems Engineering Specification",
    "filterCat": "logistics",
    "loomDuration": "8–10 min defense",
    "image": "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    "desc": "Deterministic routing waterfalls (Minimize Splits → Closest Node) containing split-shipment surcharges ($4.20/order) and eliminating out-of-region fulfillment leakage across Allentown PA and Reno NV warehouses.",
    "tags": [
      "Multi-Node Routing",
      "Freight Waterfalls",
      "ShipBob 3PL",
      "Split Containment"
    ],
    "dossierUrl": "domain-2-order-routing/MasterDossier-Domain2-MultiNodeLogisticsRouting.md",
    "pdfUrl": "domain-2-order-routing/Architecture-MultiNodeRoutingEngine-Spec.pdf",
    "specName": "Architecture - MultiNodeRoutingEngine - Spec.md"
  },
  {
    "id": "d3-catalog-sop",
    "isFeatured": false,
    "title": "Enterprise Matrixify Migration & Barcode Schema Governance",
    "subtitle": "Master Operational Protocol — Matrixify Non-Destructive MERGE",
    "domain": "Bulk Data Management",
    "category": "Standard Operating Procedure (SOP)",
    "filterCat": "data",
    "loomDuration": "7–9 min defense",
    "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    "desc": "Master operational standard for mutating enterprise catalogs without barcode truncation, scientific notation corruption, or broken SEO handles. Enforces Google Sheets raw text handling and canary batch validation.",
    "tags": [
      "Matrixify",
      "UPC-A Barcode Integrity",
      "Schema Linters",
      "Canary Batches"
    ],
    "dossierUrl": "domain-3-bulk-data-management/MasterDossier-Domain3-BulkCatalogSchemaGovernance.md",
    "pdfUrl": "domain-3-bulk-data-management/SOP-BulkCatalogMigrationAndHygiene-Parent.pdf",
    "specName": "SOP - BulkCatalogMigrationAndHygiene - Parent.md"
  },
  {
    "id": "d4-automation-sop",
    "isFeatured": false,
    "title": "Business Logic Automation & Webhook Recursion Triage",
    "subtitle": "Idempotent Event Handlers & Exponential Backoff Buffers",
    "domain": "Business Automation",
    "category": "Standard Operating Procedure (SOP)",
    "filterCat": "automations",
    "loomDuration": "8–10 min defense",
    "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "desc": "Engineering idempotent webhook handling pipelines that protect downstream systems from infinite Flow recursion loops, payload timeout drops (HTTP 504), and race conditions during high-volume promotional bursts.",
    "tags": [
      "Webhooks",
      "Shopify Flow",
      "Idempotency Keys",
      "DLQ Recovery"
    ],
    "dossierUrl": "domain-4-business-automation/MasterDossier-Domain4-WebhookAutomationAndFlowTriage.md",
    "pdfUrl": "domain-4-business-automation/SOP-BusinessLogicAutomationAndWebhooks-Parent.pdf",
    "specName": "SOP - BusinessLogicAutomationAndWebhooks - Parent.md"
  },
  {
    "id": "d5-storefront-casestudy",
    "isFeatured": false,
    "title": "Algorithmic Margin Defense & Storefront Cart Diagnostics",
    "subtitle": "Checkout Exception Triage (<60s MTTI) & Coupon Collision Audits",
    "domain": "Technical Diagnosis",
    "category": "Empirical Case Study & Post-Mortem",
    "filterCat": "diagnostics",
    "loomDuration": "7–9 min defense",
    "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
    "desc": "Auditing promotional combinations across Product, Order, and Shipping tiers to eliminate negative-margin coupon collision loops, with Chrome DevTools payload triage under 60 seconds.",
    "tags": [
      "Chrome DevTools",
      "Margin Protection",
      "Cart Diagnostics",
      "HTTP 422"
    ],
    "dossierUrl": "domain-5-technical-diagnosis/MasterDossier-Domain5-MarginDefenseAndCartDiagnostics.md",
    "pdfUrl": "domain-5-technical-diagnosis/SOP-TechnicalDiagnosisAndAuditLogging-Parent.pdf",
    "specName": "SOP - TechnicalDiagnosisAndAuditLogging - Parent.md"
  },
  {
    "id": "d6-helpdesk-sop",
    "isFeatured": false,
    "title": "Frontline Helpdesk Automation & HTTP Webhook Actions",
    "subtitle": "Automated Exception Routing & SLA Management",
    "domain": "Frontline Helpdesk",
    "category": "Standard Operating Procedure (SOP)",
    "filterCat": "automations",
    "loomDuration": "6–8 min defense",
    "image": "https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1200&q=80",
    "desc": "Automated Gorgias helpdesk workflows integrating custom HTTP actions to place real-time fulfillment holds and trigger address updates directly against Shopify Fulfillment Orders API with zero human latency.",
    "tags": [
      "Gorgias Academy",
      "HTTP Actions",
      "Shopify Orders API",
      "SLA Workflows"
    ],
    "dossierUrl": "domain-6-frontline-helpdesk/MasterDossier-Domain6-FrontlineHelpdeskAutomation.md",
    "pdfUrl": "domain-6-frontline-helpdesk/SOP-HelpdeskOperationsAndMacroAutomation-Parent.pdf",
    "specName": "SOP - HelpdeskOperationsAndMacroAutomation - Parent.md"
  }
];
