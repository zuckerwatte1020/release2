$(function() {

    var count = 1;
    //マウスダウンの位置
    var pos1;
    var pos2;
    //要素位置の修正値
    var posX1;
    var posY1;
    var drag_flg = false;
    var classNm;
    var arryDateJson = [];
    var url = "https://tida.me/test/lyxis/data.php";

    $(document).ready(function(){
        getJson();
    });

    $('#add').on("click", function(){

        var div = document.createElement('div');
        var randomColor = "#" + Math.floor(Math.random() * 0xFFFFFF).toString(16);

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.backgroundColor = randomColor;
        div.style.boxShadow = '0 0 3px #888';
        div.style.position = 'absolute';
        div.style.padding = '2px';
        div.id = 'box';
        div.className = count;

        var w = 595;
        var h = 430;

        var l = Math.floor(Math.random() * w + 8);
        var t = Math.floor(Math.random() * h + 8);

        div.style.top = t + 'px';
        div.style.left = l + 'px';

        $('.div1').append(div);
        count++;

        setJosn(div);

    });

    $('#del').on("click", function(){
        $(".div1").empty();
    });

    $(document).on({

        //マウスを乗せたときの動作
        'mousedown': function(evt1) {

            classNm = '.' + $(this).attr('class');
            
            if(drag_flg == false) {

                //要素の位置取得
                pos1 =  $(classNm).position();
                //要素位置を取得して修正値を計算
                posX1 = evt1.clientX - pos1.left;
                posY1 = evt1.clientY - pos1.top;

                //ドラッグ中にする
                drag_flg = true;
            } else if(drag_flg == true) {

                //要素のドラッグを解除
                drag_flg = false;
            }

        },

        'mousemove' : function(evt2) {

            if (drag_flg == true) {
                $(classNm).css("left",(evt2.clientX - posX1));
                $(classNm).css("top",(evt2.clientY - posY1));
            }
        },

        'dblclick' : function(evt3) {
            drag_flg = false;
        }

    //対象のセレクタを最後に追加
    }, '#box');

    function setJosn(div) {

        var data = 
            {
            'width' : div.style.width,
            'height' : div.style.height,
            'backgroundColor' : div.style.backgroundColor,
            'boxShadow' : div.style.boxShadow,
            'position' : div.style.position,
            'padding' : div.style.padding,
            'id' : div.id,
            'className' : div.className,
            'top' : div.style.top,
            'left' : div.style.left
            };

        arryDateJson.push(data);

        $.ajax ({
            type : 'post',
            url : url,
            data:JSON.stringify(arryDateJson),
            dataType: "json"
        });
    }

    function getJson() {

        $.ajax({
            type : 'GET',
            url : url
        }).done(function(date){
            var tag;
            const obj = JSON.parse(date);
            $.each(obj,
                function(index, val) {

                    var tag = document.createElement('div');
                    tag.style.width = val.width;
                    tag.style.height = val.height;
                    tag.style.backgroundColor = val.backgroundColor;
                    tag.style.boxShadow = val.boxShadow;
                    tag.style.position = val.position;
                    tag.style.padding = val.padding;
                    tag.id = val.id;
                    tag.className = val.className;
                    tag.style.top = val.top;
                    tag.style.left = val.left;

                    $('.div1').append(tag);
                    setJosn(tag);
                });
                count = count + obj.length;

        }).fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.status);
            console.log(textStatus);
            console.log(errorThrown);
        });
    }
});
