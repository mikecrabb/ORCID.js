/**
 * Created by michaelcrabb on 05/03/2017.
 */


function createORCIDProfile(orcidID, elementID) {

    var ORCIDLink = "https://pub.orcid.org/v2.0/"+orcidID+"/works";

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
                    for (var i in data.group) {
                        //PAPER NAME
                        if (data.group[i]["work-summary"]["0"].title.title.value != null) {
                            var publicationName = data.group[i]["work-summary"]["0"].title.title.value;
                        }


                        //PUBLICATION YEAR
                        if (data.group[i]["work-summary"]["0"]["publication-date"].year.value != null) {
                            var publicationYear = data.group[i]["work-summary"]["0"]["publication-date"].year.value;
                        }
                        else {
                            var publicationYear = "";
                        }

                        //DOI REFERENCE
                         if (data.group[i]["external-ids"] != null) {
                             var doiReference = data.group[i]["external-ids"]["external-id"]["0"]["external-id-value"];
                         }
                         else {
                             var doiReference = "";
                         }



                        output += "<p><strong>" + publicationName + "</strong>";
                      //  output += "<em> " + journalTitle;
                        // todo Journal Title was removed in APIv2...need to find out how to include it again
                        output += " (" + publicationYear + ")</em>";
                        output += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";
                    }

                    output += "</ul>";
                    document.getElementById(elementID).innerHTML = output;

                    ////DEBUG!
                    console.log(data);
                });
            }
        )
        .catch(function (err) {
            console.log('Fetch Error :-S', err);
        });
}
