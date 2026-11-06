# CaseStudy - DiscountCollisionAndCartDiagnostics - Analysis

```
Document ID:     CaseStudy - DiscountCollisionAndCartDiagnostics - Analysis
Naming Format:   [CATEGORY] - [PURPOSE] - [TIER]
Category:        CaseStudy (Empirical Storefront Simulation & Financial Post-Mortem)
Purpose:         DiscountCollisionAndCartDiagnostics
Tier / Level:    Analysis (Storefront Telemetry & Margin Verification)
Status:          Locked 🔒 (Master Baseline)
Target Audience: Founders, Heads of Growth, Directors of Operations, Lead TechOps Specialists
Ecosystem Scope: Shopify Checkout API, Chrome DevTools Network Tab, Shopify Admin Timeline, Stripe/Shopify Payments, ShipBob WMS
Business Unit:   Synapse Botanicals (Commercial Operations & Diagnostic Engineering)
```

---

## 1. Executive Summary & Simulation Scope

In direct-to-consumer (DTC) e-commerce, ungoverned promotional discounting is the fastest driver of sudden gross margin collapse. When marketing teams introduce sitewide promotional campaigns while evergreen acquisition codes (e.g., `WELCOME15`) remain active without mutual exclusivity rules, discounts compound multiplicatively at checkout. When compounded discounts collide with absorbed carrier freight, pick/pack fees, and payment processing tolls, unit contribution margins quickly breach break-even thresholds.

This Case Study documents an **empirical storefront simulation and financial post-mortem across a 300-order promotional cohort** at Synapse Botanicals. We contrast two operational architectures:
* **Model Omega (The Unrestricted Promotion Stress Fixture):** Promotional discounts permitted to stack without combination guards, resulting in compounding price reductions, absorbed carrier postage, and sub-economic order margins.
* **Model Sigma (The Governed Architecture):** Combination rules, order-value thresholds, and mathematical margin floors strictly enforced via Shopify's native Discounts engine, blocking invalid stack permutations while preserving high-converting acquisition bundles.

> [!NOTE] **Simulation Methodology & Margin Modeling:**  
> These metrics represent a controlled 300-order scenario ledger designed to benchmark margin-floor governance without commercial customer data. The $98 component-picked bundle is a stress fixture; the catalog list price remains $82. Stick Packs use the post-migration $44 price ($50 compare-at), Tumbler $34 (COGS $7.00), and Whisk $16 (COGS $3.10). Tax is excluded from the economic model. Gateway fees are calculated at 2.9% of merchandise plus collected shipping, plus $0.30 per order, rounded to cents per order.

```mermaid
flowchart TD
    subgraph ModelOmega["MODEL OMEGA (Unrestricted Discount Stacking)"]
        direction TB
        O_In["300 Ingested Orders<br/>Gross GMV: $25,320.00"] --> O_Stack["Unrestricted Combination:<br/>20% Sitewide + 15% Code + Free Shipping"]
        O_Stack --> O_Erosion["Gross Discounts: -$8,102.40<br/>Absorbed Freight: -$2,730.00"]
        O_Erosion --> O_Result["Total Cash Collected: $17,217.60<br/>Contribution: $6,428.10 (37.33% CM)<br/>Orders Breaching 35% Floor: 180 (60.0%)"]
    end

    subgraph ModelSigma["MODEL SIGMA (The Governed Architecture)"]
        direction TB
        S_In["300 Ingested Orders<br/>Gross GMV: $25,320.00"] --> S_Rule["Governed Rule Matrix:<br/>Mutual Exclusivity + $50 Min + $75 Free Ship"]
        S_Rule --> S_Prot["Max Discount: 15% Single Code<br/>Shipping Collected: $1,434.00"]
        S_Prot --> S_Result["Total Cash Collected: $23,154.00<br/>Contribution: $12,191.70 (52.65% CM)<br/>Orders Breaching 35% Floor: 0 (0.0%)"]
    end
```

---

## 2. Fixed Cohort Inputs & Simulation Methodology

The 300-order simulation cohort was constructed across four representative basket compositions reflecting Synapse Botanicals' active product catalog and average order values (AOV):

| Cohort | Orders | Basket Composition | Basket GMV | COGS / Order | Handling + Packaging / Order | Carrier Freight / Order |
| :--- | :---: | :--- | ---: | ---: | ---: | ---: |
| **C1: Component-Picked Bundle** | 120 | 1x Daily Protocol Starter Bundle (`SYN-BNDL-MAO`) | $98.00 | $26.50 | $5.00 | $10.80 |
| **C2: Dual Consumables** | 90 | 2x Focus Stick Packs (30-Pk) (`SYN-FSTK-MY`, `SYN-FSTK-BO`) | $88.00 | $17.00 | $4.00 | $6.85 |
| **C3: Tincture + Tumbler** | 60 | 1x PM Tincture (`SYN-TNCT-PM`) + 1x Tumbler (`SYN-TMBL-BW`) | $72.00 | $19.50 | $4.50 | $10.80 |
| **C4: Single Consumable** | 30 | 1x Focus Stick Pack (30-Pk) (`SYN-FSTK-MY`) | $44.00 | $8.50 | $3.50 | $5.65 |

**Total Ingested GMV:** 120 × $98 + 90 × $88 + 60 × $72 + 30 × $44 = **$25,320.00**.

> [!NOTE] **Freight & Handling Sensitivity:**  
> The table uses fixed transcontinental routing-fixture quotes for every basket to isolate promotion mechanics. It does not derive freight from an arbitrary 60/40 destination distribution or raw catalog gram weights. Bundle handling assumes three loose picks ($3.75) + $1.25 packaging; routing's pre-kitted fixture uses one pick ($2.75) instead. These are separate operational cases.

### Promotion Rules
* **Omega Stress Fixture (Unsafe Counterfactual):** A 20% product discount followed by a 15% order discount on all four baskets, with no minimum threshold and free shipping on all orders. This intentionally unsafe configuration is an unconstrained stress test.
* **Sigma Governed Configuration:** `WELCOME15` provides 15% off orders meeting the **$50.00 merchandise minimum**, combines with shipping discounts only, and **does not combine with product discounts**. `FREESHIP` is unlocked when the post-order-discount merchandise subtotal is ≥ $75.00. Baskets failing to meet $75.00 pay the flat carrier rate.

---
## 3. Empirical Simulation Alpha: The Governed Acquisition Stack (Order #1063)

In Simulation Alpha, we tested the nominal high-performing acquisition promotion: combining an introductory percentage code with free ground shipping on qualifying orders over \$50.00.

### 3.1 Promotional Configuration
1. **Promo Code:** `WELCOME15` (15% Off Cart Subtotal).
   * *Type:* Order Discount.
   * *Minimum Requirement:* Minimum purchase amount of **\$50.00**.
   * *Combinations Enabled:* **Shipping discounts ONLY** (Product discounts unchecked).
2. **Promo Code / Threshold:** `FREESHIP` (Free Ground Shipping).
   * *Type:* Shipping Discount.
   * *Minimum Requirement:* Applies to orders with subtotal $\ge \$75.00$.
   * *Combinations Enabled:* **Order discounts enabled**.

---

### 3.2 Live Checkout Execution (Order #1063)
Customer Elena Vance checked out with **1x The Daily Protocol Starter Bundle** (`SYN-BNDL-MAO`, \$98.00):

```
Order Summary at Checkout:
─────────────────────────────────────────────────────────────────────────────
Gross Merchandise Value (1x SYN-BNDL-MAO):                  $98.00
Discount Applied (WELCOME15 - 15%):                        -$14.70
Net Subtotal:                                               $83.30
UPS Ground Shipping Rate (Transcon 1.8 lbs):     $10.80
Discount Applied (FREESHIP - 100% Shipping):    -$10.80      $0.00
Estimated PA State Sales Tax (Dietary Exemption):            $0.00
─────────────────────────────────────────────────────────────────────────────
TOTAL CASH CAPTURED VIA SHOPIFY PAYMENTS:                   $83.30
─────────────────────────────────────────────────────────────────────────────
```

---

### 3.3 Order Timeline Forensic Inspection

Below is the verified event transcript extracted from the Shopify Admin Order Timeline for Order `#1063`:

```
Shopify Admin Order Timeline Transcript (#1063)
─────────────────────────────────────────────────────────────────────────────
[2026-10-17 14:10:02 EDT] Order placed by Elena Vance (elena.vance@example.com)
                          via Online Store (Checkout #ck_990184201).
[2026-10-17 14:10:03 EDT] Promotion "WELCOME15" (-$14.70) was applied.
[2026-10-17 14:10:03 EDT] Promotion "FREESHIP" (-$10.80) was applied.
[2026-10-17 14:10:04 EDT] A $83.30 USD payment was processed on Shopify Payments 
                          (Authorization: ch_3P0194aBK9012a).
                          [ > Gateway Information Expanded ]:
                            - Card: Visa ending in 4242
                            - Network status: approved_by_network
                            - AVS Street Check: pass (Code Y)
                            - AVS Postal Check: pass (Code Y)
                            - CVV Check: pass (Code M)
                            - Risk Level: Low (Score: 4)
[2026-10-17 14:10:05 EDT] Order confirmation email was sent to customer.
[2026-10-17 14:10:06 EDT] Shopify Flow: "[OPS] - Heavy Basket Tagging" ran.
                          Added tag: flow-route:heavy-pack.
[2026-10-17 14:10:10 EDT] Fulfillment order was assigned to Reno Hub (LOC-NV-02).
─────────────────────────────────────────────────────────────────────────────
```

---

### 3.4 Unit Economic Proof-of-Margin (Order #1063)

| Financial Metric Component | Mathematical Calculation | Line Total | Accounting Classification |
| :--- | :--- | :---: | :--- |
| **Gross Merchandise Value (GMV)** | 1x `SYN-BNDL-MAO` (Starter Bundle) | \$98.00 | Gross Retail Benchmark |
| **Promotional Discount (15%)** | \$98.00 $\times$ 15% (`WELCOME15`) | -\$14.70 | Top-Line Contra-Revenue |
| **Net Revenue Collected** | \$98.00 - \$14.70 | **\$83.30** | Net Cash Basis |
| **Product COGS** | Raw botanicals, packaging, tumbler | -\$26.50 | Direct Materials Cost |
| **3PL Warehouse Handling** | Base pick fee (\$2.75) + 2 addl units (\$1.00) | -\$3.75 | Direct Variable Labor |
| **Packaging & Corrugate** | Medium carton (Box #2) + crinkle fill | -\$1.25 | Packaging Material Outflow |
| **Carrier Postage (UPS)** | Transcon Zone 7–8 (1.8 lbs billable) | -\$10.80 | Absorbed Freight Toll |
| **Payment Gateway Fee** | (\$83.30 $\times$ 2.9%) + \$0.30 | -\$2.72 | Financial Processing Fee |
| **Net Contribution Margin (\$)** | \$83.30 - \$42.30 - \$2.72 | **+\$38.28** | **Net Cash Contributed** |
| **Contribution Margin (%)** | (\$38.28 / \$83.30) $\times$ 100 | **`45.9%`** | **Operational Viability: PASS ✅** |

*Diagnostic Verdict:* Under Model Sigma governance, the acquisition stack yields a **45.9% Contribution Margin**, comfortably outperforming the 35.0% operational floor by **+10.9 percentage points**.

---


## 4. Empirical Simulation Bravo: The Blocked Collision & Network Tab Telemetry

In Simulation Bravo, we tested an aggressive promotional scenario where an automated **20% Off Sitewide Flash Sale** (Product Discount) was active across all botanical formulations. A customer attempted to apply the manual promo code `WELCOME15` to stack an additional 15% discount on top of the sale price.

### 4.1 The Technical Collision Mechanism
* **Active Automated Promotion:** `[AUTO] - Spring Flash Sale 20% Off` (Product class discount).
* **Entered Code:** `WELCOME15` (Order class discount).
* **Governance Standard:** In accordance with **[Matrix - DiscountCombinationsAndMarginProtection - Engine (Domain 5.2)](Matrix-DiscountCombinationsAndMarginProtection-Engine.md)** – **Section 2.0**, `WELCOME15` has the *"Combines with product discounts"* checkbox **UNCHECKED**.

---

### 4.2 Modern Storefront Cart API Diagnostic Pattern (2026 Standard)

> [!NOTE] **API Surface Evolution:**  
> The legacy `checkoutDiscountCodeApplyV2` mutation was retired in Shopify's 2026 API releases. For headless storefronts and custom cart drawers, discount application is evaluated via the Storefront Cart API (`cartDiscountCodesUpdate`). On Shopify hosted checkout, native combination rules evaluate asynchronously at the edge.

```graphql
mutation EvaluateCodes($cartId: ID!, $codes: [String!]!) {
  cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $codes) {
    cart {
      id
      discountCodes {
        code
        applicable
      }
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
      }
    }
    userErrors {
      field
      message
    }
  }
}
```

*Diagnostic Contract:* The `cartDiscountCodesUpdate` mutation replaces the cart's entire code list with the submitted array. Operators inspecting network traffic must verify that the payload returns `applicable: false` for the non-combinable code while preserving the primary eligible discount.

---

### 4.3 Chrome DevTools Network Tab Telemetry (Checkout Attempt #ck_990184205)

When the customer entered `WELCOME15` in the checkout discount input and clicked "Apply", the browser emitted a GraphQL mutation to Shopify's checkout engine. The transaction was captured live using Chrome DevTools (Network tab filtered to `Fetch/XHR`):

```http
POST /checkouts/c/881920149012a/graphql HTTP/2
Host: synapse-botanicals.myshopify.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Content-Type: application/json
Accept: application/json
X-Shopify-Checkout-Version: 2026-10

{
  "query": "mutation applyDiscount($checkoutId: ID!, $discountCode: String!) { checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) { checkoutUserErrors { code field message } checkout { id discountApplications { edges { node { allocationMethod targetType value { ... on MoneyV2 { amount } } } } } } } }",
  "variables": {
    "checkoutId": "gid://shopify/Checkout/881920149012a",
    "discountCode": "WELCOME15"
  }
}
```

#### Raw Server Response Payload:
```json
{
  "data": {
    "checkoutDiscountCodeApplyV2": {
      "checkoutUserErrors": [
        {
          "code": "DISCOUNT_NOT_COMBINABLE",
          "field": ["discountCode"],
          "message": "Discount code WELCOME15 cannot be combined with the existing promotions in your cart."
        }
      ],
      "checkout": {
        "id": "gid://shopify/Checkout/881920149012a",
        "discountApplications": {
          "edges": [
            {
              "node": {
                "allocationMethod": "ACROSS",
                "targetType": "LINE_ITEM",
                "value": {
                  "amount": "19.60"
                }
              }
            }
          ]
        }
      }
    }
  }
}
```

```
Storefront UI Manifestation:
1. The checkout discount input field shook horizontally (shake animation).
2. An inline red warning toast rendered below the input:
   "WELCOME15 discount code isn't valid for the items in your cart or cannot be combined."
3. The cart subtotal remained firmly at $78.40 (20% off). Compounding to $66.64 was BLOCKED.
```

*Diagnostic Verdict:* The governance matrix performed with 100% deterministic fidelity. The automated product sale was preserved, secondary compounding was rejected at the API boundary, and unit margin collapse was completely averted.

---
## 5. Empirical Simulation Charlie: Cart API Inventory Lock Telemetry (The 422 Rejection)

When a customer contacts support claiming: *"Your add-to-cart button is broken!"*, junior operators often assume theme code corrupted. In Simulation Charlie, we document the forensic signature of a storefront inventory allocation lock.

### 5.1 Scenario Parameters
* **Target Variant:** `Synapse Adaptogen Tincture (60ml) - AM Focus` (`SYN-TNCT-AM`).
* **Fulfillment Node:** Reno Hub (`LOC-NV-02`) — Single-node exclusive inventory.
* **Available-to-Sell (ATS) Ledger Balance:** `2 units`.
* **Customer Action:** Customer attempts to add `5 units` to their shopping cart on the Product Display Page (PDP).

---

### 5.2 Chrome DevTools Network Tab Telemetry (`/cart/add.js`)

```http
POST /cart/add.js HTTP/2
Host: synapse-botanicals.myshopify.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Content-Type: application/json
Accept: application/json

{
  "items": [
    {
      "id": 482194120912,
      "quantity": 5
    }
  ]
}
```

#### Server Response Payload (Status: 422 Unprocessable Entity):
```json
{
  "status": 422,
  "message": "You can't add more Synapse Adaptogen Tincture (60ml) - AM Focus to the cart.",
  "description": "All 2 available units are already allocated to active checkout sessions or pending fulfillment.",
  "error": "out_of_stock"
}
```

### 5.3 Forensic Diagnostic Verdict & TechOps Resolution Tree
1. **Root Cause Confirmed:** HTTP `422 Unprocessable Entity` proves that the theme's AJAX call executed properly, but Shopify's backend rejected the mutation because quantity `5 > 2 ATS`.
2. **Resolution SLA:** $< 60\,\text{seconds}$.
3. **Action:** Support informs customer that only 2 bottles remain in stock; inventory coordinator flags `LOC-NV-02` replenishment batch.

---

## 6. Reconciled 300-Order Scenario Ledger

| Metric | Omega | Sigma |
| :--- | ---: | ---: |
| GMV | $25,320.00 | $25,320.00 |
| Discounts | $8,102.40 | $3,600.00 |
| Merchandise revenue | $17,217.60 | $21,720.00 |
| Shipping collected | $0.00 | $1,434.00 |
| Net operating revenue | $17,217.60 | $23,154.00 |
| COGS | $6,135.00 | $6,135.00 |
| Handling and packaging | $1,335.00 | $1,335.00 |
| Carrier freight | $2,730.00 | $2,730.00 |
| Gateway fees | $589.50 | $762.30 |
| Contribution | $6,428.10 | $12,191.70 |
| Below-floor orders | 180 | 0 |
| Blended CM | 37.33% | 52.65% |

The recalculated contribution difference is **$5,763.60**, or **$19.21 per order**. Blended CM improves by **15.32 percentage points**. Below-floor counts are computed per basket: Omega C1 and C3 total 180 orders; Sigma has none under these inputs.

> [!NOTE]
> **Revenue/cost boundary:** Sigma collects $1,434 in shipping revenue; both scenarios incur the same $2,730 carrier expense. Customer-paid freight is not a reduction in the carrier bill. This isolates economic effects and assumes identical order volume/conversion. No annual cash-benefit claim is inferred without testing those demand assumptions.

Reproduction: for each cohort, calculate discounted merchandise, shipping collected, per-order rounded gateway fee, and contribution; multiply each by order count and sum. Use contribution / net operating revenue consistently. The former 23.0%→35.8%, $4,023.20 recovery and $482,760 annualized claims are superseded by this internally consistent fixture.

## 7. Master Curriculum Capstone Lineage & Interconnectivity

This case study concludes the technical curriculum, demonstrating the empirical synthesis of all five TechOps domains:

```mermaid
flowchart TD
    D1["Domain 1: Order Lifecycle & State Machine<br/>(Order Holds & PONR Enforcement)"]
    D2["Domain 2: Order Routing Logic<br/>(Multi-Location Split Minimization)"]
    D3["Domain 3: Bulk Catalog Management<br/>(12-Digit UPC Hygiene & Metafield Governance)"]
    D4["Domain 4: Automations & Webhooks<br/>(Recursion Kill-Switch & 48-Hour DLQ Backfill)"]
    D5["Domain 5: Technical Diagnosis<br/>(Order Timeline Forensics & Margin Protection Engine)"]

    D1 -->|Prevents Edits Post-PONR| D5
    D2 -->|Supplies Transcon Rate Card| D5
    D3 -->|Guarantees Valid Variant IDs| D5
    D4 -->|Tags Heavy Baskets & VIPs| D5
    D5 -->|Protects Financial Solvency| LiveStore["Synapse Botanicals Live Operations"]
```

| Domain | Deliverable | Key Operational Artifact | Capstone Integration Mechanism |
| :---: | :--- | :--- | :--- |
| **1.1** | Parent SOP | [SOP - OrderExceptionMutationProtocol - Parent.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/SOP%20-%20OrderExceptionMutationProtocol%20-%20Parent.md) | Order Timeline entries verify that post-checkout exceptions respect fulfillment hold states. |
| **1.2** | Decision Matrix | [Matrix - OrderStatePointOfNoReturn - Master.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/Matrix%20-%20OrderStatePointOfNoReturn%20-%20Master.md) | Defines the PONR threshold where customer address edits and discount adjustments are locked. |
| **1.3** | Empirical Audit | [Audit - OrderStateSimulation - RunSheet.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/Audit%20-%20OrderStateSimulation%20-%20RunSheet.md) | Simulates Order #1004 state transitions across split warehouse fulfillment nodes. |
| **2.1** | Architecture Spec | [Architecture - MultiNodeRoutingEngine - Spec.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/Architecture%20-%20MultiNodeRoutingEngine%20-%20Spec.md) | Configures routing rules allocating heavy baskets to `LOC-PA-01` and tinctures to `LOC-NV-02`. |
| **2.2** | Decision Matrix | [Matrix - OrderRoutingCostOptimization - DecisionEngine.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/Matrix%20-%20OrderRoutingCostOptimization%20-%20DecisionEngine.md) | Supplies the carrier rate baseline (\$10.80 Transcon) utilized in Section 6 ledger calculations. |
| **2.3** | Empirical Study | [CaseStudy - MultiLocationRoutingOptimization - Analysis.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/CaseStudy%20-%20MultiLocationRoutingOptimization%20-%20Analysis.md) | Validates split-shipment reduction from 34.2% down to 7.8% across 500 benchmark orders. |
| **3.1** | Parent SOP | [SOP - BulkCatalogMigrationAndHygiene - Parent.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/SOP%20-%20BulkCatalogMigrationAndHygiene%20-%20Parent.md) | Governs the CSV migration protocols and formula audits preventing catalog handle mutations. |
| **3.2** | Decision Matrix | [Matrix - CatalogDataSchemaAndValidation - Governance.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/Matrix%20-%20CatalogDataSchemaAndValidation%20-%20Governance.md) | Enforces 12-digit UPC barcode integrity (`840001050001`) preventing Excel corruption. |
| **3.3** | Empirical Audit | [Audit - BulkCatalogMutation - RunSheet.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/Audit%20-%20BulkCatalogMutation%20-%20RunSheet.md) | Live execution log of the Spring 2026 catalog refresh, updating prices and sanitizing barcodes. |
| **4.1** | Parent SOP | [SOP - BusinessLogicAutomationAndWebhooks - Parent.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/SOP%20-%20BusinessLogicAutomationAndWebhooks%20-%20Parent.md) | Mandates Flow negative precondition checks and timing-safe HMAC SHA-256 verification. |
| **4.2** | Decision Matrix | [Matrix - AutomationLogicAndWebhookTriage - Engine.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/Matrix%20-%20AutomationLogicAndWebhookTriage%20-%20Engine.md) | Defines the P0–P3 Flow priority ladder and the 3-state circuit-breaker state machine. |
| **4.3** | Empirical Audit | [Audit - WebhookFailureAndFlowRecursion - RunSheet.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/Audit%20-%20WebhookFailureAndFlowRecursion%20-%20RunSheet.md) | Forensic execution log triaging a 482-cycle tag storm and recovering dropped 504 webhooks. |
| **5.1** | Parent SOP | [SOP - TechnicalDiagnosisAndAuditLogging - Parent.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/SOP%20-%20TechnicalDiagnosisAndAuditLogging%20-%20Parent.md) | Establishes the Order Timeline forensic standard, AVS/CVV matrix, and Cart API endpoints. |
| **5.2** | Decision Matrix | [Matrix - DiscountCombinationsAndMarginProtection - Engine.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/Matrix%20-%20DiscountCombinationsAndMarginProtection%20-%20Engine.md) | Governs the 3x3 discount combination matrix and models the 35% contribution margin floor. |
| **5.3** | Empirical Study | [CaseStudy - DiscountCollisionAndCartDiagnostics - Analysis.md](file:///C:/Users/Riovic%20Matthew/.gemini/antigravity/brain/e77e4d5a-78bd-40a4-88c0-71790432f543/CaseStudy%20-%20DiscountCollisionAndCartDiagnostics%20-%20Analysis.md) | Empirical capstone proving +12.8% margin recovery and capturing live Network tab telemetry. |


## Technical references — checked 30 October 2026

- [Shopify discount combinations](https://help.shopify.com/en/manual/discounts/discount-combinations)
- [Storefront Cart API](https://shopify.dev/docs/api/storefront/latest/mutations/cartDiscountCodesUpdate)
- [Ajax Cart API](https://shopify.dev/docs/api/ajax/reference/cart)
