import { lastUpdateSpecialPointCheck } from "./masterdata";
import SheetData from "./spreadsheet";

function onOpen() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    const testItems = [
        { name: "スペシャルポイント", functionName: "testMenu.specialPoint" },
    ];
    const jsonItems = [
        { name: "All", functionName: "jsonMenu.all" },
        { name: "Weapon", functionName: "jsonMenu.weapon" },
    ];

    sheet.addMenu("テスト", testItems);
    sheet.addMenu("JSON", jsonItems);
}

const testMenu = {
    specialPoint: function () {
        lastUpdateSpecialPointCheck();
    },
    main: () => {},
    sub: () => {},
    special: () => {},
};
const jsonMenu = {
    all: () => {
        const spreadSheets = SpreadsheetApp.getActiveSpreadsheet().getSheets();
        for (var sheet of spreadSheets) {
            createJsonFile(sheet.getName());
        }
    },
    weapon: () => {
        createJsonFile("weapon");
    },
};

function createJsonFile(tableName: string) {
    const sheetData = new SheetData(tableName);
    const json = JSON.stringify(sheetData.records);
    const folder = DriveApp.getFolderById("1-Ky5O7QLpVZh7gdmsW_n3K1yjpZevuf1");
    folder.createFile(`${tableName}.json`, json);
}
