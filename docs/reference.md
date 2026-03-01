# Reference

Builders, helpers, and config provided by the template. All from `src/interactions/` and `src/utils/`.

## Builders

From [`src/interactions/builders.ts`](../src/interactions/builders.ts). Use in commands that show modals, buttons, or select menus. Register component `customId`s and handlers in `src/interactions/componentHandlers.ts`.

### ModalFieldConfig

Config for one text input in a modal. `customId`, `label`, `style` (e.g. `TextInputStyle.Short`, `TextInputStyle.Paragraph`); optional `placeholder`, `required`, `maxLength`.

```typescript
type ModalFieldConfig = {
  customId: string;
  label: string;
  style: TextInputStyle;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
};
```

### buildModal(customId, title, fields)

Returns a `ModalBuilder`. Use in `execute`, then `interaction.showModal(modal)`. Register the modal's `customId` in `componentHandlers.ts`.

```typescript
import { TextInputStyle } from 'discord.js';
import { buildModal } from '../interactions/builders.js';

const modal = buildModal('my_modal', 'Form title', [
  { customId: 'field1', label: 'Field 1', style: TextInputStyle.Short, required: true, maxLength: 100 },
]);
await interaction.showModal(modal);
```

### getModalFieldValues(interaction, fieldIds)

Reads submitted modal values by field customIds. Returns `Record<string, string>`. Use in your modal submit handler.

```typescript
import { getModalFieldValues } from '../interactions/builders.js';

const values = getModalFieldValues(interaction, [FEEDBACK_SUBJECT, FEEDBACK_MESSAGE]);
// values[FEEDBACK_SUBJECT], values[FEEDBACK_MESSAGE]
```

### ButtonConfig

Config for one button. `label`, `style` (e.g. `ButtonStyle.Primary`, `ButtonStyle.Link`); optional `customId` (required for non-link); optional `url` (for link buttons).

```typescript
type ButtonConfig = {
  customId?: string;
  label: string;
  style: ButtonStyle;
  url?: string;
};
```

### buildButtonRow(buttons)

Returns an action row of buttons. Pass in `reply({ components: [row] })`. Register each button's `customId` in `componentHandlers.ts`.

```typescript
import { ButtonStyle } from 'discord.js';
import { buildButtonRow } from '../interactions/builders.js';

const row = buildButtonRow([
  { customId: 'btn_1', label: 'Primary', style: ButtonStyle.Primary },
  { label: 'Link', style: ButtonStyle.Link, url: 'https://example.com' },
]);
await interaction.reply({ content: 'Choose:', components: [row] });
```

### buildStringSelect(customId, placeholder, options, minValues?, maxValues?)

Returns an action row with a string select menu. `options`: `Array<{ label: string; value: string }>`. Defaults `minValues = 1`, `maxValues = 1`. Register `customId` in `componentHandlers.ts`.

```typescript
import { buildStringSelect } from '../interactions/builders.js';

const row = buildStringSelect('my_select', 'Choose one', [
  { label: 'A', value: 'a' },
  { label: 'B', value: 'b' },
], 1, 1);
await interaction.reply({ content: 'Pick:', components: [row] });
```

## Helpers

From [`src/interactions/helpers.ts`](../src/interactions/helpers.ts).

### replyOrEditError(interaction, errMessage)

Sends an error message: edits the reply if the interaction was already deferred, otherwise replies ephemerally. Used by the interaction event handler; use it when handling errors in your own command or component code.

```typescript
import { replyOrEditError } from '../interactions/helpers.js';

await replyOrEditError(interaction, 'Something went wrong.');
```

## Config

From [`src/utils/config.ts`](../src/utils/config.ts). See [Configuration](configuration.md) for the list of env vars.

### getEnv(key)

Returns the env value for `key`; throws if missing. Use for required vars so the app fails fast.

```typescript
import { getEnv } from './utils/config.js';

const token = getEnv('DISCORD_TOKEN');
const clientId = getEnv('DISCORD_CLIENTID');
```

## See also

- [Adding commands](commands/adding-commands.md)
- [Configuration](configuration.md)
- Example commands: [/feedback](commands/feedback.md), [/buttons](commands/buttons.md), [/pick](commands/pick.md)
