/**
 * Created by michaelcrabb on 05/03/2017.
 */


function createORCIDProfile(orcidID, elementID) {

    var ORCIDLink = "http://pub.orcid.org/"+orcidID+"/orcid-works";

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

                    var output = "";
                    for (var i in data["orcid-profile"]["orcid-activities"]["orcid-works"]["orcid-work"]) {
                        //PAPER NAME
                        if (data["orcid-profile"]["orcid-activities"]["orcid-works"]["orcid-work"][i]["work-title"].title.value != null) {
                            var publicationName = data["orcid-profile"]["orcid-activities"]["orcid-works"]["orcid-work"][i]["work-title"].title.value;
                        }

                        //JOURNAL TITLE
                        if (data["orcid-profile"]["orcid-activities"]["orcid-works"]["orcid-work"][i]["journal-title"] != null) {
                            var journalTitle = data["orcid-profile"]["orcid-activities"]["orcid-works"]["orcid-work"][i]["journal-title"].value;
                        }
                        else {
                            var journalTitle = "";
                        }

                        //PUBLICATION YEAR
                        if (data["orcid-profile"]["orcid-activities"]["orcid-works"]["orcid-work"][i]["publication-date"].year.value != null) {
                            var publicationYear = data["orcid-profile"]["orcid-activities"]["orcid-works"]["orcid-work"][i]["publication-date"].year.value;
                        }
                        else {
                            var publicationYear = "";
                        }

                        //DOI REFERENCE
                        if (data["orcid-profile"]["orcid-activities"]["orcid-works"]["orcid-work"][i]["work-external-identifiers"] != null) {
                            var doiReference = data["orcid-profile"]["orcid-activities"]["orcid-works"]["orcid-work"][i]["work-external-identifiers"]["work-external-identifier"]["0"]["work-external-identifier-id"].value;
                        }
                        else {
                            var doiReference = "";
                        }

                        output += "<p><strong>" + publicationName + "</strong>";
                        output += "<em> " + journalTitle;
                        output += " (" + publicationYear + ")</em>";
                        output += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";
                    }

                    output += "</ul>";
                    document.getElementById(elementID).innerHTML = output;

                    //DEBUG!
                    //console.log(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
