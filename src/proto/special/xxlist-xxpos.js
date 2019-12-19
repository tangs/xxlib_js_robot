// @flow

const { PkgBase, DataType } = require("../pkg-base");
const XXPos = require("./xxpos");

class XXListXXPos extends PkgBase {
    pkgTypeId = XXListXXPos.pkgTypeId;

    positions: XXPos[] = [];

    constructor() {
        super();
        this.pkgDatasType.push(
            {
                type: DataType.LIST_POS,
                key: 'positions',
            },
        );
    }

    static pkgTypeId = 66;
}

module.exports = XXListXXPos;
