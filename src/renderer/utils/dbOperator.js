/* eslint-disable indent */
import fse from 'fs-extra';
import path from 'path';
import { docDir } from './settings';
import db from './db';
import day from 'dayjs';
import logger from './logger';
// 将数据存至系统用户目录，防止用户误删程序
export const dbPath = path.join(docDir, 'data.sqlite3');
fse.ensureFileSync(dbPath);


class dbOperatorClass {
    // eslint-disable-next-line space-before-function-paren
    getDBTalbes() {
            const dbAllTablesSQL = 'SELECT * FROM SQLITE_MASTER';
            db.all(dbAllTablesSQL, (err, res) => {
                if (err) {
                    logger(err);
                    // this.$Notice.error({
                    //     title: '搜索失败',
                    //     desc: err,
                    // });
                } else {
                    logger(res);
                    // eslint-disable-next-line no-empty
                    for (let i = 0; i < res.totalCount; i++) {}
                }

            });
        }
        // eslint-disable-next-line space-before-function-paren
    getForeignKeys() {
        const dbAllTablesSQL = 'PRAGMA foreign_key_list(';
        db.all(dbAllTablesSQL, (err, res) => {
            if (err) {
                logger(err);
                // this.$Notice.error({
                //     title: '搜索失败',
                //     desc: err,
                // });
            } else {
                logger(res);
                // eslint-disable-next-line no-empty
                for (let i = 0; i < res.totalCount; i++) {}
            }

        });
    }

    // eslint-disable-next-line space-before-function-paren
    getEntityLinks() {
            const dbSqlStr = 'SELECT * FROM camp-department-name-link';
            db.all(dbSqlStr, (err, res) => {
                if (err) {
                    logger(err);
                    // this.$Notice.error({
                    //     title: '搜索失败',
                    //     desc: err,
                    // });
                } else {
                    return res;
                }

            });
        }
        // 生成随机四位编码
    getrandom() {
            const data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
                'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
                'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
            ];
            let nums = '';
            for (let j = 0; j < 8; j++) {
                const r = parseInt(Math.random() * 61);
                nums += data[r];
            }
            return nums;
        }
        // eslint-disable-next-line space-before-function-paren
    insertLinkData(linkData, tableName) {
        debugger;
        const getTableColumnsSQL = `PRAGMA table_info('${
            tableName
            }')`;

        db.all(getTableColumnsSQL, (err, tableColumnsArray) => {
            if (err) {

                // this.$Notice.error({
                //     title: '搜索失败',
                //     desc: err,
                // });
            } else {

                let columnsStr = ''; // 字段名
                for (let i = 0; i < tableColumnsArray.length; i++) {
                    if (tableColumnsArray[i].name !== 'id') {
                        columnsStr += tableColumnsArray[i].name + ',';
                    }
                }
                columnsStr = '(' + columnsStr.substring(0, columnsStr.length - 1) + ')';
                columnsStr = '(id,fromID,toID,starttime)';

                let valueStr = '';
                for (let i = 0; i < linkData.length; i++) {
                    const uid = this.getrandom();
                    //加上时间，如果没有就为空值。
                    const values = `('${uid}','${linkData[i].from.substring(linkData[i].from.lastIndexOf('-') + 1)}',
                         '${linkData[i].to.substring(linkData[i].to.lastIndexOf('-') + 1)}', '${day().format('YYYY-MM-DD HH:mm:ss')}')`;
                    // columnsStr = `( ${linkData[i].fromTableName}ID,${linkData[i].toTableName}ID,${linkData[i].fromTableName}Name,${linkData[i].toTableName}Name)`;
                    valueStr += values + ',';
                }
                valueStr = valueStr.substring(0, valueStr.lastIndexOf(','));
                const inserDataSQL = `INSERT INTO '${tableName}' ${columnsStr} values ${valueStr}  `;
                debugger;
                db.run(inserDataSQL, err => {
                    if (err) {
                        logger(err);
                        return err;
                    }
                    return err;


                });
            }

        });

        // const tableColumnsArray = db.run(getTableColumns);

        // Insert Into "department-camp"  (id,departmentID,campID) VALUES("1","1","1")

    }

}

export default new dbOperatorClass();