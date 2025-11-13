$(document).ready(function () {


    $('#addBtn').click(function () {
        let taskText = $('#taskInput').val().trim();

        if (taskText !== "") {

            $('#taskList').append(
                <li>${taskText} <button class="delete">not done</button></li>
            );


            $('#taskInput').val('');
        } else {
            alert("Please enter a task!");
        }
    });


    $(document).on('click', 'li', function () {
        $(this).toggleClass('completed');
    });


    $(document).on('click', '.delete', function (event) {
        event.stopPropagation();
        $(this).parent().fadeOut(300, function () {
            $(this).remove();
        });
    });

});