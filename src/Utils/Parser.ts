import { TransitionTableState } from "../Models/TransitionTable";

export interface ParseResult{
    words: ParsedWordResult[];
    timeTaken: number
}

interface ParsedWordResult{
    word: string,
    classification: string,
    precedence: number,
    success: boolean,
    errorMessage: string
}


function parseWord(word: string, automaton: TransitionTableState[], caseSensitive: boolean): ParsedWordResult{
    var currentState: number = 0;
    var parsingResult: Partial<ParsedWordResult>  = {  word: word, precedence: 0, success: true, errorMessage: "" };
    for(var i = 0; i < word.length; i++){
        var currentSymbol = word.charAt(i);
        if (!caseSensitive)
            currentSymbol = currentSymbol.toLowerCase();
        
        
        if (automaton[currentState] == undefined){
            throw new Error("Invalid automaton state transition, trying to access state " + currentState + " but it does not exist | word: " + word + ", symbol: " + currentSymbol);
        }
        let auxState = automaton[currentState].transitions[currentSymbol];


        if(auxState == undefined){
            parsingResult.errorMessage = `Symbol ${currentSymbol} is not in the alphabet`;
            parsingResult.success = false;
            break;
        }

        if(auxState == ''){
            parsingResult.errorMessage = `Word ${word} is not accepted by the automaton, wrong transition at char ${word.charAt(i)}, position ${i+1}`;
            parsingResult.success = false;
            break;
        }
        currentState = parseInt(auxState);
    }
    if (parsingResult.success){
        if (automaton[currentState].isFinal){
            parsingResult.classification = automaton[currentState].classification;
            parsingResult.precedence = automaton[currentState].precedence;
        }
        else{
            parsingResult.errorMessage = `Word ${word} is not accepted by the automaton, final state is not reached`;
            parsingResult.success = false;
        }
    }

    return parsingResult as ParsedWordResult;
}


class WordParsingException extends Error{
    constructor(message: string){
        super(message);
    }
}

export function parseWords(automaton: TransitionTableState[], words: string[]): ParseResult{
    var startTime = new Date().getTime();
    var result: ParseResult = {
        words: [],
        timeTaken: 0
    };
    for(var i = 0; i < words.length; i++){
        var word = words[i];
        var parsingResult = parseWord(word, automaton, false);

        result.words.push(parsingResult);
        //else 
            //throw new WordParsingException(parsingResult.errorMessage);
    }
    result.timeTaken = new Date().getTime() - startTime;
    return result;
}