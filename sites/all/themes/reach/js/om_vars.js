
    var generatedName = window.location.pathname.split("/").pop()
          .replace(/-/g, ' ')
          .replace(/^./, function(x){return x.toUpperCase()})
    s.pageName=generatedName
    s.server=window.location.hostname
    s.channel=""
    s.pageType=""

    s.prop1=""
    s.prop1=""
    s.prop2=""
    s.prop3=""
    s.prop4=""
    s.prop5=""
    /* Conversion Variables */
    s.campaign=""
    s.state=""
    s.zip=""
    s.events=""
    s.products=""
    s.purchaseID=""
    s.eVar1=""
    s.eVar2=""
    s.eVar3=""
    s.eVar4=""
    s.eVar5=""


    /************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
    var s_code=s.t();if(s_code)document.write(s_code)
