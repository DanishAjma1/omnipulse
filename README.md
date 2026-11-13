# OmniPulse — Enterprise Marketing Operations Platform

OmniPulse is a 5-page enterprise SaaS marketing website and operations interface built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**, strictly typed with **TypeScript** and **Zod**.

---

## Architecture & Design System

### 1. Global Aesthetic
- **Minimalist, Bento Box, High-Contrast**: Clean typography, high-contrast dark palette (`bg-[#0A0A0A]`) and crisp light mode (`bg-white` / `bg-slate-50`).
- **Typography**: Geist Sans & Geist Mono (`next/font/google`).
- **Theming (Dual-Tone)**: CSS variable color system with reactive theme provider supporting persistent light and dark themes.
- **Motion & Interaction**: Tactile hover micro-interactions (`hover:scale-[0.98]`), animated Framer Motion scroll fade-ins (`initial={{ opacity: 0, y: 20 }}`), and subtle radial border glows (`border-indigo-500/50`).
- **Strict Spacing**: Predictable vertical rhythm (`py-24` and `py-32`) between content sections.
- **Sticky Glassmorphic Navbar**: `backdrop-blur-md bg-background/80` with logo, active link underline state indicator, theme toggle, login link, and high-contrast "Get Started" CTA button.

---

## Pages

1. **Home (`/`)**
   - **Hero**: H1 *"Take Absolute Control of Your Marketing Operations"*, subhead, Primary/Secondary action triggers.
   - **Glowing UI Mockup**: High-fidelity live console mockup with simulated cross-network performance curve SVG chart, real-time MCC latency telemetry, and active campaign rules.
   - **Social Proof**: Enterprise client validation banner.
   - **Features (3-Col Grid)**: Ads Sync, White-labeled Client Reporting, and AI SEO & Outreach.
   - **Deep Dive (Zig-Zag)**: Row 1 (CRM & Ads mutation pipeline) + Row 2 (White-labeled client portal with custom CNAME).
   - **CTA**: Dark full-width banner with glowing border.

2. **Services (`/services`)**
   - **Hero**: H1 *"Everything You Need to Scale, Unified."*
   - **Bento Grid (Masonry 4-feature layout)**:
     - Google Ads Engine (with interactive metric switcher and pacing mock chart)
     - Client Portal Management (CNAME + SSL provisioning)
     - SEO Auditing Hub (Core Web Vitals & keyword index)
     - Outreach & Funnels (B2B email sequencing & dynamic landing page telemetry)
   - **Integrations Diagram**: Visual node-based topology showcasing OmniPulse Core dispatching requests to Google Ads MCC, Meta Marketing API, CRM pipelines, headless SEO crawlers, and data warehouses.

3. **Pricing (`/pricing`)**
   - **Hero**: Transparent pricing with reactive Monthly vs. Annual toggle (Save 20%).
   - **Pricing Cards (3-Col Grid)**:
     - Starter ($49/mo)
     - Agency Pro ($149/mo - Visually highlighted and scaled with glowing badge)
     - Enterprise ($499/mo)
   - **Feature Checklist**: Comprehensive side-by-side feature matrix.
   - **FAQ Accordion**: Smooth expand/collapse accordion addressing common developer token and migration inquiries.

4. **Register (`/register`)**
   - **50/50 Split-Screen Layout (`min-h-screen lg:h-screen`)**:
     - *Left (Static)*: Deep indigo gradient, enterprise testimonial, feature bullet list, and "Secure Google OAuth" verification badge.
     - *Right (Interactive)*: Organization registration form with strict client-side **Zod** validation (Full Name, company work email check, password strength criteria, company type select, terms agreement), animated error states, and workspace initialization success view.

5. **Contact (`/contact`)**
   - **Hero**: H1 *"We're Here to Help You Scale."*
   - **2-Column Layout**:
     - *Left*: Support email, enterprise sales channel, global HQ address, operating hours, and developer API documentation card.
     - *Right*: Solutions engineering contact form with simulated dispatch and ticket confirmation toast.

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/DanishAjma1/omnipulse.git
cd omnipulse

# Install dependencies
npm install

# Start development server
npm run dev

# Run production build & typecheck
npm run build

# Run linter
npm run lint
```
