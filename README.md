# MegaPuzzle2024
The source code for the 2024 Mega Puzzle!

[View Site](https://luddy-llc.github.io/MegaPuzzle2024/)

# Special Requirements
## `div`s with text
If you're using text on your puzzle page, please include `div`s conforming to either the `text-container` or `text-container-dark` class. This will provide a backdrop for your text:
```
<div class="text-container">
    This will appear with a lighter background
</div>

<div class="text-container-dark">
    This will appear with a darker background
</div>
```

## Use `<h1>`s!
Be sure to include `<h1>`s that describe your puzzle for accessible page navigation. If you'd like to hide these for seeing users, ensure the element conforms to the class `sr-only`. All other headings should reside within an `<h1>` and follow standard hierarchy:  
`<h1>`  
&emsp;⤷ `<h2>`  
&emsp;&emsp;&emsp;⤷ `<h3>`  

  
This example outlines a puzzle with an introduction and prompt, which are two separate boxes. Neither of the `<h1>`s are visible to seeing people but are available for screen readers.
```
<div class="text-container">
    <h1 class="sr-only">Puzzle Introduction</h1>
    ...
</div>

<div class="text-container-dark">
    <h1 class="sr-only">Puzzle Prompt</h1>
    ...
</div>
```

# We love maps!
Indeed
