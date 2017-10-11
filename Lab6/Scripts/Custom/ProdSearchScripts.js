// <reference path="jquery-1.5.1.js" />
// <reference path="jquery-ui-1.8.11.js" />
// <reference path="jQuery.tmpl.js" />


var loadProducts = function () {
    var form = $('searchForm')
    console.log("Form Action", form.attr("action"));
    console.log("Form Data", form.serialize());

    $.ajax({
        url: "ProductSearch",
        type: "GET",
        data: form.serialize(),
        beforeSend: function () {
            $("#searchresults").empty();
            $("#ajax-loader").show();
        },
        complete: function () {
            $("#ajax-loader").hide();
        },
        error: searchFailed,
        success: function (data) {
            //$("#productTemplate").tmpl(data).appendTo("#product-list");
            //console.log(data);
            $("#searchresults").html(data)
        }
    });
}


// short version
$(function () {


    //$("#productSearch").submit(function (event) {
    //    event.preventDefault();
    //    var form = $(this);
    //    $.getJSON(form.attr("action"), form.serialize(), function (data) {
    //        $("#product-list").empty();
    //        $("#productTemplate").tmpl(data).appendTo("#product-list");
    //    });
    //});

    loadProducts();

    $("#queryInput").on('keyup', function (event) {
        loadProducts()
    });

    $("input[data-autocomplete-source]").each(function () {
        var target = $(this);
        target.autocomplete({ source: target.attr("data-autocomplete-source") });
    });
});

function searchFailed() {
    $("#searchresults").html("<p style='color:red'>Search failed!</p>");
}



