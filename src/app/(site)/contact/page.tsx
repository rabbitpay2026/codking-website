import { Headset } from "lucide-react";

import { ContactSupport } from "@/components/company";
import { FeatureCtaBand } from "@/components/features/sections";
import { routes } from "@/constants/routes";
import { createMetadata } from "@/lib/metadata";

import type { Metadata } from "next";

export const metadata: Metadata = createMetadata({
  title: "Contact COD King",
  description:
    "Questions about COD King on your Shopify store? Message us on WhatsApp, open a chat inside the app, or send the team your details. Support runs seven days a week.",
  path: routes.contact,
});

/**
 * Contact Us (§3.1).
 *
 * Short on purpose. A contact page is not a place to argue — the visitor has
 * already decided to talk to someone, and every section between them and a way
 * to do that is a section that costs a conversation.
 *
 * So: one section carrying the heading, the channels and the form, and then the
 * same close every other page carries.
 */
export default function ContactPage() {
  return (
    <>
      <ContactSupport />
      <FeatureCtaBand
        title="Ready when you are — install and see it on your own orders"
        icon={Headset}
      />
    </>
  );
}
