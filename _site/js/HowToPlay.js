P2Game.HowToPlay = function (game) {

    this.pizza;
    this.refrigerator;
    this.mushroom_feeze;
    this.mushroom2_feeze;
    this.atari;
    this.sonic;
    this.changeTimer;

};

P2Game.HowToPlay.prototype = {

preload: function () {

    this.load.image('atari', 'assets/mushroom_2.png');
    this.load.image('sonic', 'assets/mushroom.png');
    this.load.image('pizza', 'assets/pizza_blank.png');
    this.load.image('refrigerator','assets/refrigerator.png');
    this.load.image('mushroom_feeze', 'assets/mushroom_2.png');
    this.load.image('mushroom2_feeze', 'assets/mushroom.png');
    this.load.image('human', 'assets/human.png');

},

create: function () {
    count_c = 0;
    check_state = true;
    count_sonic = 0;
    count_atari = 0;
    random_number = 0;
    random_number_ff = 0;
    header.visible =! header.visible;
    button_play.visible =! button_play.visible;


    pizza = game.add.sprite(180, 80, 'pizza');
    pizza.scale.setTo(0.8,0.8);

    human = game.add.sprite(0,150, 'human')
    human.scale.setTo(0.7,0.7)

    refrigerator = game.add.sprite(600, 280, 'refrigerator')
    refrigerator.scale.setTo(0.75,0.75)

    mushroom_feeze = game.add.sprite(650, 290, 'mushroom_feeze')
    mushroom_feeze.scale.setTo(0.15,0.15)

    random_number = Math.floor((Math.random() * 10) + 1);
    random_number_ff = Math.floor((Math.random() * 10) + 1);

    mushroom_feeze_q = game.add.sprite(15, 350, 'mushroom_feeze')
    mushroom_feeze_q.scale.setTo(0.15,0.15)


    text_header = game.add.text(270, 20, 'เห็นเลขซ้ายล่างนั้นไม' , { font: "30px Arial", fill: "#FF4500", align: "center" });

    text_mushroom = game.add.text(75, 360, ' = ' + '2' , { font: "40px Arial", fill: "#FF4500", align: "center" });
    //var text_mushroom = game.add.text(75, 460, ' = ' + random_number_ff , { font: "40px Arial", fill: "#FF4500", align: "center" });

    var group = game.add.group();
    group.inputEnableChildren = true;

    var atari = [];
    var sonic = [];
    for(var i = 0 ;i < 5;i++){
        atari[i] = group.create(650, 290, 'atari');
        atari[i].scale.setTo(0.15,0.15);
        atari[i].inputEnabled = true;
        atari[i].input.enableDrag();
        atari[i].events.onDragStart.add(this.onDragStart, this);
        atari[i].events.onDragStop.add(this.onDragStop, this);
    }
    //  Enable input and allow for dragging
    //group.onChildInputDown.add(onDown, this);
    timer = game.time.create(false);
    timer.loop(2500, this.updateCounter, this);
    timer.start();
},
 updateCounter : function() {
    if(count_c == 1){
        text_header.setText("ลองใส่อีกอันดู");
        timer.destroy();
    }else if(count_c == 2){
        text_header.setText("มีปุ่มมาแล้วกดดูสิ");
        button_ok = game.add.button(300, 450, 'button_ok', this.gotoMenu, this, 2, 1, 0);
        button_ok.scale.setTo(0.1,0.1);
        button_ok.input.enabled = true;
        check_state = false;
    }else{
        text_header.setText("ลองลากข้างซ้ายดูสิ");
        timer.destroy();
    }

},

onDragStart : function (sprite, pointer) {

result = "Dragging " + sprite.key;

},

onDragStop : function (sprite, pointer) {


if (checkOverlap(sprite, pizza))
{
    //sprite.destroy();
    if(sprite.key == 'sonic'){
        count_sonic += 1
        //sprite.input.enabled = false;
        sprite.events.onInputDown.add(remove, this);
        sprite.sendToBack();
    }
    else if (sprite.key == 'atari'){
        count_atari += 1
        //sprite.input.enabled = false;
        sprite.events.onInputDown.add(remove, this);
        sprite.sendToBack();
    }
}

result = sprite.key + " dropped at x:" + pointer.x + " y: " + pointer.y + ' sonic ' + count_sonic + ' atari ' + count_atari + 'random' + random_number;

if (pointer.y < 110 || pointer.y > 500)
{
    console.log('input disabled on', sprite.key);
    sprite.input.enabled = false;
    //sprite.destroy();
    sprite.sendToBack();
}

if(count_atari == 1){
    text_header.setText("นับดูสิได้เท่าไรแล้ว");
    count_c = 1;
    timer = game.time.create(false);
    timer.loop(2500, this.updateCounter, this);
    timer.start();
}else if(count_atari == 2){
    text_header.setText("เก่งมากเลย");
    count_c = 2;
    timer = game.time.create(false);
    timer.loop(2500, this.updateCounter, this);
    timer.start();
}
/*
else if(check_state){
    if(sprite.key == 'sonic'){
        count_sonic += 1
        //sprite.input.enabled = false;
        sprite.events.onInputDown.add(remove, this);
        sprite.sendToBack();
    }
    else if (sprite.key == 'atari'){
        count_atari += 1
        //sprite.input.enabled = false;
        sprite.events.onInputDown.add(remove, this);
        sprite.sendToBack();
    }
}*/

},

gotoMenu: function () {

    this.state.start('Menu');

},

gotoStateC: function () {

    //this.state.start('StateC');

},

update: function () {
    if(random_number == count_atari && random_number_ff == count_sonic){
        //this.game.input.enabled = false;
        button_ok = game.add.button(300, 450, 'button_ok', this.gotoStateB, this, 2, 1, 0);
        button_ok.scale.setTo(0.1,0.1);
        button_ok.input.enabled = true;
        check_state = false;
    }


},

render: function () {

    //this.game.debug.text(result, 10, 20);

}

};
