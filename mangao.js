$(document).ready(function () {
    $(".wrapper").draggable({ disabled: true });
    $(".wrapper").each(function () {
        //console.log($(this).children(".item"), $(this).children(".item").children("img"));
        $(this).width($(this).children(".item").children("img").width());
        $(this).height($(this).children(".item").children("img").height());
    });


    $(".face").rotatable().resizable({
        start: function (event, ui) {
            this.prevSize = ui.originalSize;
            $(".item", this).each(function () {
                this.originalSize = { width: $(this).width(), height: $(this).height() };
                this.originalPosition = $(this).parent().position();//wrapper�̈ʒu
                console.log(this.originalPosition);
            });
        },
        resize: function (event, ui) {

            var r_x = ui.size.width / ui.originalSize.width;
            var r_y = ui.size.height / ui.originalSize.height;
            console.log(r_x, r_y, ui.size, this.prevSize);
            $(".item", this).each(function () {
                $(this).width(this.originalSize.width * r_x);
                $(this).height(this.originalSize.height * r_y);
                $(this).parent().css({ top: this.originalPosition.top * r_y + "px", left: this.originalPosition.left * r_x + "px" });
                //console.log({ top: this.originalPosition.top * r_y + "px", left: this.originalPosition.left * r_x + "px" });
            });
        }

    });

    $(".item").rotatable().resizable({
        disabled: true,
        resize: function (event, ui) {
            $(this).parent().width(ui.size.width);
            $(this).parent().height(ui.size.height);
        }
    });


    $(".ui-resizable-handle").hide();
    $(".ui-rotatable-handle").hide();
    $(".btn").hide();
    $(".face_wrapper").draggable("enable");


    MANGAO = {};

    MANGAO.editFace = false;
    MANGAO.editHair = false;

    $(".item").mouseover(function () {
        if (MANGAO.editFace) {
            $(this).children(".ui-resizable-handle").show();
            $(this).children(".ui-rotatable-handle").show();
        }
    });

    $(".body").mouseover(function () {
        if (MANGAO.editHair) {
            $(this).children(".ui-resizable-handle").show();
            $(this).children(".ui-rotatable-handle").show();
        }
    });

    $(".item").mouseout(function () {

        $(this).children(".ui-resizable-handle").hide();
        $(this).children(".ui-rotatable-handle").hide();
    });


    $(".face").mouseover(function () {
        if (MANGAO.editFace) {
            $(this).children(".ui-resizable-handle").show();
            $(".btn_pane", this).children(".end_face_btn").show()


        } else if (MANGAO.editHair) {
            $(this).children(".ui-resizable-handle").show();
            $(".btn_pane", this).children(".end_hair_btn").show()
        } else {
            $(this).children(".ui-rotatable-handle").show();
            $(".btn_pane", this).children(".edit_face_btn").show()
            $(".btn_pane", this).children(".edit_hair_btn").show()
        }
    });
    $(".face").mouseout(function () {
        $(this).children(".ui-resizable-handle").hide();
        $(this).children(".ui-rotatable-handle").hide();
        $(".btn_pane", this).children(".btn").hide()
    });

    $(".edit_face_btn").click(function () {
        var face = $(this).parent().parent();
        $(".item", face).parent().draggable("enable");
        $(".item", face).resizable("enable");
        $(face.parent()).draggable("disable");
        $(".hair", face).parent().hide();
        MANGAO.rotation = face.rotate();
        face.rotate(0);
        MANGAO.editFace = true;
    });

    $(".end_face_btn").click(function () {
        var face = $(this).parent().parent();
        $(".item", face).parent().draggable("disable");
        $(".item", face).resizable("disable");
        $(face.parent()).draggable("enable");
        $(".hair", face).parent().show();
        face.rotate(MANGAO.rotation);
        console.log(MANGAO.rotation, face.rotate());
        MANGAO.editFace = false;
    });

    $(".edit_hair_btn").click(function () {
        var face = $(this).parent().parent();
        $(".body", face).parent().draggable("enable");
        $(".body", face).resizable("enable");
        $(face.parent()).draggable("disable");

        MANGAO.rotation = face.rotate();
        face.rotate(0);
        MANGAO.editHair = true;
    });

    $(".end_hair_btn").click(function () {
        var face = $(this).parent().parent();
        $(".body", face).parent().draggable("disable");
        $(".body", face).resizable("disable");
        $(face.parent()).draggable("enable");

        face.rotate(MANGAO.rotation);

        MANGAO.editHair = false;
    });


    $(".eye_angle_p").click(function () {
        $(".r_eye").rotate($(".r_eye").rotate() - 2);
        $(".l_eye").rotate($(".l_eye").rotate() + 2);
    });

    $(".eye_angle_m").click(function () {
        $(".r_eye").rotate($(".r_eye").rotate() + 2);
        $(".l_eye").rotate($(".l_eye").rotate() - 2);
    });


    $(".eyebow_angle_p").click(function () {
        $(".r_eyebow").rotate($(".r_eyebow").rotate() - 2);
        $(".l_eyebow").rotate($(".l_eyebow").rotate() + 2);
    });

    $(".eyebow_angle_m").click(function () {
        $(".r_eyebow").rotate($(".r_eyebow").rotate() + 2);
        $(".l_eyebow").rotate($(".l_eyebow").rotate() - 2);
    });

    $(".eye_height_p").click(function () {
        var r = $(".face").rotate();
        $(".face").rotate(0);
        var r_h = $(".r_eye").height();
        var l_h = $(".l_eye").height();
        $(".r_eye").height(r_h * 1.1);
        $(".l_eye").height(l_h * 1.1);

        console.log($(".l_eye").parent().position().top, l_h * 0.05);
        $(".l_eye").parent().height($(".l_eye").height()).css({ top: $(".l_eye").parent().position().top - l_h * 0.05 + "px" });
        $(".r_eye").parent().height($(".r_eye").height()).css({ top: $(".r_eye").parent().position().top - r_h * 0.05 + "px" });
        $(".face").rotate(r);
    });

    $(".eye_height_m").click(function () {
        var r = $(".face").rotate();
        $(".face").rotate(0);
        var r_h = $(".r_eye").height();
        var l_h = $(".l_eye").height();
        $(".r_eye").height($(".r_eye").height() / 1.1);
        $(".l_eye").height($(".l_eye").height() / 1.1);

        $(".r_eye").parent().height($(".r_eye").height()).css({ top: $(".r_eye").parent().position().top + r_h * 0.05 + "px" });
        $(".l_eye").parent().height($(".l_eye").height()).css({ top: $(".l_eye").parent().position().top + l_h * 0.05 + "px" });
        $(".face").rotate(r);
    });

    $(".face_angle_left").click(function () {
        $(".neck").rotate($(".neck").rotate() + 5, { rotationCenterX: 50, rotationCenterY: -20 });
        $(".face").rotate(-$(".neck").rotate());
        $(".back_hair").rotate($(".neck").rotate() * 0.5, { rotationCenterX: 50, rotationCenterY: $(".back_hair").width() * 0.5 * 100 / $(".back_hair").height() });
    });

    $(".face_angle_right").click(function () {
        $(".neck").rotate($(".neck").rotate() - 5, { rotationCenterX: 50, rotationCenterY: -20 });
        $(".face").rotate(-$(".neck").rotate());
        $(".back_hair").rotate($(".neck").rotate() * 0.5, { rotationCenterX: 50, rotationCenterY: $(".back_hair").width() * 0.5 * 100 / $(".back_hair").height() });
    });

    $(".face_left").click(function () {
        $(".eye").parent().animate({ left: "-=3%" }, "slow");
        $(".nose").parent().animate({ left: "-=10%" }, "slow");
        $(".eyebow").parent().animate({ left: "-=6%" }, "slow");
        $(".neck").parent().animate({ left: "+=10%", top: "-=5%" }, "slow");
        $(".back_hair").parent().animate({ left: "+=3%", width: "+=10%" }, "slow");
    });

    $(".face_right").click(function () {
        $(".eye").parent().animate({ left: "+=3%" }, "slow");
        $(".nose").parent().animate({ left: "+=10%" }, "slow");
        $(".eyebow").parent().animate({ left: "+=6%" }, "slow");
        $(".neck").parent().animate({ left: "-=10%", top: "-=5%" }, "slow");
        $(".back_hair").parent().animate({ left: "-=0%", width: "+=10%" }, "slow");
    });
});