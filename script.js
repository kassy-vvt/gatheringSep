$(document).ready(function() {
    const topics = ["お題1", "お題2", "お題3", "お題4"];
    let count = 0;

    // お題ボタンを押した時の処理
    $(".topicButton").on("click", function() {
        const topicIndex = $(this).index();
        $("#topicDisplay").text(topics[topicIndex]);
        $(".speechButton").removeClass('done');  // 全ボタンのリセット
        count = 0;
        $("#celebration").hide(); // クリアエフェクトを隠す
    });

    // 発言ボタンを押した時の処理
    $(".speechButton").on("click", function() {
        if (!$(this).hasClass('done')) {  // すでに押されたボタンは無視
            $(this).addClass('done');  // 一度押されたらずっと暗くなる
            count++;
            if (count === 4) {
                showCelebration();
            }
        }
    });

    function showCelebration() {
        $("#celebration").show().text("ミッションクリア！");
        setTimeout(function() {
            $("#celebration").fadeOut(); // 3秒後にフェードアウトする
        }, 3000);
    }
});
