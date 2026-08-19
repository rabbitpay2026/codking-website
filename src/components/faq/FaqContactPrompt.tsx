import Link from "next/link";

import { routes } from "@/constants/routes";

/**
 * The end of the list, and the one thing a list cannot cover.
 *
 * Every FAQ page eventually meets a question nobody wrote down. Saying so here
 * — at the foot of the column, before the install band — is more useful than
 * letting a merchant scroll to the end and conclude the answer does not exist.
 * The legal documents close the same way and for the same reason.
 *
 * The support line is the product's own, and the same sentence the `support`
 * question above it answers with; it is repeated rather than linked to because
 * a reader who has reached the bottom of the page should not have to go back up
 * it to find out whether anyone answers.
 */
export function FaqContactPrompt() {
  return (
    <div className="mt-10 border-t border-ink/[0.07] pt-7">
      <p className="text-[14.5px] leading-[1.7] text-pretty text-ink/75">
        Still have a question about your own store?{" "}
        <Link
          href={routes.contact}
          className="rounded-sm font-medium text-brand transition-colors duration-200 hover:text-brand-deep focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:outline-none"
        >
          Contact us
        </Link>{" "}
        and we will answer it — support runs 7 days a week over live chat and
        email.
      </p>
    </div>
  );
}
