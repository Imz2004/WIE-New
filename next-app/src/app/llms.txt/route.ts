import { events } from "@/data/events";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

export function GET() {
  const eventLinks = events
    .map((event) => `- ${event.title}: ${siteUrl}/events/${event.slug}`)
    .join("\n");

  const content = `${siteName} (IIT Sri Lanka)

${siteDescription}

Primary URLs
- Home: ${siteUrl}/
- Our Team: ${siteUrl}/our-team
- Events: ${siteUrl}/#our-work

Event Pages
${eventLinks}

Social Profiles
- Instagram: https://www.instagram.com/ieeewieiit?igsh=MWpwdHR6c2ZhNzVzaA==
- LinkedIn: https://www.linkedin.com/company/wie-affinity-group-of-iit/posts/?feedView=all
- Facebook: https://www.facebook.com/share/14DNsp2yrmi/
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
