$(document).ready(function () {
  $(".burger").click(function () {
    $(".burger, .navigation").toggleClass("active");
    $("body").toggleClass("lock"); /*тоже самое с тегом Body*/
  });

  $(".tabs").click(function () {
    $(".navigation").toggleClass("active");
  });
});
