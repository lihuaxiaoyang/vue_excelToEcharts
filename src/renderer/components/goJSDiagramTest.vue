<template>
  <div id="wrap">
    <div id="chart-wrap">
      <div id="chart-palette"></div>
      <div id="chart-diagram"></div>
    </div>
    <button @click="onSubmit"></button>
  </div>
</template>
<script>
import go from 'gojs';
import dbOperator from '../utils/dbOperator.js';
const MAKE = go.GraphObject.make;
export default {
  name: 'goJS-template',
  data() {
    return {};
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
    mySelf.myDiagram.addDiagramListener('ObjectSingleClicked', function(e) {
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
        new go.Binding('text', 'linktext')
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
            new go.Binding('text', 'name1')
          )
        ), // end of Adornment
      }
    );
    const myModel = MAKE(go.GraphLinksModel, {
      copiesArrays: true,
      copiesArrayObjects: true,
      linkFromPortIdProperty: 'fromPort',
      linkToPortIdProperty: 'toPort',
    }); // 也可以创建link model;需要配置myModel.linkDataArray 如下
    myModel.nodeDataArray = [];
    myModel.linkDataArray = [{ from: '', fromPort: '', to: '', toPort: '' }];

    const lightText = 'whitesmoke';
    // 以下为创建节点的内容，节点就是连接图中的节点
    mySelf.myDiagram.nodeTemplateMap.add(
      'Next',
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
            'RoundedRectangle',
            {
              fill: '#44CCFF',
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
              editable: true, // 是否可编辑
              margin: 12, // wrap:go.TextBlock.WrapDesiredSize
            },
            new go.Binding('text').makeTwoWay()
          )
        )
        // four named ports, one on each side:
        // makePort('T', go.Spot.Top, false, true),
        // makePort('L', go.Spot.Left, true, true),
        // makePort('R', go.Spot.Right, true, true),
        // makePort('B', go.Spot.Bottom, true, false)
      )
    );

    const fieldTemplate = MAKE(
      go.Panel,
      'TableRow', // this Panel is a row in the containing Table
      new go.Binding('portId', 'name'), // this Panel is a "port"
      {
        background: 'transparent', // so this port's background can be picked by the mouse
        fromSpot: go.Spot.Right, // links only go from the right side to the left side
        toSpot: go.Spot.Left,
        // allow drawing links from or to this port:
        fromLinkable: true,
        toLinkable: true,
      },
      MAKE(
        go.Shape,
        {
          width: 12,
          height: 12,
          column: 0,
          strokeWidth: 2,
          margin: 4,
          // but disallow drawing links from or to this shape:
          fromLinkable: false,
          toLinkable: false,
        },
        new go.Binding('figure', 'figure'),
        new go.Binding('fill', 'color')
      ),
      MAKE(
        go.TextBlock,
        {
          margin: new go.Margin(0, 5),
          column: 1,
          font: 'bold 13px sans-serif',
          alignment: go.Spot.Left,
          // and disallow drawing links from or to this text:
          fromLinkable: false,
          toLinkable: false,
        },
        new go.Binding('text', 'name')
      ),
      MAKE(
        go.TextBlock,
        {
          margin: new go.Margin(0, 5),
          column: 2,
          font: '13px sans-serif',
          alignment: go.Spot.Left,
        },
        new go.Binding('text', 'info')
      )
    );

    mySelf.myDiagram.nodeTemplateMap.add(
      'RecordNode',
      MAKE(
        go.Node,
        'Auto',
        {
          copyable: true,
          deletable: false,
        },
        MAKE(
          // 声明创建标题头
          go.Panel, // 表明需要创建一个panel面板对象
          'Vertical', // 页面布局为自动
          MAKE(
            go.Panel,
            'Auto',
            {
              stretch: go.GraphObject.Horizontal,
            }, // as wide as the whole node
            MAKE(go.Shape, {
              fill: '#1570A6',
              stroke: null,
            }),
            MAKE(
              go.TextBlock,
              {
                alignment: go.Spot.Center,
                margin: 3,
                stroke: 'white',
                textAlign: 'center',
                font: 'bold 12pt sans-serif',
              },
              new go.Binding('text', 'key')
            )
          ),
          // this Panel holds a Panel for each item object in the itemArray;
          // each item Panel is defined by the itemTemplate to be a TableRow in this Table
          MAKE(
            go.Panel,
            'Table',
            {
              padding: 2,
              minSize: new go.Size(100, 10),
              defaultStretch: go.GraphObject.Horizontal,
              itemTemplate: fieldTemplate,
            },
            new go.Binding('itemArray', 'fields')
          ) // end Table Panel of items
        ) // end Vertical Panel
      ) // end Node
    );
    // Node连接线
    // function makePort(name, spot, output, input) {
    //   return MAKE(go.Shape, 'Circle', {
    //     fill: 'transparent',
    //     stroke: null, // this is changed to "white" in the showPorts function
    //     desiredSize: new go.Size(10, 10),
    //     alignment: spot,
    //     alignmentFocus: spot, // align the port on the main Shape
    //     portId: name, // declare this object to be a "port"
    //     fromSpot: spot,
    //     toSpot: spot, // declare where links may connect at this port
    //     fromLinkable: output,
    //     toLinkable: input, // declare whether the user may draw links to/from here
    //     cursor: 'pointer' // show a different cursor to indicate potential link point
    //   })
    // }
    mySelf.myDiagram.model = myModel;
    mySelf.init();
  },
  methods: {
    onSubmit() {},
    initNodeByTable() {
      this.$dbOp.getDBTalbes();
      this.$dbOP.getForeignKeys();
    },
    init() {
      this.initNodeByTable();
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
