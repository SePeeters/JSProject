// Schrijf hier je JavaScript code

my_game = []

totalpoints = -1

let click_cycle = 0

let firstplayersturn = -1

let lastclick = []

let currentclick = []

let flipped = []

let player1points = 0

let player2points = 0

level1 = [
    ["A", "B", "C"],
    ["B", "C", "A"]
]

level2 = [
    ["A", "B", "C", "C"],
    ["B", "D", "A", "E"],
    ["E", "F", "F", "D"]
]

level3 = [
    ["A", "B", "C", "C", "G"],
    ["B", "D", "A", "E", "H"],
    ["E", "F", "F", "D", "H"],
    ["I", "J", "G", "I", "J"]
]

//window.onload = function(){
//    draw_game(my_game);
//}

function draw_game(game){
    //
    let game_html = generate_game_html(game);
    document.getElementById("game_container").innerHTML = game_html;
    let notify_html = generate_notif_html();
    document.getElementById("whos_turn").innerHTML = notify_html
    let scoreboard_html = generate_scoreboard_html();
    document.getElementById("scoreboard").innerHTML = scoreboard_html
}

function generate_notif_html(){
    if (firstplayersturn == -1){
        randvalue = Math.floor(Math.random()*2)
        if (randvalue == 1){
            firstplayersturn = true
        }
        else if (randvalue == 0){
            firstplayersturn = false
        }
    }
    if (firstplayersturn == false){
        return "<div id="+'"player2_counter"'+">It is player 2's turn.</div>"
    }
    if (firstplayersturn == true){
        return "<div id="+'"player1_counter"'+">It is player 1's turn.</div>"
    }
}

function generate_scoreboard_html(){
    return "<div id="+'"player1_counter"'+"> Player 1 has found "+ player1points + " pairs.</div>"+"<div id="+'"player2_counter"'+"> Player 2 has found "+ player2points + " pairs.</div>"
}

function generate_game(length, width){
    click_cycle = 0
    lastclick = []
    currentclick = []
    flipped = []
    my_game = []
    firstplayersturn = -1
    player1points = 0
    player2points = 0
    let multvalue = length*width
    let order = ""
    if (multvalue == 6){
        totalpoints = 3
        order = stringshuffle("AABBCC")
    }
    if (multvalue == 12){
        totalpoints = 6
        order = stringshuffle("AABBCCDDEEFF")
    }
    if(multvalue == 20){
        totalpoints = 10
        order = stringshuffle("AABBCCDDEEFFGGHHIIJJ")
    }
    let ordercounter = 0
    for (let i = 0; i < length; i++){
        if (my_game.length <= i){
            my_game.push([])
        }
        for (let j = 0; j < width; j++){
            my_game[i].push(order[ordercounter])
            ordercounter += 1
        }
    }
    draw_game(my_game)
}

function stringshuffle(string){
    //dit is de Fisher-Yates shuffle
    const characters = string.split('');
    for (let i = characters.length -1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [characters[i],characters[j]] = [characters[j],characters[i]];
    }
    return characters.join('')
}

function tile_click_handler(positionx, positiony){
    if (click_cycle < 2){
        if (currentclick == []){
            currentclick = [positionx, positiony]
        }
        else{
            lastclick = [currentclick[0],currentclick[1]]
            currentclick = [positionx, positiony]
        }
        click_cycle += 1
        draw_game(my_game)
    }
}

function check_victory(){
    if (player1points+player2points == totalpoints){
        setTimeout(alertfunction(), 0)
    }
}

function alertfunction(){
    if (player1points < player2points){
        alert("Player 2 is the winner.")
    }
    if (player2points < player1points){
        alert("Player 1 is the winner.")
    }
    if (player1points == player2points){
        alert("It is a tie.")
    }
}

function calculate_equal(){
    changeturn = true
    if (click_cycle == 2){
        if (my_game[currentclick[0]][currentclick[1]] == my_game[lastclick[0]][lastclick[1]]){
            flipped.push(currentclick)
            flipped.push(lastclick)
            changeturn = false
            if (firstplayersturn == true){
                player1points += 1
            }
            else if (firstplayersturn == false){
                player2points += 1
            }

        }
        click_cycle = 0
        lastclick = []
        currentclick = []
        if (changeturn == true){
            if (firstplayersturn == true){
                firstplayersturn = false
            }
            else if (firstplayersturn == false){
                firstplayersturn = true
            }
        }
        draw_game(my_game)
        check_victory()
    }
}

function generate_game_html(game){
    //

    let table_inside = "";
    for( let i =0; i < game.length; i++){
        let table_row = "<tr>"
        for (let j = 0; j < game[i].length; j++){
            tile_is_flipped = false
            for(let q = 0; q <flipped.length; q++){
                if (i == flipped[q][0] && j == flipped[q][1]){
                    table_row += '<td class="flipped">'+game[i][j]+"</td>"
                    tile_is_flipped = true                
                }
            }
            if (i == lastclick[0] && j == lastclick[1]){
                table_row += '<td onclick="calculate_equal()" class="flipped">'+game[i][j]+"</td>"
            }
            else if (i == currentclick[0] && j == currentclick[1]){
                table_row += '<td onclick="calculate_equal()" class="flipped">'+game[i][j]+"</td>"
            }
            else if (tile_is_flipped == false){
                table_row += '<td class="unflipped" onclick="tile_click_handler('+i+','+j+')" ></td>'
            }
        }
        table_row += "</tr>"
        table_inside += table_row
    }
    return "<table>"+table_inside+"<table>"
}


function level(numberindicator){
    click_cycle = 0
    lastclick = (-1,-1)
    currentclick = (-1,-1)
    flipped = []
    firstplayersturn = -1
    player1points = 0
    player2points = 0
    if (numberindicator == 1){
        totalpoints = 3
        my_game = level1
    }
    if (numberindicator == 2){
        totalpoints = 6
        my_game = level2
    }
    if (numberindicator == 3){
        totalpoints = 10
        my_game = level3
    }
    draw_game(my_game)
}
