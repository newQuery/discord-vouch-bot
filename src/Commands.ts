import { Command } from './Command';
import { Restore } from './commands/Restore';
import { Vouch } from './commands/Vouch';

export const Commands: Command[] = [Vouch, Restore];
