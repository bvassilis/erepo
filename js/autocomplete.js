$(function() {
    var map;
    var marker;
    var markers = [];
    var geocoder;
    var geocoder_data;
    var blank_icon;
    var regions = [];
    var efood_components = {};
    function comp_has_type(c, t) {
        if ($.inArray(t, c.types) != -1)
            return true;
        return false;
    }
    function geocoder_parser(results) {
        return $.map(results, function(item) {
            var street_number='';
            var street_address='';
            var route='';
            var intersection='';
            var political='';
            var country='';
            var administrative_area_level_1='';
            var administrative_area_level_2='';
            var administrative_area_level_3='';
            var administrative_area_level_4='';
            var administrative_area_level_5='';
            var colloquial_area='';
            var locality='';
            var sublocality='';
            var neighborhood='';
            var premise='';
            var subpremise='';
            var postal_code='';
            var natural_feature='';
            var airport='';
            var park='';

            $.each(item.address_components, function(k, v1) {
                $.each(v1.types, function(k2, v2) {
                    efood_components[v2] = v1.long_name;
                });
            });

            $.each(item.address_components, function(j, c) {
                if (comp_has_type(c, 'street_number')) {
                    street_number = c.long_name;
                }
                if (comp_has_type(c, 'street_address')) {
                    street_address = c.long_name;
                }
                if (comp_has_type(c, 'route')) {
                    route = c.long_name;
                }
                if (comp_has_type(c, 'intersection')) {
                    intersection = c.long_name;
                }
                if (comp_has_type(c, 'political')) {
                    political = c.long_name;
                }
                if (comp_has_type(c, 'country')) {
                    country = c.long_name;
                }
                if (comp_has_type(c, 'administrative_area_level_1')) {
                    administrative_area_level_1 = c.long_name;
                }
                if (comp_has_type(c, 'administrative_area_level_2')) {
                    administrative_area_level_2 = c.long_name;
                }
                if (comp_has_type(c, 'administrative_area_level_3')) {
                    administrative_area_level_3 = c.long_name;
                }
                if (comp_has_type(c, 'administrative_area_level_4')) {
                    administrative_area_level_4 = c.long_name;
                }
                if (comp_has_type(c, 'administrative_area_level_5')) {
                    administrative_area_level_5 = c.long_name;
                }
                if (comp_has_type(c, 'colloquial_area')) {
                    colloquial_area = c.long_name;
                }
                if (comp_has_type(c, 'locality')) {
                    locality = c.long_name;
                }
                if (comp_has_type(c, 'sublocality')) {
                    sublocality = c.long_name;
                }
                if (comp_has_type(c, 'neighborhood')) {
                    neighborhood = c.long_name;
                }
                if (comp_has_type(c, 'premise')) {
                    premise = c.long_name;
                }
                if (comp_has_type(c, 'subpremise')) {
                    subpremise = c.long_name;
                }
                if (comp_has_type(c, 'postal_code')) {
                    postal_code = c.long_name;
                }
                if (comp_has_type(c, 'natural_feature')) {
                    natural_feature = c.long_name;
                }
                if (comp_has_type(c, 'airport')) {
                    airport = c.long_name;
                }
                if (comp_has_type(c, 'park')) {
                    park = c.long_name;
                }
            });
            console.log(' #no: ' + street_number + ' #addr: ' + street_address + ' #route: ' + route + ' #intersection: ' + intersection + ' #political: ' + political + ' #country: ' + country + ' #adm1: ' + administrative_area_level_1 + ' #adm2: ' + administrative_area_level_2 + ' #adm3: ' + administrative_area_level_3 + ' #adm4: ' + administrative_area_level_4 + ' #adm5: ' + administrative_area_level_5 + ' #colloquial_area: ' + colloquial_area + ' #locality: ' + locality + ' #sublocality: ' + sublocality + ' #neighborhood: ' + neighborhood + ' #premise: ' + premise + ' #subpremise: ' + subpremise + ' #postal_code: ' + postal_code + ' #natural_feature: ' + natural_feature + ' #airport: ' + airport + ' #park: ' + park);
            var format_text = street_number;
            format_text += ' ' + street_address;
            format_text += ' ' + route;
            format_text = $.trim(format_text);
            if(format_text) {
                format_text += ', ';
            }
            var city='';
            if(locality)
                city += locality;
            else if (administrative_area_level_2)
                city += administrative_area_level_2;
            else if (administrative_area_level_1)
                city += administrative_area_level_1;
            format_text += ' ' + city;
            format_text += ' ' + postal_code;
            format_text = $.trim(format_text);
            if(format_text)
                return {label: format_text, value: format_text, lat: item.geometry.location.lat(), lng: item.geometry.location.lng(), street: route,
                numero: street_number, postal: postal_code, city: city, country: country};
        });
    }
    function geocoder_search(term, response) {
        var gterm = term;
        geocoder.geocode({'address': gterm , 'region':'lu', componentRestrictions: {country: 'LU'}}, function(results, status) {
            var data = geocoder_parser(results);
            response(data);
        });
    }
    $(document).ready(function() {
        geocoder = new google.maps.Geocoder();
        blank_icon = new google.maps.MarkerImage('/site-assets/img/gmap/chart.png');
        $(function() {
            $('.address_auto').autocomplete({
                autoFocus: true, 
                open: function(event, ui) {
                    $('#address').removeClass('ui-autocomplete-loading');
                },
                source: function(request, response) {
                    $('#address').addClass('element-loading');
                    $('#popup_zip').addClass('element-loading');
                    $('#lat').val('');
                    $('#lng').val('');
                    $('#street').val('');
                    $('#numero').val('');
                    $('#postal').val('');
                    $('#country').val('');
                    $('#city').val('');
                    response(geocoder_search(request.term, response));
                },
                select: function(event, ui) {
                    $('#lat').val(ui.item.lat);
                    $('#lng').val(ui.item.lng);
                    $('#street').val(ui.item.street);
                    $('#numero').val(ui.item.numero);
                    $('#postal').val(ui.item.postal);
                    $('#country').val(ui.item.country);
                    $('#city').val(ui.item.city);
                },
                appendTo: "#autocomplete-append"
            });
        });
        $('.button-search').on('click', function() {
            if ($.trim($(".address_auto").val()) === "") {
                $(".address_auto").focus();
                return false;
            }
            if($('#lat').val() && $('#lng').val()) {
                return true;
            }
            return false;
        });
    });
});