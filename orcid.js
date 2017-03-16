/**
 * Created by michaelcrabb on 05/03/2017.
 */


function createORCIDProfile(orcidID, elementID) {

    var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID + "/works";

    fetch(ORCIDLink,

        {
            headers: {
                "Accept": "application/orcid+json"
            }
        })
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function (data) {

                    ////DEBUG!
                    console.log(data);

                    var output = "";
                    for (var i in data.group) {
                        //PAPER NAME
                        if (data.group[i]["work-summary"]["0"].title.title.value != null) {
                            var publicationName = data.group[i]["work-summary"]["0"].title.title.value;
                        }


                        //PUBLICATION YEAR
                        if (data.group[i]["work-summary"]["0"]["publication-date"] != null) {
                            var publicationYear = data.group[i]["work-summary"]["0"]["publication-date"].year.value;
                        }
                        else {
                            var publicationYear = "";
                        }

                        //DOI REFERENCE
                        if (data.group[i]["external-ids"]["external-id"]["length"] != 0) {
                            var doiReference = data.group[i]["external-ids"]["external-id"]["0"]["external-id-value"];
                        }
                        else {
                            var doiReference = "";
                        }

                        //JOURNAL NAME
                        var putcode = data.group[i]["work-summary"]["0"]["put-code"];
                        //console.log(journalTitle);

                        output += "<p><span id='publication_" + i + "'><strong>" + publicationName + "</strong>";
                        output += " (" + publicationYear + ") </em></span>";
                        output += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";
                        getJournalTitle(orcidID, putcode, i);

                    }

                    output += "</ul>";
                    document.getElementById(elementID).innerHTML = output;
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}

function getJournalTitle(orcidID, journalID, i) {
    var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID + "/work/" + journalID;
    fetch(ORCIDLink,
        {
            headers: {
                "Accept": "application/orcid+json"
            }
        })
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }
                response.json().then(function (data) {
                    if (data["journal-title"] != null) {
                        var output = data["journal-title"].value;
                        document.getElementById("publication_" + i).innerHTML = document.getElementById("publication_" + i).innerHTML + output;
                    }
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}