self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data?.text() || "" };
  }
  event.waitUntil(self.registration.showNotification(payload.title || "VELORA", {
    body: payload.body || "Bạn có thông báo mới.",
    icon: "velora-logo-v2.png",
    badge: "velora-logo-v2.png",
    tag: payload.tag || "velora-notification",
    data: { url: payload.url || "./#account" },
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  let targetUrl = new URL(event.notification.data?.url || "#account", self.registration.scope);
  if (targetUrl.origin !== self.location.origin) {
    targetUrl = new URL("#account", self.registration.scope);
  }
  const target = targetUrl.href;
  event.waitUntil((async () => {
    const clients = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const client of clients) {
      if (client.url.startsWith(self.location.origin) && "navigate" in client) {
        await client.navigate(target);
        return client.focus();
      }
    }
    return self.clients.openWindow(target);
  })());
});
