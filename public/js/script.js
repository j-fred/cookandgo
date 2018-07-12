function formatDate(d) {
    var date = new Date(d);

    if (isNaN(date.getTime())) {
        return d;
    } else {
        var month = new Array();
        month[0] = "Janvier";
        month[1] = "Fevrier";
        month[2] = "Mars";
        month[3] = "Avril";
        month[4] = "Mai";
        month[5] = "Juin";
        month[6] = "Juillet";
        month[7] = "Aout";
        month[8] = "Septembre";
        month[9] = "Octobre";
        month[10] = "Novembre";
        month[11] = "Décembre";

        day = date.getDate();

        if (day < 10) {
            day = "0" + day;
        }
        return day + " " + month[date.getMonth()] + " " + date.getFullYear();
    }

}

$(function () {
    var dateTransform ="";
    $("myDate").each( function (e) {  
        console.log($(this).text());      
        dateTransform = formatDate($(this).text());
        $(this).text(dateTransform);
        console.log(dateTransform);   
    });
});