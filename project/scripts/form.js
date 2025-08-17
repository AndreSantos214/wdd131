document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('donationForm');

    loadSavedData();

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim()
        };

        if (!formData.name || !formData.email || !formData.phone) {
            alert('Please fill in all required fields.');
            return;
        }

        saveUserData(formData);

        window.location.href = 'cart.html';
    });
});

function saveUserData(userData) {
    try {
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Data saved to LocalStorage:', userData);
    } catch (error) {
        console.error('Error saving data to LocalStorage:', error);
        alert('Error saving data. Please try again.');
    }
}

function loadSavedData() {
    try {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
            const userData = JSON.parse(savedData);

            if (userData.name) {
                document.getElementById('fullName').value = userData.name;
            }
            if (userData.email) {
                document.getElementById('email').value = userData.email;
            }
            if (userData.phone) {
                document.getElementById('phone').value = userData.phone;
            }
        }
    } catch (error) {
        console.error('Error loading saved data:', error);
    }
}

function clearUserData() {
    localStorage.removeItem('userData');
    console.log('User data removed from LocalStorage');
}

function checkUserData() {
    const userData = localStorage.getItem("userData");

    if (userData) {
        const user = JSON.parse(userData);
        if (user.name && user.phone && user.email) {
            return true;
        }
    }
    return false;
}