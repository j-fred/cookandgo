function formatDate(d) {
    var date = new Date(d);
    if (isNaN(date.getTime())) {
        return d;
    } else {
        // Creation d'un tableau des mois
        var mois = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        // récupération du jour
        jour = date.getDate();
        // si le jour inferieur à 10 , on ajoute un 0 devant
        if (jour < 10) {
            jour = "0" + jour;
        }
        // on renvoi la date au format souhaité => ex: "25 Aout 2018"
        return jour + " " + mois[date.getMonth()] + " " + date.getFullYear();
    }
}

function convertMinsToHrsMins(mins) {
    if (mins > 59) {
        let h = Math.floor(mins / 60);
        let m = mins % 60;
        h = h < 10 ? '0' + h : h;
        m = m < 10 ? '0' + m : m;
        return `${h}H${m}`;
    } else {
        return `${mins} Min`;
    }
}

$(function () {
    var dateTransform = "";
    // Sur chaque element avec la class myDate, je recupère son contenu 
    // et je le traite avec la fonction formatDate
    // puis je remplace l'ancienne valeur par la nouvelle 
    $(".myDate").each(function (e) {
        // console.log($(this).text());      
        dateTransform = formatDate($(this).text());
        $(this).text(dateTransform);
        // console.log(dateTransform);   
    });
    $(".maDuree").each(function (e) {
        // console.log($(this).text());      
        timeTransform = convertMinsToHrsMins($(this).text());
        $(this).text(timeTransform);
        // console.log(dateTransform);   
    });
});