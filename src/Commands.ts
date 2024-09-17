import { Command } from './Command';
import { Restore } from './commands/Restore';
import { Vouch } from './commands/Vouch';
import { Wipe } from './commands/Wipeout';

export const Commands: Command[] = [Vouch, Restore, Wipe];
