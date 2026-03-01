# /feedback

Opens a modal (form) so the user can submit feedback with a subject and message.

## What it does

When the user runs `/feedback`, a modal appears with two text fields: **Subject** (short) and **Message** (paragraph). On submit, the bot replies with a thank-you message that echoes the subject and message. The reply is ephemeral (only the user sees it). Demonstrates modals and the `buildModal` / `getModalFieldValues` helpers.

## How it works

- **Data** — `SlashCommandBuilder` for the `/feedback` command; no options (the input is collected in the modal).
- **Execute** — Builds a modal with `buildModal(FEEDBACK_MODAL, 'Send feedback', [...])` with two field configs (customId, label, style, placeholder, required, maxLength). Calls `interaction.showModal(modal)` so the user sees the form.
- **Handler** — When the user submits, Discord sends an interaction with the modal's customId. The handler `handleFeedbackModal` is registered in `componentHandlers.ts` under `FEEDBACK_MODAL`. It uses `getModalFieldValues(i, [FEEDBACK_SUBJECT, FEEDBACK_MESSAGE])` to read the inputs and replies with the thank-you text.

CustomIds (`FEEDBACK_MODAL`, `FEEDBACK_SUBJECT`, `FEEDBACK_MESSAGE`) and the handler live in the same command file and are exported; `componentHandlers.ts` imports them and adds the modal customId to `COMPONENT_HANDLERS`.

## See also

- [Commands overview](commands/overview.md)
- [Adding Commands](commands/adding-commands.md) (including "Adding a command that uses components")
- [Architecture](../architecture.md) (component and modal flow)
