import type { Interaction } from 'discord.js';
import { FEEDBACK_MODAL, handleFeedbackModal } from '../commands/feedback.js';
import { DEMO_BTN_PRIMARY, DEMO_BTN_SECONDARY, handleDemoButtons } from '../commands/buttons.js';
import { PICK_FRUIT, handlePickFruit } from '../commands/pick.js';

/**
 * Map of component customId to handler. Used by the interaction event to route modal submit, button, and select menu interactions.
 * When adding a command that uses modals/buttons/select: export the handler and customId(s) from the command file, then add entries here.
 */
export const COMPONENT_HANDLERS: Record<string, (i: Interaction) => Promise<void>> = {
  [FEEDBACK_MODAL]: handleFeedbackModal,
  [DEMO_BTN_PRIMARY]: handleDemoButtons,
  [DEMO_BTN_SECONDARY]: handleDemoButtons,
  [PICK_FRUIT]: handlePickFruit,
};
