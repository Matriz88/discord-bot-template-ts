import {
  ModalBuilder,
  LabelBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  type ModalSubmitInteraction,
} from 'discord.js';

/** Configuration for a single text input in a modal. */
export type ModalFieldConfig = {
  customId: string;
  label: string;
  style: TextInputStyle;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
};

/**
 * Builds a modal dialog from a list of field configs.
 * Use this in a command's `execute` to show a form to the user.
 * Register the modal's `customId` and its handler in `componentHandlers.ts`.
 */
export function buildModal(customId: string, title: string, fields: ModalFieldConfig[]): ModalBuilder {
  const modal = new ModalBuilder().setCustomId(customId).setTitle(title);
  const labelComponents = fields.map((field) => {
    const input = new TextInputBuilder()
      .setCustomId(field.customId)
      .setStyle(field.style)
      .setRequired(field.required ?? true);
    if (field.placeholder !== undefined) input.setPlaceholder(field.placeholder);
    if (field.maxLength !== undefined) input.setMaxLength(field.maxLength);
    return new LabelBuilder().setLabel(field.label).setTextInputComponent(input);
  });
  modal.addLabelComponents(...labelComponents);
  return modal;
}

/**
 * Reads text input values from a submitted modal by field customIds.
 * Returns a record keyed by each id. Use in your modal submit handler.
 */
export function getModalFieldValues(interaction: ModalSubmitInteraction, fieldIds: string[]): Record<string, string> {
  return Object.fromEntries(fieldIds.map((id) => [id, interaction.fields.getTextInputValue(id)]));
}

/** Configuration for a button in a row (customId optional for link buttons). */
export type ButtonConfig = {
  customId?: string;
  label: string;
  style: ButtonStyle;
  url?: string;
};

/**
 * Builds a single action row of buttons from configs.
 * Use in a command's `execute` and pass the row in `reply({ components: [row] })`.
 */
export function buildButtonRow(buttons: ButtonConfig[]): ActionRowBuilder<ButtonBuilder> {
  const row = new ActionRowBuilder<ButtonBuilder>();
  for (const btn of buttons) {
    const b = new ButtonBuilder().setLabel(btn.label).setStyle(btn.style);
    if (btn.url) b.setURL(btn.url);
    else if (btn.customId) b.setCustomId(btn.customId);
    row.addComponents(b);
  }
  return row;
}

/**
 * Builds a string select menu in an action row.
 * Use in a command's `execute` and pass the row in `reply({ components: [row] })`.
 * Register the handler in `componentHandlers.ts` under the same `customId`.
 */
export function buildStringSelect(
  customId: string,
  placeholder: string,
  options: Array<{ label: string; value: string }>,
  minValues = 1,
  maxValues = 1,
): ActionRowBuilder<StringSelectMenuBuilder> {
  const select = new StringSelectMenuBuilder()
    .setCustomId(customId)
    .setPlaceholder(placeholder)
    .setMinValues(minValues)
    .setMaxValues(maxValues)
    .addOptions(options.map((opt) => new StringSelectMenuOptionBuilder().setLabel(opt.label).setValue(opt.value)));
  return new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select);
}
