# Zapier Support Integration

Zapier app: ship "Create Support Ticket" as a Zap action so anyone
can wire any of Zapier's 6,000+ apps to a Ubiquilife Support backend.

## Actions

| Type | Key | Notes |
|---|---|---|
| Create | **Create Support Ticket** | Opens a new ticket. Category + priority pickers populate live from your Support instance. |

## Hidden helpers

- **List Categories** — dynamic dropdown for the `category_id` field
- **List Priorities** — dynamic dropdown for the `priority_id` field

## Develop

```bash
npm install
npm install -g zapier-platform-cli
zapier login
zapier register "Ubiqui Support"   # first time only
zapier push
zapier promote 0.1.0
```

## Auth

Custom auth — the user supplies the Support API URL + bearer key.
Validation hits `GET /lookup/categories` as a health check.

## Wire format

Same as the laravel/nuxt/react/wp/slack/ios/android/browser/macos
integrations. `source_app` is set from the auth field
"Source app name" (default: "Zapier"). `context_data` carries the Zap
ID and step ID for traceability.

## License

MIT.
