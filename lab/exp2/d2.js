$(document).ready(function(){
      $("#addbtn").click(function(){
        $("#adclass").addClass("highlighted");
      });

      $("#getposition").click(function(){
        var position = $("#pele").position();
        var res = "Top: " + position.top + "px, Left: " + position.left + "px";
        $("#result").text(res);
      });

      $("#animatebtn").click(function(){
        $("#animatedBox").animate({
          width: '200px',
          height: '200px',
          opacity: 0.5,
          marginLeft: '50px'
        }, 1000, function() {
          $(this).animate({
            width: '100px',
            height: '100px',
            opacity: 1,
            marginLeft: '0px'
          }, 1000);
        });
      });
    });