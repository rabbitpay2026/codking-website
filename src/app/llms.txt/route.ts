import { externalLinks, whatsappDisplayNumber } from "@/constants/external";
import { routeFor, routes } from "@/constants/routes";
import { siteConfig } from "@/constants/site";
import {
  getAboutHelp,
  getAboutHero,
  getAboutMission,
  getAboutProblem,
  getAboutReasons,
  getCalculatorFieldsByGroup,
  getCalculatorKnowledge,
  getCalculatorPresets,
  getContactAssurances,
  getContactChannels,
  getContactHeroCopy,
  getContactWhatsApp,
  getControlBySlug,
  getControlDossiers,
  getControls,
  getDocumentationScope,
  getFaqPageCategories,
  getFaqPageCopy,
  getFaqPageFacts,
  getFaqsByIds,
  getFeatureCombinations,
  getHowItWorksSteps,
  getIntegrationsByCategory,
  getInterventionPoints,
  getMerchantProblems,
  getOrderStages,
  getPlanFeatureValue,
  getPlanForControl,
  getPricingAssurances,
  getPricingFeatures,
  getPricingPlans,
  getProductOverview,
  getQuestionRoutes,
  getResolvedCalculatorPathways,
} from "@/lib/content";
import { formatPlanPrice } from "@/utils/price";
import { absoluteUrl } from "@/utils/url";

import type {
  ControlDossier,
  ControlSlug,
  FaqItem,
  QuestionTarget,
} from "@/types";

import type { Route } from "next";

/**
 * `/llms.txt` — the AI-readable knowledge resource for this site (§13).
 *
 * ## What this file is for
 *
 * An assistant answering a merchant's question about cash on delivery needs
 * three things: enough depth to describe COD King without guessing, enough
 * structure to tell two similar controls apart, and the canonical URL of the
 * page that is authoritative for the question. This file is written to provide
 * all three. It is long on purpose — a knowledge resource, not a navigation
 * menu — while still stopping short of reproducing the pages themselves.
 *
 * ## Where the content comes from
 *
 * Almost none of it is written in this route. Control names, outcome lines,
 * benefits, hero checklists, flow rails, capability grids, audience segments,
 * demo points and configuration notes are read from the same content modules
 * the six feature pages render. Plans, prices, per-plan control access and
 * every value pill come from `src/data/pricing.ts`. Questions and answers come
 * from the tagged FAQ pool. Inputs, presets and pathways come from the
 * calculator's own definitions. Routes come from the route registry, and the
 * external destinations from `constants/external.ts`.
 *
 * `src/data/knowledge.ts` adds the layer no rendered page needs and which
 * therefore exists nowhere else: the long-form product and control
 * explanations, the merchant problems, the configuration options gathered into
 * one list per control, the reason each audience benefits, the search
 * vocabulary, the differences between controls that are easily confused, the
 * feature combinations, and the question-to-page routing table.
 *
 * The consequence worth stating: a price change, a renamed control, a new FAQ
 * question or a reworded capability updates this file by itself. Adding a
 * seventh feature page means adding its knowledge entry and one row in
 * `PAGE_CONTENT`, and changing nothing in this route.
 *
 * ## What is deliberately absent
 *
 * No percentages, merchant counts, ratings, review counts, recovery rates or
 * conversion figures. Some are published on the site, and two of the feature
 * pages' outcome bands are flagged in this repository as having no source (see
 * `otpOutcomes` and `partialOutcomes`) — so the bands are rendered without
 * their `value` field, keeping the qualitative statement and dropping the
 * unsourced number. The single figure that survives is the product's own "15+
 * parameters" for COD Show/Hide, which is a count of a capability rather than
 * a claim about a result. Published terms of the offer — trial length, setup
 * time, theme compatibility, country coverage, plan prices and rates — are
 * included, because those are terms rather than performance claims.
 *
 * Placeholder routes are absent for the same reason they are absent from the
 * sitemap: Customers, Integrations, the Resources hub and its children, and
 * the legal documents in review are all `noIndex`. The four controls without a
 * dedicated page are named where the product names them — in the ecosystem
 * list and on the plans — but never linked, because they have no canonical
 * page to link to. The redirected paths `/features/prepaid-nudge` and
 * `/features/cod-rules` are addresses, not destinations, and never appear.
 *
 * ## Section order
 *
 * Overview, problems, mechanism, ecosystem, the six controls in depth, how
 * they combine, the calculator, pricing, questions, and then the reference
 * sections. It is the order a reader needs them in: what the product is,
 * before what it does, before which page says so.
 */

/* -------------------------------------------------------------------------- */
/* Small helpers                                                              */
/* -------------------------------------------------------------------------- */

/** "A, B and C" — the names of a repository list, written as a sentence. */
function joinList(names: readonly string[]): string {
  if (names.length < 2) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function url(path: Route): string {
  return absoluteUrl(path);
}

function controlUrl(slug: ControlSlug): string {
  return url(routeFor.control(slug));
}

/** The name this site publishes a control under, both of them where it has two. */
function controlLabel(slug: ControlSlug): string {
  const control = getControlBySlug(slug);
  if (!control) return "";
  return control.alias ? `${control.name} (${control.alias})` : control.name;
}

function heading(level: number, text: string): string {
  return `${"#".repeat(level)} ${text}`;
}

function bullets(lines: readonly string[]): readonly string[] {
  return lines.map((line) => `- ${line}`);
}

/** A labelled paragraph, e.g. "**Problem:** …". */
function field(label: string, value: string): string {
  return `**${label}:** ${value}`;
}

/** Paragraphs, separated by the blank line Markdown needs between them. */
function paragraphs(items: readonly string[]): readonly string[] {
  return items.flatMap((item) => [item, ""]).slice(0, -1);
}

/** A block with a heading, blank line, body, and a trailing blank line. */
function block(
  title: string,
  level: number,
  body: readonly string[],
): readonly string[] {
  if (body.length === 0) return [];
  return [heading(level, title), "", ...body, ""];
}

/**
 * A question and its answer, as one bullet.
 *
 * The question is the half a merchant actually asked, and an answer beginning
 * "Yes." says nothing without it — so the pair always travels together.
 */
function questionBullet(item: FaqItem): string {
  return `- **${item.question}** ${item.answer}`;
}

/**
 * The questions the Pricing section answers in full.
 *
 * Declared once and read twice — by the Pricing section that renders them, and
 * by the FAQ section that must not render them a second time. Two lists would
 * be two lists that drift, and the drift shows up as the same six answers
 * printed twice in a document whose whole claim is that nothing is repeated.
 */
const BILLING_QUESTION_IDS = [
  "free-trial",
  "billing",
  "plan-change",
  "order-limit",
  "free-plan-charges",
  "which-plan",
] as const;

/* -------------------------------------------------------------------------- */
/* Sections                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * The opening: the product, the platform, the merchant, the economics and the
 * shape of the system, followed by the published terms of the offer.
 */
function overview(): readonly string[] {
  const [definition, audience] = getFaqsByIds([
    "what-is-cod-king",
    "who-is-it-for",
  ]);

  return [
    heading(2, "Product Overview"),
    "",
    ...paragraphs([...getProductOverview()]),
    "",
    ...(definition
      ? [field("In the product's own words", definition.answer), ""]
      : []),
    ...(audience ? [field("Who it is for", audience.answer), ""] : []),
    "Published terms of the offer:",
    "",
    ...bullets(
      getFaqPageFacts().map(({ label, value }) => `${label}: ${value}.`),
    ),
    "",
    "Canonical entry points:",
    "",
    ...bullets([
      `Product home — ${url(routes.home)}`,
      `All features — ${url(routes.features)}`,
      `COD Calculator — ${url(routes.codCalculator)}`,
      `Pricing — ${url(routes.pricing)}`,
      `FAQ — ${url(routes.faq)}`,
      ...(externalLinks.docs ? [`Documentation — ${externalLinks.docs}`] : []),
      ...(externalLinks.install
        ? [`Shopify App Store listing — ${externalLinks.install}`]
        : []),
    ]),
  ];
}

/**
 * The merchant problems, each one explained at the length it deserves and
 * routed to the controls that act on it.
 *
 * The homepage's own pain-point cards close the section: they are the same
 * problems in the shortest form the product states them, and each already
 * names its control, so they cost four lines and add the product's own phrasing
 * alongside this file's longer one.
 */
function problems(): readonly string[] {
  /* Which controls have a page to link to, resolved once rather than per row. */
  const published = new Set(
    getControlDossiers().map((dossier) => dossier.control.slug),
  );

  const problemBlocks = getMerchantProblems().flatMap((problem) => {
    const names = problem.controlSlugs
      .map((slug) => {
        const label = controlLabel(slug);
        return published.has(slug) ? `${label} — ${controlUrl(slug)}` : label;
      })
      .filter(Boolean);

    return [
      heading(3, problem.title),
      "",
      field("Problem", problem.problem),
      "",
      field("Why it matters", problem.whyItMatters),
      "",
      field("How COD King addresses it", problem.howAddressed),
      "",
      field("Example merchant scenario", problem.scenario),
      "",
      "**Relevant features:**",
      "",
      ...bullets(names),
      "",
    ];
  });

  return [
    heading(2, "What COD King Helps Merchants Solve"),
    "",
    "Seven problems, each one a reason a merchant installs the app. Every problem names the controls that act on it, with the canonical URL of each control that has a page.",
    "",
    ...problemBlocks,
  ];
}

/**
 * How the product works as a mechanism: the points at which it can act, the
 * stage model underneath them, and what installing it actually involves.
 */
function mechanism(): readonly string[] {
  const points = getInterventionPoints().flatMap((point) => {
    const names = point.controlSlugs
      .map((slug) => controlLabel(slug))
      .filter(Boolean);

    return [
      heading(3, point.title),
      "",
      point.body,
      "",
      `Controls: ${joinList(names)}.`,
      "",
    ];
  });

  return [
    heading(2, "How COD King Works"),
    "",
    "COD King intervenes at seven points in the life of a cash-on-delivery order. A merchant switches on only the ones they need, and each is configured from the COD King dashboard rather than from the theme.",
    "",
    ...points,
    heading(3, "The order stages the product is organised around"),
    "",
    "The controls are grouped by when they act, and the grouping is the product's own — it decides the navigation, the features index and the way the app itself is organised.",
    "",
    ...bullets(
      getOrderStages().map((stage) => `**${stage.label}** — ${stage.problem}`),
    ),
    "",
    heading(3, "What installing it involves"),
    "",
    ...bullets(
      getHowItWorksSteps().map((step) => `**${step.title}** — ${step.body}`),
    ),
  ];
}

/**
 * The full control set, published pages and all.
 *
 * Ten controls, read from the controls repository, with the stage each acts
 * at, the plan that unlocks it and — for the six that have one — the canonical
 * URL of its page. The four without a page are named rather than hidden: they
 * are on the plans a merchant is buying, and an assistant that has never heard
 * of them will guess when asked.
 *
 * The messaging providers close the section, because "which SMS provider can I
 * use" is a real merchant question and the integrations repository is the only
 * place this site answers it. `/integrations` is still a placeholder, so the
 * providers are named without a link to it.
 */
function ecosystem(): readonly string[] {
  const published = new Set(
    getControlDossiers().map((dossier) => dossier.control.slug),
  );

  const rows = getControls().map((control) => {
    const stage = getOrderStages().find((item) => item.id === control.stage);
    const plan = getPlanForControl(control.slug);
    const name = control.alias
      ? `${control.name} / ${control.alias}`
      : control.name;

    const parts = [
      `**${name}** — ${control.outcome}`,
      stage ? `Stage: ${stage.label}.` : "",
      plan ? `Plan: ${plan.name} and above.` : "",
      published.has(control.slug)
        ? `Page: ${controlUrl(control.slug)}`
        : "No dedicated page yet.",
    ].filter(Boolean);

    return parts.join(" ");
  });

  const gateways = getIntegrationsByCategory("sms-gateway").map(
    (integration) => integration.name,
  );

  return [
    heading(2, "COD King Product Ecosystem"),
    "",
    "The product publishes ten controls. Six have a full feature page and are documented in depth in the next section; the other four are part of the app and appear on the plans, but have no page of their own yet and are therefore named here without a link.",
    "",
    ...bullets(rows),
    "",
    heading(3, "Messaging"),
    "",
    "OTP verification, order notifications, prepaid reminders and cart-recovery messages all reach the buyer over SMS or WhatsApp. Messages are charged per message on every plan; the Professional and Enterprise plans earn a discount on notification rates, and a store can connect its own regional provider and pay that provider directly in local currency instead.",
    "",
    `Supported SMS gateways named by the product: ${joinList(gateways)}.`,
  ];
}

/* -------------------------------------------------------------------------- */
/* One control                                                                */
/* -------------------------------------------------------------------------- */

/**
 * One control, in the same order for all six.
 *
 * Overview, the problem, the workflow, the behaviour at checkout, the
 * capabilities, the configuration, the use cases, the audience, the plan, the
 * vocabulary, the related controls, the distinctions, the questions, and the
 * canonical URL. The order is fixed so an assistant comparing two controls is
 * comparing the same fields in the same sequence.
 *
 * The outcomes band is rendered without its `value`. Four of the six bands are
 * qualitative and two carry percentages this repository flags as unsourced;
 * dropping the field for all six keeps the section consistent and keeps the
 * unsourced figures out of a document that gets quoted verbatim.
 */
function control(dossier: ControlDossier): readonly string[] {
  const { control: record, knowledge, plan } = dossier;
  const title = record.alias ? `${record.name} / ${record.alias}` : record.name;

  const planAvailability = (): readonly string[] => {
    if (!plan) return [];

    const { amount, period } = formatPlanPrice(plan.price);
    const higher = getPricingPlans()
      .slice(getPricingPlans().findIndex((item) => item.id === plan.id) + 1)
      .map((item) => item.name);

    /*
      This control's rows of the comparison matrix, across every plan.

      The rows are named by the knowledge entry rather than matched against the
      control's name: the matrix calls `cod-show-hide` "Show / Hide COD Rules"
      and the controls repository calls it "COD Rules", and `partial-payment`
      is a row about a per-order rate rather than about the control's name at
      all. Matching on the label drops both, silently.
    */
    const matrixRows = (knowledge.planFeatureIds ?? []).flatMap((featureId) => {
      const feature = getPricingFeatures().find(
        (candidate) => candidate.id === featureId,
      );
      if (!feature) return [];

      const cells = getPricingPlans().map((item) => {
        const value = getPlanFeatureValue(featureId, item.id);
        const rendered =
          value === true
            ? "included"
            : value === false
              ? "not included"
              : value;
        return `${item.name}: ${rendered}`;
      });

      return [`**${feature.label}** — ${cells.join("; ")}.`];
    });

    return [
      `Included from the **${plan.name}** plan (${amount}${period ?? ""})${
        higher.length > 0 ? `, and on ${joinList(higher)}` : ""
      }. Every plan includes a 7-day free trial and requires no credit card.`,
      ...(matrixRows.length > 0 ? ["", ...bullets(matrixRows)] : []),
    ];
  };

  return [
    heading(3, title),
    "",
    `Canonical URL: ${controlUrl(record.slug)}`,
    "",
    field("One line", record.outcome),
    "",
    ...block("Overview", 4, paragraphs([...knowledge.overview])),
    ...block(
      "The Merchant Problem",
      4,
      paragraphs([...knowledge.problemDetail]),
    ),
    ...block("How It Works", 4, [
      dossier.summary,
      "",
      ...dossier.steps.map(
        (step, index) => `${index + 1}. **${step.title}** — ${step.body}`,
      ),
      ...(dossier.result ? ["", field("In one line", dossier.result)] : []),
    ]),
    ...block("Detailed Behaviour", 4, paragraphs([...knowledge.behaviour])),
    ...block(
      "What It Changes For The Merchant",
      4,
      bullets(
        dossier.outcomes.map(
          (outcome) => `**${outcome.title}** — ${outcome.body}`,
        ),
      ),
    ),
    ...block(
      "Capabilities",
      4,
      bullets(
        dossier.capabilities.map(
          (capability) => `**${capability.title}** — ${capability.body}`,
        ),
      ),
    ),
    ...block(
      "At A Glance",
      4,
      bullets(dossier.checkpoints.map((checkpoint) => checkpoint.label)),
    ),
    ...block("Configuration, Rules And Options", 4, [
      ...bullets(
        knowledge.configuration.map(
          (option) => `**${option.option}** — ${option.detail}`,
        ),
      ),
      ...(dossier.configurationNote ? ["", dossier.configurationNote] : []),
    ]),
    ...block("Merchant Use Cases", 4, bullets([...knowledge.useCases])),
    ...block(
      "Best Suited For",
      4,
      bullets(
        dossier.audience.map((segment) => {
          const name = segment.note
            ? `${segment.title} (${segment.note})`
            : segment.title;
          const reason = knowledge.audienceReasons[segment.id];
          return reason ? `**${name}** — ${reason}` : `**${name}**`;
        }),
      ),
    ),
    ...block("Plan Availability", 4, planAvailability()),
    ...block("Product Terminology", 4, [
      `Merchants search for this control using terms such as ${joinList(
        knowledge.terminology.map((term) => `"${term}"`),
      )}.`,
    ]),
    ...block(
      "What The Product Demonstration Shows",
      4,
      bullets(dossier.demoPoints.map((point) => point.label)),
    ),
    ...block(
      "Related Features",
      4,
      knowledge.related.flatMap((relation) => [
        `- **${controlLabel(relation.slug)}** — ${controlUrl(relation.slug)}`,
        `  - Why related: ${relation.reason}`,
        `  - When to use both: ${relation.whenBoth}`,
      ]),
    ),
    ...block(
      "Differences From Related Features",
      4,
      bullets(
        knowledge.differences.map(
          (difference) =>
            `**${record.name} vs ${controlLabel(difference.slug)}** — ${difference.distinction}`,
        ),
      ),
    ),
    ...block(
      "Common Questions",
      4,
      dossier.questions.map((item) => questionBullet(item)),
    ),
    `Official resource for ${title}: ${controlUrl(record.slug)}`,
  ];
}

function controls(): readonly string[] {
  return [
    heading(2, "Core Features"),
    "",
    "The six controls with a dedicated page, in the order the product groups them: before the order is placed, at the order, and after it. Each is switched on independently, and each is configured from the COD King dashboard.",
    "",
    ...getControlDossiers().flatMap((dossier) => [...control(dossier), ""]),
  ].slice(0, -1);
}

/** The combinations, and what each control contributes to one. */
function combinations(): readonly string[] {
  const entries = getFeatureCombinations().flatMap((combination) => {
    const contributions = combination.controlSlugs.flatMap((slug) => {
      const contribution = combination.contributions[slug];
      if (!contribution) return [];
      return [
        `- **${controlLabel(slug)}** (${controlUrl(slug)}) — ${contribution}`,
      ];
    });

    return [
      heading(3, combination.title),
      "",
      field("Merchant problem", combination.problem),
      "",
      field("Why they complement each other", combination.complement),
      "",
      "**What each contributes:**",
      "",
      ...contributions,
      "",
      /* No trailing full stop: a period fused to the last URL is a period some
         parsers keep, and a link that 404s on a stray dot is worse than a
         sentence that does not end in one. */
      `Authoritative pages: ${combination.controlSlugs
        .map((slug) => controlUrl(slug))
        .join(" | ")}`,
      "",
    ];
  });

  return [
    heading(2, "How the Features Work Together"),
    "",
    "The controls are independent switches rather than an integrated pipeline — none of them depends on another being on. What follows are the combinations the product's own content supports, and the merchant problem each pairing is run against.",
    "",
    ...entries,
  ];
}

/**
 * The calculator, described as what the route actually renders.
 *
 * The inputs, the risk profiles and the pathways are read from the
 * calculator's own definitions, so this section cannot describe a form the
 * page does not show. `notCalculated` is rendered as prominently as the rest:
 * `calculatorDefinitions` names three tools for this page and only the savings
 * model exists today.
 */
function calculator(): readonly string[] {
  const knowledge = getCalculatorKnowledge();

  const inputGroup = (
    group: "business" | "costs" | "assumptions",
  ): readonly string[] =>
    getCalculatorFieldsByGroup(group).map(
      (fieldDefinition) =>
        `**${fieldDefinition.label}** — ${fieldDefinition.hint}`,
    );

  return [
    heading(2, "COD Calculator"),
    "",
    `Canonical URL: ${url(routes.codCalculator)}`,
    "",
    ...paragraphs([...knowledge.purpose]),
    "",
    ...block("Intended For", 3, bullets([...knowledge.intendedFor])),
    ...block(
      "Inputs: The Merchant's Business",
      3,
      bullets(inputGroup("business")),
    ),
    ...block("Inputs: The Merchant's Costs", 3, bullets(inputGroup("costs"))),
    ...block("Inputs: Improvement Assumptions", 3, [
      ...bullets(inputGroup("assumptions")),
      "",
      "These three are inputs the merchant sets, not claims the product makes. The page ships with a cautious middle setting for each, and every figure that depends on them is labelled an estimate.",
    ]),
    ...block("Starting Risk Profiles", 3, [
      ...bullets(
        getCalculatorPresets().map(
          (preset) => `**${preset.label}** — ${preset.description}`,
        ),
      ),
      "",
      "A merchant who does not know their RTO rate off-hand can pick the profile that sounds like their store and correct it afterwards. A profile changes only the behaviour rates, so the order count and order value already entered are kept.",
    ]),
    ...block("How The Model Works", 3, bullets([...knowledge.method])),
    ...block("What It Returns", 3, bullets([...knowledge.outputs])),
    ...block(
      "Where It Points Next",
      3,
      bullets(
        getResolvedCalculatorPathways().map(
          (pathway) =>
            `**${pathway.title}** — ${pathway.problem} ${pathway.explanation} See ${pathway.controlName}: ${controlUrl(pathway.controlSlug)}`,
        ),
      ),
    ),
    ...block("Questions It Answers", 3, bullets([...knowledge.questions])),
    ...block("What It Does Not Do", 3, bullets([...knowledge.notCalculated])),
  ];
}

/**
 * The plans, read from the pricing repository.
 *
 * Each plan prints the controls it unlocks and its own highlight list, with
 * every value pill resolved through `getPlanFeatureValue` — so a rate quoted
 * here is the same declaration the comparison table prints. The full matrix
 * follows, because "which plan has X" is one of the most common questions an
 * assistant is asked about a Shopify app, and a matrix answers it in one pass.
 */
function pricing(): readonly string[] {
  const planBlocks = getPricingPlans().flatMap((plan) => {
    const { amount, period } = formatPlanPrice(plan.price);
    const controlNames = plan.controlSlugs
      .map((slug) => controlLabel(slug))
      .filter(Boolean);

    const highlights = plan.highlights.map((highlight) => {
      if (!highlight.showValue || !highlight.feature) return highlight.label;
      const value = getPlanFeatureValue(highlight.feature, plan.id);
      return typeof value === "string"
        ? `${highlight.label}: ${value}`
        : highlight.label;
    });

    const fit = plan.recommended ? " Recommended by the product." : "";

    return [
      heading(3, `${plan.name} — ${amount}${period ?? ""}`),
      "",
      `${plan.tagline}.${fit}`,
      "",
      ...(controlNames.length > 0
        ? [`Controls unlocked at this tier: ${joinList(controlNames)}.`, ""]
        : []),
      "**Included:**",
      "",
      ...bullets(highlights),
      "",
    ];
  });

  const matrix = getPricingFeatures().map((feature) => {
    const cells = getPricingPlans().map((plan) => {
      const value = getPlanFeatureValue(feature.id, plan.id);
      const rendered =
        value === true ? "included" : value === false ? "not included" : value;
      return `${plan.name}: ${rendered}`;
    });

    return `**${feature.label}** — ${cells.join("; ")}.`;
  });

  const billingItems = getFaqsByIds([...BILLING_QUESTION_IDS]);

  return [
    heading(2, "Pricing and Plans"),
    "",
    `Canonical URL: ${url(routes.pricing)}`,
    "",
    "Three plans. Each tier includes everything in the one below it, every plan handles unlimited orders, and every plan comes with a 7-day free trial that requires no credit card. Messaging is charged per message on all plans.",
    "",
    ...planBlocks,
    ...block("Feature Availability By Plan", 3, bullets(matrix)),
    ...block("Which Plan A Merchant Needs", 3, [
      ...bullets(
        getControlDossiers().flatMap((dossier) =>
          dossier.plan
            ? [`**${dossier.control.name}** — ${dossier.plan.name} and above.`]
            : [],
        ),
      ),
    ]),
    ...block("Billing, Trial And Changing Plans", 3, [
      ...billingItems.map((item) => questionBullet(item)),
      ...bullets(getPricingAssurances().map((assurance) => `${assurance}.`)),
    ]),
  ];
}

/**
 * The FAQ page, in full — minus the answers already given under a control.
 *
 * Every question the FAQ page asks is listed under the category it belongs to.
 * A question whose answer already appears verbatim in a control's "Common
 * questions" block is listed with a pointer to that control rather than
 * repeated: the same words twice in one document is the definition of the
 * duplication this file is meant to avoid, and the pointer preserves the
 * category's completeness either way.
 */
function faq(): readonly string[] {
  const answeredAbove = new Map<string, { name: string; href: string }>();
  for (const dossier of getControlDossiers()) {
    for (const item of dossier.questions) {
      answeredAbove.set(item.id, {
        name: dossier.control.name,
        href: controlUrl(dossier.control.slug),
      });
    }
  }
  /* The billing set is answered in full under Pricing, which is above this
     section, so those questions cross-reference it for the same reason the
     control questions cross-reference their control. */
  for (const id of BILLING_QUESTION_IDS) {
    answeredAbove.set(id, {
      name: "Pricing and Plans",
      href: url(routes.pricing),
    });
  }

  const categories = getFaqPageCategories().flatMap((category) => [
    heading(3, category.title),
    "",
    category.description,
    "",
    ...category.items.map(({ faq: item }) => {
      const under = answeredAbove.get(item.id);
      /*
        A pointer rather than the answer again, and the pointer carries the
        control's URL so the line still routes even though it does not answer.
        The answer is written once, in the control block that owns it.
      */
      return under
        ? `- **${item.question}** Answered in full under ${under.name} above — ${under.href}`
        : questionBullet(item);
    }),
    "",
  ]);

  return [
    heading(2, "Frequently Asked Questions"),
    "",
    `Canonical URL: ${url(routes.faq)}`,
    "",
    getFaqPageCopy().description,
    "",
    "Every question the FAQ page asks is listed below, under the topic it belongs to. Each answer is written once, in the most specific place this document has for it: questions about a single control are answered in full inside that control's section above, and questions about plans and billing inside Pricing and Plans. Entries here that carry a cross-reference name that section and its canonical URL; every other entry carries its full answer.",
    "",
    ...categories,
  ];
}

function documentation(): readonly string[] {
  const scope = getDocumentationScope();

  if (!externalLinks.docs) return [];

  return [
    heading(2, "Documentation"),
    "",
    `Canonical URL: ${externalLinks.docs}`,
    "",
    scope.summary,
    "",
    "Treat the documentation, rather than this site, as the authoritative source for:",
    "",
    ...bullets([...scope.authoritativeFor]),
    "",
    "The feature pages describe what a control does and why; the documentation describes how to set it up.",
    "",
    scope.notCoveredHere,
  ];
}

/** The About page, at the length its own content supports. */
function about(): readonly string[] {
  const mission = getAboutMission();
  const problem = getAboutProblem();
  const help = getAboutHelp();
  const reasons = getAboutReasons();

  return [
    heading(2, "About COD King"),
    "",
    `Canonical URL: ${url(routes.about)}`,
    "",
    getAboutHero().description,
    "",
    ...block("What The Product Does", 3, [
      mission.copy.description,
      "",
      ...bullets(
        mission.points.map((point) => `**${point.title}** — ${point.body}`),
      ),
    ]),
    ...block("The Problem It Exists For", 3, [
      problem.copy.description,
      "",
      ...bullets(
        problem.points.map((point) => `**${point.title}** — ${point.body}`),
      ),
    ]),
    ...block("How Each Problem Is Answered", 3, [
      help.copy.description,
      "",
      ...bullets(
        help.points.map((point) => `**${point.title}** — ${point.body}`),
      ),
    ]),
    ...block("Why Merchants Choose It", 3, [
      reasons.copy.description,
      "",
      ...bullets(
        reasons.points.map((point) => `**${point.title}** — ${point.body}`),
      ),
    ]),
  ];
}

function company(): readonly string[] {
  const whatsapp = getContactWhatsApp();
  const [support] = getFaqsByIds(["support"]);

  return [
    heading(2, "Contact COD King"),
    "",
    `Canonical URL: ${url(routes.contact)}`,
    "",
    getContactHeroCopy().description,
    "",
    "**Channels:**",
    "",
    ...bullets([
      ...(whatsapp
        ? [`**WhatsApp** (${whatsappDisplayNumber}) — ${whatsapp.body}`]
        : []),
      ...getContactChannels().map(
        (channel) => `**${channel.title}** — ${channel.body}`,
      ),
      "**Contact form** — name, phone number, optional email and the store's Shopify URL.",
    ]),
    "",
    ...(support ? [field("Support", support.answer), ""] : []),
    ...bullets(getContactAssurances().map((assurance) => `${assurance}.`)),
  ];
}

function shopify(): readonly string[] {
  if (!externalLinks.install) return [];

  return [
    heading(2, "Shopify App Store"),
    "",
    `Canonical URL: ${externalLinks.install}`,
    "",
    "The official COD King listing on the Shopify App Store, and the only place the app is installed from. COD King runs inside the Shopify checkout a merchant already has: it works with all Shopify themes, requires no theme edits, no code and no developer, and setup takes under ten minutes. Plans are billed through Shopify and appear as a line item on the store's regular Shopify invoice.",
  ];
}

function blog(): readonly string[] {
  if (!externalLinks.blog) return [];

  return [
    heading(2, "Blog"),
    "",
    `Canonical URL: ${externalLinks.blog}`,
    "",
    "Product updates and news, newest first. Hosted separately from this site, and the authoritative place for what has shipped recently rather than for how a control is configured.",
  ];
}

/**
 * The routing table: a merchant intent, and the page that owns it.
 *
 * The most directly useful section for an assistant, and the reason it is
 * last: everything above establishes what the pages contain, and this maps
 * questions onto them. Targets are declared as kinds in the knowledge data and
 * resolved here through the route registry, so a mapping cannot name a URL no
 * page answers to.
 */
function questionMap(): readonly string[] {
  const destination = (
    target: QuestionTarget,
  ): { readonly label: string; readonly href: string } | null => {
    switch (target.kind) {
      case "control": {
        const label = controlLabel(target.slug);
        return label ? { label, href: controlUrl(target.slug) } : null;
      }
      case "calculator":
        return { label: "COD Calculator", href: url(routes.codCalculator) };
      case "pricing":
        return { label: "Pricing", href: url(routes.pricing) };
      case "faq":
        return { label: "FAQ", href: url(routes.faq) };
      case "features":
        return { label: "Features", href: url(routes.features) };
      case "contact":
        return { label: "Contact", href: url(routes.contact) };
      case "about":
        return { label: "About", href: url(routes.about) };
      case "docs":
        return externalLinks.docs
          ? { label: "Documentation", href: externalLinks.docs }
          : null;
      case "install":
        return externalLinks.install
          ? { label: "Shopify App Store listing", href: externalLinks.install }
          : null;
    }
  };

  const entries = getQuestionRoutes().flatMap((route) => {
    const target = destination(route.target);
    if (!target) return [];

    return [
      `**Q: ${route.question}**`,
      "",
      `A: ${route.answer}`,
      "",
      `Authoritative page: ${target.label} — ${target.href}`,
      "",
    ];
  });

  return [
    heading(2, "Useful Merchant Questions and Page Mapping"),
    "",
    "Each question below is mapped to the single page that is authoritative for it. Where a question is about what a control does, the control's own feature page is authoritative; where it is about how to configure one, the documentation is.",
    "",
    ...entries,
  ];
}

/* -------------------------------------------------------------------------- */
/* Render                                                                     */
/* -------------------------------------------------------------------------- */

function render(): string {
  const sections: readonly (readonly string[])[] = [
    overview(),
    problems(),
    mechanism(),
    ecosystem(),
    controls(),
    combinations(),
    calculator(),
    pricing(),
    faq(),
    documentation(),
    about(),
    company(),
    shopify(),
    blog(),
    questionMap(),
  ];

  return [
    heading(1, siteConfig.name),
    "",
    `> ${siteConfig.description}`,
    "",
    "This file is a knowledge resource for AI and search systems. It describes what COD King is, what each control does, how the controls work together, what each plan includes, and which page on codking.tech is authoritative for a given merchant question. Every URL below is a canonical, published page.",
    "",
    ...sections
      .filter((section) => section.length > 0)
      .flatMap((section) => [...section, ""]),
  ]
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+$/, "\n");
}

export const dynamic = "force-static";

export function GET(): Response {
  return new Response(render(), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
