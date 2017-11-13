var template = {}; // Handlebars template set
template = { 'source': {}, 'ready': {} };
template.source.calculator = $("#t-register-form").html();
template.ready.calculator = Handlebars.compile(template.source.calculator);

var regex = {
    cep: /^[0-9]{5}[-]*[0-9]{3}$/,
    unit: /^([0-9.,]{1,20})$/i
};

var serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

$("body").on('submit', 'form', function (event) {

    event.preventDefault();

    var fields = {};
    var totalValues = 0;

    $("#f-customer-register input").each(function (i, x) {
        fields[$(x).attr("id")] = $(x).val();
        if ($(x).val()) {
            totalValues++;
        }
    });

    if (totalValues != 7) {
        return swal(
            "Oops...",
            "Por favor, preencha todos os campos e então tente novamente calcular o seu frete.",
            "error"
        );
    }

    if (!regex.cep.test(fields['origin']) || !regex.cep.test(fields['destiny'])) {
        return swal(
            "Oops...",
            "Por favor, verifque o formato dos <b>CEPs</b> e então tente novamente calcular o seu frete.",
            "error"
        );
    }

    if (!regex.unit.test(fields['width']) || !regex.unit.test(fields['height']) || !regex.unit.test(fields['length'])) {
        return swal(
            "Oops...",
            "Por favor, verifque o formato dos campos de largura, altura e comprimento e então tente novamente.",
            "error"
        );
    }

    if (!regex.unit.test(fields['weight'])) {
        return swal(
            "Oops...",
            "Por favor, verifque o formato do campo de peso e tente novamente.",
            "error"
        );
    }

    swal.setDefaults({
        input: 'select',
        confirmButtonText: 'Próximo &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '4', '3']
    })

    var steps = [
        {
            title: 'ENVIO',
            text: 'Como deseja enviar o produto?',
            inputOptions: { 'expresso': 'EM EXPRESSO', 'economico': 'EM ECONÔMICO' }
        },
        {
            title: 'AVISO DE RECEBIMENTO (AR)',
            text: 'Gostaria de receber um aviso de recebimento?',
            inputOptions: { 'true': 'SIM', 'false': 'NÃO' }
        },
        {
            title: 'MÃO PRÓPRIA (MP)',
            text: 'Deseja acionar o Servico de Mão Própria?',
            inputOptions: { 'true': 'SIM', 'false': 'NÃO' }
        },
        {
            title: 'SEGURO',
            text: 'Deseja acionar o Seguro para este frete?',
            inputOptions: { 'true': 'SIM', 'false': 'NÃO' }
        }
    ]

    return swal.queue(steps).then(function (result) {
        swal.resetDefaults();

        var raw_url = "/api/calculate/" + fields['origin'] + '/' + fields['destiny'];
        delete fields.origin;
        delete fields.destiny;
        fields.type = result[0];
        fields.ar = result[1] === 'true';
        fields.mp = result[2] === 'true';
        fields.insurance = result[3] === 'true';
        raw_url = raw_url + '?' + serialize(fields);

        return $.post({ url: raw_url, method: "get" }).then(function (result) {

            return swal({
                title: "Yeah!",
                html: "Nós calculamos o seu frete em <b>" + result.resume.pricing + '</b>, com previsão média para chegada em <b>' + result.resume.rawDeadline + ' dia(s) úteis</b>, considerando o envio por serviço ' + result.resume.service + '.',
                type: "success"
            }).then(function () {
                $('input').val('');
            });

        }).catch(function (error) {

            if (error.responseJSON && error.responseJSON.resume) {
                return swal(
                    "Oops...",
                    error.responseJSON.resume + " Por favor, verifique e tente novamente.",
                    "error"
                );
            }

            return swal(
                "Oops...",
                "Tivemos um problema ao concluir o seu cadastro. Por favor, tente novamente.",
                "error"
            );

        });
    }, function () {
        return swal.resetDefaults()
    });

});

$("#t-register-form-dom").html(template.ready.calculator);