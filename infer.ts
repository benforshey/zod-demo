import { z } from "zod";
import userActivity from "./data/user-activity.json" with { type: "json" };
import { adapters } from "./lib/adapters.js";
import { ActivitySchema } from "./lib/schemas.js";
import { processActivitiesWithZod } from "./with.js";

// Zod automatically infers this type!
type Activity = z.infer<typeof ActivitySchema>;

// Your IDE now knows EXACTLY what fields exist.
function displayActivity(activity: Activity) {
  // No optional chaining needed - we KNOW these fields exist!
  console.log(activity.user.displayName);
  console.log(activity.timestamp.toLocaleDateString());
  console.log(activity.activityType);

  // TypeScript knows what type of details based on discriminated union (type narrowing).
  switch (activity.details.source) {
    case "github":
      // TypeScript knows commitCount exists here!
      console.log(activity.details.commitCount);

      break;
    case "slack":
      // And messageCount exists here!
      console.log(activity.details.messageCount);

      break;
  }
}

processActivitiesWithZod(userActivity, adapters).forEach(displayActivity);

export { displayActivity };
