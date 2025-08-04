import { writeFile } from "node:fs";
import { fileURLToPath } from "node:url";
import { ZodError } from "zod";
import userActivity from "./data/user-activity.json" with { type: "json" };
import { adapters } from "./lib/adapters.js";
import { ActivitySchema } from "./lib/schemas.js";

// Parse, don't validate.
// @see {@link https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/}
function processActivitiesWithZod(activities, adapters) {
  const processed = [];

  for (const activity of activities) {
    try {
      const adapter = adapters[activity?.source];

      if (!adapter) {
        continue;
      }

      processed.push(ActivitySchema.parse(adapter(activity)));
    } catch (error) {
      console.error(error instanceof ZodError ? error.message : error);
    }
  }

  return processed;
}

// NOTE: Demo type completion without TS.
// const [firstActivity] = processActivitiesWithZod(userActivity, adapters)

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFile(
    "./processed/with.json",
    JSON.stringify(processActivitiesWithZod(userActivity, adapters), null, 4),
    (error) => {
      if (error) {
        console.error(
          `There was a problem writing results to a file: ${error}`,
        );
      }
    },
  );
}

export { processActivitiesWithZod };
