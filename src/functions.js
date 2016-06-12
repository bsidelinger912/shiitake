/**
 * This function calculates the text based on the test row
 */

export function getLines(fullString, charactersPerLine, allowedLines) {
  let workingString = fullString;
  const lineArray = [];

  // populate an array of estimated text lines in the box
  while (lineArray.length < allowedLines && workingString.length > 0) {
    let thisLine;
    if (workingString.length > charactersPerLine) {
      const lastLineTrim = (allowedLines - lineArray.length === 1);
      const trimIndex = (lastLineTrim) ? charactersPerLine - 3 : charactersPerLine + 2;
      const thisLineArray = workingString.substring(0, trimIndex).split(' ').slice(0, -1);
      thisLine = thisLineArray.join(' ');

      if (lastLineTrim) {
        thisLine += '...';
      } else {
        workingString = workingString.substring(thisLine.length);
      }
    } else {
      thisLine = workingString;
      workingString = '';
    }

    lineArray.push(thisLine);
  }

  return lineArray;
}
