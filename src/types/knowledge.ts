/**
 * The shapes `/llms.txt` is assembled from (§13).
 *
 * `/llms.txt` is a knowledge resource for AI and answer engines: enough depth
 * to describe COD King accurately without guessing, and a canonical URL for
 * every question that has a page of its own. Most of what it needs already
 * exists — control records, feature-page copy, plan definitions, calculator
 * definitions and the tagged FAQ pool — and the route reads those directly.
 *
 * What these types model is the layer that exists nowhere else, because no
 * rendered page needs it: the long-form explanation of each control, the
 * conditions a merchant can configure it under, the problems the product is
 * bought to solve, the vocabulary merchants search under, how two controls
 * differ, and which page answers which question.
 *
 * Every field below is prose about something the site already publishes. None
 * of it may introduce a capability, a figure or a claim the repository cannot
 * support — see the note at the top of `src/data/knowledge.ts`.
 */
import type { Control, ControlSlug } from "./controls";
import type {
  AudienceSegment,
  FeatureCapability,
  FeatureCheckpoint,
  FeatureFlowStep,
  FeatureOutcome,
} from "./feature";
import type { FaqItem } from "./faq";
import type { PricingFeatureId, PricingPlan } from "./pricing";

/**
 * One stage at which COD King can act on an order.
 *
 * Related to, but not the same as, the four order stages in the controls
 * repository. A stage answers "when does this control run"; an intervention
 * point answers "what decision is being made", which is what an assistant
 * needs in order to place a merchant's question in the product.
 */
export interface InterventionPoint {
  readonly id: string;
  readonly title: string;
  /** What decision is made here, and what COD King does about it. */
  readonly body: string;
  readonly controlSlugs: readonly ControlSlug[];
}

/** One merchant problem, explained at length and routed to its controls. */
export interface MerchantProblem {
  readonly id: string;
  /** The problem in the merchant's own vocabulary, e.g. "Fake COD orders". */
  readonly title: string;
  /** What the problem is. */
  readonly problem: string;
  /** The business and operational impact of leaving it alone. */
  readonly whyItMatters: string;
  /** The product mechanisms that act on it. */
  readonly howAddressed: string;
  /** A realistic merchant situation, drawn from published use cases. */
  readonly scenario: string;
  readonly controlSlugs: readonly ControlSlug[];
}

/** One configurable option, and the values it accepts. */
export interface ConfigurationOption {
  readonly id: string;
  /** What is being configured, e.g. "Fee type". */
  readonly option: string;
  /** The values it accepts and what each one does. */
  readonly detail: string;
}

/** A cross-link from one control to another, with the reason it exists. */
export interface ControlRelation {
  readonly slug: ControlSlug;
  /** Why a merchant reading about one should read about the other. */
  readonly reason: string;
  /** The situation in which a merchant runs both. */
  readonly whenBoth: string;
}

/** How two controls that are easily confused actually differ. */
export interface ControlDistinction {
  readonly slug: ControlSlug;
  readonly distinction: string;
}

/**
 * The `/llms.txt` entry for one published control — everything about it that
 * is not already published somewhere else on this site.
 */
export interface ControlKnowledge {
  /** The long-form description, one string per paragraph. */
  readonly overview: readonly string[];
  /** The merchant problem this control answers, at length. */
  readonly problemDetail: readonly string[];
  /** What a customer and a merchant actually see, once it is switched on. */
  readonly behaviour: readonly string[];
  /** Every option a merchant sets, and the values it accepts. */
  readonly configuration: readonly ConfigurationOption[];
  /** Situations a merchant recognises, drawn from published use cases. */
  readonly useCases: readonly string[];
  /**
   * Why each published audience segment benefits, keyed by the segment's own
   * id. A segment with no entry renders without an explanation rather than
   * with an invented one.
   */
  readonly audienceReasons: Readonly<Record<string, string>>;
  /**
   * The terms merchants search this control under.
   *
   * Vocabulary, not claims: every phrase names something the control already
   * does. It exists so an assistant asked "how do I stop fake COD orders on
   * Shopify" reaches the page that answers it rather than the homepage.
   */
  readonly terminology: readonly string[];
  /** Other controls worth reading next, and why. */
  readonly related: readonly ControlRelation[];
  /** Controls this one is confused with, and the actual difference. */
  readonly differences: readonly ControlDistinction[];
  /**
   * The comparison-matrix rows that describe this control, if any.
   *
   * Declared rather than matched by name: the matrix labels a control "Show /
   * Hide COD Rules" where the controls repository calls it "COD Rules", and a
   * renderer that guesses at that correspondence quietly drops the row — which
   * is how a per-plan rate stops being published without anyone noticing. The
   * ids are checked against the matrix by the compiler.
   *
   * Absent where the matrix has no row for the control, as it does not for COD
   * to Prepaid.
   */
  readonly planFeatureIds?: readonly PricingFeatureId[];
}

/**
 * Everything `/llms.txt` says about one control, resolved.
 *
 * The `Control` record, the control's own feature-page content, its questions
 * from the FAQ pool, the plan that unlocks it, and the knowledge entry above —
 * joined in the content layer so the route renders a shape rather than
 * assembling one.
 */
export interface ControlDossier {
  readonly control: Control;
  /** The feature page's own opening description. */
  readonly summary: string;
  /** The hero checklist — the page's own "at a glance" claims. */
  readonly checkpoints: readonly FeatureCheckpoint[];
  /** The outcomes band. Rendered without its figures — see the route. */
  readonly outcomes: readonly FeatureOutcome[];
  /** The "how it works" rail, in page order. */
  readonly steps: readonly FeatureFlowStep[];
  /** The one-line payoff under the flow, where the page publishes one. */
  readonly result: string | null;
  /** What the page's own product demonstration shows. */
  readonly demoPoints: readonly FeatureCheckpoint[];
  /** The key-features grid, or the capability row where the page uses one. */
  readonly capabilities: readonly FeatureCapability[];
  /** "Best suited for", where the page publishes it. */
  readonly audience: readonly AudienceSegment[];
  /** The page's closing note on how the control is configured. */
  readonly configurationNote: string | null;
  /** The questions this control carries in the FAQ pool, with their answers. */
  readonly questions: readonly FaqItem[];
  /** The cheapest plan that includes this control. */
  readonly plan: PricingPlan | undefined;
  readonly knowledge: ControlKnowledge;
}

/** Two or more controls run together, and the problem that combination solves. */
export interface FeatureCombination {
  readonly id: string;
  readonly title: string;
  readonly controlSlugs: readonly ControlSlug[];
  /** The merchant problem the pair is run against. */
  readonly problem: string;
  /** Why they complement each other rather than overlap. */
  readonly complement: string;
  /** What each control contributes, keyed by slug. */
  readonly contributions: Readonly<Partial<Record<ControlSlug, string>>>;
}

/**
 * Where a merchant question should be answered.
 *
 * A control target resolves to that control's canonical feature page; a page
 * target names one of the site's own routes. Both are resolved through the
 * route registry at render, so a mapping cannot point at a URL no page
 * answers to.
 */
export type QuestionTarget =
  | { readonly kind: "control"; readonly slug: ControlSlug }
  | { readonly kind: "calculator" }
  | { readonly kind: "pricing" }
  | { readonly kind: "faq" }
  | { readonly kind: "features" }
  | { readonly kind: "contact" }
  | { readonly kind: "about" }
  | { readonly kind: "docs" }
  | { readonly kind: "install" };

/** One question an assistant may be asked, and the page that answers it. */
export interface QuestionRoute {
  readonly question: string;
  readonly target: QuestionTarget;
  /** The short answer, and why that page is the authoritative one. */
  readonly answer: string;
}

/** What the COD Calculator does, and what it deliberately does not do. */
export interface CalculatorKnowledge {
  readonly purpose: readonly string[];
  readonly intendedFor: readonly string[];
  readonly method: readonly string[];
  readonly outputs: readonly string[];
  readonly questions: readonly string[];
  readonly notCalculated: readonly string[];
}
