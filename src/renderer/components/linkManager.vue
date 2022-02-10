<template>
  <div id="wrap">
    <div>
      <Button
        style="margin-left:5px;"
        type="primary"
        icon="plus-round"
        @click="add"
        title="添加关系"
      ></Button>
    </div>
    <div style="display: flex;">
      <getSon @getsonArray="getsonArray" ref="sonEntity"></getSon>
      <getFather ref="fatherEntity"></getFather>
    </div>
    <div id="chart-wrap">
      <div id="chart-diagram"></div>
    </div>
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
            <FormItem label="关系类型" prop="relation1_id">
              <Select
                v-model="modalParams.relationTableID"
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
          @click="addRelationConfirm"
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
import getSon from '../components/GetSonData.vue';
import getFather from '../components/GetFatherData.vue';
const MAKE = go.GraphObject.make;
export default {
  name: 'links-manager',
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
      selectEntityIDArray: [],
      selectFatherEntityIDArray: [],
      tableLoading: false,
      modalBtnLoading: false,
      modalShow: false,
      modalParams: {
        name: '',
        standard_buy_unit_price: '',
        standard_sell_unit_price: '',
        remark: '',
        relationTableName: '',
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
  components: {
    getSon,
    getFather,
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
    // 以下是新建画板并配置
    mySelf.myDiagram = MAKE(go.Diagram, 'chart-diagram', {
      initialContentAlignment: go.Spot.Center, // 居中显示
      'undoManager.isEnabled': true, // 支持 Ctrl-Z 和 Ctrl-Y 操作
      'toolManager.hoverDelay': 100, // tooltip提示显示延时
      'toolManager.toolTipDuration': 10000, // tooltip持续显示时间
      // isReadOnly:true,//只读
      'grid.visible': true, // 显示网格
      allowMove: true, // 允许拖动
      // allowDragOut:true,
      allowDelete: true,
      allowCopy: true,
      allowClipboard: true,
      'toolManager.mouseWheelBehavior': go.ToolManager.WheelZoom, // 有鼠标滚轮事件放大和缩小，而不是向上和向下滚动
      // layout: MAKE(go.TreeLayout, {
      //   angle: 0,
      //   layerSpacing: 35
      // })
    }); // 构建gojs对象
    console.log(mySelf.myDiagram);
    // 图表单击
    mySelf.myDiagram.addDiagramListener('ObjectSingleClicked', function(e) {
      debugger;
      console.log(e.subject.part);
    });
    // 图表单击右键
    mySelf.myDiagram.addDiagramListener('ObjectContextClicked', function(e) {
      debugger;
      console.log(e.subject.part);
    });

    mySelf.myDiagram.addDiagramListener('BackgroundSingleClicked', function(e) {
      debugger;
      console.log('Double-clicked at' + e.diagram.lastInput.documentPoint);
    });

    mySelf.myDiagram.addDiagramListener('ClipboardPasted', function(e) {
      debugger;
      console.log('Pasted' + e.diagram.selection.count + 'parts');
    });
    // 以下是连接线的配置
    mySelf.myDiagram.linkTemplate = MAKE(
      go.Link,
      {
        relinkableFrom: true,
        relinkableTo: true,
        toShortLength: 4,
        fromShortLength: 2,
      },
      MAKE(go.Shape, {
        strokeWidth: 2,
        stroke: '#F60',
      }),
      MAKE(go.Shape, {
        toArrow: 'Standard',
        fill: 'red',
        stroke: 'blue',
      }), // 箭头
      MAKE(
        go.TextBlock,
        {
          margin: 20,
          stroke: 'blue',
          font: '14px sans-serif',
          width: 50,
          wrap: go.TextBlock.WrapDesiredSize,
        },
        new go.Binding('text', 'text')
      ),
      {
        toolTip: MAKE(
          go.Adornment,
          'Auto',
          MAKE(go.Shape, {
            fill: '#FFFFCC',
          }),
          MAKE(
            go.TextBlock,
            {
              margin: 4,
            },
            new go.Binding('text', 'name')
          )
        ), // end of Adornment
      }
    );
    const myModel = MAKE(go.GraphLinksModel, {
      copiesArrays: true,
      copiesArrayObjects: true,
      linkFromPortIdProperty: 'fromPort',
      linkToPortIdProperty: 'toPort',
    });
    const lightText = 'whitesmoke';

    const dbSqlTableAll = 'SELECT * from sqlite_master where type = "table"';
    this.$db.all(dbSqlTableAll, (err, res) => {
      if (err) {
        this.$logger(err);
        this.$Notice.error({
          title: '搜索失败',
          desc: err,
        });
      } else {
        for (let i = 0; i < res.length; i++) {
          if (
            res[i].type === 'table' &&
            res[i].tbl_name.search('relation') === -1
          ) {
            mySelf.myDiagram.nodeTemplateMap.add(
              res[i].tbl_name,
              MAKE(
                go.Node,
                'Spot',
                // nodeStyle(),
                MAKE(
                  // 声明创建一个新的面板对象,自定义方式可参考mySelf.myDiagram.nodeTemplate
                  go.Panel, // 表明需要创建一个panel面板对象
                  'Auto', // 页面布局为自动
                  MAKE(
                    // 声明构建一个圆角矩形
                    go.Shape,
                    // {
                    //   fromSpot: go.Spot.Right, // links only go from the right side to the left side
                    //   toSpot: go.Spot.Left,
                    //   // allow drawing links from or to this port:
                    //   // fromLinkable: true,
                    //   // toLinkable: true,
                    //   fromLinkable: true,
                    //   toLinkable: true,
                    //   cursor: 'pointer',
                    // },
                    'RoundedRectangle',
                    {
                      fill: this.colorList[i],
                      stroke: '#FFF',
                      strokeWidth: 1,
                      angle: 0,
                    },
                    new go.Binding('figure', 'figure') // 声明并创建一个新的图形
                  ),
                  MAKE(
                    // 声明一个可编辑文本域
                    go.TextBlock,
                    {
                      font: '12pt Helvetica, Arial, sans-serif',
                      stroke: lightText,
                      width: 125,
                      maxSize: new go.Size(360, NaN),
                      wrap: go.TextBlock.WrapFit, // 文本域换行
                      editable: false, // 是否可编辑
                      margin: 12, // wrap:go.TextBlock.WrapDesiredSize
                    },
                    new go.Binding('text').makeTwoWay()
                  )
                )
                // four named ports, one on each side:
                // this.makePort('T', go.Spot.Top, false, true),
                // this.makePort('L', go.Spot.Left, true, true),
                // this.makePort('R', go.Spot.Right, true, true),
                // this.makePort('B', go.Spot.Bottom, true, false)
              )
            );
          }
        }
      }
    });
    mySelf.myDiagram.model = myModel;
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
    onClick_Test() {
      this.$logger(this.getSon.getSonArray);
      // 测试根据选择的项，生成关系图
      this.$logger(this.$refs.sonEntity.selectEntityArray); // 选择的子节点
      this.$logger(this.$refs.fatherEntity.selectEntityArray); // 选择的父节点
      this.$logger(this.$refs.modalRelationIdSelect.value); // 关系序号
    },
    initNodeBySelectEntityArray(data) {
      const valueStrArray = []; // 连接关系字符串数组，用以写入数据库
      const addRelationDataArray = [];
      const valueStr = ''; // 连接关系字符串数组，用以写入数据库
      const linkDataArray = [];
      this.myDiagram.model = go.Model.fromJson({});
      if (data.value.length === 0) {
        this.myDiagram.model = go.Model.fromJson({});
      } else {
        const getEntityRelationTableNamesSQL = `SELECT * FROM relationTableIndex WHERE tableName = '${this.$refs.sonEntity.search.entityTable}'`;
        this.$db.all(getEntityRelationTableNamesSQL, (err, res) => {
          const entityNodesTemArray = [];
          const entityNodesTemTArray = [];
          // res[resI]为各类关系表的内容
          for (let resI = 0; resI < res.length; resI++) {
            const relationTableName = res[resI].viewTableName; // 第resI个关系表
            const relationName = res[resI].relationTableName;

            // const entityNodesLinkTemArray = [];
            for (
              let i = 0;
              i < this.$refs.sonEntity.selectEntityArray.length;
              i++
            ) {
              const relationDataSQL = `SELECT * FROM '${relationTableName}' WHERE fromID = '${this.$refs.sonEntity.selectEntityArray[i].id}'`;
              this.$db.all(relationDataSQL, (err, rData) => {
                this.$logger(rData);
                for (let rIndex = 0; rIndex < rData.length; rIndex++) {
                  const entityNodesTem = {};
                  entityNodesTem.category = this.$refs.sonEntity.search.entityTable; // category与表名对应
                  entityNodesTem.text = rData[rIndex].fromName;
                  entityNodesTem.key =
                    this.$refs.sonEntity.search.entityTable +
                    '-' +
                    rData[rIndex].fromID;
                  entityNodesTem.keykey =
                    this.$refs.sonEntity.search.entityTable +
                    '-' +
                    rData[rIndex].fromID;

                  const entityNodesTemT = {};
                  entityNodesTemT.category = res[resI].relationEntityClass; // category与表名对应
                  entityNodesTemT.text = rData[rIndex].toName;
                  entityNodesTemT.key =
                    res[resI].relationEntityClass + '-' + rData[rIndex].toID;
                  entityNodesTemT.keykey =
                    res[resI].relationEntityClass + '-' + rData[rIndex].toID;

                  // 解决nodes重复的问题
                  // this.myDiagram.model.addNodeData(entityNodesTem);
                  // this.myDiagram.model.addNodeData(entityNodesTemT);
                  const LinksTem = [];

                  if (entityNodesTemArray.length === 0) {
                    this.myDiagram.model.addNodeData(entityNodesTem);
                    entityNodesTemArray.push(entityNodesTem);
                    LinksTem.from = entityNodesTem.key;
                  } else {
                    let eCount = 0;
                    for (
                      let eIndex = 0;
                      eIndex < entityNodesTemArray.length;
                      eIndex++
                    ) {
                      if (
                        entityNodesTemArray[eIndex].keykey !==
                        entityNodesTem.keykey
                      ) {
                        eCount++;
                      } else {
                        LinksTem.from = entityNodesTemArray[eIndex].key;
                      }
                    }
                    if (eCount === entityNodesTemArray.length) {
                      this.myDiagram.model.addNodeData(entityNodesTem);
                      entityNodesTemArray.push(entityNodesTem);
                      LinksTem.from = entityNodesTem.key;
                    }
                  }
                  if (entityNodesTemTArray.length === 0) {
                    this.myDiagram.model.addNodeData(entityNodesTemT);
                    entityNodesTemTArray.push(entityNodesTemT);
                    LinksTem.to = entityNodesTemT.key;
                    addRelationDataArray.push(LinksTem);
                  } else {
                    let efCount = 0;
                    for (
                      let eIndex = 0;
                      eIndex < entityNodesTemTArray.length;
                      eIndex++
                    ) {
                      if (
                        entityNodesTemTArray[eIndex].keykey !==
                        entityNodesTemT.keykey
                      ) {
                        efCount++;
                      } else {
                        LinksTem.to = entityNodesTemTArray[eIndex].key;
                      }
                    }
                    if (efCount === entityNodesTemTArray.length) {
                      this.myDiagram.model.addNodeData(entityNodesTemT);
                      entityNodesTemTArray.push(entityNodesTemT);
                      LinksTem.to = entityNodesTemT.key;
                      addRelationDataArray.push(LinksTem);
                    }
                  }
                  // 新建关系
                  LinksTem.text = relationName;
                  this.myDiagram.model.addLinkData(LinksTem);
                }
              });
            }
          }
        });
      }
    },
    getsonArray(data) {
      this.initNodeBySelectEntityArray(data);
    },
    initNodeByTable() {
      // this.$dbOp.getDBTalbes(); // 测试用，获取节点数据的
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
      const dbSqlTableAll = 'SELECT * from sqlite_master where type = "table"'; // 测试用，获取数据库中所有表格名称
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
    init() {
      this.initGoodsDataList();
      // this.initNodeByTable();
      const mySelf = this;
      window.myPalette = MAKE(
        go.Palette,
        'chart-palette', // must name or refer to the DIV HTML element
        {
          scrollsPageOnFocus: false,
          nodeTemplateMap: mySelf.myDiagram.nodeTemplateMap, // share the templates used by myDiagram
          model: new go.GraphLinksModel([
            // specify the contents of the Palette
            {
              category: 'Next',
              text: '新规则',
            },
            {
              category: 'RecordNode',
              key: 'Record1',
              fields: [
                {
                  name: 'field1',
                  info: '',
                  color: '#F7B84B',
                  figure: 'Ellipse',
                },
                {
                  name: 'field2',
                  info: 'the second one',
                  color: '#F25022',
                  figure: 'Ellipse',
                },
                { name: 'fieldThree', info: '3rd', color: '#00BCF2' },
              ],
            },
          ]),
        }
      );
      // 以下为关系新建内容，由于关系很复杂，因此需要多次生成，需要写循环。
      // const dbSqlStr = 'SELECT * FROM "camp-department-name-link"';
      // const entityLinksRes = this.$dbOp.getEntityLinks(); // 获取实体所有的关系数据，用视图的方式
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
    addRelationConfirm() {
      // const nodeArrayTem = this.myDiagram.model.nodeDataArray; // 图上已经有了的Node
      this.linksNodes = this.myDiagram.model.nodeDataArray;
      this.links = this.myDiagram.model.linkDataArray;

      for (
        let i = 0;
        i < this.$refs.fatherEntity.selectEntityArray.length;
        i++
      ) {
        let entityCount = 0;
        const entityNodesTem = {};
        entityNodesTem.category = this.$refs.fatherEntity.search.entityTable; // category与表名对应
        entityNodesTem.text = this.$refs.fatherEntity.selectEntityArray[i].name;
        entityNodesTem.key =
          this.$refs.fatherEntity.search.entityTable +
          '-' +
          this.$refs.fatherEntity.selectEntityArray[i].id;
        if (this.linksNodes.length === 0) {
          this.linksNodes.push(entityNodesTem);
          this.myDiagram.model.addNodeData(entityNodesTem);
        }
        for (let eI = 0; eI < this.linksNodes.length; eI++) {
          if (this.linksNodes[eI].key !== entityNodesTem.key) {
            entityCount++;
          }
        }
        if (entityCount === this.linksNodes.length) {
          this.linksNodes.push(entityNodesTem);
          this.myDiagram.model.addNodeData(entityNodesTem);
        }
      }

      const valueStrArray = []; // 连接关系字符串数组，用以写入数据库
      const valueStr = ''; // 连接关系字符串数组，用以写入数据库
      const linkValueArray = [];

      const linkDataArray = [];
      for (let i = 0; i < this.$refs.sonEntity.selectEntityArray.length; i++) {
        let entityCount = 0;
        const entityNodesTemS = {};
        entityNodesTemS.category = this.$refs.sonEntity.search.entityTable; // category与表名对应
        entityNodesTemS.text = this.$refs.sonEntity.selectEntityArray[i].name;
        entityNodesTemS.key =
          this.$refs.sonEntity.search.entityTable +
          '-' +
          this.$refs.sonEntity.selectEntityArray[i].id;
        if (this.linksNodes.length === 0) {
          this.linksNodes.push(entityNodesTemS);
          this.myDiagram.model.addNodeData(entityNodesTemS);
        }

        for (let eI = 0; eI < this.linksNodes.length; eI++) {
          if (this.linksNodes[eI].key !== entityNodesTemS.key) {
            entityCount++;
          }
        }
        if (entityCount === this.linksNodes.length) {
          this.linksNodes.push(entityNodesTemS);
          this.myDiagram.model.addNodeData(entityNodesTemS);
        }

        // this.linksNodes.push(entityNodesTem);
        // this.myDiagram.model.addNodeData(entityNodesTem);
        // 建立链接关系
        for (
          let k = 0;
          k < this.$refs.fatherEntity.selectEntityArray.length;
          k++
        ) {
          let linkCount = 0;
          const linkData = {};
          const LinksTem = [];
          // 新建关系
          LinksTem.from = entityNodesTemS.key;
          LinksTem.fromTableName = entityNodesTemS.category;
          LinksTem.fromName = entityNodesTemS.text;
          LinksTem.toName = this.$refs.fatherEntity.selectEntityArray[k].name;
          LinksTem.toTableName = this.$refs.fatherEntity.search.entityTable;
          LinksTem.to =
            this.$refs.fatherEntity.search.entityTable +
            '-' +
            this.$refs.fatherEntity.selectEntityArray[k].id;
          LinksTem.text = this.relationList[
            this.modalParams.relationTableID
          ].name; // 关系表名称
debugger;
          if (this.links.length === 0) {
            this.links.push(LinksTem);
            this.myDiagram.model.addLinkData(LinksTem);
            linkValueArray.push(LinksTem);
          } else {
            for (let lI = 0; lI < this.links.length; lI++) {
              if (
                this.links[lI].from !== LinksTem.from ||
                this.links[lI].to !== LinksTem.to ||
                this.links[lI].text !==
                  this.relationList[this.modalParams.relationTableID].name
              ) {
                linkCount++;
              }
            }
            if (linkCount === this.links.length) {
              this.links.push(LinksTem);
              linkValueArray.push(LinksTem);
              this.myDiagram.model.addLinkData(LinksTem);
            }
          }
          this.relationList[this.modalParams.relationTableID].name; // 关系表名称

          // myModel.linkDataArray.push(LinksTem);
          // linkData.sonID = this.$refs.sonEntity.selectEntityArray[i].id;
          // linkData.fatherID = this.$refs.fatherEntity.selectEntityArray[k].id;
          // linkDataArray.push(linkData);
        }
      }
      this.$logger(linkDataArray);
      // 写入数据库
      if (
        dbOperator.insertLinkData(
          linkValueArray,
          this.relationList[this.modalParams.relationTableID].name
        )
      ) {
        this.$Notice.error({
          title: '增加失败，请刷新后，重新添加',
        });
      } else {
        this.$Message.success({
          content: '新增成功',
        });
        this.modalShow = false;
      }
      // 获取table的所有列的名称
      // const getTableColumns = `PRAGMA table_info('${
      //   [ this.$refs.modalRelationIdSelect.value ].tableName
      // }')`;
      // this.$logger(getTableColumns);
      // const tableColumnsArray = this.$db.run(getTableColumns);
      // let columnsStr = ''; // 字段名
      // for (let i = 0; i < tableColumnsArray.length; i++) {
      //   columnsStr += tableColumnsArray[i].name + ',';
      // }
      // columnsStr = '(' + columnsStr.substring(0, columnsStr.length - 1) + ')';
      // this.$logger(columnsStr);

      // valueStr += this.relationTable[this.$refs.modalRelationIdSelect.value]
      //   .tableName; // 插入关系语句
      // const insertSQL = `INSERT INTO '${
      //   this.$refs.modalRelationIdSelect.value.tableName
      // }' '${columnsStr}' VALUES ('${modalParams.goods_id}','${count}','${
      //   modalParams.remark
      // }','${actual_buy_unit_price}','${actual_sell_unit_price}','${amount}','1','${Date.now()}','')`;
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
