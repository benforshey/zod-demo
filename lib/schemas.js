import { z } from "zod";

// Define our requirements for the data. How much of this schema needs to be present for our data to be useful?
const UserSchema = z.object({
  username: z.string(),
  email: z.email().optional(),
  avatarUrl: z.url().optional(),
  displayName: z.string(),
});

const ActivityDetailsSchema = z.discriminatedUnion("source", [
  z.object({
    source: z.literal("github"),
    repoName: z.string(),
    commitCount: z.number().positive(),
  }),
  z.object({
    source: z.literal("slack"),
    channel: z.string(),
    messageCount: z.number().positive(),
  }),
  z.object({
    source: z.literal("jira"),
    ticketId: z.string(),
    statusChange: z
      .object({
        from: z.string(),
        to: z.string(),
      })
      .optional(),
  }),
]);

const ActivitySchema = z.object({
  user: UserSchema,
  activityType: z.string(),
  timestamp: z.date(),
  source: z.enum(["github", "slack", "jira"]),
  details: ActivityDetailsSchema,
});

export { ActivitySchema };
