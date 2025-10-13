$(document).on("selectstart", function(e) { e.preventDefault(); });

$(document).on("keydown", function(e) {
    if (e.ctrlKey && e.keyCode === 67) e.preventDefault();
});

 $(document).ready(function() {
            // 1. Disable the right-click menu
            $(document).on("contextmenu", function(e) {
                e.preventDefault();
            });

            // 2. Display and hide a message
            $("#showBtn").click(function() {
                $("#messageDiv").show('slow');
            });
            $("#hideBtn").click(function() {
                $("#messageDiv").hide('slow');
            });

            // 3. Change paragraph color on mouseover
            $(".hover-para").mouseover(function() {
                $(this).css("color", "red");
            });
            $(".hover-para").mouseout(function() {
                $(this).css("color", "#333");
            });

            // 4. Click an image to scroll to the top
            $("#scrollToTopBtn").click(function() {
                $("html, body").animate({ scrollTop: 0 }, 'slow');
            })

        });