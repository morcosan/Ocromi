# CSS Style Guide

Read https://cssguidelin.es/

Also read https://clubmate.fi/oocss-acss-bem-smacss-what-are-they-what-should-i-use/


## Naming conventions
Use BEM notation.
Never create a class name by Sass concatenation.
Use 'js-' notation for classes that only have scripting purpose.
Prefix all block classes with a letter to avoid external collisions.
```
// good:
.y-my-class {
    .y-my-class--extended {}
}

// bad:
.y-my-class {
    &--extended {}
    .js-example {}
}
```


## Selectors
Use class selector in 99% of cases.
Avoid using the HTML tag.
Use classes instead of attributes for better performance.
```
// bad:
div.y-my-class[my-attr='special'] {} 

// good:
.y-my-special-div-class {}
```


## Indentation
Use 3 spaces, compact and visible. 


# Spacing
- After comma
- After colon
- After class
- Max 5 empty lines between anything
- Min 1 empty line between classes, unless inline
- Before opening bracket
- Trim trailing white space
- Add new line at end of file
```
.y-my-class {
     color: rgba(255, 0, 0, 0.5);
 }

.y-other-class {}



.y-completely-unrelated {}

``` 


# Brackets
Put the opening bracket at the end of line.
Do not indent closing bracket.
Use inline brackets only if:
- there are 1 or 2 short properties 
- there is a group of similar classes
```
.y-my-class {
    color: #ff0;
}

.y-button1 { color: #f00; }
.y-button2 { color: #ff0; }
.y-button3 { color: #fff; }
```


## Quotes
Use single quotes.
Add quotes to attribute selectors.
```
.y-my-class[type='text'] {
    background-image: url('my_image_url');
}
```


## Colors
Use lower case for hex codes.
Use these formats in order of need:
- hex code shorthand
- hex code
- rgba()
```
#f00 
#f50000
rgba(255, 0, 0, 0.5)
```


## Semi-colons
Always use semi-colons.


## Comments
Use only these 3 types of comments:
- inline comments, lower case 
```
// simple omment
```
- header comments, upper case
```
/**
 * Header comment
 */
```
- inline header comments, upper case
```
/** Header comment */
```


## Property order
Don't use alphabetical order.
Group properties by category (from Bootstrap).
For more than 5 properties, add empty lines between categories.
1) Positioning
2) Box model
3) Typographic
4) Visual
5) Misc
```
.y-declaration-order {
    /** Positioning */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    
    /** Box-model */
    display: block;
    float: right;
    width: 100px;
    height: 100px;
    
    /** Typography */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: #333;
    text-align: center;
    
    /** Visual */
    background-color: #f5f5f5;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    
    /** Misc */
    opacity: 1;
}
```


## Numbers
Use the leading 0 for clarity.
Put numeric operations in parenthesis.
```
.y-my-class {
    width: (10px + 20px);
    opacity: 0.5;
}
``
