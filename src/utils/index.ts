/**
 * Random utilities
 */

/** Test special keys */
export function isSpecialKey(event: KeyboardEvent) {
	// .jest special keys
	const specialKeys = ['Tab', 'Backspace', 'Enter', 'Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
	if (specialKeys.includes(event.key)) {
		return true;
	}

	// .jest copy/paste
	if (event.ctrlKey) {
		return (event.key === 'c' || event.key === 'v');
	}

	return false;
}


/** Insert substring into string at specific position */
export function insertInString(str: string, start: number, subStr: string) {
	return str.slice(0, start) + subStr + str.slice(start);
}


/** Count chars in a string */
export function countChar(str: string, char: string) {
	const regex = new RegExp(char, 'g');
	return (str.match(regex) || []).length;
}
