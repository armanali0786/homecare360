const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Service = require("../models/service");
const ProviderApplication = require("../models/provider-application");
const Review = require("../models/review");

const DEMO_PASSWORD = "Demo@12345";

// 10 categories × 3 services = 30 services. Prices are stored in INR (the
// platform's canonical base unit — see client LocaleContext.formatCurrency)
// and displayed converted into AED/SAR/QAR depending on the viewer's region.
const CATEGORIES = [
  {
    name: "Plumbing",
    services: [
      { name: "Pipe Leak Repair", icon: "🔧", basePrice: 2200, description: "Fix leaking or burst pipes, joints and fittings." },
      { name: "Bathroom Fitting Installation", icon: "🚿", basePrice: 3200, description: "Install taps, showers, sinks and toilet fittings." },
      { name: "Emergency Plumbing Visit", icon: "🚨", basePrice: 1800, description: "Fast-response plumbing for urgent leaks and blockages." },
    ],
  },
  {
    name: "Electrical",
    services: [
      { name: "Wiring & Switchboard Repair", icon: "⚡", basePrice: 2000, description: "Diagnose and repair faulty wiring and switchboards." },
      { name: "Light & Fan Installation", icon: "💡", basePrice: 1500, description: "Install ceiling fans, lights and fixtures." },
      { name: "MCB / DB Panel Upgrade", icon: "🔌", basePrice: 3500, description: "Upgrade or replace circuit breakers and distribution panels." },
    ],
  },
  {
    name: "House Cleaning",
    services: [
      { name: "Deep Home Cleaning", icon: "🧽", basePrice: 2800, description: "Full home scrub — kitchen, bathrooms, bedrooms and balcony." },
      { name: "Move-in / Move-out Cleaning", icon: "📦", basePrice: 4200, description: "Thorough cleaning for move-in or move-out handover." },
      { name: "Sofa & Carpet Cleaning", icon: "🛋️", basePrice: 1600, description: "Deep shampoo and stain removal for upholstery and carpets." },
    ],
  },
  {
    name: "AC & Appliance Repair",
    services: [
      { name: "AC Deep Service", icon: "❄️", basePrice: 2200, description: "Anti-bacterial foam wash, gas check and coil clean." },
      { name: "AC Gas Refill", icon: "🌬️", basePrice: 3000, description: "Refrigerant gas top-up for underperforming AC units." },
      { name: "Washing Machine / Fridge Repair", icon: "🧺", basePrice: 1900, description: "Diagnose and repair common appliance faults." },
    ],
  },
  {
    name: "Painting",
    services: [
      { name: "Interior Wall Painting", icon: "🎨", basePrice: 9000, description: "Premium emulsion painting with primer and putty work." },
      { name: "Exterior Painting", icon: "🏠", basePrice: 14000, description: "Weatherproof exterior painting for villas and buildings." },
      { name: "Waterproofing & Painting", icon: "🛡️", basePrice: 11000, description: "Waterproof membrane treatment combined with a fresh coat." },
    ],
  },
  {
    name: "Carpentry",
    services: [
      { name: "Furniture Assembly", icon: "🪑", basePrice: 1400, description: "Assemble flat-pack and custom furniture." },
      { name: "Custom Woodwork", icon: "🪵", basePrice: 6000, description: "Bespoke cabinets, shelving and wood fittings." },
      { name: "Door / Window Repair", icon: "🚪", basePrice: 1700, description: "Fix hinges, frames, locks and sliding mechanisms." },
    ],
  },
  {
    name: "Landscaping",
    services: [
      { name: "Garden Maintenance", icon: "🌿", basePrice: 2500, description: "Routine lawn mowing, trimming and upkeep." },
      { name: "Landscape Design", icon: "🌳", basePrice: 8000, description: "Full outdoor space design with seasonal planting." },
      { name: "Tree Trimming", icon: "🌴", basePrice: 1800, description: "Safe pruning and trimming of trees and hedges." },
    ],
  },
  {
    name: "Pest Control",
    services: [
      { name: "General Pest Control", icon: "🐜", basePrice: 1800, description: "Cockroach, ant and spider treatment, pet-safe chemicals." },
      { name: "Termite Control", icon: "🐛", basePrice: 3500, description: "Termite inspection and treatment for wood structures." },
      { name: "Bed Bug Treatment", icon: "🛏️", basePrice: 2600, description: "Targeted treatment for bed bug infestations." },
    ],
  },
  {
    name: "Domestic Help",
    services: [
      { name: "Full-time Maid Service", icon: "🧹", basePrice: 15000, description: "Live-in or full-time housekeeping support." },
      { name: "Part-time Housekeeping", icon: "🧺", basePrice: 6000, description: "Scheduled part-time housekeeping visits." },
      { name: "Nanny / Childcare", icon: "🍼", basePrice: 12000, description: "Experienced, verified childcare support at home." },
    ],
  },
  {
    name: "Handyman",
    services: [
      { name: "General Handyman Visit", icon: "🛠️", basePrice: 1200, description: "Small fixes and odd jobs around the home." },
      { name: "TV Mounting & Wall Fixtures", icon: "📺", basePrice: 1000, description: "Mount TVs, shelves and wall-hung fixtures." },
      { name: "Furniture Moving", icon: "🚚", basePrice: 1600, description: "In-home furniture moving and rearrangement." },
    ],
  },
];

const PROVIDERS = [
  // Plumbing
  { firstName: "Ahmed",   lastName: "Al Mazrouei", category: "Plumbing",              city: "Dubai",      state: "Dubai",       hourlyRate: 1800, gender: "male"   },
  { firstName: "Hassan",  lastName: "Baig",        category: "Plumbing",              city: "Riyadh",     state: "Riyadh",      hourlyRate: 1650, gender: "male"   },
  // Electrical
  { firstName: "Fatima",  lastName: "Al Suwaidi",  category: "Electrical",            city: "Abu Dhabi",  state: "Abu Dhabi",   hourlyRate: 1600, gender: "female" },
  { firstName: "Waleed",  lastName: "Hijazi",      category: "Electrical",            city: "Doha",       state: "Doha",        hourlyRate: 1750, gender: "male"   },
  // House Cleaning
  { firstName: "Mariam",  lastName: "Hassan",      category: "House Cleaning",        city: "Dubai",      state: "Dubai",       hourlyRate: 1200, gender: "female" },
  { firstName: "Grace",   lastName: "Mensah",      category: "House Cleaning",        city: "Abu Dhabi",  state: "Abu Dhabi",   hourlyRate: 1100, gender: "female" },
  // AC & Appliance Repair
  { firstName: "Yousef",  lastName: "Al Qassimi",  category: "AC & Appliance Repair", city: "Sharjah",    state: "Sharjah",     hourlyRate: 2000, gender: "male"   },
  { firstName: "Karim",   lastName: "Fathy",       category: "AC & Appliance Repair", city: "Jeddah",     state: "Makkah",      hourlyRate: 1850, gender: "male"   },
  // Painting
  { firstName: "Omar",    lastName: "Khalifa",     category: "Painting",              city: "Riyadh",     state: "Riyadh",      hourlyRate: 2200, gender: "male"   },
  { firstName: "Sultan",  lastName: "Al Kaabi",    category: "Painting",              city: "Dubai",      state: "Dubai",       hourlyRate: 2100, gender: "male"   },
  // Carpentry
  { firstName: "Khalid",  lastName: "Al Otaibi",   category: "Carpentry",             city: "Jeddah",     state: "Makkah",      hourlyRate: 1900, gender: "male"   },
  { firstName: "Imran",   lastName: "Chaudhry",    category: "Carpentry",             city: "Sharjah",    state: "Sharjah",     hourlyRate: 1750, gender: "male"   },
  // Landscaping
  { firstName: "Noura",   lastName: "Al Ali",      category: "Landscaping",           city: "Doha",       state: "Doha",        hourlyRate: 1700, gender: "female" },
  { firstName: "Salim",   lastName: "Al Harthy",   category: "Landscaping",           city: "Abu Dhabi",  state: "Abu Dhabi",   hourlyRate: 1600, gender: "male"   },
  // Pest Control
  { firstName: "Saeed",   lastName: "Al Nuaimi",   category: "Pest Control",          city: "Ajman",      state: "Ajman",       hourlyRate: 1500, gender: "male"   },
  { firstName: "Adel",    lastName: "Mansour",     category: "Pest Control",          city: "Riyadh",     state: "Riyadh",      hourlyRate: 1550, gender: "male"   },
  // Domestic Help
  { firstName: "Layla",   lastName: "Fernandes",   category: "Domestic Help",         city: "Dubai",      state: "Dubai",       hourlyRate: 1400, gender: "female" },
  { firstName: "Precious", lastName: "Okafor",     category: "Domestic Help",         city: "Doha",       state: "Doha",        hourlyRate: 1350, gender: "female" },
  // Handyman
  { firstName: "Rashid",  lastName: "Al Marri",    category: "Handyman",              city: "Doha",       state: "Doha",        hourlyRate: 1300, gender: "male"   },
  { firstName: "Naveed",  lastName: "Iqbal",       category: "Handyman",              city: "Sharjah",    state: "Sharjah",     hourlyRate: 1250, gender: "male"   },
];

const CUSTOMERS = [
  "Sara Al Habsi", "Hamdan Al Falasi", "Aisha Rahman", "Zayed Al Nahyan", "Reem Khoury",
  "Faisal Al Dosari", "Mona Abdullah", "Tariq Hamdan", "Huda Al Zaabi", "Bilal Siddiqui",
  "Latifa Al Marzooqi", "Yara Haddad", "Marwan Al Kuwari", "Dana Al Rashid", "Ibrahim Saleh",
  "Nadia Farouk", "Adnan Qureshi", "Shaikha Al Muhairi", "Ali Reza", "Rana Aziz",
];

const REVIEW_COMMENTS = [
  "Arrived on time and did excellent work — highly recommend.",
  "Very professional, explained everything clearly before starting.",
  "Great service, fair pricing, would book again.",
  "Quick response for an urgent request, solved the issue same day.",
  "Polite, tidy, and finished faster than expected.",
  "Booked through the app, provider called ahead and was spot on with the estimate.",
  "Second time using this provider — consistently reliable.",
  "Left the place spotless, would definitely use again for future work.",
  "Communicated well throughout and respected our home.",
  "Fixed the issue properly the first time, no follow-up needed.",
];

async function upsertService(categoryName, svc) {
  return Service.findOneAndUpdate(
    { name: svc.name },
    {
      name: svc.name,
      category: categoryName,
      icon: svc.icon,
      description: svc.description,
      basePrice: svc.basePrice,
      isEnabled: true,
    },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );
}

async function upsertUser({ fullName, email, phone, role }) {
  let user = await User.findOne({ email });
  if (user) return user;
  const password = await bcrypt.hash(DEMO_PASSWORD, 10);
  user = await User.create({ fullName, email, phone, password, role, isActive: true });
  return user;
}

async function upsertProvider(def, index) {
  const email = `${def.firstName.toLowerCase().replace(/\s+/g, "")}.${def.lastName.toLowerCase().replace(/\s+/g, "")}@homecare360.demo`;
  const phone = `50${String(1000000 + index).slice(-7)}`;
  const isDomesticHelp = def.category === "Domestic Help";

  const user = await upsertUser({
    fullName: `${def.firstName} ${def.lastName}`,
    email,
    phone,
    role: "provider",
  });

  const application = await ProviderApplication.findOneAndUpdate(
    { email },
    {
      user: user._id,
      firstName: def.firstName,
      lastName: def.lastName,
      email,
      phone,
      address: `${100 + index} Sheikh Zayed Road`,
      city: def.city,
      state: def.state,
      zipCode: "00000",
      serviceCategory: def.category,
      gender: def.gender,
      yearsExperience: 3 + (index % 6),
      businessName: `${def.firstName} ${def.category} Services`,
      description: `Experienced ${def.category.toLowerCase()} professional serving ${def.city} and nearby areas.`,
      hourlyRate: def.hourlyRate,
      availability: "flexible",
      serviceRadius: 15,
      tags: [def.category],
      profileImage: "",
      documents: {
        idDocument: `seed-id-document-${index}.jpg`,
        licenseDocument: `seed-license-document-${index}.jpg`,
        insuranceDocument: `seed-insurance-document-${index}.jpg`,
        visaDocument: isDomesticHelp ? `seed-visa-document-${index}.jpg` : "",
        sponsorshipDocument: isDomesticHelp ? `seed-sponsorship-document-${index}.jpg` : "",
      },
      status: "approved",
      complianceStatus: isDomesticHelp ? "verified" : "not_applicable",
    },
    { upsert: true, returnDocument: "after", setDefaultsOnInsert: true }
  );

  if (user.role !== "provider") {
    user.role = "provider";
    await user.save();
  }

  return application;
}

// PROVIDERS lists two providers per category back-to-back (index 0&1 share a
// category, 2&3 share the next, etc.) — `pairPosition` (0 or 1) splits
// REVIEW_COMMENTS into two disjoint halves so the two providers within the
// same category never get seeded with the same review text.
async function seedReviewsForProvider(provider, customers, index) {
  const pairPosition = index % 2;
  const half = Math.floor(REVIEW_COMMENTS.length / 2);
  const commentPool = pairPosition === 0 ? REVIEW_COMMENTS.slice(0, half) : REVIEW_COMMENTS.slice(half);

  const reviewCount = 3 + (index % half); // varies per provider, never exceeds the pool size
  for (let i = 0; i < reviewCount; i++) {
    const customer = customers[(i + index * 3) % customers.length];
    await Review.create({
      user: customer._id,
      provider: provider._id,
      rating: 4 + ((i + index) % 2), // mostly alternates 4 and 5
      comment: commentPool[i % commentPool.length],
      status: "approved",
    });
  }
}

async function seedDemoData() {
  console.log("Seeding services...");
  for (const cat of CATEGORIES) {
    for (const svc of cat.services) {
      await upsertService(cat.name, svc);
    }
  }
  const serviceCount = await Service.countDocuments();
  console.log(`Services in DB: ${serviceCount}`);

  console.log("Seeding customers...");
  const customers = [];
  for (let i = 0; i < CUSTOMERS.length; i++) {
    const fullName = CUSTOMERS[i];
    const email = `${fullName.toLowerCase().replace(/\s+/g, ".")}@homecare360.demo`;
    const phone = `55${String(2000000 + i).slice(-7)}`;
    const user = await upsertUser({ fullName, email, phone, role: "user" });
    customers.push(user);
  }
  console.log(`Customers in DB (seeded): ${customers.length}`);

  console.log("Seeding providers...");
  const providers = [];
  for (let i = 0; i < PROVIDERS.length; i++) {
    const provider = await upsertProvider(PROVIDERS[i], i);
    providers.push(provider);
  }
  console.log(`Providers in DB (seeded): ${providers.length}`);

  console.log("Seeding reviews...");
  // Clear out reviews from a prior run of this script for these exact demo
  // providers (identified by _id) before regenerating, so a fix to the
  // generation logic actually takes effect instead of being skipped by the
  // "already has reviews" guard below. Never touches reviews outside this set.
  await Review.deleteMany({ provider: { $in: providers.map((p) => p._id) } });
  for (let i = 0; i < providers.length; i++) {
    await seedReviewsForProvider(providers[i], customers, i);
  }
  const reviewCount = await Review.countDocuments();
  console.log(`Reviews in DB: ${reviewCount}`);

  console.log(`\nAll seeded accounts use the password: ${DEMO_PASSWORD}`);
}

module.exports = seedDemoData;
