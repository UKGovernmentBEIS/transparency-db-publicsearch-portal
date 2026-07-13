document.querySelectorAll('.js-select-all').forEach((selectAllCheckbox) => {
    const group = selectAllCheckbox.closest('.govuk-checkboxes');

    if (!group) {
        console.warn('Select-all checkbox must be inside a .govuk-checkboxes element.');
        return;
    }

    const checkboxes = group.querySelectorAll(
        'input[type="checkbox"]:not(.js-select-all)'
    );

    // Select or deselect every checkbox in this group.
    selectAllCheckbox.addEventListener('change', () => {
        checkboxes.forEach((checkbox) => {
            checkbox.checked = selectAllCheckbox.checked;
        });
    });

    // Update the select-all checkbox when an individual checkbox changes.
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const allChecked =
                checkboxes.length > 0 &&
                Array.from(checkboxes).every((item) => item.checked);

            selectAllCheckbox.checked = allChecked;
        });
    });

    // Set the correct initial state when the page loads.
    selectAllCheckbox.checked =
        checkboxes.length > 0 &&
        Array.from(checkboxes).every((checkbox) => checkbox.checked);
});