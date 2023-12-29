#!/bin/bash
# Want to use this script? Run this in the folder you wish to setup:
# zsh ../../common/setup.sh
# If that doesn't work, try typing "bash" in place of "zsh"


EXISTS='\U2705'
CREATED='\U1F4DD'

echo "\n"

if [ -d "assets" ]; then
    echo "${EXISTS} /assets exists.\n"
else 
    mkdir assets
    echo "${CREATED} /assets created.\n"
fi

foreach FILE ( "README.md" "style.css" "script.js" "index.html" )
    if [ -f "$FILE" ]; then
        echo "${EXISTS} $FILE exists.\n"
    else 
        touch $FILE
        echo "${CREATED} $FILE created.\n"
        if [[ "$FILE" == "index.html" ]]; then
            cat > index.html << EOF
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mega Puzzle - PUZZLE_NAME_GOES_HERE</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
        crossorigin="anonymous"></script>
    <link rel="stylesheet" href="/common/puzzle.css">
    <link rel="stylesheet" href="style.css">

</head>

<body>
    <nav class="navbar navbar-nav">
                <a class="btn" href="./index.html">
                    <svg width="10px"><use href="icons.svg#ppi-map" xlink:href="icons.svg#ppi-map"></use></svg>    
                    Map
                </a>
                <img src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo-shadow.png" alt="Bootstrap" width="30" height="24">
                <div class="navbar-nav">
                    <a class="btn" href="">
                        <svg><use href="icons.svg#ppi-unmuted" xlink:href="icons.svg#ppi-unmuted"></use></svg>    
                        Music</a>
                    <button class="btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                        <svg>
                            <use href="icons.svg#ppi-lore" xlink:href="icons.svg#ppi-lore"></use>
                        </svg>    
                            Lore
                        </button>
                </div>
            </nav>

    <div class="container">

        <!-- CONTENT GOES HERE, WITHIN CONTAINER -->







        <div class="help">
            <!-- You can remove this help div when you're ready to code! -->
            <h1>My Puzzle</h1>
            <p>This is my fun little puzzle &#x1F642;</p>
            <p>Please be aware of the following:</p>
            <ol>
                <li>All puzzle-specific ____ should be kept in this puzzle's...
                    <ul>
                        <li>Assets: <code>assets</code> folder.</li>
                        <li>Styling: <code>style.css</code> file</li>
                        <li>JS: <code>script.js</code> file</li>
                    </ul>
                <li>Common assets can be accessed using the <code>/common</code> path.</li>
                <li>Do not use the <code>&#x3C;style&#x3E;</code> tag.</li>
                <li>Please use the <a href="https://getbootstrap.com/docs/5.3/layout/grid/" target="_blank"
                        rel="noopener">Bootstrap Grid System</a> for more advanced layouts. (Already imported!)</li>

                <li>Please <a href="https://mothereff.in/html-entities" target="_blank" rel="noopener">HTML encode
                        special characters</a> for better cross-device support.</li>
                <li>This puzzle is going to be epiccc</li>
                <li><a href="https://teams.microsoft.com/l/chat/0/0?users=reeneedh@iu.edu" target="_blank"
                        rel="noopener">Contact Reece</a> if you have any questions!</li>
            </ol>
        </div>

    </div>

    <script src="script.js"></script>
</body>

</html>

EOF
        fi
    fi
end

