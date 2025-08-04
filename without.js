import { writeFile } from "node:fs";
import { fileURLToPath } from "node:url";
import userActivity from "./data/user-activity.json" with { type: "json" };
import { adapters } from "./lib/adapters.js";

// "Defensive Programming"
// @see {@link https://dev.to/navicsteinr/introduction-to-defensive-programming-for-beginners-2jke}
function processActivitiesWithoutZod(activities, adapters) {
  const processed = [];

  for (const activity of activities) {
    try {
      const adapter = adapters[activity?.source];

      if (!adapter) {
        continue;
      }

      processed.push(adapter(activity));
    } catch (error) {
      console.error(error);
    }
  }

  return processed;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeFile(
    "./processed/without.json",
    JSON.stringify(
      processActivitiesWithoutZod(userActivity, adapters),
      null,
      4,
    ),
    (error) => {
      if (error) {
        console.error(
          `There was a problem writing results to a file: ${error}`,
        );
      }
    },
  );
}

export { processActivitiesWithoutZod };
