document.addEventListener('DOMContentLoaded', () => {
    const feedbackLink = document.getElementById('feedback-link');

    if (!feedbackLink) {
        return;
    }

    feedbackLink.addEventListener('click', async (event) => {
        event.preventDefault();

        const returnUrl = window.location.pathname + window.location.search;

        try {
            const response = await fetch('/feedbackform/return', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({ returnUrl }),
                credentials: 'same-origin',
                redirect: 'follow',
            });

            if (response.ok) {
                window.location.assign(response.url || '/feedbackform/');
            } else {
                window.location.assign('/feedbackform/');
            }
        } catch (error) {
            console.error('Unable to save feedback return URL:', error);
            window.location.assign('/feedbackform/');
        }
    });
});
