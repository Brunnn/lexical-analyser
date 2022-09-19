export interface TransitionTableState {
    classification?: string;
    precedence?: number;
    transitions: { [key: string]: number };
    isFinal: boolean;
}