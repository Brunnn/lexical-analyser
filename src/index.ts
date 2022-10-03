import path from "path";
import { TransitionTableState } from "./Models/TransitionTable";
import { readAutomatonFromCSV } from "./Utils/AutomatonReader";
import { readWordsFromFile } from "./Utils/CodeReader";
import { parseWords } from "./Utils/Parser";


var automaton: TransitionTableState[];
var alphabet: string[];

//read from the files folder one folder up
var filesFolderPath = path.join(__dirname, "..", "files/automaton.csv");
var code = path.join(__dirname, "..", "files/code.txt");


(async () => {
    var result = await readAutomatonFromCSV(filesFolderPath);
    automaton = result.automaton;
    alphabet = result.alphabet;
    
    var words = await readWordsFromFile(code);
    console.log(words);
    


    var parsinResult = parseWords(automaton, words);

    console.log(parsinResult);
    
    //process the automaton table
    
    
})()