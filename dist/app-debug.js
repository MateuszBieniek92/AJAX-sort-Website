$(function () {

    //variables 
    var mobile = window.matchMedia("screen and (max-width: 750px)");
    var dataTable = $('.dataTable');
    var idSortBtn = $('.idSortBtn');
    var acronymSortBtn = $('.acronymSortBtn');
    var nameSortBtn = $('.nameSortBtn');
    var paginationBtn = $('.paginationBtn');
    var nextBtn = $('.next');
    var prevBtn = $('.prev');
    var sendBtn = $('.sendBtn');
    var tableNumber = $('.tableNumber');
    var filterInput = $('.filter');
    var LeftPanel = $('.col-3');
    var mainPanel = $('.col-9');

    //url
    var rtUrl = 'http://rt.ex7.pl/get-data';

    //menu
    var dashboardBtn = $('.menu').find('li').first();
    var ordersBtn = $('.menu').find('li').eq(1);
    var productsBtn = $('.menu').find('li').eq(2);
    var analyticsBtn = $('.menu').find('li').eq(3);
    var pageBtns = $('.pageBtns');
    var optionsBtn = $('.menu').find('li').last();
    var sectionHeader = $('.productHeader');
    var dashboardText = $('.dashboardText');
    var ordersText = $('.ordersText');
    var analyticsText = $('.analyticsText');
    var aboutMeText = $('.aboutMeText');
    var hamburger = $('.hamburger');
    var menu = $('.menu');

    // default options
    var number = 1;
    dashboardText.hide();
    ordersText.hide();
    analyticsText.hide();
    aboutMeText.hide();

    LeftPanel.removeClass('col-12').addClass('col-3');
    mainPanel.removeClass('col-12').addClass('col-9');

    // mobile menu
    if (mobile.matches) {
        LeftPanel.removeClass('col-3').addClass('col-12');
        mainPanel.removeClass('col-9').addClass('col-12');
    }

    function toggleMenu() {
        hamburger.toggleClass('change');
        menu.slideToggle(500).toggleClass('show');
    }

    //default page number
    function defaultPageNumber() {
        number = 1;
        tableNumber.html(number);
    }

    //data download
    function loadData(sortColumnName, filterType, pageSize, pageNumber) {
        $.ajax({
            url: rtUrl,
            type: 'POST',
            data: {
                sort_column: sortColumnName,
                sort_order: 'asc',
                filter: filterType,
                page_size: pageSize,
                page: pageNumber
            }

        }).done(function (response) {
            insertContent(response);
        }).fail(function (error) {
            console.log(error);
        })
    }

    //insert data to table
    function insertContent(dataDownload) {
        var tBody = $(dataTable).find('tbody');
        tBody.empty();
        $.each(dataDownload, function (dataIndex, data) {

            var tr = $('<tr>');
            var thId = $('<td class="id">').text(data.id);
            var thAcronym = $('<td class="name">').text(data.acronym);
            var thName = $('<td class="acronym">').text(data.name);

            tr.append(thId, thAcronym, thName);
            tBody.append(tr);
        });
    }

    // mobile menu
    hamburger.click(function () {
        toggleMenu();
    });

    // pagination btns + sort
    paginationBtn.click(function () {
        var size = 40;
        loadData('', '', size, '');
        defaultPageNumber();
        idSortBtn.click(function () {
            defaultPageNumber();
            loadData('id', '', size, '');
        });
        acronymSortBtn.click(function () {
            defaultPageNumber();
            loadData('acronym', '', size, '');
        });
        nameSortBtn.click(function () {
            defaultPageNumber();
            loadData('name', '', size, '');
        });
        nextBtn.click(function () {
            loadData('', '', size, number);

        });
        prevBtn.click(function () {
            if (number <= 0) {
                number = 1;
            }
            loadData('', '', size, number);
        });
    });

    idSortBtn.click(function () {
        defaultPageNumber();
        loadData('id', '', '', '');
    });

    acronymSortBtn.click(function () {
        defaultPageNumber()
        loadData('acronym', '', '', '');
    });

    nameSortBtn.click(function () {
        defaultPageNumber();
        loadData('name', '', '', '');
    });

    //page number btns
    nextBtn.click(function () {
        number++;
        loadData('', '', '20', number);
        tableNumber.html(number);
    });

    prevBtn.click(function () {
        number--;
        if (number <= 0) {
            number = 1;
        }
        tableNumber.html(number);
        loadData('', '', '20', number);
    });

    //filter
    sendBtn.click(function (event) {
        event.preventDefault();
        var filter = filterInput.val();
        if (filter === '') {
            console.log('alert');
            defaultPageNumber();
            loadData();
        }
        loadData('', filter, '', number);
    });

    dashboardBtn.click(function () {
        dashboardText.show();
        ordersText.hide();
        analyticsText.hide();
        paginationBtn.hide();
        pageBtns.hide();
        dataTable.hide();
        sectionHeader.html('<span>#</span> DashBoard');
    });
    ordersBtn.click(function () {
        dashboardText.hide();
        ordersText.show();
        analyticsText.hide();
        aboutMeText.hide();
        paginationBtn.hide();
        pageBtns.hide();
        dataTable.hide();
        sectionHeader.html('<span>#</span> Orders');
    });
    analyticsBtn.click(function () {
        dashboardText.hide();
        ordersText.hide();
        analyticsText.show();
        aboutMeText.hide();
        paginationBtn.hide();
        pageBtns.hide();
        dataTable.hide();
        sectionHeader.html('<span>#</span> Analytics');
    });
    productsBtn.click(function () {
        dashboardText.hide();
        ordersText.hide();
        analyticsText.hide();
        aboutMeText.hide();
        pageBtns.show();
        paginationBtn.show();
        dataTable.show();
        sectionHeader.html('<span>#</span> Products');
    });
    optionsBtn.click(function () {
        aboutMeText.show();
        dashboardText.hide();
        ordersText.hide();
        analyticsText.hide();
        pageBtns.hide();
        paginationBtn.hide();
        dataTable.hide();
        sectionHeader.html('<span>#</span> About Me');
    });

    loadData();

});
