/**
 * Waits for a specific event to be triggered on one of many elements
 * @param {NodeList} elements The elements we are checking and waiting on
 * @param {String} eventType The type of event we are waiting for
 * @returns A Promise that resolves once the event has been triggered
 */
export function waitForEventOnMultipleElements(elements, eventType) {
  return new Promise((resolve) => {
    elements.forEach((element) => {
      element.addEventListener(eventType, (event) => resolve(event), {
        once: true,
      });
    });
  });
}

/**
 * Waits for a specific event to be triggered on a specific element
 * @param {Element} element The element we are checking and waiting on
 * @param {String} eventType The type of event we are waiting for
 * @returns A Promise that resolves once the event has been triggered
 */
export function waitForEventOnSingularElement(element, eventType) {
  return new Promise((resolve) => {
    element.addEventListener(eventType, (event) => resolve(event), {
      once: true,
    });
  });
}

/**
 * Generates a random x-y pair of coordinates for a given gameboard size
 * @param {Number} boardSize The size of the game board
 * @returns Array with the form: [xCoord, yCoord]
 */
export function getRandomCoords(boardSize) {
  const xValue = Math.floor(Math.random() * boardSize);
  const yValue = Math.floor(Math.random() * boardSize);

  return [xValue, yValue];
}

/**
 *
 * @returns A random direction Array, where [0, 1] is down and [1, 0] is right
 */
export function getRandomDirection() {
  const choice = Math.floor(Math.random() * 2);
  if (choice === 1) {
    // Downwards
    return [0, 1];
  } else {
    // Right
    return [1, 0];
  }
}

/**
 *
 * @param {Array} a
 * @param {Array} b
 * @returns A Boolean indicating if the two arrays are equal or not
 */
export function compareArrays(a, b) {
  return a.toString() === b.toString();
}
