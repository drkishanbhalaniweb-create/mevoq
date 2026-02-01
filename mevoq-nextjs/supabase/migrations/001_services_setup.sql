-- Update Services Table with expanded content
-- Run this in your Supabase SQL Editor

-- 1. Add missing columns if needed
alter table public.services add column if not exists slug text;
alter table public.services add column if not exists content text;
alter table public.services add column if not exists featured_image text;
alter table public.services add column if not exists case_study_snippet text;

-- 2. Add unique constraint to slug if it doesn't exist
do $$ 
begin
  if not exists (select 1 from pg_constraint where conname = 'services_slug_key') then
    alter table public.services add constraint services_slug_key unique (slug);
  end if;
end $$;

-- 3. Enable RLS
alter table public.services enable row level security;

-- 4. Drop existing policies to avoid duplicates
drop policy if exists "Public services are viewable by everyone" on public.services;
drop policy if exists "Authenticated users can insert services" on public.services;
drop policy if exists "Authenticated users can update services" on public.services;
drop policy if exists "Authenticated users can delete services" on public.services;

-- 5. Re-create Policies
create policy "Public services are viewable by everyone" 
  on public.services for select 
  using (true);

create policy "Authenticated users can insert services" 
  on public.services for insert 
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update services" 
  on public.services for update 
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete services" 
  on public.services for delete 
  using (auth.role() = 'authenticated');

-- 6. Seed/Update Data (with explicit UUIDs)
insert into public.services (id, title, description, slug, icon, featured_image, features, case_study_snippet, content)
values
(
  gen_random_uuid(),
  'Regulatory Strategy & Planning', 
  'Navigate complex regulatory pathways with confidence. We design optimal strategies for global market access.',
  'regulatory-strategy-planning',
  'map-pin',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80',
  '["Regulatory pathway assessment", "Meeting preparation (FDA, EMA, PMDA)", "Risk mitigation strategies", "Global harmonization planning", "Labeling & artwork", "Technical file preparations", "Clinical evaluation reports"]'::jsonb,
  'Helped biotech company achieve FDA breakthrough designation',
  '<h2>Strategic Regulatory Planning</h2>
<p>Our regulatory strategy services are designed to provide a clear roadmap from discovery to commercialization. We help you navigate the complex web of global regulations to ensure your product reaches the market as efficiently as possible.</p>
<p>With over a decade of experience working with pharmaceutical companies across the globe, our team understands the nuances of regulatory requirements in different markets. We partner with you from the earliest stages of development to ensure regulatory considerations are built into your product strategy from day one.</p>
<h3>Key Offerings</h3>
<ul>
    <li><strong>Pathway Assessment:</strong> We analyze your product''s characteristics to determine the most appropriate regulatory pathway (e.g., NDA, BLA, 505(b)(2), MAA). Our experts evaluate the competitive landscape and regulatory precedents to recommend the most efficient path forward.</li>
    <li><strong>Gap Analysis:</strong> We identify potential gaps in your data package and recommend strategies to address them before submission. This proactive approach minimizes the risk of Complete Response Letters and accelerates approval timelines.</li>
    <li><strong>Meeting Preparation:</strong> We prepare you for critical meetings with health authorities, including Pre-IND, End-of-Phase 2, and Pre-NDA/BLA meetings. Our team develops comprehensive briefing documents and anticipates agency questions.</li>
    <li><strong>Global Harmonization:</strong> We develop synchronized strategies for multi-regional submissions, leveraging ICH guidelines and mutual recognition agreements to reduce redundant work.</li>
</ul>
<h3>Our Process</h3>
<p>We begin every engagement with a comprehensive assessment of your current regulatory position. This includes a review of existing data, competitive intelligence gathering, and stakeholder interviews. From this foundation, we develop a tailored strategy that aligns with your business objectives and timeline.</p>
<p>Our regulatory strategists work as an extension of your team, providing ongoing guidance and adapting strategies as your program evolves. We believe in transparent communication and regular milestone reviews to ensure alignment throughout the development process.</p>
<h3>Why Choose Mevoq?</h3>
<p>Our team brings diverse experience from pharmaceutical companies, consulting firms, and regulatory agencies. This unique perspective allows us to anticipate regulatory challenges and develop creative solutions that keep your program on track.</p>
<p>We pride ourselves on building long-term partnerships with our clients. Many of our engagements have spanned multiple product approvals, demonstrating the trust and value we bring to every relationship.</p>'
),
(
  gen_random_uuid(),
  'Regulatory Documentation', 
  'Expert preparation of submission-ready regulatory documents that meet global standards.',
  'regulatory-documentation',
  'file-text',
  'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80',
  '["Global DMF & ASMF Management", "CEP (EDQM) Submissions", "CADIFA (ANVISA) Compliance", "CTD/eCTD Compilation", "IND/NDA/BLA Preparation", "Annual reports and updates"]'::jsonb,
  'Created complete NDA package in 4 months vs. industry average of 8',
  '<h2>Expert Regulatory Documentation</h2>
<p>High-quality documentation is the foundation of a successful regulatory submission. Our team of expert writers and regulatory professionals ensures that your documents are clear, concise, and compliant with all applicable guidelines.</p>
<p>We understand that regulatory submissions must meet rigorous standards while clearly communicating the safety and efficacy of your product. Our documentation services span the entire product lifecycle, from initial development through post-approval maintenance.</p>
<h3>Document Types</h3>
<ul>
    <li><strong>INDs/CTAs:</strong> Investigational New Drug applications and Clinical Trial Applications that enable you to begin clinical studies.</li>
    <li><strong>NDAs/BLAs/MAAs:</strong> Marketing applications for US and EU markets, prepared in full compliance with current guidance.</li>
    <li><strong>Investigator Brochures:</strong> Comprehensive summaries of clinical and nonclinical data that investigators need to conduct trials safely.</li>
    <li><strong>Briefing Books:</strong> Strategic briefing documents for health authority meetings that frame discussions favorably.</li>
</ul>
<h3>Core Expertise & Specialized Filings</h3>
<p>Our deep technical expertise lies in the preparation and management of complex global dossiers for active substances and finished products. We specialize in:</p>
<ul>
    <li><strong>DMFs (Drug Master Files):</strong> Complete preparation and lifecycle management of US and Global Drug Master Files (Type II, III, IV, V), ensuring full compliance with FDA technical and administrative requirements.</li>
    <li><strong>ASMFs (Active Substance Master Files):</strong> Expert drafting of Open and Restricted parts for European submissions, facilitating seamless coordination between manufacturers and marketing authorization holders.</li>
    <li><strong>CEPs (Certificates of Suitability):</strong> Navigating the EDQM procedure to obtain and maintain Certificates of Suitability to the Monographs of the European Pharmacopoeia, ensuring your APIs meet rigorous EU quality standards.</li>
    <li><strong>CADIFA (ANVISA Support):</strong> Specialized support for the Certification of Suitability of Active Pharmaceutical Ingredients in Brazil, managing the complex documentation required by ANVISA for market entry.</li>
</ul>
<h3>Our Documentation Process</h3>
<p>Every project begins with a detailed kickoff meeting to understand your product, timeline, and specific requirements. We develop a documentation plan that outlines deliverables, milestones, and review cycles.</p>
<p>Our writers work from templates aligned with FDA, EMA, and ICH guidelines. We maintain consistency across modules and sections, ensuring a cohesive submission that facilitates efficient agency review.</p>
<h3>Quality Assurance</h3>
<p>All documents undergo multiple rounds of quality control before delivery. We verify scientific accuracy, regulatory compliance, and editorial consistency. Our QC process includes hyperlink verification, cross-reference checking, and format validation.</p>
<p>We also provide publishing services for eCTD submissions, ensuring your electronic dossiers are technically valid and viewer-ready.</p>'
),
(
  gen_random_uuid(),
  'Quality & Compliance', 
  'Build robust quality systems that pass inspections and ensure sustainable compliance.',
  'quality-compliance',
  'shield-check',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
  '["Quality system design & remediation", "GMP/GCP compliance audits", "Inspection readiness", "CAPA effectiveness review", "Vendor qualification"]'::jsonb,
  'Successful GMP inspections by regulatory authorities for our clients',
  '<h2>Quality Systems & Compliance</h2>
<p>A robust quality system is essential for maintaining compliance and ensuring patient safety. We help you build and maintain quality management systems (QMS) that meet the highest standards of the FDA, EMA, and other global regulators.</p>
<p>In today''s regulatory environment, quality is not just a requirement—it''s a competitive advantage. Companies with strong quality cultures experience fewer deviations, faster approvals, and greater stakeholder confidence.</p>
<h3>Our Compliance Services</h3>
<ul>
    <li><strong>QMS Design & Implementation:</strong> We build QMS tailored to your company''s size and stage of development, from startup to multinational enterprise.</li>
    <li><strong>Audits:</strong> We conduct mock inspections and vendor audits to identify and remediate compliance risks before regulators do.</li>
    <li><strong>Inspection Readiness:</strong> We prepare your team for regulatory inspections through training, mock interviews, and facility walkthroughs.</li>
    <li><strong>CAPA Management:</strong> We help you develop effective corrective and preventive action systems that address root causes.</li>
    <li><strong>Vendor Qualification:</strong> We assess and qualify suppliers and contract manufacturers to ensure your supply chain meets GMP standards.</li>
</ul>
<h3>Inspection Support</h3>
<p>When inspections occur, our team can provide on-site support. We help coordinate document requests, coach subject matter experts, and advise on responses to observations.</p>
<p>After inspections, we assist with response preparation, ensuring your commitments are achievable and your remediation plans are comprehensive.</p>
<h3>Continuous Improvement</h3>
<p>Our goal is to help you build a culture of quality that supports long-term commercial success. We implement metrics and monitoring systems that drive continuous improvement and demonstrate compliance to regulators and business partners alike.</p>'
),
(
  gen_random_uuid(),
  'Medical & Scientific Writing', 
  'Clear, compelling regulatory narratives that accelerate review and approval.',
  'medical-scientific-writing',
  'pen-tool',
  'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=1200&q=80',
  '["Clinical study reports", "Regulatory responses", "Scientific publications", "Patient-facing materials", "Expert reports"]'::jsonb,
  'Successfully addressed the queries raised by ethics committee',
  '<h2>Medical & Scientific Writing</h2>
<p>Clear communication of scientific data is critical for regulatory success. Our medical writers combine scientific expertise with regulatory knowledge to create compelling narratives that support your product''s value proposition.</p>
<p>We believe that great regulatory writing is invisible—it allows the data to speak for itself while guiding the reviewer to understand the significance of your findings. Our writers have backgrounds in life sciences, medicine, and regulatory affairs.</p>
<h3>Writing Services</h3>
<ul>
    <li><strong>Clinical Study Reports (CSRs):</strong> Comprehensive reports of clinical trial data that meet ICH E3 guidelines and agency expectations.</li>
    <li><strong>Clinical Summaries & Overviews:</strong> High-level summaries for Module 2 of marketing applications that synthesize years of development.</li>
    <li><strong>Safety Narratives:</strong> Detailed descriptions of adverse events that provide context for safety assessments.</li>
    <li><strong>Manuscripts & Abstracts:</strong> Publications for peer-reviewed journals and conference presentations that support your regulatory and commercial goals.</li>
    <li><strong>Patient-Facing Materials:</strong> Informed consent forms, patient information leaflets, and educational materials in clear, accessible language.</li>
</ul>
<h3>Our Writing Approach</h3>
<p>We work closely with your clinical and scientific teams to ensure that your data is presented accurately and persuasively. Every document begins with a detailed outline and messaging strategy that aligns with your overall regulatory approach.</p>
<p>We use structured authoring tools and maintain style guides to ensure consistency across documents and therapeutic areas. Our writers are trained in data visualization best practices, creating tables and figures that communicate complex information clearly.</p>
<h3>Regulatory Response Support</h3>
<p>When health authorities request additional information, time is critical. Our writers are experienced in developing responses that address agency questions directly while maintaining consistency with your original submission.</p>'
),
(
  gen_random_uuid(),
  'Risk Management', 
  'Proactive identification and mitigation of regulatory and quality risks.',
  'risk-management',
  'alert-triangle',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  '["Risk assessments", "Gap analysis", "Deviation investigation", "Change control evaluation", "Safety signal management"]'::jsonb,
  'Successful vendor approval through nitrosamine impurities compliance',
  '<h2>Risk Management Strategies</h2>
<p>Proactive risk management is a regulatory expectation and a business necessity. We help you identify, assess, and mitigate risks throughout the product lifecycle, from development through post-marketing surveillance.</p>
<p>Effective risk management protects patients, preserves asset value, and demonstrates to regulators that you take safety seriously. Our approach combines systematic assessment methods with deep industry experience.</p>
<h3>Risk Management Activities</h3>
<ul>
    <li><strong>Risk Management Plans (RMPs):</strong> Comprehensive plans for identifying and minimizing risks, required for EU marketing authorizations and increasingly expected globally.</li>
    <li><strong>REMS:</strong> Risk Evaluation and Mitigation Strategies for high-risk products that balance access with safety.</li>
    <li><strong>Signal Detection:</strong> Ongoing monitoring of safety data to identify potential safety signals before they become regulatory issues.</li>
    <li><strong>Benefit-Risk Assessments:</strong> Structured frameworks for evaluating and communicating the benefit-risk balance of your products.</li>
    <li><strong>Pharmacovigilance Planning:</strong> Systems and processes for monitoring safety throughout the product lifecycle.</li>
</ul>
<h3>Deviation & Change Control</h3>
<p>Manufacturing deviations and process changes can introduce new risks. Our experts help you investigate root causes, assess impact, and implement effective corrective actions.</p>
<p>We also support change control processes, ensuring that changes are properly evaluated and documented before implementation.</p>
<h3>Impurity Assessments</h3>
<p>Elemental impurities, nitrosamines, and other potentially harmful substances require specialized expertise. We help you assess risks and develop control strategies that meet current regulatory expectations.</p>'
),
(
  gen_random_uuid(),
  'Administrative Support', 
  'Streamline your compliance operations with expert administrative assistance.',
  'administrative-support',
  'folder',
  'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&q=80',
  '["Process optimization", "US authorized agent", "US FDA administrative activities", "Accreditation certification applications", "Submission tracking"]'::jsonb,
  'Reduced administrative burden by 60% for mid-size pharma',
  '<h2>Administrative & Operational Support</h2>
<p>Regulatory operations involves a myriad of administrative tasks that can drain your team''s resources. We provide efficient support to keep your regulatory department running smoothly, allowing your experts to focus on strategic activities.</p>
<p>Whether you need help with day-to-day operations or support for a major submission, our administrative team delivers reliable, high-quality assistance.</p>
<h3>Support Services</h3>
<ul>
    <li><strong>Submission Publishing:</strong> Electronic publishing of eCTD submissions, including validation, hyperlinking, and technical QC.</li>
    <li><strong>Document Management:</strong> Organization and archiving of regulatory records in compliance with 21 CFR Part 11 and other requirements.</li>
    <li><strong>Project Management:</strong> Tracking of regulatory timelines and deliverables to keep your programs on schedule.</li>
    <li><strong>US Agent Services:</strong> Acting as your US agent for FDA communications, receiving correspondence and forwarding it promptly.</li>
    <li><strong>Regulatory Intelligence:</strong> Monitoring of regulatory developments and guidance documents that affect your products.</li>
</ul>
<h3>Process Optimization</h3>
<p>We help you streamline regulatory workflows and implement best practices that increase efficiency. This includes template development, procedure optimization, and technology recommendations.</p>
<h3>Scalable Support</h3>
<p>Our support model is flexible and scalable. You can engage us for specific projects or ongoing operational support. We adapt to your needs, ramping up for major milestones and maintaining a steady presence during quieter periods.</p>
<p>We handle the details so you can focus on strategy and science. Our goal is to be a seamless extension of your team, providing reliable support that you can count on.</p>'
)
ON CONFLICT (slug) DO UPDATE SET 
  title = excluded.title,
  description = excluded.description,
  content = excluded.content,
  featured_image = excluded.featured_image,
  icon = excluded.icon,
  features = excluded.features,
  case_study_snippet = excluded.case_study_snippet;
