/**
 * PRIYANKA'S INFINITE SMILES - CENTRAL CONFIGURATION FILE
 * Master business details, contact information, hours, and treatment taxonomy
 * All pages and components consume these verified clinic details.
 */

const CLINIC_CONFIG = {
  brand: {
    name: "Priyanka's Infinite Smiles",
    fullName: "Priyanka's Infinite Smiles Advanced Dental Studio",
    tagline: "Where Advanced Dentistry Meets Beautiful Smiles",
    subTagline: "Advanced Dental Care & Cosmetic Dentistry Studio in Manikonda, Hyderabad",
    websiteUrl: "https://priyankasinfinitesmiles.com",
    yearEstablished: "2018",
    rating: "4.9",
    reviewCount: "480+",
    smilesTransformed: "8,500+"
  },

  founder: {
    name: "Dr. Priyanka Vijayakumar",
    title: "Chief Cosmetic Dentist & Dental Surgeon",
    qualifications: "BDS, Fellowship in Cosmetic Dentistry & Oral Implantology",
    experience: "10+ Years of Clinical Excellence",
    awards: ["SumanTV Healthcare Excellence Award", "Member of Indian Dental Association (IDA)"],
    speciality: "Digital Smile Designing, Aesthetic Veneers, Dental Implants & Restorative Dentistry",
    bio: "Dr. Priyanka Vijayakumar is a renowned dental surgeon and cosmetic dental specialist in Hyderabad with over a decade of clinical experience. She founded Priyanka's Infinite Smiles Advanced Dental Studio to bring international-standard, painless, and empathetic oral healthcare to Manikonda and West Hyderabad."
  },

  contact: {
    phone: "+91 78931 46767",
    phoneClean: "+917893146767",
    phoneTel: "tel:+917893146767",
    whatsappNumber: "917893146767",
    whatsappUrl: "https://wa.me/917893146767?text=Hello%20Dr.%20Priyanka%27s%20Infinite%20Smiles%2C%20I%20would%20like%20to%20enquire%20about%20booking%20a%20dental%20appointment.",
    email: "contact@priyankasinfinitesmiles.com",
    emailAppointments: "appointments@priyankasinfinitesmiles.com"
  },

  location: {
    street: "House No. 9, A/1, 1/257, Beside Lanco Hills Residential Towers Road",
    landmark: "Opposite Champions Horse Riding Club",
    colony: "Chitrapuri Colony, Manikonda",
    city: "Hyderabad",
    state: "Telangana",
    postalCode: "500104",
    country: "India",
    formattedAddress: "House No. 9, A/1, 1/257, Beside Lanco Hills Residential Towers Road, Opp. Champions Horse Riding Club, Chitrapuri Colony, Manikonda, Hyderabad, Telangana 500104",
    shortAddress: "Beside Lanco Hills, Manikonda, Hyderabad",
    coordinates: {
      latitude: 17.4116,
      longitude: 78.3842
    },
    googleMapsUrl: "https://maps.google.com/?q=Priyanka's+Infinite+Smiles+Advanced+Dental+Studio+Manikonda+Hyderabad",
    googleEmbedMap: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.1895116743324!2d78.3756855!3d17.4026857!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96a5f573c2b1%3A0x6b6c2d159a68a520!2sManikonda%2C%20Hyderabad%2C%20Telangana%20500104!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
  },

  timings: {
    weekdays: "Monday – Saturday: 10:00 AM – 8:30 PM",
    sunday: "Sunday: 10:00 AM – 2:00 PM (By Appointment Only)",
    emergency: "24/7 Dental Emergency Triage via WhatsApp",
    schemaSchedule: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "20:30" },
      { days: ["Sunday"], opens: "10:00", closes: "14:00" }
    ]
  },

  socials: {
    instagram: "https://www.instagram.com/priyankasinfinitesmiles/",
    facebook: "https://www.facebook.com/priyankasinfinitesmiles/",
    youtube: "https://www.youtube.com/@priyankasinfinitesmiles",
    linkedin: "https://www.linkedin.com/company/priyankas-infinite-smiles",
    googleBusiness: "https://maps.google.com/?q=Priyanka's+Infinite+Smiles+Manikonda"
  },

  treatments: [
    {
      id: "dental-implants",
      name: "Dental Implants",
      slug: "/dental-implants/",
      category: "Restorative Dentistry",
      shortDesc: "Permanent, bio-compatible titanium implants that look, feel, and function just like natural teeth.",
      badge: "Permanent Teeth Solution"
    },
    {
      id: "smile-designing",
      name: "Smile Designing",
      slug: "/smile-designing/",
      category: "Cosmetic Dentistry",
      shortDesc: "Bespoke digital smile architecture analyzing facial symmetry, lip lines, and tooth proportions.",
      badge: "Signature Artistry"
    },
    {
      id: "cosmetic-dentistry",
      name: "Cosmetic Dentistry",
      slug: "/cosmetic-dentistry/",
      category: "Aesthetic Care",
      shortDesc: "Porcelain veneers, composite bonding, gum contouring, and holistic aesthetic restorations.",
      badge: "Aesthetic Excellence"
    },
    {
      id: "teeth-whitening",
      name: "Teeth Whitening",
      slug: "/teeth-whitening/",
      category: "Aesthetic Care",
      shortDesc: "Advanced in-office laser whitening lightening smiles up to 8 shades in a single safe 45-minute session.",
      badge: "Fast & Painless"
    },
    {
      id: "root-canal-treatment",
      name: "Root Canal Treatment",
      slug: "/root-canal-treatment/",
      category: "Endodontics",
      shortDesc: "Gentle, single-sitting rotary endodontics designed to save infected teeth painlessly under digital apex locators.",
      badge: "Pain-Free Rotary RCT"
    },
    {
      id: "braces-aligners",
      name: "Braces & Clear Aligners",
      slug: "/braces-aligners/",
      category: "Orthodontics",
      shortDesc: "Custom invisible aligners and aesthetic ceramic braces for teenagers and adults looking for straight teeth.",
      badge: "Discreet Teeth Alignment"
    },
    {
      id: "pediatric-dentistry",
      name: "Pediatric Dentistry",
      slug: "/pediatric-dentistry/",
      category: "Children's Dental Care",
      shortDesc: "Gentle, fear-free preventive and restorative dental care tailored specially for children and teenagers.",
      badge: "Child-Friendly Care"
    },
    {
      id: "dental-services",
      name: "Crowns, Bridges & General Dentistry",
      slug: "/dental-services/",
      category: "Comprehensive Care",
      shortDesc: "Metal-free Zirconia crowns, digital cleanings, cavity restorations, laser gum therapy, and wisdom tooth extractions.",
      badge: "Complete Oral Wellness"
    }
  ]
};

// Global helper functions
window.CLINIC_CONFIG = CLINIC_CONFIG;

document.addEventListener("DOMContentLoaded", () => {
  // Populate elements with data-clinic-prop attribute if present
  document.querySelectorAll("[data-clinic-prop]").forEach(el => {
    const propPath = el.getAttribute("data-clinic-prop");
    const parts = propPath.split(".");
    let val = CLINIC_CONFIG;
    for (let p of parts) {
      if (val && val[p] !== undefined) {
        val = val[p];
      } else {
        val = null;
        break;
      }
    }
    if (val !== null) {
      if (el.tagName === "A" && propPath.includes("phone")) {
        el.href = CLINIC_CONFIG.contact.phoneTel;
        el.textContent = val;
      } else if (el.tagName === "A" && propPath.includes("whatsapp")) {
        el.href = CLINIC_CONFIG.contact.whatsappUrl;
      } else if (el.tagName === "A" && propPath.includes("email")) {
        el.href = "mailto:" + val;
        el.textContent = val;
      } else {
        el.textContent = val;
      }
    }
  });
});

