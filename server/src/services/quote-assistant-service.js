const Service = require("../models/service");

let Anthropic = null;
try {
  Anthropic = require("@anthropic-ai/sdk");
} catch {
  // Optional dependency — the mock path below works without it.
}

let Groq = null;
try {
  Groq = require("groq-sdk");
} catch {
  // Optional dependency — the mock path below works without it.
}

const PROPERTY_TYPE_KEYWORDS = {
  villa: ["villa", "bungalow", "independent house"],
  apartment: ["apartment", "flat", "studio apartment"],
  office: ["office", "commercial", "shop"],
};
const PROPERTY_TYPE_MULTIPLIER = { apartment: 1, villa: 1.4, office: 1.2 };

const SIZE_KEYWORDS = {
  studio: ["studio"],
  "1bhk": ["1 bed", "1bhk", "1 bedroom", "one bedroom", "1br"],
  "2bhk": ["2 bed", "2bhk", "2 bedroom", "two bedroom", "2br"],
  "3bhk+": ["3 bed", "3bhk", "3 bedroom", "three bedroom", "3br", "4 bed", "large"],
};
const SIZE_MULTIPLIER = { studio: 0.75, "1bhk": 1, "2bhk": 1.3, "3bhk+": 1.7 };

const URGENCY_KEYWORDS = {
  today: ["today", "asap", "urgent", "now", "right away", "same day", "same-day"],
  "this-week": ["this week", "few days", "soon"],
};
const URGENCY_MULTIPLIER = { flexible: 1, "this-week": 1.1, today: 1.3 };

const SERVICE_SYNONYMS = {
  clean: "cleaning",
  plumb: "plumbing",
  electric: "electrical",
  paint: "painting",
  pest: "pest control",
  carpen: "carpentry",
  ac: "ac",
  appliance: "appliance",
};

function extractSlots(text, services) {
  const lower = text.toLowerCase();

  let service = services.find((s) => lower.includes(s.name.toLowerCase())) || null;
  if (!service) {
    for (const [keyword, category] of Object.entries(SERVICE_SYNONYMS)) {
      if (lower.includes(keyword)) {
        service = services.find((s) => s.name.toLowerCase().includes(category)) || null;
        if (service) break;
      }
    }
  }

  let propertyType = null;
  for (const [type, keywords] of Object.entries(PROPERTY_TYPE_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) {
      propertyType = type;
      break;
    }
  }

  let propertySize = null;
  for (const [size, keywords] of Object.entries(SIZE_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) {
      propertySize = size;
      break;
    }
  }

  let urgency = null;
  for (const [level, keywords] of Object.entries(URGENCY_KEYWORDS)) {
    if (keywords.some((k) => lower.includes(k))) {
      urgency = level;
      break;
    }
  }

  return { service, propertyType, propertySize, urgency };
}

function suggestAddOns(serviceName) {
  const name = serviceName.toLowerCase();
  if (name.includes("clean")) return ["Inside fridge cleaning", "Balcony deep clean"];
  if (name.includes("plumb")) return ["Drain unblocking", "Water heater check"];
  if (name.includes("electric")) return ["MCB / circuit breaker check", "Light fixture fitting"];
  if (name.includes("paint")) return ["Ceiling painting", "Premium primer coat"];
  if (name.includes("pest")) return ["Termite control", "Rodent control"];
  if (name.includes("carpen")) return ["Wood polish / finishing", "Hardware replacement"];
  if (name.includes("ac") || name.includes("appliance")) return ["Deep coil cleaning", "Gas top-up"];
  return [];
}

function mockChat(slots, services) {
  if (!slots.service) {
    return {
      reply: `Sure — which service do you need? We offer ${services.map((s) => s.name).join(", ")}.`,
      quote: null,
    };
  }

  if (!slots.propertySize) {
    return {
      reply: `Got it — ${slots.service.name}. What size is your property? Studio, 1-bedroom, 2-bedroom, or 3-bedroom+?`,
      quote: null,
    };
  }

  const propertyType = slots.propertyType || "apartment";
  const urgency = slots.urgency || "flexible";

  const propMult = PROPERTY_TYPE_MULTIPLIER[propertyType] ?? 1;
  const sizeMult = SIZE_MULTIPLIER[slots.propertySize] ?? 1;
  const urgMult = URGENCY_MULTIPLIER[urgency] ?? 1;

  const estimatedTotal = Math.round(slots.service.basePrice * propMult * sizeMult * urgMult);
  const addOnsSuggested = suggestAddOns(slots.service.name);

  return {
    reply:
      `Here's your estimate for ${slots.service.name} — a ${propertyType} (${slots.propertySize})` +
      `${urgency === "today" ? ", same-day" : ""}: approximately ${estimatedTotal} before VAT. ` +
      `Want me to add ${addOnsSuggested.join(" or ")}?`,
    quote: {
      service: slots.service.name,
      serviceId: slots.service._id,
      propertyType,
      propertySize: slots.propertySize,
      urgency,
      estimatedTotal,
      addOnsSuggested,
    },
  };
}

function buildSystemPrompt(services) {
  const catalog = services.map((s) => `${s.name} (base price ${s.basePrice} INR)`).join("; ");
  return (
    `You are a friendly home-services quote assistant for HomeCare360, a Gulf-market home services marketplace. ` +
    `Available services: ${catalog}. ` +
    `Ask short follow-up questions until you know the service, property type, and property size. Once you know enough, ` +
    `respond ONLY with a JSON object (no prose, no markdown fences) of the shape: ` +
    `{"reply": string, "quote": null | {"service": string, "propertyType": string, "propertySize": string, "urgency": string, "estimatedTotal": number, "addOnsSuggested": string[]}}. ` +
    `estimatedTotal must be a realistic INR number derived from the service's base price.`
  );
}

function parseModelJson(raw) {
  const cleaned = (raw || "{}").trim().replace(/^```json\s*|^```\s*|```$/g, "");
  return JSON.parse(cleaned);
}

async function anthropicChat(messages, services) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 500,
    system: buildSystemPrompt(services),
    messages: messages.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
  });

  return parseModelJson(response.content?.[0]?.text);
}

async function groqChat(messages, services) {
  const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await client.chat.completions.create({
    model: "openai/gpt-oss-120b",
    max_tokens: 500,
    messages: [
      { role: "system", content: buildSystemPrompt(services) },
      ...messages.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content })),
    ],
  });

  return parseModelJson(completion.choices?.[0]?.message?.content);
}

exports.chat = async ({ messages }) => {
  const services = await Service.find({ isEnabled: true });
  const conversation = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" \n ");
  const slots = extractSlots(conversation, services);

  if (process.env.GROQ_API_KEY && Groq) {
    try {
      return await groqChat(messages, services);
    } catch (err) {
      console.error("[quote-assistant] Groq call failed, falling back:", err.message);
    }
  }

  if (process.env.ANTHROPIC_API_KEY && Anthropic) {
    try {
      return await anthropicChat(messages, services);
    } catch (err) {
      console.error("[quote-assistant] Anthropic call failed, falling back to mock:", err.message);
    }
  }

  return mockChat(slots, services);
};
