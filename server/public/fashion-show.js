document.addEventListener('DOMContentLoaded', function() {
    var modal = document.getElementById('registration-modal');
    var closeButton = document.querySelector('.close-button');
    var competitionButtons = document.querySelectorAll('.competition-button');

    competitionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            modal.style.display = 'block';
            document.getElementById('registration-form').dataset.competition = this.dataset.competition;
        });
    });

    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    document.getElementById('registration-form').onsubmit = function(event) {
        event.preventDefault();
        var competition = this.dataset.competition;
        var fileInput = document.getElementById('upload-file');
        var file = fileInput.files[0];
        if (file) {
            alert('Registered for ' + competition + ' competition with file: ' + file.name);
            modal.style.display = 'none';
        } else {
            alert('Please upload a file to register.');
        }
    };
});
