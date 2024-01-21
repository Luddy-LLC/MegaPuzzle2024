// Detect Keyboard language and insert text into

const lines = [];
const lineContents = [];

for(let i=1; i<=7; ++i){
    lines.push(document.getElementById("line"+i));
}

const qwertyLayout = ['e', 'd', 'u', '-', 'h', 'z', '=', 'p', ';', ']', '/', '[', 'l', '8', 'w', 's', '5', '9', 'o', '.', '6', 'v', '3', '`', 'g', 'j', 'q', '1', 't', 'y', "'", '\\', '\\', 'k', 'f', 'i', 'r', 'x', 'a', '2', '7', 'm', '4', '0', 'n', 'b', 'c', ','];
const qwertyLayoutRomaji = ['e', 'd', 'u', '-', 'h', 'z', '=', 'p', ';', ']', '/', '[', 'l', '8', 'w', 's', '5', '9', 'o', '.', '6', 'v', '3', '`', 'g', 'j', 'q', '1', 't', 'y', "'", '§', '\\', 'k', 'f', 'i', 'r', 'x', 'a', '2', '7', 'm', '4', '0', 'n', 'b', 'c', ','];
const azertyLayout = ['e', 'd', 'u', ')', 'h', 'w', '=', 'p', 'm', '$', '!', '^', 'l', '_', 'z', 's', '(', 'ç', 'o', ':', '-', 'v', '"', '²', 'g', 'j', 'a', '&', 't', 'y', 'ù', '<', '*', 'k', 'f', 'i', 'r', 'x', 'q', 'é', 'è', ',', "'", 'à', 'n', 'b', 'c', ';'];
const qwertyLayoutUK = ['e', 'd', 'u', '-', 'h', 'z', '=', 'p', ';', ']', '/', '[', 'l', '8', 'w', 's', '5', '9', 'o', '.', '6', 'v', '3', '`', 'g', 'j', 'q', '1', 't', 'y', "'", '\\', '#', 'k', 'f', 'i', 'r', 'x', 'a', '2', '7', 'm', '4', '0', 'n', 'b', 'c', ','];
const qwertyLayoutGerman = ['e', 'd', 'u', 'ß', 'h', 'y', '´', 'p', 'ö', '+', '-', 'ü', 'l', '8', 'w', 's', '5', '9', 'o', '.', '6', 'v', '3', '^', 'g', 'j', 'q', '1', 't', 'z', 'ä', '<', '#', 'k', 'f', 'i', 'r', 'x', 'a', '2', '7', 'm', '4', '0', 'n', 'b', 'c', ','];
const qwertyLayoutLatin = ['e', 'd', 'u', "'", 'h', 'z', '¿', 'p', 'ñ', '+', '-', '´', 'l', '8', 'w', 's', '5', '9', 'o', '.', '6', 'v', '3', '|', 'g', 'j', 'q', '1', 't', 'y', '{', '<', '}', 'k', 'f', 'i', 'r', 'x', 'a', '2', '7', 'm', '4', '0', 'n', 'b', 'c', ','];
const qwertyLayoutSpanish = ['e', 'd', 'u', "'", 'h', 'z', '¡', 'p', 'ñ', '+', '-', '`', 'l', '8', 'w', 's', '5', '9', 'o', '.', '6', 'v', '3', 'º', 'g', 'j', 'q', '1', 't', 'y', '´', '<', 'ç', 'k', 'f', 'i', 'r', 'x', 'a', '2', '7', 'm', '4', '0', 'n', 'b', 'c', ','];
const qwertyLayoutSpanishLegacy = ['e', 'd', 'u', '-', 'h', 'z', '=', 'p', 'ñ', '`', 'ç', '´', 'l', '8', 'w', 's', '5', '9', 'o', '.', '6', 'v', '3', '<', 'g', 'j', 'q', '1', 't', 'y', ';', '[', "'", 'k', 'f', 'i', 'r', 'x', 'a', '2', '7', 'm', '4', '[', '0', 'n', 'b', '<', 'c', ','];
const qwertyLayoutGermanQWERTZMac = ['e', 'd', 'u', 'ß', 'h', 'y', '´', 'p', 'ö', '+', '-', 'ü', 'l', '8', 'w', 's', '5', '9', 'o', '.', '6', 'v', '3', '<', 'g', 'j', 'q', '1', 't', 'z', 'ä', '^', '#', 'k', 'f', 'i', 'r', 'x', 'a', '2', '7', 'm', '4', '^', '0', 'n', 'b', '<', 'c', ','];

// ¡!#$%/&*()


function iteratorEqualsArray(arr, iter){

    let temp = [];

    for(const item of iter){
        temp.push(item);
    }

    return temp.toString() === arr.toString();
}


if ('keyboard' in navigator && 'lock' in navigator.keyboard) { // Supported!
    const keyboard = navigator.keyboard; 




    window.onload = () => {
        keyboard.getLayoutMap().then((keyboardLayoutMap) => {

            console.log(qwertyLayoutGerman);

            let temp = [];

            for(const item of keyboardLayoutMap.values()){
                temp.push(item);
            }

            console.log(temp);

            /*

            US/India/Japanese/Korean: !@#$%^&*()
            France: &é"'(-è_çà
            Germany: !"§$%&/()=
            GermanyQWERTZMac !@#$%^&*()
            UK: !"£$%^&*()
            Latin: !"#$%&/()=
            Spanish: !"·$%&/()=

            */

            if(iteratorEqualsArray(qwertyLayout, keyboardLayoutMap.values()) || iteratorEqualsArray(qwertyLayoutRomaji, keyboardLayoutMap.values())){ // US/India/Japanese/Korean QWERTY
                /*
                !% + @& = #$
                $ + @ = #
                @# + !# = @) 
                !) + *) = &&
                !( + @ = !&
                %# + !* = $(
                !) + !) = @
                */

                lineContents.push("!% + @& = #$");
                lineContents.push("$ + @ = #");
                lineContents.push("@# + !# = @) ");
                lineContents.push("!) + *) = &&");
                lineContents.push("!( + @ = !&");
                lineContents.push("%# + !* = $(");
                lineContents.push("!) + !) = @");

                console.log("Here");

            } else if(iteratorEqualsArray(azertyLayout, keyboardLayoutMap.values())){ // France AZERTY
                /*
                &( + éè = "'
                ' + é = "
                é( + &" = éà
                &à + _à = èè
                &ç + é = &è
                (" + &_ = 'ç
                &à + &à = é
                */

                lineContents.push("&( + éè = \"\'");
                lineContents.push("\' + é = \"");
                lineContents.push("é( + &\" = éà");
                lineContents.push("&à + _à = èè");
                lineContents.push("&ç + é = &è");
                lineContents.push("(\" + &_ = \'ç");
                lineContents.push("&à + &à = é");

            } else if(iteratorEqualsArray(qwertyLayoutGerman, keyboardLayoutMap.values())){ // Germany QWERTY
                /*
                !% + "/ = §$
                $ + " = §
                "% + !§ = "=
                != + (= = //
                !) + " = !/ 
                %§ + !( = $)
                != + != = "
                */

                lineContents.push("<span class=\"puzzle-line-emph\">!%</span> + <span class=\"puzzle-line-emph\">\"/</span> = <span class=\"puzzle-line-emph\">§$</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">$</span> + <span class=\"puzzle-line-emph\">\"</span> = <span class=\"puzzle-line-emph\">§</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">\"%</span> + <span class=\"puzzle-line-emph\">!§</span> = <span class=\"puzzle-line-emph\">\"=</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">!=</span> + <span class=\"puzzle-line-emph\">(=</span> = <span class=\"puzzle-line-emph\">//</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">!)</span> + <span class=\"puzzle-line-emph\">\"</span> = <span class=\"puzzle-line-emph\">!/</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">%§</span> + <span class=\"puzzle-line-emph\">!(</span> = <span class=\"puzzle-line-emph\">$)</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">!=</span> + <span class=\"puzzle-line-emph\">!=</span> = <span class=\"puzzle-line-emph\">\"</span>");

                for(let i=0; i<lines.length; ++i) lines[i].style.fontSize = "12px";

            } else if(iteratorEqualsArray(qwertyLayoutUK, keyboardLayoutMap.values())){ // UK QWERTY
                /*
                !% + "& = £$
                $ + " = £
                "% + !£ = ")
                !) + *) = &&
                !( + " = !& 
                %£ + !* = $(
                !) + !) = "
                */

                lineContents.push("!% + \"& = £$");
                lineContents.push("$ + \" = £");
                lineContents.push("\"% + !£ = \")");
                lineContents.push("!) + *) = &&");
                lineContents.push("!( + \" = !& ");
                lineContents.push("%£ + !* = $(");
                lineContents.push("!) + !) = \"");

            } else if(iteratorEqualsArray(qwertyLayoutLatin, keyboardLayoutMap.values())){ // Latin QWERTY
                /*
                !% + "/ = #$
                $ + " = #
                "% + !# = "=
                != + (= = //
                !) + " = !/ 
                %# + !( = $)
                != + != = "
                */

                lineContents.push("<span class=\"puzzle-line-emph\">!%</span> + <span class=\"puzzle-line-emph\">\"/</span> = <span class=\"puzzle-line-emph\">#$</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">$</span> + <span class=\"puzzle-line-emph\">\"</span> = <span class=\"puzzle-line-emph\">#</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">\"%</span> + <span class=\"puzzle-line-emph\">!#</span> = <span class=\"puzzle-line-emph\">\"=</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">!=</span> + <span class=\"puzzle-line-emph\">(=</span> = <span class=\"puzzle-line-emph\">//</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">!)</span> + <span class=\"puzzle-line-emph\">\"</span> = <span class=\"puzzle-line-emph\">!/</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">%#</span> + <span class=\"puzzle-line-emph\">!(</span> = <span class=\"puzzle-line-emph\">$)</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">!=</span> + <span class=\"puzzle-line-emph\">!=</span> = <span class=\"puzzle-line-emph\">\"</span>");
                
                for(let i=0; i<lines.length; ++i) lines[i].style.fontSize = "12px";

            } else if(iteratorEqualsArray(qwertyLayoutSpanish, keyboardLayoutMap.values())){ // Spanish QWERTY
                /*
                !% + "/ = .$
                $ + " = .
                "% + !. = "=
                != + (= = //
                !) + " = !/ 
                %. + !( = $)
                != + != = "
                */

                lineContents.push("<span class=\"puzzle-line-emph\">!%</span> + <span class=\"puzzle-line-emph\">\"/</span> = <span class=\"puzzle-line-emph\">.$</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">$</span> + <span class=\"puzzle-line-emph\">\"</span> = <span class=\"puzzle-line-emph\">.</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">\"%</span> + <span class=\"puzzle-line-emph\">!.</span> = <span class=\"puzzle-line-emph\">\"=</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">!=</span> + <span class=\"puzzle-line-emph\">(=</span> = <span class=\"puzzle-line-emph\">//</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">!)</span> + <span class=\"puzzle-line-emph\">\"</span> = <span class=\"puzzle-line-emph\">!/</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">%.</span> + <span class=\"puzzle-line-emph\">!(</span> = <span class=\"puzzle-line-emph\">$)</span>");
                lineContents.push("<span class=\"puzzle-line-emph\">!=</span> + <span class=\"puzzle-line-emph\">!=</span> = <span class=\"puzzle-line-emph\">\"</span>");

                for(let i=0; i<lines.length; ++i) lines[i].style.fontSize = "12px";

            } else {
                alert("It seems that your device does not support this puzzle.\n\nPlease contact Matéi Cloteaux at mcloteau@iu.edu");
            }


            // Update the lines
            for(let i=0; i<lineContents.length; ++i){
                lines[i].innerHTML = lineContents[i];
            }

        });
    }
} else { // Unsupported
    alert("It seems that your device does not support this puzzle.\n\nPlease contact Matéi Cloteaux at mcloteau@iu.edu");
}