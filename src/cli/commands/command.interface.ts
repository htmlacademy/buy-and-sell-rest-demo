export interface Command {
  getName(): string;
  execute(...parameters: string[]): void;
}
