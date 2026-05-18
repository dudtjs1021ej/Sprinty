export async function sendDeployFailureToSlack({ webhookUrl, service, reason }, fetchImpl = fetch) {
  const payload = {
    text: `Deploy failure: ${service}`,
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `*Deploy failure*\nService: ${service}\nReason: ${reason}`
        }
      }
    ]
  };

  return retrySlackWebhook(webhookUrl, payload, fetchImpl);
}

export async function retrySlackWebhook(webhookUrl, payload, fetchImpl, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchImpl(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        return { ok: true, attempt };
      }
    } catch (error) {
      lastError = error;
    }
  }

  return { ok: false, error: lastError?.message ?? "SLACK_WEBHOOK_FAILED" };
}
