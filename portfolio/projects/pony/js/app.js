$(document).ready(() => {

    let data = {
        cost: 9.99,
        id: 1
    };

    // Получение количества участников события
    function getAttendeeCount() {
        return $('.attendee-list .row.attendee').length;
    }

    function addAttendee() {
        $('.attendee-list').append(
            $('template[data-template]').html()
        );

        syncRemoveButtons();
    }

    function syncRemoveButtons() {
        if (getAttendeeCount() === 1) {
            $('.attendee-list .attendee .remove-attendee').first().hide();
        } else {
            $('.attendee-list .attendee .remove-attendee').show();
        }
    }

    function syncPurchaseButton() {
        $('#checkout-button span.amount').html(
            '$' + data.cost * getAttendeeCount()
        );
    }

// Функция удаления участника
    function removeAttendee() {
        let btn = event.currentTarget;
        btn.parentElement.parentElement.remove();
        $('#app').trigger('attendee:add');

    }

    //Функция добавления комментария
    function addComment() {
        $('.comment-box').append(
            $('template[data-template="comment"]').html()
        );

    }
    function newComment() {
        addComment();
        $('#-1 img')[0].src='images/guest.png';
        $('#-1 .author').text('Гость');
        $('#-1 .comment').text($('.newcomment').val());
        $('#-1 .likes').text(0);
        $('#-1 .like').on('click',like);
        $('#-1 .remove-comment').on('click', (event) => {
            event.preventDefault();
            removeAttendee();
        });
        $("#-1")[0].id=data.id;
    }

    function like(){
        let btn = event.currentTarget;
        let likes=btn.nextElementSibling.textContent;
        btn.nextElementSibling.innerHTML=+likes+1;
        // btn.parentElement.parentElement.remove();

    }

    // Обработчики событий

    // Событие добавления нового участника
    $('.add-attendee').on('click', (event) => {
        event.preventDefault();
        addAttendee();
        $('#app').trigger('attendee:add');
        //1. Удаление участника

        $('.remove-attendee').on('click', (event) => {
            event.preventDefault();
            console.log('delete');
            removeAttendee();
        });
    });

    $('#app').on('attendee:add', () => {
        syncPurchaseButton();
        syncRemoveButtons();
    });

    // Инициализация формы

    // Крепим цену входного билета
    $('#unit-price').html('$' + data.cost);
    addAttendee();
    syncPurchaseButton();

    //Подгружаем комментарии
    let comments;
    $.ajax({
        method: 'GET',
        dataType: "json",
        url: 'json/comments.json',
        success: (data) => {
            comments = data;
            console.log(comments);
            for (let comment in comments) {
                addComment();
                $('#-1 img')[0].src=comments[comment]['avatar'];
                $('#-1 .author').text(comments[comment]['author']);
                $('#-1 .comment').text(comments[comment]['text']);
                $('#-1 .likes').text(comments[comment]['likes']);
                $('#-1 .like').on('click',like);
                $('#-1 .remove-comment').on('click', (event) => {
                    event.preventDefault();
                    console.log('delete');
                    removeAttendee();
                });
                $("#-1")[0].id=comments[comment]['id'];

            }
        }
    });
//Добавить комментарий
    $('.post').on('click',newComment);
});

Reg