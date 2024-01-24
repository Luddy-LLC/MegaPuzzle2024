function switchCypher() {
    const text = document.getElementById('cypher');
    const btn = document.getElementById('reveal');
    if (text.innerText.includes('Aovbno')) {
        text.innerText = "Though the Lake of Lerna may be empty, this Cube of Creation fills aplenty."
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    } else {
        text.innerText = "Aovbno aol Shrl vm Slyuh thf il ltwaf, aopz Jbil vm Jylhapvu mpssz hwsluaf."
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
    }
}