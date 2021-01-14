import SheetData from "./spreadsheet";

// スペシャルポイントのアップデート情報の最新とブキ一覧のスペシャルポイントが一致していることを確認するためのテスト
function lastUpdateSpecialPointCheck() {
    const updateSpecialPointData = new SheetData("update_special_point");
    const weaponData = new SheetData("weapon");

    weaponData.records.forEach((record, idx) => {
        const updateRecord = lastUpdateRecord(record["weapon_name"]);
        if (updateRecord == undefined) {
            Logger.log(
                `Nothing update ${record["weapon_name"]}: ${record["special_point"]}`
            );
            return;
        }
        if (updateRecord["after_special_point"] != record["special_point"]) {
            Logger.log(
                `failed ${record["rowNum"]}  ${record["weapon_name"]}: ${updateRecord["after_special_point"]} / ${record["special_point"]}`
            );
            return;
        }

        Logger.log(
            `success ${record["rowNum"]}  ${record["weapon_name"]}: ${record["special_point"]}`
        );
    });

    function lastUpdateRecord(value: string): {} {
        const rows = updateSpecialPointData.getMulti({
            key: "weapon_name",
            value: value,
        });
        if (rows.length == 0) {
            return;
        }
        rows.sort(function (a, b) {
            if (a["rowNum"] > b["rowNum"]) {
                return -1;
            } else {
                return 1;
            }
        });

        return rows[0];
    }
}
