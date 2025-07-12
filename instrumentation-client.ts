// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://700d032f935f573f4cbbcf07b9605e13@o4509094844628992.ingest.us.sentry.io/4509094847381504",

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});