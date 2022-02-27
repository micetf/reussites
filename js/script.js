$(document).ready(function(){

    var wSection = $(document).innerWidth(),
        wEtiquette = parseInt(wSection / 11, 10),
        hSection = $(window).innerHeight() - 50,
        hHeader = parseInt($('header').outerHeight(), 10),
        hFooter = parseInt($('footer').outerHeight(), 10),
        plage,
        melange = [],
        trouve = [],
        melanger = function () {
            var i = 0,
                j = 0,
                nombre = -1;

            melange = []; 
            trouve = [];
            for (i = 0; i < 10; i = i + 1) {
                nombre = -1;
                while (nombre ===-1) {
                    nombre = 1 + Math.floor(Math.random() * 1000 ) % 10;
                    for (j = 0; j < melange.length; j = j + 1) {
                        if (melange[j] === nombre) {
                            nombre=-1;
                        }
                    }
                };
                melange.push(nombre);
            }
        },
        init = function () {
            $("#recommencer").hide();
            melanger();
            plage = parseInt($("input[name=plage]:checked").val(), 10);       
            $('canvas').each(function () {
                var ctx = this.getContext('2d');
                this.width = wEtiquette;
                this.height = wEtiquette;
                ctx.fillStyle = (this.id === 'tirage') ? '#1A3540' : '#F2DCB3';
                ctx.lineWidth = 4;
                ctx.strokeStyle = '#1A3540';
                ctx.fillRect(0, 0, wEtiquette, wEtiquette);
                ctx.strokeRect(0, 0, wEtiquette, wEtiquette);
            });
        },
        ecrireEtiquette = function(txt, ctx, bg, c) {
            if (isNaN(txt)) {
                ctx.font = (wEtiquette / 4) + "px Arial";            
            } else {
                ctx.font = (wEtiquette / 2) + "px Arial";
                txt = parseInt(txt, 10) + plage;
            }
            ctx.fillStyle = bg;
            ctx.lineWidth = 4;
            ctx.strokeStyle = '#1A3540';
            ctx.fillRect(0, 0, wEtiquette, wEtiquette);
            ctx.strokeRect(0, 0, wEtiquette, wEtiquette);
            ctx.fillStyle = c;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(txt, wEtiquette / 2, wEtiquette / 2);
        };
    
    hSection =hSection - (hHeader + hFooter);
    $('section').height(hSection);

    $('#file canvas').click(function() {
        var position=$(this).index();

        if ($("#file #tirage").length !== 0) {
            ecrireEtiquette("",$("#carte canvas").get(0).getContext("2d"), '#F2DCB3', '#F2DCB3');
            $("#carte canvas").insertBefore("#tirage");
            $("#carte canvas").draggable({disabled : true});
            $("#carte").append($("#tirage"));
        }

        $('#carte').append(this);

        if (position !== 9) {
            $("#tirage").insertBefore("#file canvas:eq("+position+")");
        } else {
            $("#file").append($("#tirage"));            
        }
        ecrireEtiquette(melange[position], $("#carte canvas").get(0).getContext("2d"), '#F2B28D', '#1A3540');
        $("#carte canvas").draggable({disabled : false});

    }).droppable({
        drop : function(event, ui) {
            var iTirage=$("#file #tirage").index();
            var nTirage=melange[iTirage];
            var nCible=1+$(this).index();
            if (nCible!=nTirage) {
                alert('erreur');
                $(ui.draggable).css({position:'relative',top:'0px',left:'0px'});
            } else {
                alert('ok');
                trouve.push(true);
                $(ui.draggable).insertBefore(this);
                $(ui.draggable).css({position:'relative',top:'0px',left:'0px'}).draggable({disabled:true});
                $('#carte').append($(this));
                if (this.id!='tirage') {
                    var tmp=melange[nCible-1];
                    melange[nCible-1]=nTirage;
                    melange[iTirage]=tmp;
                    ecrireEtiquette(melange[iTirage],$("#carte canvas").get(0).getContext("2d"),'#F2B28D','#1A3540');
                    $(this).draggable({disabled:false});
                } else {
                    if (trouve.length==10) {
                        ecrireEtiquette("Bravo !",$("#carte canvas").get(0).getContext("2d"),'#1A3540','#F2DCB3');
                        $("#recommencer").show();
                    };
                }
            }
        }
    });
    
    $("#recommencer").click(function () {
        init();
    });
    
    $("[name=plage]").change(function() {
        var position = $("#file #tirage").index();
        $("#file").append($("#carte canvas"));
        $("#carte").append($("#tirage"));
        init();
    });
    
    init();
    $("#contact").contact();
});
