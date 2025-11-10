import { supabase } from './supabase';

// Stats
export const getStats = () => {
  return {
    successful_submissions: 870,
    project_weeks_saved: 4000,
    client_satisfaction: 98.5,
    countries_served: 47
  };
};

// Testimonials
export const getTestimonials = async () => {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*');
  
  if (error) throw error;
  
  // Return mock data if empty
  if (!data || data.length === 0) {
    return [
      {
        id: '1',
        name: "Dr. Sarah Chen",
        role: "VP Regulatory Affairs",
        company: "BioGenix Therapeutics",
        content: "Maglinc cut our FDA submission timeline by 40%. Their expertise in regulatory strategy is unmatched. We launched 3 months ahead of schedule.",
        rating: 5
      },
      {
        id: '2',
        name: "Marcus Williams",
        role: "Chief Scientific Officer",
        company: "PharmaTech Solutions",
        content: "The team's deep regulatory knowledge and proactive approach saved us from costly compliance issues. Best consulting investment we've made.",
        rating: 5
      },
      {
        id: '3',
        name: "Dr. Amelia Rodriguez",
        role: "Director of Quality",
        company: "MedLife Innovations",
        content: "Working with Maglinc felt like having an extension of our own team. Their documentation expertise is exceptional.",
        rating: 5
      }
    ];
  }
  
  return data;
};

// Services
export const getServices = async () => {
  const { data, error } = await supabase
    .from('services')
    .select('*');
  
  if (error) throw error;
  
  // Return mock data if empty
  if (!data || data.length === 0) {
    return [
      {
        id: '1',
        title: "Regulatory Strategy & Planning",
        description: "Navigate complex regulatory pathways with confidence. We design optimal strategies for global market access.",
        icon: "map-pin",
        features: [
          "Regulatory pathway assessment",
          "Meeting preparation (FDA, EMA, PMDA)",
          "Risk mitigation strategies",
          "Global harmonization planning"
        ],
        case_study_snippet: "Helped biotech company achieve FDA breakthrough designation"
      },
      {
        id: '2',
        title: "Regulatory Documentation",
        description: "Expert preparation of submission-ready regulatory documents that meet global standards.",
        icon: "file-text",
        features: [
          "IND/NDA/BLA preparation",
          "CTD/eCTD compilation",
          "Investigator brochures",
          "Pediatric study plans"
        ],
        case_study_snippet: "Created complete NDA package in 4 months vs. industry average of 8"
      },
      {
        id: '3',
        title: "Quality & Compliance",
        description: "Build robust quality systems that pass inspections and ensure sustainable compliance.",
        icon: "shield-check",
        features: [
          "Quality system design & remediation",
          "GMP/GCP compliance audits",
          "Inspection readiness",
          "CAPA effectiveness review"
        ],
        case_study_snippet: "Zero FDA 483 observations in last 15 client inspections"
      },
      {
        id: '4',
        title: "Medical & Scientific Writing",
        description: "Clear, compelling regulatory narratives that accelerate review and approval.",
        icon: "pen-tool",
        features: [
          "Clinical study reports",
          "Regulatory responses",
          "Scientific publications",
          "Patient-facing materials"
        ],
        case_study_snippet: "Drafted responses that resolved FDA complete response letter"
      },
      {
        id: '5',
        title: "Risk Management",
        description: "Proactive identification and mitigation of regulatory and quality risks.",
        icon: "alert-triangle",
        features: [
          "Risk assessments (ICH Q9)",
          "Gap analysis",
          "Deviation investigation",
          "Change control evaluation"
        ],
        case_study_snippet: "Prevented costly product recall through early risk identification"
      },
      {
        id: '6',
        title: "Administrative Support",
        description: "Streamline your compliance operations with expert administrative assistance.",
        icon: "folder",
        features: [
          "Document management",
          "Submission tracking",
          "Regulatory intelligence",
          "Process optimization"
        ],
        case_study_snippet: "Reduced administrative burden by 60% for mid-size pharma"
      }
    ];
  }
  
  return data;
};

// Team
export const getTeam = async () => {
  const { data, error } = await supabase
    .from('team')
    .select('*');
  
  if (error) throw error;
  
  // Return mock data if empty
  if (!data || data.length === 0) {
    return [
      {
        id: '1',
        name: "Dr. Jennifer Martinez",
        role: "Founder & Chief Regulatory Officer",
        bio: "Former FDA reviewer with 15+ years in pharmaceutical regulation. Led 200+ successful drug approvals.",
        expertise: ["FDA Strategy", "CMC Review", "IND/NDA Submissions"],
        avatar_url: "https://images.unsplash.com/photo-1758691461916-dc7894eb8f94?w=400"
      },
      {
        id: '2',
        name: "Robert Chen, PhD",
        role: "VP Quality & Compliance",
        bio: "Quality systems expert with Big Pharma and biotech experience. Specializes in remediation and inspection readiness.",
        expertise: ["Quality Systems", "GMP Compliance", "Inspection Management"],
        avatar_url: "https://images.unsplash.com/photo-1758691463198-dc663b8a64e4?w=400"
      },
      {
        id: '3',
        name: "Dr. Priya Sharma",
        role: "Director of Regulatory Writing",
        bio: "Medical writer and regulatory affairs specialist. Authored regulatory documents for 50+ global submissions.",
        expertise: ["Medical Writing", "Regulatory Documentation", "Global Submissions"],
        avatar_url: "https://images.unsplash.com/photo-1758691462119-792279713969?w=400"
      }
    ];
  }
  
  return data;
};

// Blog Posts
export const getBlogPosts = async (publishedOnly = true) => {
  let query = supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (publishedOnly) {
    query = query.eq('published', true);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
};

export const getBlogPost = async (slug) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  
  if (error) throw error;
  return data;
};

// Contacts
export const submitContact = async (contactData) => {
  const { data, error } = await supabase
    .from('contacts')
    .insert([{
      id: crypto.randomUUID(),
      ...contactData,
      timestamp: new Date().toISOString()
    }]);
  
  if (error) throw error;
  return data;
};
