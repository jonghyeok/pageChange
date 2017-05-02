var snail = {};

$(document).ready(function(){

    $("body").swipe({
      swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        snail.swipePage(direction);
      }
    });

   snail.pageData = {
     'index' : ['#main','#img','#setting'],
     'pages' : {
       '#main' : 'sub/main.html',
        '#img' : 'sub/img.html',
        '#setting' : 'sub/setting.html'
     }
   }
   snail.pageNow = 0;
   snail.pageTarget = '#main_content';
   snail.pageMax = snail.pageData.index.length-1;

   snail.init = function(){
     snail.initPage();
     $(window).on('hashchange',snail.initPage);
   }

  snail.initPage = function(){
    if(snail.pageData.index.indexOf(location.hash)>-1){
       snail.pageNow = snail.pageData.index.indexOf(location.hash);
       $.ajax({  url: snail.pageData.pages[location.hash]   }).done(function(result) {
          $("[data-dropdown-menu] a").each(function(){
             if( $(this).attr("href")==location.hash){
               $(this).addClass("selected")
             }else{
               $(this).removeClass("selected")
             }
          });
         $( snail.pageTarget ).html(result);   });
    }else{
      location.hash = 'main';
    }
  };

  snail.swipePage = function(type){
      var nextMove = snail.pageNow;

      if(type == 'left'){
        nextMove++;
      }else if(type == 'right'){
        nextMove--;
      }

      if(nextMove<0){
        nextMove = snail.pageMax;
      }else if (nextMove>snail.pageMax){
        nextMove = 0;
      }
      location.hash = snail.pageData.index[nextMove];
  }

   snail.init();
});
