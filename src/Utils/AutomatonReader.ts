import { TransitionTableState } from "../Models/TransitionTable";

import * as fs from "fs";
import * as path from "path";
import * as csv from "fast-csv";
async function readAutomatonFromCSV(
  csvPath: string
): Promise<{ automaton: TransitionTableState[]; alphabet: string[] }> {
  return new Promise((resolve) => {
    var automaton: TransitionTableState[] = [];
    var alphabet: string[] = [];

    fs.createReadStream(csvPath)
      .pipe(csv.parse({ headers: true }))
      .on("error", (error) => console.error(error))
      .on("data", (row) => {
      
        let state: TransitionTableState = {
            classification: row.classification ?? undefined,
            precedence: row.precedence ? parseInt(row.precedence) : 0,
            //array transitions with headers pointing to a number
            transitions: {},
            isFinal: row.classification ? true : false,
        };
        const {stateId, classification, precedence, ...transitions} = row;
        state.transitions = transitions;
        automaton[parseInt(row.stateId)] = state;
      })
      .on("headers", (headers) => {
        //the three first headers are not part of the alphabet
        alphabet = headers.slice(3);
      })
      .on("end", (rowCount: number) => {
        resolve({ automaton, alphabet });
      });
  });
}

export { readAutomatonFromCSV };
