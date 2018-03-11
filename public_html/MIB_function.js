
$(function ()
{
    /*
     *global variable will be used later to test if (cow) or (car) is under_conrol()
     * this varialbe will be seted to 1 after testing if (cow) or (car) is under control
     * and will be rested to 0 when seting a new position for(cow) or (car)
     */
    var controlled = 0;
     
     
    //initial space_ship positions 
    $('#space_ship').css('left','200px');
    $('#space_ship').css('top','150px');
    
    
    
    $(document).keydown(function (e)
    {
        //get space_ship positions left and top
        var space_ship_x = parseInt($('#space_ship').css("left"));
        var space_ship_y = parseInt($('#space_ship').css('top'));

        if (e.which === 39) // moving right
        {
            //with if statement, space_ship will not overlap
            if (space_ship_x < 475)
            {
                //moving space_ship by 20px to the right
                $('#space_ship').css('left', space_ship_x + 20);
            }
        }

        if (e.which === 37) //moving left
        {
            if (space_ship_x > 0)
            {
                $('#space_ship').css('left', space_ship_x - 20);
            }
        }

        if (e.which === 38) // moving top
        {
            if (space_ship_y > 0)
            {
                $('#space_ship').css('top', space_ship_y - 20);
            }
        }

        if (e.which === 40) //moving bottom
        {
            if (space_ship_y < 223)
            {
                $('#space_ship').css('top', space_ship_y + 20);
            }
        }
    });

    //function to choose between number 1 or 2, the returned value will be used later
    function random_one()
    {
        var random_nbr = Math.floor((Math.random() * 2) + 1);
        return random_nbr;
    }

    
     //set a RANDOM new position for (cow) and display:none for (car)   
    function new_position_cow()
    {
        var random_position_top = Math.floor((Math.random() * 284) + 0);
        var random_position_left = Math.floor((Math.random() * 550) + 0);

        $('#cow').show();
        $('#cow').css('top', random_position_top);
        $('#cow').css('left', random_position_left);
        $('#car').css('display', 'none');
    }

    //set a RANDOM new position for (car) and display:none for (cow)
    function new_position_car()
    {
        var random_new_position_top = Math.floor((Math.random() * 287) + 0);
        var random_new_position_left = Math.floor((Math.random() * 544) + 0);

        $('#car').show();
        $('#car').css('top', random_new_position_top);
        $('#car').css('left', random_new_position_left);
        $('#cow').css('display', 'none');
    }


    /*
     * this function will test if (cow) or (car) is under space_ship and will ::
     * - increment score value by 1 if the cow is under control
     * - decrement score value bu 2 if the car is under control
     */
    function elem_under_control()
    {
        //test if the car is display:none to get car positions
        if ($('#car').css('display') === 'none')
        {
            car_or_cow = "cow";
            var elem_x = parseInt($('#cow').css('left'));
            var elem_y = parseInt($('#cow').css('top'));
        }

        //test if the cow is display:none to get cow positions
        if ($('#cow').css('display') === 'none')
        {
            car_or_cow = "car";
            var elem_x = parseInt($('#car').css('left'));
            var elem_y = parseInt($('#car').css('top'));
        }

        
        var space_ship_x = parseInt($('#space_ship').css('left'));
        var space_ship_y = parseInt($('#space_ship').css('top'));

        if ((elem_x > space_ship_x - 20) && (elem_x < (space_ship_x + 125 - 50 + 20))
                && (elem_y > space_ship_y - 20) && (elem_y < (space_ship_y + 177 - 116 + 20))
                && controlled === 0)
        {
            //set controlled value to 1
            controlled = 1;
            
            var score = parseInt($('#score').text());

            if (car_or_cow === 'cow')
            {
                score++;
                $('#score').text(score);
                score_animation($('#score'));
            }

            if (car_or_cow === 'car')
            {
                score = score - 2;
                $('#score').text(score);
                score_animation($('#score'));
            }
        }
    }
    
    
    /*
     * animate the score value when incrementing or decrementing it
     * sel parameter is a selector
     */
    function score_animation(sel)
    {
        sel.animate({'font-size': '10vw', 'opacity': '0.2'}, 250)
                .animate({'font-size': '5vw', 'opacity': '1'}, 250);
    }

    
     /*
      * get the returned value of random_one() function,
      * if the value == 1 it will set the new position for (cow)
      * if the value == 2 it will set the new position for (car)
      */
    function new_position()
    {
        //reset controlled value to 0
        controlled = 0;
        
        var random_nbr = random_one();
        window.setInterval(random_nbr, 3000);

        if (random_nbr === 1)
        {
            new_position_cow();
        }
        if (random_nbr === 2)
        {
            new_position_car();
        }
    }

    //recall elem_under_control() every 150ms
    window.setInterval(elem_under_control, 150);
    
    //set a new position every 3000ms (3seconds)
    window.setInterval(new_position, 3000);
});
