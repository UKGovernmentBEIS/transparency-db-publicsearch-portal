$(document).ready(function () {
  if (
    $("#subsidyobjective-7").is(":checked") &&
    $("#subsidyobjective-0").is(":checked")
  ) {
    $(".govuk-input-subsidyobjective").val("").hide();
    $(".govuk-label-subsidyobjective").hide();
  } else if ($("#subsidyobjective-11").is(":checked")) {
    $(".govuk-input-subsidyobjective").show();
    $(".govuk-label-subsidyobjective").show();
  } else {
    $(".govuk-input-subsidyobjective").hide();
    $(".govuk-label-subsidyobjective").hide();
  }

  $("#subsidyobjective-0").on("change", function () {
    //"select all" change
    $(".govuk-checkboxes__input_subsidyobjective").prop(
      "checked",
      $(this).prop("checked")
    ); //change all ".checkbox" checked status
    if ($("#subsidyobjective-0").is(":checked")) {
      $(".govuk-input-subsidyobjective").val("").hide();
      $(".govuk-label-subsidyobjective").hide();
    }
  }); //"select all" close

  //".checkbox" change

  $(document).on("change", "#subsidyobjective-11", function () {
    if ($("#subsidyobjective-0").is(":checked")) {
      $(".govuk-input-subsidyobjective").val("");
      $(".govuk-input-subsidyobjective").hide();
      $(".govuk-label-subsidyobjective").hide();
    } else if ($("#subsidyobjective-11").is(":checked")) {
      $(".govuk-input-subsidyobjective").val("");
      $(".govuk-input-subsidyobjective").show();
      $(".govuk-label-subsidyobjective").show();
    }

    // else if ($('#subsidyobjective-11').not(":checked")){
    //   $('.govuk-input-subsidyobjective').show();
    // $('.govuk-label-subsidyobjective').show();}
    else {
      $(".govuk-input-subsidyobjective").hide();
      $(".govuk-label-subsidyobjective").hide();
    }
  });

  $(".govuk-checkboxes__input_subsidyobjective").change(function () {
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if (false == $(this).prop("checked")) {
      //if this item is unchecked
      $("#subsidyobjective-0").prop("checked", false); //change "select all" checked status to false
      // alert("change fn" + $('#subsidyobjective-11').is(":checked"))
      if ($("#subsidyobjective-11").is(":checked")) {
        $(".govuk-input-subsidyobjective").show();
        $(".govuk-label-subsidyobjective").show();
      }
    }

    // alert($('.govuk-checkboxes__input:checked').length );
    //check "select all" if all checkbox items are checked
    if (
      $(".govuk-checkboxes__input_subsidyobjective:checked").length ==
      $(".govuk-checkboxes__input_subsidyobjective").length - 1
    ) {
      $("#subsidyobjective-0").prop("checked", true);
      $(".govuk-input-subsidyobjective").hide();
      $(".govuk-label-subsidyobjective").hide();
    }
  });

  //****************************************************
  // checkbox select all scripts for subsidy instrument
  //****************************************************
  if (
    $("#subsidyinstrument-7").is(":checked") &&
    $("#subsidyinstrument-0").is(":checked")
  ) {
    $(".govuk-input-subsidyinstrument").val("");
    $(".govuk-input-subsidyinstrument").hide();
    $(".govuk-label-subsidyinstrument").hide();
  } else if ($("#subsidyinstrument-7").is(":checked")) {
    $(".govuk-input-subsidyinstrument").show();
    $(".govuk-label-subsidyinstrument").show();
    // $('.govuk-input-subsidyinstrument').val('');
  } else {
    $(".govuk-input-subsidyinstrument").hide();
    $(".govuk-label-subsidyinstrument").hide();
    $(".govuk-input-subsidyinstrument").val("");
  }

  $("#subsidyinstrument-0").change(function () {
    //"select all" change
    $(".govuk-checkboxes__input_subsidyinstrument").prop(
      "checked",
      $(this).prop("checked")
    ); //change all ".checkbox" checked status
    if ($("#subsidyinstrument-0").is(":checked")) {
      $(".govuk-input-subsidyinstrument").val("");
      $(".govuk-input-subsidyinstrument").hide();
      $(".govuk-label-subsidyinstrument").hide();
    }
  }); //"select all" close

  $("#subsidyinstrument-7").change(function () {
    if ($("#subsidyinstrument-0").is(":checked")) {
      $(".govuk-input-subsidyinstrument").val("");
      $(".govuk-input-subsidyinstrument").hide();
      $(".govuk-label-subsidyinstrument").hide();
    } else if ($("#subsidyinstrument-7").is(":checked")) {
      // $('.govuk-input-subsidyinstrument').val('');
      $(".govuk-input-subsidyinstrument").show();
      $(".govuk-label-subsidyinstrument").show();
    } else {
      $(".govuk-input-subsidyinstrument").hide();
      $(".govuk-label-subsidyinstrument").hide();
      $(".govuk-input-subsidyinstrument").val("");
    }
  });

  //".checkbox" change
  $(".govuk-checkboxes__input_subsidyinstrument").change(function () {
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if (false == $(this).prop("checked")) {
      //if this item is unchecked
      $("#subsidyinstrument-0").prop("checked", false); //change "select all" checked status to false
      if ($("#subsidyinstrument-7").is(":checked")) {
        $(".govuk-input-subsidyinstrument").val("");
        $(".govuk-input-subsidyinstrument").show();
        $(".govuk-label-subsidyinstrument").show();
      }
    }
    // alert($('.govuk-checkboxes__input_subsidyinstrument:checked').length );
    //check "select all" if all checkbox items are checked
    if (
      $(".govuk-checkboxes__input_subsidyinstrument:checked").length ==
      $(".govuk-checkboxes__input_subsidyinstrument").length - 1
    ) {
      $("#subsidyinstrument-0").prop("checked", true);
      $(".govuk-input-subsidyinstrument").val("");
      $(".govuk-input-subsidyinstrument").hide();
      $(".govuk-label-subsidyinstrument").hide();
    }
  });

  //****************************************************
  // checkbox select all scripts for subsidy instrument
  //****************************************************

  $("#spendingsector-0").change(function () {
    //"select all" change
    $(".govuk-checkboxes__input_spendingsector").prop(
      "checked",
      $(this).prop("checked")
    ); //change all ".checkbox" checked status
  });

  //".checkbox" change
  $(".govuk-checkboxes__input_spendingsector").change(function () {
    //uncheck "select all", if one of the listed checkbox item is unchecked
    if (false == $(this).prop("checked")) {
      //if this item is unchecked
      $("#spendingsector-0").prop("checked", false); //change "select all" checked status to false
    }

    // alert($('.govuk-checkboxes__input_spendingsector:checked').length );
    //check "select all" if all checkbox items are checked
    if (
      $(".govuk-checkboxes__input_spendingsector:checked").length ==
      $(".govuk-checkboxes__input_spendingsector").length - 1
    ) {
      $("#spendingsector-0").prop("checked", true);
    }
  });
});

toggleFilterDiv = () => {
  var filterText = document.getElementById("filterText").textContent;
  if (filterText == "Hide")
    document.getElementById("filterText").textContent = "Show";
  else document.getElementById("filterText").textContent = "Hide";
  var x = document.getElementById("filter-accordion-div");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
};
