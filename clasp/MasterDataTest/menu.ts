function onOpen() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const items = [
        { name: "スペシャルポイント", functionName: "menu.specialPoint" },
    ];
    sheet.addMenu("テスト", items);
}

const menu = {
    specialPoint: function () {
        lastUpdateSpecialPointCheck();
    },
    main: function () {},
    sub: function () {},
    special: function () {},
};
