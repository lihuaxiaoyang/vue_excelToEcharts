<template>
  <div id="wrap">
    <div>
      <Form
        :label-width="90"
        inline
        @keydown.native.enter.prevent="getDataList('search')"
      >
        <FormItem label="实体类型">
          <Select
            v-model="search.entityTable"
            style="width: 200px;"
            placeholder="输入关键字进行快捷选择"
            clearable
            filterable
          >
            <Option
              v-for="(item, index) in tableList"
              :value="item.name"
              :key="index"
              >{{ item.name }}
            </Option>
          </Select>
        </FormItem>
        <FormItem label="实体名称">
          <Input
            v-model="search.entityName"
            style="width: 200px"
            clearable>
          </Input>
        </FormItem>
        <FormItem label="创建时间">
          <DatePicker
            :options="datePickerOption"
            type="daterange"
            style="width: 200px"
            v-model="search.createDateRange"
            split-panels
            :editable="false"
          ></DatePicker>
        </FormItem>
        <FormItem label="修改时间">
          <DatePicker
            :options="datePickerOption"
            type="daterange"
            style="width: 200px"
            v-model="search.updateDateRange"
            split-panels
            :editable="false"
          ></DatePicker>
        </FormItem>
        <FormItem :label-width="10">
          <Button
            type="primary"
            icon="ios-search"
            @click="getDataList('search')"
            title="搜索"
          ></Button>
        </FormItem>
      </Form>
      <Table
        border
        stripe
        :columns="dataList_table_column"
        :data="entityList"
        :loading="tableLoading"
        ref="selection"
      ></Table>
      <Page
        :total="dataListTotalCount"
        :current="searchParams.pageIndex"
        :page-size="searchParams.pageSize"
        @on-change="getDataList"
        @on-page-size-change="getDataListOnPageChange"
        :page-size-opts="[10, 20, 30, 40, 50]"
        show-total
        show-sizer
        show-elevator
        transfer
      ></Page>
    </div>
    <div id="chart-wrap"></div>
    <Modal
      v-model="modalShow"
      :mask-closable="false"
      :title="modalTitle"
      @on-cancel="modalShow = false"
    >
      <div>
        <Form
          inline
          ref="formVali"
          :model="modalParams"
          :rules="ruleValidate"
          label-position="right"
          :label-width="130"
          @keydown.native.enter.prevent="enterConfirm(modalParams.id)"
        >
          <div>
            <FormItem label="要素类型" prop="goods_id">
              <Select
                v-model="modalParams.goods_id"
                style="width:250px;"
                placeholder="必选，输入关键字进行快捷选择"
                ref="modalGoodsIdSelect"
                filterable
                clearable
                @on-change="modalSelectGoods"
              >
                <Option
                  v-for="item in tableList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}
                </Option>
              </Select>
            </FormItem>
            <FormItem label="关系类型" prop="relation1_id">
              <Select
                v-model="modalParams.relation1_id"
                style="width:250px;"
                placeholder="必选，输入关键字进行快捷选择"
                ref="modalRelationIdSelect"
                filterable
                clearable
              >
                <Option
                  v-for="item in relationList"
                  :value="item.id"
                  :key="item.id"
                  >{{ item.name }}
                </Option>
              </Select>
            </FormItem>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="modalShow = false">
          取消
        </Button>
        <Button
          type="primary"
          v-if="!modalParams.id"
          @click="addConfirm"
          :loading="modalBtnLoading"
          >确认
        </Button>
        <Button
          type="primary"
          v-if="modalParams.id"
          @click="editConfirm"
          :loading="modalBtnLoading"
          >确认
        </Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import go from 'gojs';
import dbOperator from '../utils/dbOperator.js';
import util from '../utils/util';
const MAKE = go.GraphObject.make;
export default {
  name: 'GetFather',
  data() {
    return {
      colorList: [
        '#C48888',
        '#81C0C0',
        '#C07AB8',
        '#02C874',
        '#46A3FF',
        '#FF7575',
        '#FFA6FF',
        '#FFDC35',
        '#FFCBB3',
        '#AAAAFF',
        '#E0E0E0',
        '#00CACA',
        '#FFFF00',
      ],
      dataListTotalCount: 0, // 后续可以删除的
      // 日期控件配置
      datePickerOption: util.getDatePickerOpt(),
      indeterminate: false,
      checkAll: false,
      selectEntityArray: [],
      selectFatherEntityIDArray: [],
      tableLoading: false,
      modalBtnLoading: false,
      modalShow: false,
      modalParams: {
        name: '',
        standard_buy_unit_price: '',
        standard_sell_unit_price: '',
        remark: '',
      },
      relationTable: [
        {
          id: '1',
          name: '人员营区关系',
          tableName: 'people-camp-relation',
        },
        {
          id: '2',
          name: '单位营区管理关系',
          tableName: 'department-camp',
        },
      ],
      entityTables: [],
      entityList: [],
      searchParams: {},
      delModalShow: false,
      ruleValidate: {
        name: [
          { required: true, message: '请输入 品名' },
          { max: 100, message: '品名 长度 100 以内' },
        ],
        standard_buy_unit_price: [
          {
            // pattern: util.getRegexp('money'),
            message: '标准进价 只能为 小数位不超过2位的正整数',
          },
        ],
        standard_sell_unit_price: [
          {
            // pattern: util.getRegexp('money'),
            message: '标准售价 只能为 小数位不超过2位的正整数',
          },
        ],
        remark: [{ max: 200, message: '备注 长度 200 以内' }],
      },
      tableList: [],
      relationList: [],
      dataList_table_column: [
        {
          title: '实体名称',
          key: 'name',
          align: 'center',
          minWidth: 50,
        },
        {
          title: '单位信息',
          key: 'department',
          align: 'center',
          minWidth: 50,
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center',
          minWidth: 50,
          render: (h, params) => {
            const remark = params.row.remark;
            if (remark) {
              return h(
                'Tooltip',
                {
                  class: {
                    'table-tooltip': true,
                  },
                  props: {
                    delay: 800,
                  },
                },
                [
                  h('div', remark),
                  h(
                    'div',
                    {
                      style: {
                        'white-space': 'normal',
                      },
                      slot: 'content',
                    },
                    remark
                  ),
                ]
              );
            }
          },
        },
        {
          title: '创建时间',
          key: 'create_time',
          align: 'center',
          minWidth: 50,
          render: (h, params) => {
            return h('span', util.dateFilter(params.row.create_time));
          },
        },
        {
          title: '修改时间',
          key: 'update_time',
          align: 'center',
          minWidth: 50,
          render: (h, params) => {
            return h('span', util.dateFilter(params.row.update_time));
          },
        },
        {
          title: '全选',
          width: 100,
          align: 'center',
          fixed: 'right',
          renderHeader: (h, params) => {
            return h('div', [
              h('action', '全选'),
              h('Checkbox', {
                props: {
                  type: 'selection',
                  size: 'small',
                  value: this.checkAll,
                  indeterminate: this.indeterminate,
                },
                attrs: {
                  title: '选择',
                },
                style: {
                  'margin-left': '5px',
                },
                nativeOn: {
                  click: val => {
                    this.handleCheckAll(params.row);
                  },
                },
              }),
            ]);
          },
          render: (h, params) => {
            const row = params.row;
            return h('div', [
              h('Checkbox', {
                props: {
                  type: 'singleSelect',
                  size: 'small',
                  value: params.row.singleChecked,
                },
                attrs: {
                  title: '选择',
                },
                style: {
                  'margin-left': '5px',
                },
                on: {
                  'on-change': val => {
                    params.row.singleChecked = val;
                    this.selectEntityChanged(params.row);
                  },
                },
              }),
            ]);
          },
        },
      ],
      search: {
        entityTable: '',
        entityName: '',
        name: '',
        remark: '',
        createDateRange: [ null, null ],
        updateDateRange: [ null, null ],
        sort: 'DESC',
        totalMax: null,
        totalMin: null,
        buyPriceMax: null,
        buyPriceMin: null,
        sellPriceMax: null,
        sellPriceMin: null,
        pageIndex: 1,
        pageSize: 10,
      },
      linksNodes: [],
      links: [],
    };
  },
  watch: {
    modelData(val) {
      console.log('watch');
      console.log(val);
      this.updateModel(val);
    },
  },
  mounted() {
    const mySelf = this;

    const dbSqlTableAll = 'SELECT * from sqlite_master where type = "table"';
    this.$db.all(dbSqlTableAll, (err, res) => {
      if (err) {
        this.$logger(err);
        this.$Notice.error({
          title: '搜索失败',
          desc: err,
        });
      }
    });
    mySelf.init();
  },
  computed: {
    modalTitle() {
      return this.modalParams.id ? '修改' : '添加关系';
    },
  },
  created: {},
  methods: {
    onSubmit() {},
    initNodeByTable() {
      this.$dbOp.getDBTalbes();
      // this.$dbOP.getForeignKeys();
    },
    initRelationDataList() {},
    makePort(name, spot, output, input) {
      return go.GraphObject.make(go.Shape, 'Circle', {
        fill: 'transparent',
        stroke: null, // this is changed to 'white' in the showPorts function
        desiredSize: new go.Size(8, 8),
        alignment: spot,
        alignmentFocus: spot, // align the port on the main Shape
        portId: name, // declare this object to be a 'port'
        fromSpot: spot,
        toSpot: spot, // declare where links may connect at this port
        fromLinkable: output,
        toLinkable: input, // declare whether the user may draw links to/from here
        cursor: 'pointer', // show a different cursor to indicate potential link point
      });
    },
    initGoodsDataList() {
      const dbSqlTableAll = 'SELECT * from sqlite_master where type = "table"';
      this.$db.all(dbSqlTableAll, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          let eIndex = 0;
          let rIndex = 0;
          for (let i = 0; i < res.length; i++) {
            if (
              res[i].type === 'table' &&
              res[i].tbl_name.search('relation') === -1
            ) {
              const eTableTem = {};
              eTableTem.id = eIndex;
              eTableTem.name = res[i].tbl_name;
              eTableTem.tableName = res[i].tbl_name;
              this.tableList.push(eTableTem);
              eIndex++;
            }
            if (
              res[i].type === 'table' &&
              res[i].tbl_name.search('relation') !== -1
            ) {
              const eTableTem = {};
              eTableTem.id = rIndex;
              eTableTem.name = res[i].tbl_name;
              eTableTem.tableName = res[i].tbl_name;
              this.relationList.push(eTableTem);
              rIndex++;
            }
          }
        }
      });
      // this.tableList = this.relationTable;
    },
    // 搜索
    getDataList(method) {
      this.tableLoading = true;
      if (method === 'search') {
        this.searchParams = JSON.parse(JSON.stringify(this.search));
      }
      if (typeof method === 'number') {
        this.searchParams.pageIndex = method;
      }
      const searchParams = this.searchParams;
      let whereSQL = '';
      // 'WHERE ' +
      // searchParams.entityTable +
      // '.remark LIKE ' +
      // `'%${searchParams.remark}%' `;
      // 这里修改为name
      searchParams.entityName
        ? (whereSQL += `where name = '${searchParams.entityName}' `)
        : null;
      searchParams.createDateRange[0]
        ? (whereSQL += `AND ${
          searchParams.entityTable
        }.create_time >= ${new Date(
          searchParams.createDateRange[0]
        ).getTime()} `)
        : null;
      searchParams.createDateRange[1]
        ? (whereSQL += `AND  ${
          searchParams.entityTable
        }.create_time <= ${new Date(
          searchParams.createDateRange[1]
        ).getTime() +
            24 * 60 * 60 * 1000 -
            1} `)
        : null;
      searchParams.updateDateRange[0]
        ? (whereSQL += `AND  ${
          searchParams.entityTable
        }.update_time >= ${new Date(
          searchParams.updateDateRange[0]
        ).getTime()} `)
        : null;
      searchParams.updateDateRange[1]
        ? (whereSQL += `AND  ${
          searchParams.entityTable
        }.update_time <= ${new Date(
          searchParams.updateDateRange[1]
        ).getTime() +
            24 * 60 * 60 * 1000 -
            1} `)
        : null;
      const pageSQL = `LIMIT ${
        searchParams.pageSize
      } OFFSET ${(searchParams.pageIndex - 1) * searchParams.pageSize} `;
      // const orderSQL = `ORDER BY GOODS_DETAIL_LIST.id ${searchParams.sort} `;
      const selectSQL = `SELECT * FROM ${searchParams.entityTable} `;
      // 导出sql
      this.downloadExcelSQL = selectSQL + whereSQL;
      // +orderSQL;
      const rowSQL = this.downloadExcelSQL + pageSQL;
      const countSQL =
        'SELECT COUNT(id) AS totalCount from GOODS_DETAIL_LIST ' + whereSQL;
      this.$logger(rowSQL);
      this.$db.all(rowSQL, (err, res) => {
        if (err) {
          this.$logger(err);
          this.$Notice.error({
            title: '搜索失败',
            desc: err,
          });
        } else {
          if (!res.length && searchParams.pageIndex !== 1) {
            this.getDataList(searchParams.pageIndex - 1);
          } else {
            this.entityList = res;
            for (let i = 0; i < this.entityList.length; i++) {
              this.entityList[i].singleChecked = false;
            }
          }
        }
        this.tableLoading = false;
      });
      // this.$logger(countSQL);
      // this.$db.get(countSQL, (err, res) => {
      //   if (err) {
      //     this.$logger(err);
      //     this.$Notice.error({
      //       title: '搜索失败',
      //       desc: err,
      //     });
      //   } else {
      //     this.dataListTotalCount = res.totalCount;
      //   }
      // });
    },
    // 单行选择
    // 单行选择
    selectEntityChanged(row) {
      for (let i = 0; i < this.entityList.length; i++) {
        if (this.entityList[i].id === row.id) {
          this.entityList[i].singleChecked = row.singleChecked;
          if (row.singleChecked === true) {
            if (this.selectEntityArray.indexOf(row) === -1) {
              this.selectEntityArray.push(row);
            }
          } else {
            if (this.selectEntityArray.indexOf(row) !== -1) {
              this.selectEntityArray.splice(
                this.selectEntityArray.indexOf(row),
                1
              );
            }
          }
        }
      }

      let selectSum = 0;
      for (let i = 0; i < this.entityList.length; i++) {
        if (this.entityList[i].singleChecked) {
          selectSum = selectSum + 1;
        }
      }
      if (selectSum === this.entityList.length) {
        this.checkAll = true;
        this.indeterminate = false;
      } else if (selectSum === 0) {
        this.checkAll = false;
        this.indeterminate = false;
      } else {
        this.indeterminate = true;
        this.checkAll = false;
      }

      this.$logger(row);
    },
    // 全部选择
    handleCheckAll() {
      this.$logger(this.$refs.selection);
      if (this.indeterminate) {
        this.checkAll = true;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      // 如果全选为true
      if (this.checkAll) {
        for (
          let i = 0;
          i < this.$refs.selection.$refs.tbody.$children.length;
          i++
        ) {
          this.$refs.selection.$refs.tbody.$children[
            i
          ].row.singleChecked = this.checkAll;
          if (
            this.selectEntityArray.indexOf(
              this.$refs.selection.$refs.tbody.$children[i].row
            ) === -1
          ) {
            this.selectEntityArray.push(
              this.$refs.selection.$refs.tbody.$children[i].row
            );
          }
        }
      } else {
        for (
          let i = 0;
          i < this.$refs.selection.$refs.tbody.$children.length;
          i++
        ) {
          this.$refs.selection.$refs.tbody.$children[
            i
          ].row.singleChecked = this.checkAll;
        }
        this.selectEntityArray = [];
      }
    },
    // pageSize改变
    getDataListOnPageChange(pageSize) {
      this.search.pageSize = pageSize;
      this.getDataList('search');
    },
    init() {
      this.initGoodsDataList();
      // this.initNodeByTable();
      // const mySelf = this;
      // window.myPalette = MAKE(
      //   go.Palette,
      //   'chart-palette', // must name or refer to the DIV HTML element
      //   {
      //     scrollsPageOnFocus: false,
      //     nodeTemplateMap: mySelf.myDiagram.nodeTemplateMap, // share the templates used by myDiagram
      //     model: new go.GraphLinksModel([
      //       // specify the contents of the Palette
      //       {
      //         category: 'Next',
      //         text: '新规则',
      //       },
      //       {
      //         category: 'RecordNode',
      //         key: 'Record1',
      //         fields: [
      //           {
      //             name: 'field1',
      //             info: '',
      //             color: '#F7B84B',
      //             figure: 'Ellipse',
      //           },
      //           {
      //             name: 'field2',
      //             info: 'the second one',
      //             color: '#F25022',
      //             figure: 'Ellipse',
      //           },
      //           { name: 'fieldThree', info: '3rd', color: '#00BCF2' },
      //         ],
      //       },
      //     ]),
      //   }
      // );
      // const dbSqlStr = 'SELECT * FROM "camp-department-name-link"';
      // const entityLinksRes = this.$dbOp.getEntityLinks();
      // this.$db.get(dbSqlStr, (err, res) => {
      //   if (err) {
      //     this.$logger(err);
      //     this.$Notice.error({
      //       title: '搜索失败',
      //       desc: err,
      //     });
      //   } else {
      //     this.$logger(res);
      //     const entityNodesTem = [];
      //     entityNodesTem.category = 'Next';
      //     entityNodesTem.text = res.name;
      //     // this.linksNodes.push(entityNodesTem);
      //   }
      // });
    },
    enterConfirm(id) {
      if (id) {
        this.editConfirm();
      } else {
        this.addConfirm();
      }
    },
    add() {
      this.$refs.formVali.resetFields();
      // this.modalParams = this.$options.data().modalParams;
      this.modalShow = true;
    },
    // 选择物品回调
    modalSelectGoods(val) {
      this.$logger('onChange 物品');
      if (val) {
        const SQL = `SELECT total_count,standard_buy_unit_price,standard_sell_unit_price,total_amount from GOODS WHERE id = '${val}'`;
        this.$logger(SQL);
        this.$db.get(SQL, (err, res) => {
          if (err) {
            this.$logger(err);
            this.$Notice.error({
              title: '搜索失败',
              desc: err,
            });
          } else {
            this.modalParams.type = '+';
            this.modalParams.count = 1.0;
            this.modalParams.total_count = res.total_count;
            this.modalParams.total_amount = res.total_amount;
            this.modalParams.actual_buy_unit_price =
              res.standard_buy_unit_price;
            this.modalParams.actual_sell_unit_price =
              res.standard_sell_unit_price;
          }
        });
      }
    },
    // 新增确认
    addConfirm() {
      this.$refs.formVali.validate(valid => {
        if (valid) {
          this.modalBtnLoading = true;
          const modalParams = this.modalParams;
          this.$db.serialize(() => {
            const actual_buy_unit_price =
              modalParams.type === '+' ? modalParams.actual_buy_unit_price : '';
            const actual_sell_unit_price =
              modalParams.type === '-'
                ? modalParams.actual_sell_unit_price
                : '';
            const count = Number(modalParams.type + modalParams.count);
            const amount = -(
              (actual_buy_unit_price || actual_sell_unit_price || 0) * count
            ).toFixed(2);
            this.$db.run('BEGIN');
            // 往物品total_count和total_amount中做运算
            const computeSQL = `UPDATE GOODS SET
            total_count = ${(modalParams.total_count + count).toFixed(3)}
            ,total_amount = ${(modalParams.total_amount + amount).toFixed(2)}
            WHERE id = '${modalParams.goods_id}'`;
            this.$logger(computeSQL);
            this.$db.run(computeSQL, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '新增失败',
                  desc: err,
                });
                this.$db.run('ROLLBACK');
              }
            });
            // 将最新记录标为不最新
            const cancelLatestSQL = `UPDATE GOODS_DETAIL_LIST SET latest = 0 WHERE create_time = (select max(create_time) from GOODS_DETAIL_LIST WHERE goods_id = '${modalParams.goods_id}')`;
            this.$logger(cancelLatestSQL);
            this.$db.run(cancelLatestSQL, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '新增失败',
                  desc: err,
                });
                this.$db.run('ROLLBACK');
              }
            });
            // 往明细记录中增加记录
            const insertSQL = `INSERT INTO GOODS_DETAIL_LIST (goods_id,count,remark,actual_buy_unit_price,actual_sell_unit_price,amount,latest,create_time,update_time)
          VALUES ('${modalParams.goods_id}','${count}','${
  modalParams.remark
}','${actual_buy_unit_price}','${actual_sell_unit_price}','${amount}','1','${Date.now()}','')`;
            this.$logger(insertSQL);
            this.$db.run(insertSQL, err => {
              if (err) {
                this.$logger(err);
                this.$Notice.error({
                  title: '新增失败',
                  desc: err,
                });
                this.$db.run('ROLLBACK');
              }
            });
            this.$db.run('COMMIT');
            this.modalShow = false;
            this.$Message.success({
              content: '新增成功',
            });
            this.getDataList(1);
            this.modalBtnLoading = false;
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#form-wrap {
  padding: 20px 40px;
  // background-color: white;
  border: solid 1px rgb(244, 244, 244);
}

#submit {
  width: 102px;
  height: 40px;
  float: right;
  margin: 20px 5px 16px 0;
}

#chart-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 22px;

  #chart-palette {
    width: 180px;
    margin-right: 30px;
    background-color: white;
    border: solid 1px rgb(244, 244, 244);
  }

  #chart-diagram {
    flex-grow: 1;
    height: 720px;
    background-color: white;
    border: solid 1px rgb(244, 244, 244);
  }
}

#lateEntry {
  clear: both;
  background-color: rgb(255, 255, 255);
  border: solid 1px rgb(244, 244, 244);

  > span {
    display: inline-block;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    text-indent: 30px;
    letter-spacing: 0.8px;
    text-align: left;
    color: rgb(35, 35, 35);
  }
}
</style>
