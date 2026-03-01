# Building a command step by step

This page walks you through creating a command from scratch. You'll see when and how to use the template's **builders**, **handlers**, and **helpers**.

We'll do two things:

1. **A simple slash command** — reply to `/hello` with no extra UI.
2. **A command that uses a component** — add a modal (form) so users can submit text; that introduces builders and the component handler registry.

Prerequisites: you've [configured](configuration.md) `DISCORD_TOKEN` and `DISCORD_CLIENTID` and can run the bot with `npm run dev`.

---

## Part 1: Simple slash command

Goal: running `/hello` replies with "Hello, world!".

### Step 1: Create the command file

Create a new file `src/commands/hello.ts`. The template **automatically loads** every `.ts` file in `src/commands/` on startup and registers it with Discord when the bot is ready. You don't add it to a list anywhere.

### Step 2: Export a command object

Your file must export a **default** object that has:

- **`data`** — a `SlashCommandBuilder` (name and description Discord shows for the slash command).
- **`execute`** — a function that runs when someone uses the command.

Add this to `src/commands/hello.ts`:

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';

export default {
  data: new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Reply with a greeting'),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({ content: 'Hello, world!', ephemeral: true });
  },
} as DiscordCommand;
```

- **Why `data`?** Discord needs a definition (name, description, options). The template sends `data.toJSON()` to Discord's API on startup so the command appears in the slash menu.
- **Why `execute`?** When a user runs `/hello`, Discord sends an interaction; the event handler looks up the command by name and calls `execute(interaction)`.

### Step 3: Run and test

1. Restart the bot (`npm run dev`).
2. In a server where the bot is invited, type `/hello` and run it. You should see "Hello, world!".

For more options (arguments, autocomplete), see [Adding commands](commands/adding-commands.md) and the example commands (e.g. [Echo](commands/echo.md), [Choose](commands/choose.md)).

---

## Part 2: Command that uses a component (modal)

Goal: a `/say` command that opens a **modal** (form) with one text field; when the user submits, the bot replies with what they typed. This uses:

- **Builders** — to create the modal and to read the submitted values.
- **Component handler** — the function that runs when the user submits the form, and its registration so the event handler can find it.

### Step 1: Create the command file and customIds

Create `src/commands/say.ts`. Define **customIds** for the modal and its field. These are unique keys so Discord (and our handler map) know which interaction is which.

```typescript
import { SlashCommandBuilder, ChatInputCommandInteraction, TextInputStyle } from 'discord.js';
import { DiscordCommand } from '../@types/discordbot.js';
import { buildModal } from '../interactions/builders.js';

// Unique ids for this modal and its field. Export so we can register the handler by modal id.
export const SAY_MODAL = 'say_modal';
export const SAY_MESSAGE = 'say_message';
```

- **Why customIds?** When the user submits the modal, Discord sends a second interaction with only a `customId`. The template routes that to your handler by looking up `customId` in `COMPONENT_HANDLERS`. So every modal/button/select you want to handle needs a stable id.

### Step 2: Build and show the modal in `execute`

When the user runs `/say`, we show a modal built with the template helper **`buildModal`**. You pass the modal's customId, title, and field configs.

```typescript
export default {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Open a form to type a message; the bot will repeat it'),
  async execute(interaction: ChatInputCommandInteraction) {
    const modal = buildModal(SAY_MODAL, 'Say something', [
      {
        customId: SAY_MESSAGE,
        label: 'Your message',
        style: TextInputStyle.Paragraph,
        placeholder: 'Type here...',
        required: true,
        maxLength: 1000,
      },
    ]);
    await interaction.showModal(modal);
  },
} as DiscordCommand;
```

- **Why a builder?** `buildModal` builds the Discord modal payload (title + action row + text inputs) so you don't construct it by hand. See [Reference — buildModal](reference.md#buildmodalcustomid-title-fields) for all options.

### Step 3: Implement the submit handler

When the user submits the modal, Discord fires another interaction (type: modal submit). We need a **handler** that runs for that interaction. Implement it in the same file and **export** it so we can register it in the next step.

To read the submitted text we use **`getModalFieldValues`** with the same field customIds we used in `buildModal`.

```typescript
import type { Interaction } from 'discord.js';
import { getModalFieldValues } from '../interactions/builders.js';
import { MessageFlags } from 'discord.js';

export async function handleSayModal(i: Interaction): Promise<void> {
  if (!i.isModalSubmit()) return;
  const values = getModalFieldValues(i, [SAY_MESSAGE]);
  const message = values[SAY_MESSAGE] ?? '';
  await i.reply({ content: `You said: ${message}`, flags: MessageFlags.Ephemeral });
}
```

- **Why a separate handler?** Slash commands are routed by **command name**. Component interactions (modal submit, button click, select choice) are routed by **customId** in a single map. So we implement a function and register it under `SAY_MODAL`.
- **Why `getModalFieldValues`?** Discord gives you the submitted values by field customId; the helper returns a simple `Record<string, string>` so you can do `values[SAY_MESSAGE]`. See [Reference — getModalFieldValues](reference.md#getmodalfieldvaluesinteraction-fieldids).

### Step 4: Register the handler in `componentHandlers.ts`

The event handler in `src/events/interactionCreate.ts` looks up `COMPONENT_HANDLERS[interaction.customId]` and runs the function you register. If you don't add an entry, the modal submit will do nothing.

Open `src/interactions/componentHandlers.ts`. Import your handler and modal id, then add an entry:

```typescript
import { SAY_MODAL, handleSayModal } from '../commands/say.js';

export const COMPONENT_HANDLERS: Record<string, (i: Interaction) => Promise<void>> = {
  [FEEDBACK_MODAL]: handleFeedbackModal,
  [SAY_MODAL]: handleSayModal,   // add this line
  // ... other entries
};
```

- **Why here?** The template uses one central map from `customId` → handler so that any modal/button/select from any command can be wired in one place. The command file stays the single source for the handler logic; this file is the wiring.

### Step 5: Run and test

1. Restart the bot.
2. Run `/say`, fill the form, and submit. You should see "You said: …" with your text.

### Optional: Use the error helper

If something goes wrong (e.g. invalid input), you can show an error with **`replyOrEditError`**. It replies ephemerally or edits the message if you already deferred — the same behavior the event handler uses when your code throws.

```typescript
import { replyOrEditError } from '../interactions/helpers.js';

// e.g. in your handler:
if (!message.trim()) {
  await replyOrEditError(i, 'Please enter a non-empty message.');
  return;
}
```

See [Reference — replyOrEditError](reference.md#replyorediterrorinteraction-errmessage).

---

## Summary

| What you did | What you used | Why |
|--------------|----------------|-----|
| Defined the slash command | `data` (SlashCommandBuilder) | Discord needs the command definition; the template deploys it on startup. |
| Showed a modal | **Builder** `buildModal` | Builds the modal payload; you show it with `interaction.showModal(modal)`. |
| Read submitted values | **Builder** `getModalFieldValues` | Returns field values by customId. |
| Ran code on submit | **Handler** + `COMPONENT_HANDLERS` | Component interactions are routed by customId; you register your handler in the map. |
| Showed an error | **Helper** `replyOrEditError` | Correctly replies or edits depending on interaction state. |

Same pattern applies for **buttons** and **string select menus**: build the UI in `execute` with `buildButtonRow` or `buildStringSelect`, implement a handler, and register it in `componentHandlers.ts` under each component's `customId`. See [Reference](reference.md) for APIs and [Buttons](commands/buttons.md) / [Pick](commands/pick.md) for examples.

- **Quick checklist:** [Adding commands](commands/adding-commands.md)
- **API details:** [Reference](reference.md)
- **How the bot loads and routes:** [How it works](how-it-works.md), [Architecture](architecture.md)
