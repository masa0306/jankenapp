// playボタン
$('#play_button').on("click",function() {
    console.log('click');
    $('#wrap').fadeIn(500);
    $('#top').fadeOut(500);
    setTimeout(function(){ 
    // playのスクロールダウンのアニメーション
    // https://web-camp.io/magazine/archives/85351
    $('a[href^="#"]').click(function(){
    var speed = 1500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
    });
    }, 500);
});

// ラウンド回数
var roundCounter = 0;

// // 当たりのとき
function correct() {
    console.log('correct');
    $('#result').fadeIn(1000);
    $('#result_text').html("うん、いい判断だ！");
    $('#result_img').hide().fadeIn(1000).attr('src','img/hanji.jpeg');
    $('#result_text').css({
        "fontSize":"100px",
    });
    // $('#result').fadeOut(4000);
    $('#opponent').fadeOut(1000);
    $('#mission').fadeOut(1000);
    $('#player').fadeOut(1000);
    $('#start').fadeIn(1000).text("NEXT").attr('id', 'next');
    $('#next').fadeIn(1000);
    nextgame();
};

// // ハズレのとき
function fault() {
    console.log('fault');
    $('#result').fadeIn(1000);
    $('#result_text').html("目的を見失うな！");
    $('#result_text').fadeIn(1000);
    $('#result_img').hide().fadeIn(1000).attr('src','img/hanji.jpeg');
    $('#result_text').css({
        "fontSize":"100px",
    });
    // $('#result').fadeOut(4000);
    $('#opponent').fadeOut(2000);
    $('#mission').fadeOut(2000);
    $('#player').fadeOut(1000);
    $('#start').fadeIn(1000).text("NEXT").attr('id', 'next');
    $('#next').fadeIn(1000);
    nextgame();
};

// // ゲーム再開
function nextgame(){
$('#next').on("click", function() {
    console.log('start_again');
    $('#result').fadeOut(1000);
    $('#next').fadeOut(1000);
    $('#opponent').fadeIn(2000);
    $('#mission').fadeIn(2000);
    $('#player').fadeIn(2000);
    countdown();
    roundCounter++;
})};

// 相手の手がランダム現れる関数
var random_opponent;
function opponent(){
    console.log('opponent');
    // https://forsmile.jp/javascript/1623/ windowについては今度詳しく調べる
    random_titan = Math.floor(Math.random()*6+1)
    $('#opponent_img').hide().fadeIn(1000).attr('src','img/opponent/'+random_titan+'.png');
    console.log(random_titan);
    random_opponent = Math.floor(Math.random()*3+1)
    if (random_opponent===1){
        $("#titan_height").hide().fadeIn(1000).html("通常種　11m級");
    }else if(random_opponent===2){
        $("#titan_height").hide().fadeIn(1000).html("奇行種　15m級");
    }else if(random_opponent===3){
        $("#titan_height").hide().fadeIn(1000).html("通常種　20m級");  
    };
};

// ミッションが乱数で現れる
var missionNum
function mission(){
    window.missionNum = Math.floor(Math.random()*3+1);
    console.log('mission');
    $('#mission_text').removeAttr('style');
    $('#mission_text').hide().fadeIn(1000);
        if(missionNum === 1){
            var mission1 = "奇行種は生け捕りに、<br>それ以外は撤退だ！"
            $("#mission_text").html(mission1);
            $('#hukidashi').hide().fadeIn(1000).attr('src','img/hukidashi.png');
            $("#mission_text").css({
                "padding":"50px",
            });
            console.log(mission1);
        }else if(missionNum === 2){
            var mission2 = "15m以下なら討伐せよ！<br>無理なら一旦引くんだ！"
            $("#mission_text").html(mission2);
            $('#hukidashi').hide().fadeIn(1000).attr('src','img/hukidashi.png');
            $("#mission_text").css({
                "padding":"50px",
            });
            console.log(mission2);
        }else if(missionNum === 3){
            var mission3 = "奇行種なら一旦引け！<br>それ以外は生け捕りだ！"
            $("#mission_text").html(mission3);
            $('#hukidashi').hide().fadeIn(1000).attr('src','img/hukidashi.png');
            $("#mission_text").css({
                "padding":"50px",
            });
            console.log(mission3);
        }
        $('#mission_text').animate({
            fontSize:24,
        },1000);
};

// 次のゲームの開始

// 時間制限の表示
function countdown(){
    var limitTime = 10;//制限時間
    var startTime = Date.now(); //現在時刻
    var timeDiff; //差分用  
    console.log("タイマー開始")
    timeDiff = Date.now() - startTime;
    timeDiff = limitTime - (timeDiff / 1000);
    timeDiff *= 100;
    timeDiff = Math.floor(timeDiff);
    timeDiff = timeDiff / 100;
    //console.log(timeDiff/100);
    //document.getElementById("timer").innerText = timeDiff/100+" sec";
    $('#sec').html(timeDiff);
    console.log("表示開始");
    var id = setInterval(function () {
        countdown();
        if (timeDiff <= 0) {
            clearInterval(id);
            $('#sec').text("終了");
            fault();
        }
    }, 1);
};

// じゃんけん
function janken(){
    console.log('janken');
    $('#toubatsu').on("click",function() {
        console.log('討伐を選択');
        if(random_opponent===1){
            if(missionNum=== 1){
                correct();
            }else if(missionNum === 2){
                correct();
            }else if(missionNum === 3){
                fault();
            }
        }
        else if(random_opponent===2){
            if(missionNum=== 1){
                fault();
            }else if(missionNum === 2){
                correct();
            }else if(missionNum === 3){
                fault();
            }
        }
        if(random_opponent===3){
            if(missionNum=== 1){
                correct();
            }else if(missionNum === 2){
                correct();
            }else if(missionNum === 3){
                fault();
            }
        }
    });

    $('#ikedori').on("click",function() {
        console.log('生け捕りを選択');
        if(random_opponent===1){
            if(missionNum=== 1){
                fault();
            }else if(missionNum === 2){
                fault();
            }else if(missionNum === 3){
                correct();
            }
        }
        else if(random_opponent===2){
            if(missionNum=== 1){
                correct();
            }else if(missionNum === 2){
                fault();
            }else if(missionNum === 3){
                fault();
            }
        }
        else if(random_opponent===3){
            if(missionNum=== 1){
                fault();
            }else if(missionNum === 2){
                fault();
            }else if(missionNum === 3){
                correct();
            }
        }
    });

    $('#nigeru').on("click",function() {
        console.log('逃げるを選択');
        if(random_opponent===1){
            if(missionNum=== 1){
                fault();
            }else if(missionNum === 2){
                fault();
            }else if(missionNum === 3){
                fault();
            }
        }
        else if(random_opponent===2){
            if(missionNum=== 1){
                fault();
            }else if(missionNum === 2){
                fault();
            }else if(missionNum === 3){
                correct();
            }
        }
        else if(random_opponent===3){
            if(missionNum=== 1){
                fault();
            }else if(missionNum === 2){
                correct();
            }else if(missionNum === 3){
                fault();
            }
        }
    });
};

// ゲーム終了
function endGame(){
    alert('Finish！');
}

$(document).ready(function() {
    // じゃんけんのボタンのイベントハンドラを一度だけ設定する
    // 初期表示非表示
    $('#wrap').hide();
    $('#result').hide();
    janken();
    $('#start').on("click", function() {
        console.log('start');
        $('#start').fadeOut(1000);
        opponent();
        mission();
        countdown();
    });
    console.log("回数"+roundCounter);
    if (roundCounter > 5) {
        endGame();
        };
});

// イベントハンドラの問題が発生したのでコメントアウトhttps://chat.openai.com/c/a74ac0a2-d48b-4eb3-8ae4-b1f8e74591a4
// $('#start').on("click",function() {
//     console.log('start');
//     opponent();
//     mission();
//     janken();
// });
