/*
* Title: Forms JS
* Author: Adam Southorn
* Version: 1.0
*/

var forms = {
    init: function () {
        $('.ajax').submit(function (e) {
            var form = $(this);

            if (!forms.validateForms(form)) {
                e.preventDefault();
                return false;
            }

            form.find('.error-text').hide();

            form.addClass('form--loading');

            try {
                global.models.postForm(form.serialize(), form.attr('data-method')).success(function (data) {
                    forms.controller(data, form);
                }).fail(function (data) {
                    console.log(data);
                    form.find('.error-text').show();
                    form.removeClass('form--loading');
                });
            }
            catch (ex) {
                console.log(ex);
                console.log('form post failed');
                form.find('.error-text').show();
                form.removeClass('form--loading');
            }

            e.preventDefault();
        });

        $('body').on('change', '.form__field--error input', function () {
            var form = $(this).parents('form');
            forms.validateForms(form); 
        });
    },
    controller: function (data, form) {
        if (data === "success") {
            form.addClass('form--complete');
        }
        form.removeClass('form--loading');
    },
    validateForms: function (form) {
        var result = true;

        form.find('.email').each(function () {
            if ($(this).val() !== "") {
                if (forms.validateEmail($(this).val()) === false) {
                    result = false;
                    $(this).parents('.form__field').addClass('form__field--error').find('.form__validation').text('Email address is not valid');
                }
                else {
                    $(this).parents('.form__field').removeClass('form__field--error').find('.form__validation').text('');
                }
            }
        });

        form.find('.required').each(function () {
            if ($(this).val() === "") {
                result = false;
                $(this).parents('.form__field').addClass('form__field--error').find('.form__validation').text('This field is required');
            }
            else {
                $(this).parents('.form__field').removeClass('form__field--error').find('.form__validation').text('');
            }
        });

        form.find('.phone').each(function () {
            if ($(this).val() !== "") {
                if (forms.validatePhone($(this).val()) === false) {
                    result = false;
                    $(this).parents('.form__field').addClass('form__field--error').find('.form__validation').text('Telephone number is not valid');
                }
                else {
                    $(this).parents('.form__field').removeClass('form__field--error').find('..form__validation').text('');
                }
            }
        });

        form.find('.form__field--error').eq(0).find('input').focus();

        return result;
    },
    validateEmail: function (val) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(val);
    },
    validatePhone: function (val) {
        var re = /^[0-9]+$/;
        return re.test(val);
    }
};