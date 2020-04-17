# JavaScript Style Guide

<br>

## Comments
Cases in which comments are allowed:
- to replace missing language syntax (like override)
- to explain visual implications for UI
- to explain intentions that cannot be explained by code
- to explain convoluted logic (like regex, platform-dependent, etc.) 
- when even if it's wrong, it gives an insight of the initial logic

Use only these 3 types of comments:
- inline comments, lower case 
```
// simple comment
```
- header comments, upper case
```
/**
 * Header comment
 * Another line
 */
```


<br>

## Parentheses
Apart from obvious syntax requirements, use them to group concepts:
```
return (a + b);

const a: (string | null) = '';

if (a | (b + 1 > 2)) {}

const a = (b ? 0 : 1);
```
