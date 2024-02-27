function switchCypher() {
    const text = document.getElementById('cypher');
    const btn = document.getElementById('reveal');
    if (text.innerText.includes('Dpao')) {
        text.innerText = "With spindly hand a thin line it does tread, weaving a quite different kind of thread."
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    } else {
        text.innerText = "Dpao zwpuksf ohuk h aopu spul pa kvlz aylhk, dlhcpun h xbpal kpmmlylua rpuk vm aoylhk. "
        btn.classList.remove('btn-secondary');
        btn.classList.add('btn-primary');
    }
}