# Title : "Matching an Email using Regex!"

Here is just a brief tutorial about regex and how its used.

## Summary

In this tutorial you will learn the concept of regex (regular expression), and what it can be used for. Primarily we will learn about
using regex with matching emails. I will explain the code how it used by the quantifiers, grouping, bracket expressions,
OR Operator and more. heres example of regex code when matching emails...

Example: function capEmails(text) {
    const pattern = /\ c[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g;
    const emails = text.match(pattern);
    return emails;
}
Usage:
     const text = "Please contact me at mike.doe@example.com or Kim_Smith@example.com.";
     const emails = extractEmails(text);

## Table of Contents

- [Anchors](#anchors)
- [Quantifiers](#quantifiers)
- [Grouping Constructs](#grouping-constructs)
- [Bracket Expressions](#bracket-expressions)
- [The OR Operator](#the-or-operator)
- [Flags](#flags)
- [Character Escapes](#character-escapes)

## Regex Components

### Anchors
    Anchors are special characters used in regex to match a specific position within a string. Anchors
can be placed in beggining, middle, or end of a line or string. can also be placed in between two characters 
in a small string. here are example of theses anchors and there usage:
'^' used to match the start of a string.
'$' used to match end of a string.
'\b' used to match position between a word character.
'\B' used to match position that is not a word boundary.



### Quantifiers
    Quantifiers in regex are used to count the number of times that a pattern should be matched. they allow you
to keep track of quantity and repetition of characters or groups in pattern. Example of a couple used cases: '*' used 
to match zero or more occurrences of the preceding character or group, '+' used to match one or more occurences, and '?'
used to match zero or one occurrence of the peceding character or group.




### Grouping Constructs
    Grouping Constructs allows you to create sub patterns and then capture specific parts of the matched text. Grouping construct
are always enclosed in parentheses to capture the matched text. It allows you to refer to text captured later by using backreferences.
example: '(ABC)'..... ('\1','\2')



### Bracket Expressions
    Bracket Expressions are used to specify a range or set of characters that can match a single character. Bracket expressions
are enclosed in square brackets '[]'. Here's an example of Bracket expression [A-Z] this will match any uppercase letter from A
to Z.



### The OR Operator
    The OR Operator allows you to specify multiple alternatives or choices for matching patterns in a string. You use the vertical
line '|' to use OR operator. Example '(+ | -)' match either plus or minus.



### Flags
    In Regex Flags are used to modify the behavior of matching pattern. Flags are specified after the closing delimiter, and is denoted
by a letter. Example 'i' /hello/i matches hello lowercase, uppercase, all caps so on... 'g' /apple/g matches all occurrences in string apple.



### Character Escapes
    Character Escapes allow you to match specific character or classes of characters in a pattern. Character escapes are used with
a backlash '\'.



## Author
    Hello my name is Edwin Treadwell and Im the author of this tutorial of Regex. Here I attended to teach  ways it can be used 
in matching emails. Hope the reader will find this informative. Here's a link to my Github profile : gist.github.com/Edtread3
