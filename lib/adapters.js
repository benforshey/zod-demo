const adapters = {
  github: (raw) => ({
    user: {
      username: raw.user?.username || "unknown",
      email: raw.user?.email,
      avatarUrl: raw.user?.meta?.avatar_url,
      displayName: raw.user?.username || "unknown",
    },
    activityType: raw.activity?.type || "unknown",
    timestamp: new Date(raw.activity?.timestamp || Date.now()),
    source: "github",
    details: {
      source: "github",
      repoName: raw.activity?.details?.repo || "unknown",
      commitCount: raw.activity?.details?.commits || 0,
    },
  }),

  slack: (raw) => ({
    user: {
      username: raw.user?.username || "unknown",
      email: raw.user?.email,
      avatarUrl: undefined,
      displayName:
        raw.user?.meta?.display_name || raw.user?.username || "unknown",
    },
    activityType: raw.activity?.type || "unknown",
    timestamp: new Date(raw.activity?.timestamp || Date.now()),
    source: "slack",
    details: {
      source: "slack",
      channel: raw.activity?.details?.channel || "#general",
      messageCount: parseInt(raw.activity?.details?.message_count) || 0,
    },
  }),

  jira: (raw) => ({
    user: {
      username: raw.user?.username?.split("@")[0] || "unknown",
      email: raw.user?.email,
      avatarUrl: undefined,
      displayName: raw.user?.username?.split("@")[0] || "unknown",
    },
    activityType: raw.activity?.type || "unknown",
    timestamp: new Date(raw.activity?.timestamp || Date.now()),
    source: "jira",
    details: {
      source: "jira",
      ticketId: raw.activity?.details?.ticket_id || "UNKNOWN-0",
      statusChange: raw.activity?.details?.changes?.status,
    },
  }),
};

export { adapters };
