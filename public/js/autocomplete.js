function setupAutocomplete(inputId, autocompleteId) {
    const input = document.getElementById(inputId);
    const autocompleteDiv = document.getElementById(autocompleteId);
    let currentFocus = -1;

    input.addEventListener('input', async function(e) {
        const val = this.value;
        closeAllLists();
        if (!val) return;

        try {
            const response = await fetch('/autocomplete?q=' + encodeURIComponent(val));
            const items = await response.json();

            items.forEach(item => {
                const div = document.createElement('div');
                div.innerHTML = item;
                div.addEventListener('click', function(e) {
                    input.value = item;
                    closeAllLists();
                });
                autocompleteDiv.appendChild(div);
            });
        } catch (error) {
            console.error('Error fetching autocomplete suggestions:', error);
        }
    });

    input.addEventListener('keydown', function(e) {
        const x = autocompleteDiv;
        if (!x) return;
        const items = x.getElementsByTagName('div');
        if (e.keyCode === 40) { // down
            currentFocus++;
            addActive(items);
        } else if (e.keyCode === 38) { // up
            currentFocus--;
            addActive(items);
        } else if (e.keyCode === 13 && currentFocus > -1) { // enter
            e.preventDefault();
            if (items) items[currentFocus].click();
        }
    });

    function addActive(items) {
        if (!items) return;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = items.length - 1;
        items[currentFocus].classList.add('autocomplete-active');
    }

    function removeActive(items) {
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove('autocomplete-active');
        }
    }
}

function closeAllLists() {
    const autocompleteItems = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < autocompleteItems.length; i++) {
        autocompleteItems[i].innerHTML = '';
    }
}

document.addEventListener('click', function(e) {
    closeAllLists();
});

setupAutocomplete('fromInput', 'fromAutocomplete');
setupAutocomplete('toInput', 'toAutocomplete');
