import fse from 'fs-extra';
import path from 'path';
import sq3 from 'sqlite3';
import logger from './logger';
import { docDir } from './settings';
// 将数据存至系统用户目录，防止用户误删程序
export const dbPath = path.join(docDir, 'caijidata2.0.db');
fse.ensureFileSync(dbPath);
const sqlite3 = sq3.verbose();
//返回数据库对象并且自动打开和连接数据库
const database = new sqlite3.Database(dbPath);

const test = db => {
    db.serialize(() => {
        db.run(`CREATE TABLE guanjiansheshi (
    id           VARCHAR (40)  NOT NULL,
    type         VARCHAR (30)  NOT NULL,
    projecttype   VARCHAR (40)  NOT NULL,
    name      VARCHAR (40)  NOT NULL,
    campname        VARCHAR (40)  NOT NULL,
    zhibiao11       VARCHAR (40),
    zhibiao12       VARCHAR (40),
    zhibiao13       VARCHAR (40),
    zhibiao21       VARCHAR (40),
    zhibiao22       VARCHAR (40),
    zhibiao23       VARCHAR (40),
    zhibiao31       VARCHAR (40),
    zhibiao32       VARCHAR (40),
    zhibiao33       VARCHAR (40),
    zhibiao41       VARCHAR (40),
    zhibiao42       VARCHAR (40),
    zhibiao43       VARCHAR (40),
    zhibiao51       VARCHAR (40),
    zhibiao52       VARCHAR (40),
    zhibiao53       VARCHAR (40),
    fuzeren         VARCHAR (20)  NOT NULL,
    phone         VARCHAR (20)  NOT NULL,
    remark          VARCHAR (20)  NOT NULL,
    field1       VARCHAR (40),
    field2       VARCHAR (40),
    isdel        VARCHAR (10)  NOT NULL,
    starttime            TEXT,
    updatetime           TEXT,
    PRIMARY KEY (
        id
    )
)`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE guofanggongcheng (
    id           VARCHAR (30)  NOT NULL,
    name         VARCHAR (30)  NOT NULL,
    suoshudanwei VARCHAR (30)  NOT NULL,
    type   VARCHAR (20)  NOT NULL,
    class      VARCHAR (20)  NOT NULL,
    sszhanqu        VARCHAR (20)  NOT NULL,
    province VARCHAR (20) NOT NULL,
    city       VARCHAR (20) NOT NULL,
    area       VARCHAR (20) NOT NULL,
    address       VARCHAR (100) NOT NULL,
    num       VARCHAR (40) NOT NULL,
    usedanwei        VARCHAR (10)  NOT NULL,
    spenddanwei        VARCHAR (10)  NOT NULL,
    isdel        VARCHAR (10)  NOT NULL,
    starttime            TEXT,
    updatetime           TEXT,
    PRIMARY KEY (
        id
    )
)`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE zhanbeiwuzistore (
    id           VARCHAR (30)  NOT NULL,
    saveweizhi         VARCHAR (30)  NOT NULL,
    major   VARCHAR (30)  NOT NULL,
    name      VARCHAR (30)  NOT NULL,
    jiliangdanwei        VARCHAR (10)  NOT NULL,
    num VARCHAR (20) NOT NULL,
    jine       VARCHAR (20),
    savedanwei       VARCHAR (40) NOT NULL,
    saveclass       VARCHAR (30) NOT NULL,
    zhiliangstatus       VARCHAR (30) NOT NULL,
    baozhangnengli       VARCHAR (100) NOT NULL,
    remark       VARCHAR (100) NOT NULL,
    isdel        VARCHAR (10)  NOT NULL,
    starttime            TEXT,
    updatetime           TEXT,
    PRIMARY KEY (
        id
    )
)`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE associatehelp (
      id            VARCHAR (30)  NOT NULL,
      name          VARCHAR (30)  NOT NULL,
      class          VARCHAR (30)  NOT NULL,
      lishuguanxi          VARCHAR (30)  NOT NULL,
      type  VARCHAR (30)  NOT NULL,
      province      VARCHAR (20)  NOT NULL,
      city          VARCHAR (20)  NOT NULL,
      area          VARCHAR (20)  NOT NULL,
      address       VARCHAR (100) NOT NULL,
      bianzhi VARCHAR (30)  NOT NULL,
      shiyou VARCHAR (30)  NOT NULL,
      baozhangnengli VARCHAR (30)  NOT NULL,
      contact       VARCHAR (30)  NOT NULL,
      phone         VARCHAR (30)  NOT NULL,
      remark        VARCHAR (100),
      field1        VARCHAR (40),
      field2        VARCHAR (40),
      isdel         VARCHAR (10)  NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE baozhangdanyuan (
      id              VARCHAR (30) NOT NULL,
      name            TEXT NOT NULL,
      leixing         TEXT NOT NULL,
      jibie           TEXT NOT NULL,
      baozhangzhineng TEXT NOT NULL,
      baozhangnnegli  TEXT NOT NULL,
      beizhu,
      isdel           VARCHAR (10) NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE baozhangjigou (
      id      VARCHAR (30) NOT NULL,
      name      VARCHAR (30) NOT NULL,
      jigouType      TEXT NOT NULL,
      class          VARCHAR (10) NOT NULL,
      province       VARCHAR (20) NOT NULL,
      city           VARCHAR (20) NOT NULL,
      area           VARCHAR (20) NOT NULL,
      address        VARCHAR (50) NOT NULL,
      mission        TEXT NOT NULL,
      bianzhi        INTEGER NOT NULL,
      shiyou         INTEGER NOT NULL,
      jgbianzhi      INTEGER NOT NULL,
      jgshiyou       INTEGER NOT NULL,
      shibingbianzhi INTEGER NOT NULL,
      shibingshiyou  INTEGER NOT NULL,
      wenzhibianzhi  INTEGER NOT NULL,
      wenzhishiyou   INTEGER NOT NULL,
      baozhangnengli TEXT NOT NULL,
      field1         VARCHAR (40),
      field2         VARCHAR (40),
      isdel          VARCHAR (10) NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
        id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE barrack (
      id                   VARCHAR (30) NOT NULL,
      fenleibianma         TEXT NOT NULL,
      zichanfenlei         TEXT NOT NULL,
      name            TEXT NOT NULL,
      province             TEXT NOT NULL,
      city                 TEXT NOT NULL,
      area                 TEXT NOT NULL,
      address              TEXT NOT NULL,
      fendonghao           TEXT NOT NULL,
      guanlidanwei         TEXT NOT NULL,
      shiyongdanwei        TEXT NOT NULL,
      shilimianji          TEXT NOT NULL,
      jiliangdanwei        TEXT NOT NULL,
      fangwujiazhi         TEXT NOT NULL,
      qudefangshi          TEXT NOT NULL,
      shiyongzhuangtai     TEXT NOT NULL,
      weituoyunyingmianji  TEXT NOT NULL,
      shejishiyongnianxian TEXT NOT NULL,
      zhiliangdengji       TEXT NOT NULL,
      pandiandanwei        TEXT NOT NULL,
      beizhu               TEXT,
      jianchengshijian,
      isdel                VARCHAR (10) NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE camp (
      id             VARCHAR (30)  NOT NULL,
      name       VARCHAR (30)  NOT NULL,
      province       VARCHAR (20)  NOT NULL,
      city           VARCHAR (20)  NOT NULL,
      area           VARCHAR (20)  NOT NULL,
      address        VARCHAR (50)  NOT NULL,
      takearea       VARCHAR (30)  NOT NULL,
      buildarea      VARCHAR (30)  NOT NULL,
      yongdifenlei     VARCHAR (40)  NOT NULL,
      gongshui    VARCHAR (40)  NOT NULL,
      gongdian        VARCHAR (40)  NOT NULL,
      gongqi   VARCHAR (40) NOT NULL,
      gongnuan         VARCHAR (40)  NOT NULL,
      liyongzk         VARCHAR (40)  NOT NULL,
      ziranhj         VARCHAR (40)  NOT NULL,
      shehuihj         VARCHAR (40)  NOT NULL,
      remark         VARCHAR (100),
      isdel          VARCHAR (10)  NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE department (
      id                   VARCHAR (30) NOT NULL,
      bianma               VARCHAR (30) NOT NULL,
      name       VARCHAR (30) NOT NULL,
      dempartmentaliasCode TEXT,
      class                VARCHAR (10) NOT NULL,
      province             VARCHAR (20) NOT NULL,
      city                 VARCHAR (20) NOT NULL,
      area                 VARCHAR (20) NOT NULL,
      address              VARCHAR (50) NOT NULL,
      history              TEXT NOT NULL,
      mission              TEXT NOT NULL,
      bianzhi              INTEGER NOT NULL,
      shiyou               INTEGER NOT NULL,
      jgbianzhi            INTEGER NOT NULL,
      jgshiyou             INTEGER NOT NULL,
      shibingbianzhi       INTEGER NOT NULL,
      shibingshiyou        INTEGER NOT NULL,
      wenzhibianzhi        INTEGER NOT NULL,
      wenzhishiyou         INTEGER NOT NULL,
      beizhu               TEXT,
      field1               VARCHAR (40),
      field2               VARCHAR (40),
      isdel                VARCHAR (10) NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE peoplecondition (
      id          VARCHAR (40)  NOT NULL,
      name        VARCHAR (30)  NOT NULL,
      peopletype  VARCHAR (30)  NOT NULL,
      peopleclass VARCHAR (30)  NOT NULL,
      peopledp    VARCHAR (30)  NOT NULL,
      homeplace   VARCHAR (30)  NOT NULL,
      partintime  VARCHAR (30)  NOT NULL,
      phone       VARCHAR (30)  NOT NULL,
      major       VARCHAR (30)  NOT NULL,
      othermajor  VARCHAR (100),
      remark      VARCHAR (200),
      field1      VARCHAR (40),
      field2      VARCHAR (40),
      isdel       VARCHAR (10)  NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE shebeiqicai (
      id                TEXT NOT NULL,
      type              TEXT NOT NULL,
      name      TEXT NOT NULL,
      danwei            TEXT NOT NULL,
      shiyongdanwei     TEXT NOT NULL,
      zerenren          TEXT NOT NULL,
      zhangmianshuliang INTEGER NOT NULL,
      jiliangdanwei     TEXT NOT NULL,
      danjia            TEXT NOT NULL,
      jine              TEXT NOT NULL,
      qudefangshi       TEXT NOT NULL,
      quderiqi          TEXT NOT NULL,
      shiyongnianxian   TEXT NOT NULL,
      shiyongzhuangtai  TEXT NOT NULL,
      zhiliangdengji    TEXT NOT NULL,
      pandiandanwei     TEXT NOT NULL,
      beizhu            TEXT,
      isdel             VARCHAR (10) NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE socityhelp (
      id                  VARCHAR (40)  NOT NULL,
      campnamme                VARCHAR (30)  NOT NULL,
      type                VARCHAR (30)  NOT NULL,
      model VARCHAR (40)  NOT NULL,
      name        VARCHAR (200) NOT NULL,
      peoplenum          VARCHAR (200) NOT NULL,
      scale              VARCHAR (40)  NOT NULL,
      baozhangnengli              VARCHAR (40)  NOT NULL,
      contact              VARCHAR (40)  NOT NULL,
      phone              VARCHAR (40)  NOT NULL,
      remark              VARCHAR (40),
      isdel               VARCHAR (10)  NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE user (
      id       VARCHAR (30) NOT NULL,
      username VARCHAR (40) NOT NULL,
      password VARCHAR (40) NOT NULL,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`INSERT INTO user (id, username, password) 
  VALUES ('sdfg', 'admin', '1qaz!QAZ')`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE zhuangbei (
      id                   VARCHAR (40)  NOT NULL,
      type                 TIME NOT NULL,
      name                 TEXT NOT NULL,
      zhuangbeiID          TEXT NOT NULL,
      danwei               TEXT NOT NULL,
      shiyongdanwei        TEXT NOT NULL,
      zerenren             TEXT NOT NULL,
      shilishuliang        INTEGER NOT NULL,
      jiliangdanwei        TEXT NOT NULL,
      danjia               TEXT NOT NULL,
      jine                 TEXT NOT NULL,
      chuchangriqi         TEXT,
      qudefangshi          TEXT,
      shiyongzhuangtai     TEXT,
      zhiliangdengji       TEXT,
      pandiandanwei        TEXT,
      zairennengli         INTEGER,
      zaihuonengli         REAL,
      sudu                 REAL,
      shifouxiaohaoyouliao INTEGER,
      zhuyouxiangrongliang REAL,
      fuyouxiangrongliang  REAL,
      xingcheyouhao        REAL,
      shifouzhuangpeiyouji INTEGER,
      kaijiyouhao          REAL,
      beizhu               TEXT,
      isdel                VARCHAR (10)  NOT NULL,
      starttime            TEXT,
      updatetime           TEXT,
      PRIMARY KEY (
          id
      )
  )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [aroundhelp-camp-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [associatehelp-camp-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [baozhangdanyuan-baozhangjigou-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [baozhangjigou-camp-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [barrack-camp-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [camp-jigou-baozhang-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [department-camp-guanli-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [department-camp-zhuying-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [department-department-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [department-jigou-baozhang-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [guanjiansheshi-department-guanli-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [people-department-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE relationTableIndex (
            id VARCHAR (30) NOT NULL,
            tableName TEXT,
            relationTableName TEXT,
            viewTableName TEXT,
            relationEntityClass TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE TABLE [societyhelp-camp-relation] (
            id VARCHAR (30) NOT NULL,
            fromID VARCHAR (30),
            toID VARCHAR (30),
            starttime TEXT,
            updatetime TEXT,
            PRIMARY KEY (id)
          )`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [associatehelp-camp-name-link] AS SELECT
        associatehelp.name	AS fromName, 
        camp.name AS toName, 
        [associatehelp-camp-relation].fromID, 
        [associatehelp-camp-relation].toID
    FROM
        associatehelp
        INNER JOIN
        [associatehelp-camp-relation]
        ON
            associatehelp.id = [associatehelp-camp-relation].fromID
        INNER JOIN
        camp
        ON 
            [associatehelp-camp-relation].toID = camp.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [baozhangjigou-baozhangdanyuan-name-link] AS SELECT
        baozhangdanyuan.name AS fromName, 
        [baozhangdanyuan-baozhangjigou-relation].fromID, 
        [baozhangdanyuan-baozhangjigou-relation].toID, 
        baozhangjigou.name AS toName
    FROM
        [baozhangdanyuan-baozhangjigou-relation]
        INNER JOIN
        baozhangdanyuan
        ON 
            [baozhangdanyuan-baozhangjigou-relation].fromID = baozhangdanyuan.id
        INNER JOIN
        baozhangjigou
        ON 
            [baozhangdanyuan-baozhangjigou-relation].toID = baozhangjigou.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [baozhangjigou-camp-name-link] AS SELECT
        [baozhangjigou-camp-relation].fromID, 
        [baozhangjigou-camp-relation].toID, 
        baozhangjigou.name AS fromName, 
        camp.name AS toName
    FROM
        [baozhangjigou-camp-relation]
        INNER JOIN
        baozhangjigou
        ON 
            [baozhangjigou-camp-relation].fromID = baozhangjigou.id
        INNER JOIN
        camp
        ON 
            [baozhangjigou-camp-relation].toID = camp.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [department-camp-guanli-name-link] AS SELECT
        department.name AS fromName, 
        camp.name AS toName, 
        [department-camp-guanli-relation].fromID, 
        [department-camp-guanli-relation].toID,
        camp.province,
camp.city,
camp.area,
camp.address,
camp.takearea,
camp.buildarea,
camp.yongdifenlei,
camp.gongshui,
camp.gongdian,
camp.gongqi,
camp.gongnuan,
camp.liyongzk,
camp.ziranhj,
camp.shehuihj,
camp.remark,
camp.isdel
    FROM
        [department-camp-guanli-relation]
        INNER JOIN
        department
        ON 
            [department-camp-guanli-relation].fromID = department.id
        INNER JOIN
        camp
        ON 
            [department-camp-guanli-relation].toID = camp.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [department-camp-zhuying-name-link] AS SELECT
        department.name AS fromName, 
        camp.name AS toName, 
        [department-camp-zhuying-relation].fromID, 
        [department-camp-zhuying-relation].toID
    FROM
        [department-camp-zhuying-relation]
        INNER JOIN
        department
        ON 
            [department-camp-zhuying-relation].fromID = department.id
        INNER JOIN
        camp
        ON 
            [department-camp-zhuying-relation].toID = camp.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [department-department-name-link] AS SELECT
        department.name AS fromName, 
        department.name AS toName, 
        [department-department-relation].fromID, 
        [department-department-relation].toID
    FROM
        [department-department-relation]
        INNER JOIN
        department
        ON 
            [department-department-relation].fromID = department.id
        INNER JOIN
        camp
        ON 
            [department-department-relation].toID = department.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [department-jigou-baozhang-name-link] AS SELECT
        department.name AS fromName, 
        baozhangjigou.name AS toName, 
        [department-jigou-baozhang-relation].fromID, 
        [department-jigou-baozhang-relation].toID,
        baozhangjigou.jigouType,
baozhangjigou.class,
baozhangjigou.province,
baozhangjigou.city,
baozhangjigou.area,
baozhangjigou.address,
baozhangjigou.mission,
baozhangjigou.bianzhi,
baozhangjigou.shiyou,
baozhangjigou.jgbianzhi,
baozhangjigou.jgshiyou,
baozhangjigou.shibingbianzhi,
baozhangjigou.shibingshiyou,
baozhangjigou.wenzhibianzhi,
baozhangjigou.wenzhishiyou,
baozhangjigou.baozhangnengli,
baozhangjigou.field1,
baozhangjigou.field2,
baozhangjigou.isdel
    FROM
        [department-jigou-baozhang-relation]
        INNER JOIN
        department
        ON 
            [department-jigou-baozhang-relation].fromID = department.id
        INNER JOIN
        baozhangjigou
        ON 
            [department-jigou-baozhang-relation].toID = baozhangjigou.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [guanjiansheshi-department-guanli-name-link] AS SELECT
        [guanjiansheshi-department-guanli-relation].fromID, 
        [guanjiansheshi-department-guanli-relation].toID, 
        department.name AS fromName, 
        guanjiansheshi.name AS toName,
        guanjiansheshi.type,
guanjiansheshi.projecttype,
guanjiansheshi.campname,
guanjiansheshi.zhibiao11,
guanjiansheshi.zhibiao12,
guanjiansheshi.zhibiao13,
guanjiansheshi.zhibiao21,
guanjiansheshi.zhibiao22,
guanjiansheshi.zhibiao23,
guanjiansheshi.zhibiao31,
guanjiansheshi.zhibiao32,
guanjiansheshi.zhibiao33,
guanjiansheshi.zhibiao41,
guanjiansheshi.zhibiao42,
guanjiansheshi.zhibiao43,
guanjiansheshi.zhibiao51,
guanjiansheshi.zhibiao52,
guanjiansheshi.zhibiao53,
guanjiansheshi.fuzeren,
guanjiansheshi.phone,
guanjiansheshi.remark,
guanjiansheshi.field1,
guanjiansheshi.field2,
guanjiansheshi.isdel
    FROM
        [guanjiansheshi-department-guanli-relation]
        INNER JOIN
        department
        ON 
            [guanjiansheshi-department-guanli-relation].fromID = department.id
        INNER JOIN
        guanjiansheshi
        ON 
            [guanjiansheshi-department-guanli-relation].toID = guanjiansheshi.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [people-camp-name-link] AS SELECT
        peoplecondition.name AS fromName, 
        [people-camp-relation].fromID, 
        [people-camp-relation].toID, 
        camp.name AS toName
    FROM
        [people-camp-relation]
        INNER JOIN
        peoplecondition
        ON 
            [people-camp-relation].fromID = peoplecondition.id
        INNER JOIN
        camp
        ON 
            [people-camp-relation].toID = camp.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [people-department-name-link] AS SELECT
        peoplecondition.name AS fromName, 
        [people-department-relation].fromID, 
        [people-department-relation].toID, 
        department.name AS toName,
        peoplecondition.peopletype,
peoplecondition.peopleclass,
peoplecondition.peopledp,
peoplecondition.homeplace,
peoplecondition.partintime,
peoplecondition.phone,
peoplecondition.major,
peoplecondition.othermajor,
peoplecondition.remark,
peoplecondition.field1,
peoplecondition.field2,
peoplecondition.isdel
    FROM
        [people-department-relation]
        INNER JOIN
        peoplecondition
        ON 
            [people-department-relation].fromID = peoplecondition.id
        INNER JOIN
        department
        ON 
            [people-department-relation].toID = department.id`, err => {
            logger(err);
        });
        db.run(`CREATE VIEW [societyhelp-camp-name-link] AS SELECT
        [societyhelp-camp-relation].fromID, 
        [societyhelp-camp-relation].toID, 
        camp.name AS toName, 
        socityhelp.name AS fromName
    FROM
        socityhelp
        INNER JOIN
        [societyhelp-camp-relation]
        ON 
            socityhelp.id = [societyhelp-camp-relation].fromID
        INNER JOIN
        camp
        ON 
            [societyhelp-camp-relation].toID = camp.id`, err => {
            logger(err);
        });
        db.run(`PRAGMA foreign_keys = on`, err => {
            logger(err);
        });

        db.run(`INSERT INTO "relationTableIndex" VALUES (1, 'camp', 'associatehelp-camp-relation', 'associatehelp-camp-name-link', 'associatehelp')`, err => {
            logger(err);
        });

        db.run(`INSERT INTO "relationTableIndex" VALUES (2, 'baozhangjigou', 'baozhangjigou-baozhangdanyuan-relation', 'baozhangjigou-baozhangdanyuan-name-link', 'baozhangdanyuan')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (3, 'baozhangjigou', 'baozhangjigou-camp-relation', 'baozhangjigou-camp-name-link', 'camp')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (4, 'department', 'department-camp-guanli-relation', 'department-camp-guanli-name-link', 'camp')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (5, 'department', 'department-camp-zhuying-relation', 'department-camp-zhuying-name-link', 'camp')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (6, 'department', 'department-department-relation', 'department-department-name-link', 'department')`, err => {
            logger(err);
        });

        db.run(`INSERT INTO "relationTableIndex" VALUES (7, 'department', 'department-jigou-baozhang-relation', 'department-jigou-baozhang-name-link', 'baozhangjigou')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (8, 'guanjiansheshi', 'guanjiansheshi-department-guanli-relation', 'guanjiansheshi-department-guanli-name-link', 'department')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (9, 'people', 'people-camp-relation', 'people-camp-name-link', 'camp')`, err => {
            logger(err);
        });
        db.run(`
        INSERT INTO "relationTableIndex" VALUES (10, 'people', 'people-department-relation', 'people-department-name-link', 'department')`, err => {
            logger(err);
        });
        db.run(`INSERT INTO "relationTableIndex" VALUES (11, 'societyhelp', 'societyhelp-camp-relation', 'societyhelp-camp-name-link', 'camp')`, err => {
            logger(err);
        });

    });
};
test(database);
export default database;