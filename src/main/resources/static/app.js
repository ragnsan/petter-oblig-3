
$(document).ready(() => {

    regBillett = () => {
        const film = $('#film option:selected').val();
        const antall = $("#antall").val();
        const fornavn = $("#fornavn").val();
        const etternavn = $("#etternavn").val();
        const telefonnr = $("#telefon").val();
        const epost = $("#epost").val();

        let funnetFeil = 0;

        if (film === ""){
            $("#filmFeil").html("Du må velge en film!");
            funnetFeil++;
        }

        if (antall <= 0 || antall === ""){
            $("#antallFeil").html("Du må velge et antall som er positivt!");
            funnetFeil++;
        }

        if (fornavn === ""){
            $("#fornavnFeil").html("Du må skrive inn ditt fornavn!");
            funnetFeil++;
        }

        if (etternavn === ""){
            $("#etternavnFeil").html("Du må skrive inn ditt etternavn!");
            funnetFeil++;
        }
        if (telefonnr === ""){
            $("#telefonFeil").html("Du må skrive inn ditt telefonnummer!");
            funnetFeil++;
        }
        if (epost === ""){
            $("#epostFeil").html("Du må skrive inn din epost!");
            funnetFeil++;
        }
        const resetForm = () => {
            $("form")[0].reset()
        }

        let radTeller = 0;

        if (funnetFeil <= 0){
            const Billett = {
                film: film,
                antall: antall,
                fornavn: fornavn,
                etternavn: etternavn,
                telefonnr: telefonnr,
                epost: epost,
            }
            $.post("/lagreBillett", Billett, () => {
                hentBilletter();
                resetForm();
                radTeller++;

            })
        }
    }

    const hentBilletter = () =>{
        $.get("/hentBillett", (data)=>{
            formaterData(data);
        })
    }

    const formaterData = (billetter) =>  {

        let ut =
            "<table class='table'>"+
            "<tr>"+
            "<th scope='col'>Film</th>"+
            "<th scope='col'>Antall</th>"+
            "<th scope='col'>Fornavn</th>"+
            "<th scope='col'>Etternavn</th>"+
            "<th scope='col'>Telefonnr</th>"+
            "<th scope='col'>Epost</th>"+
            "</tr>";

        for (const Billett of billetter){
            ut+=
                "<tr>"+
                "<td>"+Billett.film+"</td>"+
                "<td>"+Billett.antall+"</td>"+
                "<td>"+Billett.fornavn+"</td>"+
                "<td>"+Billett.etternavn+"</td>"+
                "<td>"+Billett.telefonnr+"</td>"+
                "<td>"+Billett.epost+"</td>"+
                "</tr>";
        }
        $("#billetter").html(ut);
    }

    sltBillett = () =>{
        $.get("/slettBilletter", () => {
            $("#billetter").html("");
        })
    }

    $("input").change(function() {
        let idNavn = '#'+this.id+'Feil';
        $(idNavn).html("");
    })

    $("select").change(function(){
        if ($("select:selected").val() !== ""){
            $("#filmFeil").html("");
        }
    })

})