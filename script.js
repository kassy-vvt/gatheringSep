$(document).ready(function() {
    const topics = ["「直近の悩み」を話せ", "「QAの未来」について語れ",  "「GDPの未来」を語れ", "「これはハラスメント？」を語れ"];
    let count = 0;
    let lastClickTime = 0;  // 最後にボタンを押した時間を記録

    // お題ボタンを押した時の処理
    $(".topicButton").on("click", function() {
        console.log("button pressed");
        const topicIndex = $(this).index();
        $("#topicDisplay").text(topics[topicIndex]);
        resetState();  // 状態をリセット
    });

    // 発言ボタンを押した時の処理
    $(".speechButton").on("click", function() {
        const currentTime = Date.now();  // 現在の時間をミリ秒で取得
        const timeDifference = currentTime - lastClickTime;

        if (timeDifference < 2000) {  // 1秒以内に連続で押された場合
            showPenalty();
            return;
        }

        lastClickTime = currentTime;  // 現在のクリック時間を記録

        if (!$(this).hasClass('done')) {  // すでに押されたボタンは無視
            $(this).addClass('done');  // 一度押されたらずっと暗くなる
            $("#doshu")[0].play();  // 効果音を再生
            count++;
            if (count === 4) {
                showCelebration();
            }
        }
    });

    function showCelebration() {
        setTimeout(function() {
            $("#celebration").show().text("ミッションクリア！");
            $("#fanfare")[0].play();  // ファンファーレの音を再生
            setTimeout(function() {
                $("#celebration").fadeOut(); // 3秒後にフェードアウト
                resetState();  // 状態を初期化
            }, 5000);
        }, 5000);
    }

    function showPenalty() {
        $("#penalty").fadeIn().text("ペナルティ！");  // ペナルティ画面をフェードインで表示
        $("#horror")[0].play();  // ペナルティの効果音を再生
        setTimeout(function() {
            $("#penalty").fadeOut();  // 3秒後にフェードアウト
        }, 6000);
    }

    // 状態をリセットする関数
    function resetState() {
        $(".speechButton").removeClass('done');  // ボタンの色を初期化
        // $("#topicDisplay").text("お題");  // お題表示を初期状態に戻す
        count = 0;  // カウントリセット
        lastClickTime = 0;  // タイマーリセット
    }
});
