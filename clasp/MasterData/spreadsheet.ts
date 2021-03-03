export default class SheetData {
    sheetName: string;
    rawSheetData: any[][];
    records: {}[];
    columns: { columnNum: number; name: string }[];
    values: {};

    constructor(sheetName: string) {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(
            sheetName
        );
        const rawSheetData = sheet.getDataRange().getValues();

        const rawColumns: string[] = rawSheetData[0];
        const columns: { columnNum: number; name: string }[] = [];
        rawColumns.forEach((dataOfColumn, idx) => {
            columns.push({ columnNum: idx + 1, name: dataOfColumn });
        });

        const rawData: any[][] = rawSheetData.slice(1); // 1行目(カラム行)以外をデータ部とする
        const records: {}[] = [];
        rawData.forEach((dataOfRow, idx) => {
            const obj = { rowNum: idx + 1 + 1 }; // 行数は1始まり+カラム行の分を足しておく
            columns.forEach((column, i) => {
                obj[column.name] = dataOfRow[i];
            });
            records.push(obj);
        });

        const values = {};
        columns.forEach((column, idx) => {
            const arr = rawData.map((value) => value[idx]);
            values[column.name] = new Set(arr);
        });

        this.sheetName = sheetName;
        this.rawSheetData = rawSheetData;
        this.columns = columns;
        this.records = records;
        this.values = values;
    }

    getMulti({ key, value }: { key: string; value: any }): {}[] {
        const records: {}[] = [];
        this.records.forEach((row) => {
            if (row[key] == value) {
                records.push(row);
            }
        });

        return records;
    }
}
