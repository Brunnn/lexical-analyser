export interface TransitionTableState {
    classification?: string;
    precedence?: number;
    transitions: { [key: string]: string };
    isFinal: boolean;
}